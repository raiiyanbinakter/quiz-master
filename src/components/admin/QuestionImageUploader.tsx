import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2,
  FileImage,
  Eye,
  X
} from 'lucide-react';
import { QuestionMediaItem, QuestionMediaPlacement } from '../../types/questionBank';
import { 
  uploadQuestionMediaFile, 
  validateImageFile, 
  StoragePathParams,
  MAX_FILE_SIZE_BYTES
} from '../../utils/questionMediaStorage';
import { getPlacementBanglaLabel, getPlacementMissingBanglaLabel } from '../../lib/questionMediaOverrides';

interface QuestionImageUploaderProps {
  placement?: QuestionMediaPlacement;
  placementLabel?: string;
  media?: QuestionMediaItem[];
  onChange: (updatedMedia: QuestionMediaItem[], hasImage: boolean) => void;
  pathParams: StoragePathParams;
  userEmail?: string;
  hasPlaceholderWarning?: boolean;
  warningMessage?: string;
  onUploadStateChange?: (isUploading: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
}

export default function QuestionImageUploader({
  placement = 'question',
  placementLabel,
  media = [],
  onChange,
  pathParams,
  userEmail = 'admin@example.com',
  hasPlaceholderWarning = false,
  warningMessage,
  onUploadStateChange,
  disabled = false,
  compact = false
}: QuestionImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [altTextInput, setAltTextInput] = useState('');
  const [previewZoom, setPreviewZoom] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find the media item belonging to this placement
  const currentMedia = media?.find(m => (m.placement || 'question') === placement) || null;

  const defaultLabel = placementLabel || `${getPlacementBanglaLabel(placement)} যোগ করুন`;

  useEffect(() => {
    if (currentMedia?.altText) {
      setAltTextInput(currentMedia.altText);
    } else if (!currentMedia) {
      setAltTextInput('');
    }
  }, [currentMedia]);

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'অগ্রহণযোগ্য ফাইল।');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(10);
      onUploadStateChange?.(true);

      const targetPathParams: StoragePathParams = {
        ...pathParams,
        placement,
        filename: file.name
      };

      const mediaItem = await uploadQuestionMediaFile(
        file,
        targetPathParams,
        userEmail,
        altTextInput,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      // Merge into media list preserving other placements
      const otherMedia = (media || []).filter(m => (m.placement || 'question') !== placement);
      const updatedMediaList = [...otherMedia, { ...mediaItem, placement }];

      setUploadProgress(100);
      onChange(updatedMediaList, updatedMediaList.length > 0);
      setErrorMessage(null);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setErrorMessage(err.message || 'চিত্র আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsUploading(false);
      onUploadStateChange?.(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemoveImage = () => {
    setErrorMessage(null);
    setAltTextInput('');
    const remainingMedia = (media || []).filter(m => (m.placement || 'question') !== placement);
    onChange(remainingMedia, remainingMedia.length > 0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAltTextChange = (text: string) => {
    setAltTextInput(text);
    if (currentMedia) {
      const updatedItem: QuestionMediaItem = {
        ...currentMedia,
        altText: text
      };
      const otherMedia = (media || []).filter(m => (m.placement || 'question') !== placement);
      const updatedMediaList = [...otherMedia, updatedItem];
      onChange(updatedMediaList, true);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={`space-y-2.5 bg-slate-950/70 border border-slate-800/90 rounded-2xl ${compact ? 'p-3' : 'p-4'} transition-all`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
          <h4 className="text-xs font-extrabold text-white">{defaultLabel}</h4>
          <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
            {getPlacementBanglaLabel(placement)}
          </span>
        </div>

        {currentMedia && (
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            চিত্র সংযুক্ত
          </span>
        )}
      </div>

      {/* Warning for missing placeholder image */}
      {hasPlaceholderWarning && !currentMedia && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-start gap-2 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-amber-200">
              {warningMessage || `${getPlacementMissingBanglaLabel(placement)}।`}
            </p>
            <p className="text-[10px] text-amber-300/80">
              নিচে চিত্র আপলোড করুন। (খসড়া হিসেবে রাখতে পারেন, তবে প্রকাশের আগে চিত্র যোগ করা আবশ্যক)।
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-2.5 text-xs text-rose-300 flex items-center justify-between">
          <span className="font-semibold">{errorMessage}</span>
          <button 
            type="button" 
            onClick={() => setErrorMessage(null)} 
            className="text-rose-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Upload Zone / Media Display */}
      {!currentMedia ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled && !isUploading) {
              fileInputRef.current?.click();
            }
          }}
          className={`border-2 border-dashed rounded-xl ${compact ? 'p-3.5' : 'p-5'} text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/20'
              : 'border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/70'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <div className="space-y-2 w-full max-w-xs py-1">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs text-cyan-300 font-bold">চিত্র আপলোড হচ্ছে... {uploadProgress}%</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full transition-all duration-200" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="p-2 bg-slate-800/80 text-cyan-400 rounded-xl border border-slate-700">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <FileImage className="w-3.5 h-3.5" />
                  <span>{compact ? 'চিত্র নির্বাচন' : 'চিত্র আপলোড করুন'}</span>
                </button>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  ফাইল টেনে আনুন অথবা ক্লিক করে আপলোড করুন (সর্বোচ্চ ৫ MB)
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Image Preview & Management Card */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            {/* File info */}
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                {currentMedia.fileName}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="text-cyan-300 font-medium bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800/40">
                  {getPlacementBanglaLabel(placement)}
                </span>
                {currentMedia.width && currentMedia.height ? (
                  <span>
                    {currentMedia.width} × {currentMedia.height} px
                  </span>
                ) : null}
                {currentMedia.fileSize ? (
                  <>
                    <span>•</span>
                    <span>{formatFileSize(currentMedia.fileSize)}</span>
                  </>
                ) : null}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setPreviewZoom(true)}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="বড় করে দেখুন"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">প্রিভিউ</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || disabled}
                className="px-2 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/30 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                <span>চিত্র পরিবর্তন করুন</span>
              </button>

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isUploading || disabled}
                className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/20 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>চিত্র সরান</span>
              </button>
            </div>
          </div>

          {/* Uploading indicator if replacing */}
          {isUploading && (
            <div className="space-y-1 p-2 bg-slate-950 rounded-lg">
              <div className="flex items-center justify-between text-[10px] text-cyan-300 font-bold">
                <span>নতুন চিত্র আপলোড হচ্ছে...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full transition-all duration-200" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Image Thumbnail Box */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center p-2 max-h-48">
            <img
              src={currentMedia.url}
              alt={currentMedia.altText || `${getPlacementBanglaLabel(placement)} preview`}
              className="max-h-44 w-auto object-contain rounded-lg shadow-sm"
              loading="lazy"
            />
          </div>

          {/* ALT TEXT Input */}
          <div className="space-y-1 pt-0.5">
            <label className="block text-[10px] font-bold text-slate-300">
              চিত্রের বর্ণনা (Alt Text) - <span className="text-slate-500 font-normal">ঐচ্ছিক</span>
            </label>
            <input
              type="text"
              value={altTextInput}
              onChange={(e) => handleAltTextChange(e.target.value)}
              placeholder="যেমন: অপশন ক-এর বর্তনী ডায়াগ্রাম"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
      )}

      {/* FULLSCREEN ZOOM MODAL */}
      {previewZoom && currentMedia && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewZoom(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-3xl p-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-3 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white truncate max-w-sm">
                  {currentMedia.fileName} ({getPlacementBanglaLabel(placement)})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewZoom(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full flex items-center justify-center py-2 bg-slate-950 rounded-2xl border border-slate-800 p-2">
              <img
                src={currentMedia.url}
                alt={currentMedia.altText || `${getPlacementBanglaLabel(placement)} Preview`}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {currentMedia.altText && (
              <p className="text-xs text-slate-400 text-center w-full px-4">
                বর্ণনা: <span className="text-slate-200 font-medium">{currentMedia.altText}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
