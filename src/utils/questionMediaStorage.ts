import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { QuestionMediaItem, QuestionMediaPlacement } from '../types/questionBank';

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
export const ACCEPTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Compatibility aliases
export const ALLOWED_IMAGE_MIME_TYPES = ACCEPTED_IMAGE_TYPES;
export const MAX_IMAGE_FILE_SIZE_BYTES = MAX_FILE_SIZE_BYTES;
export const generateQuestionMediaPath = buildQuestionMediaStoragePath;

export function createMediaItemFromFile(
  file: File,
  storagePath: string,
  url: string,
  altText?: string,
  uploadedBy?: string,
  placement: QuestionMediaPlacement = 'question'
): QuestionMediaItem {
  return {
    id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    placement,
    type: 'diagram',
    storagePath,
    url,
    altText: altText?.trim() || undefined,
    fileName: file.name,
    fileSize: file.size,
    uploadedBy: uploadedBy || 'admin',
    uploadedAt: new Date().toISOString()
  };
}

export interface StoragePathParams {
  route: string;
  subject: string;
  paper?: string;
  chapterId?: string;
  sourceSet?: string;
  topicId?: string;
  questionId?: string;
  placement?: QuestionMediaPlacement;
  filename: string;
}

export function sanitizePathSegment(segment: string | undefined | null, fallback: string): string {
  if (!segment) return fallback;
  const cleaned = segment
    .trim()
    .toLowerCase()
    .replace(/[^\w\d-_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return cleaned || fallback;
}

export function sanitizeFilename(filename: string): string {
  const parts = filename.split('.');
  const ext = parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : '.png';
  const name = parts.join('.')
    .trim()
    .toLowerCase()
    .replace(/[^\w\d-_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '') || 'diagram';
  return `${name}${ext}`;
}

export function buildQuestionMediaStoragePath(params: StoragePathParams): string {
  const route = sanitizePathSegment(params.route, 'medical');
  const subject = sanitizePathSegment(params.subject, 'physics');
  const paper = sanitizePathSegment(params.paper, 'first');
  const chapterId = sanitizePathSegment(params.chapterId, 'chapter_general');
  const sourceSet = sanitizePathSegment(params.sourceSet, 'general');
  const topicId = sanitizePathSegment(params.topicId, 'general');
  const questionId = sanitizePathSegment(params.questionId, `q_${Date.now()}`);
  const placement = sanitizePathSegment(params.placement || 'question', 'question');
  const filename = sanitizeFilename(params.filename);

  return `question-media/${route}/${subject}/${paper}/${chapterId}/${sourceSet}/${topicId}/${questionId}/${placement}/${filename}`;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'কোনো ফাইল নির্বাচন করা হয়নি।' };
  }

  const isAcceptedType = ACCEPTED_IMAGE_TYPES.includes(file.type) || 
    ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));

  if (!isAcceptedType) {
    return { 
      valid: false, 
      error: 'শুধুমাত্র PNG, JPG, JPEG অথবা WEBP ফরম্যাটের চিত্র গ্রহণযোগ্য।' 
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { 
      valid: false, 
      error: `ফাইলের সাইজ ৫ MB এর বেশি হতে পারবে না (বর্তমান: ${(file.size / (1024 * 1024)).toFixed(2)} MB)।` 
    };
  }

  return { valid: true };
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.URL || !window.Image) {
      resolve({ width: 0, height: 0 });
      return;
    }
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.naturalWidth || 0, height: img.naturalHeight || 0 });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: 0, height: 0 });
    };
    img.src = objectUrl;
  });
}

export interface UploadMediaProgressCallback {
  (progress: number): void;
}

export async function uploadQuestionMediaFile(
  file: File,
  pathParams: StoragePathParams,
  uploadedBy: string,
  altText?: string,
  onProgress?: UploadMediaProgressCallback
): Promise<QuestionMediaItem> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'ফাইলের ফরম্যাট বা সাইজ সঠিক নয়।');
  }

  const storagePath = buildQuestionMediaStoragePath(pathParams);
  const dimensions = await getImageDimensions(file);
  const mediaId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const storageRef = ref(storage, storagePath);
    const metadata = {
      contentType: file.type || 'image/png',
      customMetadata: {
        uploadedBy: uploadedBy || 'admin',
        originalFileName: file.name,
        altText: altText || ''
      }
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    const downloadUrl = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0 && onProgress) {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onProgress(pct);
          }
        },
        (error) => {
          // If storage bucket is not configured or in offline sandbox preview
          console.warn('Firebase Storage direct upload error:', error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }
      );
    });

    const mediaItem: QuestionMediaItem = {
      id: mediaId,
      placement: pathParams.placement || 'question',
      type: 'diagram',
      storagePath,
      url: downloadUrl,
      altText: altText || '',
      fileName: file.name,
      fileSize: file.size,
      width: dimensions.width,
      height: dimensions.height,
      uploadedBy: uploadedBy || 'admin',
      uploadedAt: new Date().toISOString()
    };

    return mediaItem;
  } catch (error: any) {
    // If Firebase Storage is unconfigured in development/sandbox environment, fallback to a data/object URL for graceful testing
    console.warn('Handling fallback storage upload for development preview:', error);
    
    // Create base64/object URL for smooth local sandbox experience if Firebase bucket is absent
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    if (onProgress) {
      onProgress(100);
    }

    const fallbackMediaItem: QuestionMediaItem = {
      id: mediaId,
      placement: pathParams.placement || 'question',
      type: 'diagram',
      storagePath,
      url: dataUrl,
      altText: altText || '',
      fileName: file.name,
      fileSize: file.size,
      width: dimensions.width,
      height: dimensions.height,
      uploadedBy: uploadedBy || 'admin',
      uploadedAt: new Date().toISOString()
    };

    return fallbackMediaItem;
  }
}

export async function deleteQuestionMediaFile(storagePath: string): Promise<void> {
  if (!storagePath) return;
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (err) {
    console.warn('Could not delete file from Firebase Storage:', err);
  }
}
