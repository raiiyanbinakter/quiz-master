import { describe, it, expect } from 'vitest';
import {
  validateImageFile,
  generateQuestionMediaPath,
  createMediaItemFromFile,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_FILE_SIZE_BYTES
} from '../questionMediaStorage';

describe('Question Media Storage & Validation Tests', () => {
  it('TC-1: Should accept valid image formats (PNG, JPG, JPEG, WEBP)', () => {
    const validPng = new File(['dummy'], 'diagram.png', { type: 'image/png' });
    const validJpg = new File(['dummy'], 'diagram.jpg', { type: 'image/jpeg' });
    const validJpeg = new File(['dummy'], 'diagram.jpeg', { type: 'image/jpeg' });
    const validWebp = new File(['dummy'], 'diagram.webp', { type: 'image/webp' });

    expect(validateImageFile(validPng).valid).toBe(true);
    expect(validateImageFile(validJpg).valid).toBe(true);
    expect(validateImageFile(validJpeg).valid).toBe(true);
    expect(validateImageFile(validWebp).valid).toBe(true);
  });

  it('TC-2: Should reject unsupported file types (GIF, SVG, PDF, TXT)', () => {
    const gifFile = new File(['dummy'], 'anim.gif', { type: 'image/gif' });
    const svgFile = new File(['dummy'], 'vector.svg', { type: 'image/svg+xml' });
    const pdfFile = new File(['dummy'], 'doc.pdf', { type: 'application/pdf' });
    const txtFile = new File(['dummy'], 'notes.txt', { type: 'text/plain' });

    const gifRes = validateImageFile(gifFile);
    expect(gifRes.valid).toBe(false);
    expect(gifRes.error).toContain('PNG, JPG, JPEG');

    const svgRes = validateImageFile(svgFile);
    expect(svgRes.valid).toBe(false);

    const pdfRes = validateImageFile(pdfFile);
    expect(pdfRes.valid).toBe(false);

    const txtRes = validateImageFile(txtFile);
    expect(txtRes.valid).toBe(false);
  });

  it('TC-3: Should reject files exceeding 5MB', () => {
    // 5.1 MB
    const oversizedBuffer = new Uint8Array(5.1 * 1024 * 1024);
    const oversizedFile = new File([oversizedBuffer], 'large_image.png', { type: 'image/png' });

    const result = validateImageFile(oversizedFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('৫ MB');
  });

  it('TC-4: Should accept files exactly at or below 5MB', () => {
    // 4.9 MB
    const validBuffer = new Uint8Array(4.9 * 1024 * 1024);
    const validFile = new File([validBuffer], 'good_image.png', { type: 'image/png' });

    const result = validateImageFile(validFile);
    expect(result.valid).toBe(true);
  });

  it('TC-5: Should generate correct Firebase Storage paths with required parameters', () => {
    const path = generateQuestionMediaPath({
      route: 'medical',
      subject: 'physics',
      paper: 'first',
      chapterId: 'phys1_c2',
      sourceSet: 'ishak',
      topicId: 'vector_addition',
      questionId: 'q_12345',
      filename: 'circuit.png'
    });

    expect(path).toBe('question-media/medical/physics/first/phys1_c2/ishak/vector_addition/q_12345/circuit.png');
  });

  it('TC-6: Should sanitize path segments with special characters or spaces', () => {
    const path = generateQuestionMediaPath({
      route: 'academic',
      subject: 'chemistry',
      paper: 'second',
      chapterId: 'গুণগত রসায়ন',
      sourceSet: 'হাজারী স্যার',
      topicId: 'দ্রাব্যতা ও দ্রাব্যতা গুণফল',
      questionId: 'q_999',
      filename: 'my test diagram.png'
    });

    expect(path).toContain('question-media/academic/chemistry/second/');
    expect(path).not.toContain(' ');
  });

  it('TC-7: Should construct QuestionMediaItem object with all required fields', () => {
    const file = new File(['test-content'], 'optics.png', { type: 'image/png' });
    const mediaItem = createMediaItemFromFile(
      file,
      'question-media/medical/physics/first/optics/q1/optics.png',
      'blob:http://localhost/test-uuid',
      'আলোর প্রতিসরণ চিত্র',
      'rayanbinakter@gmail.com'
    );

    expect(mediaItem.id).toBeDefined();
    expect(mediaItem.type).toBe('diagram');
    expect(mediaItem.storagePath).toBe('question-media/medical/physics/first/optics/q1/optics.png');
    expect(mediaItem.url).toBe('blob:http://localhost/test-uuid');
    expect(mediaItem.altText).toBe('আলোর প্রতিসরণ চিত্র');
    expect(mediaItem.fileName).toBe('optics.png');
    expect(mediaItem.uploadedBy).toBe('rayanbinakter@gmail.com');
    expect(mediaItem.uploadedAt).toBeDefined();
  });
});
