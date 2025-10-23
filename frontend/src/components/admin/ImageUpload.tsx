'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import api from '@/lib/api';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
  label?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUploaded,
  label = 'Imagem do Produto',
  maxSizeMB = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      return 'Por favor, selecione apenas arquivos de imagem';
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `O arquivo deve ter no máximo ${maxSizeMB}MB`;
    }

    return null;
  };

  const uploadImage = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/api/upload/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.imageUrl) {
        const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${response.data.imageUrl}`;
        console.log('Upload sucesso! URL:', fullImageUrl);
        setPreviewUrl(fullImageUrl);
        onImageUploaded(fullImageUrl);
      } else {
        console.error('Upload falhou:', response.data);
        setError('Erro ao fazer upload da imagem');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    await uploadImage(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    await uploadImage(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-200">
        {label} *
      </label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-primary bg-green-50' : 'border-gray-300 bg-gray-50'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-green-50'}
        `}
        onClick={!uploading ? handleButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-gray-300">Fazendo upload...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-5xl">📷</div>
            <div>
              <p className="text-sm font-semibold text-gray-200">
                Clique para selecionar ou arraste uma imagem
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG até {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Preview */}
      {previewUrl && !uploading && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  console.error('Erro ao carregar imagem:', previewUrl);
                  setError('Erro ao carregar preview da imagem');
                }}
                onLoad={() => console.log('Imagem carregada com sucesso!')}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white mb-1">
                Imagem carregada com sucesso!
              </p>
              <p className="text-xs text-gray-500 break-all">
                {previewUrl}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick();
                }}
                className="mt-3 text-sm text-primary hover:text-green-700 font-semibold"
              >
                Alterar imagem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
