'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface MultipleImageUploadProps {
  images: string[];
  mainImage: string;
  onImagesChange: (images: string[], mainImage: string) => void;
  maxImages?: number;
}

export default function MultipleImageUpload({
  images,
  mainImage,
  onImagesChange,
  maxImages = 10,
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`Máximo de ${maxImages} imagens permitido`);
      return;
    }

    setUploading(true);
    setError(null);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Enviando imagem ${i + 1} de ${files.length}...`);

        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post('/api/upload/product', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.success && response.data.imageUrl) {
          const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${response.data.imageUrl}`;
          newImages.push(fullImageUrl);
        }
      }

      const updatedImages = [...images, ...newImages];
      // Se não havia imagens antes, a primeira nova imagem se torna principal
      // Se já havia imagens mas a principal era externa (não estava no array), substituir
      const isMainImageExternal = mainImage && !images.includes(mainImage);
      const newMainImage = (images.length === 0 || isMainImageExternal) ? newImages[0] : mainImage;
      onImagesChange(updatedImages, newMainImage);
      setUploadProgress('');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Erro ao fazer upload das imagens');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const imageToRemove = images[indexToRemove];
    const updatedImages = images.filter((_, index) => index !== indexToRemove);

    let newMainImage = mainImage;
    if (imageToRemove === mainImage) {
      newMainImage = updatedImages[0] || '';
    }

    onImagesChange(updatedImages, newMainImage);
  };

  const handleSetMainImage = (image: string) => {
    onImagesChange(images, image);
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    onImagesChange(newImages, mainImage);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-200">
          Galeria de Imagens ({images.length}/{maxImages})
        </label>
        <label
          className={`btn-primary cursor-pointer ${
            uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading || images.length >= maxImages}
            className="hidden"
          />
          {uploading ? 'Enviando...' : '📤 Adicionar Imagens'}
        </label>
      </div>

      {uploadProgress && (
        <div className="text-sm text-primary font-medium">{uploadProgress}</div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>
      )}

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <div className="text-4xl mb-3">📸</div>
          <p className="text-gray-300 mb-2">Nenhuma imagem adicionada</p>
          <p className="text-sm text-gray-500">
            Adicione até {maxImages} imagens do produto
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group border-2 rounded-lg overflow-hidden ${
                image === mainImage
                  ? 'border-primary shadow-lg'
                  : 'border-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="aspect-square">
                <img
                  src={image}
                  alt={`Produto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                {image === mainImage && (
                  <span className="bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                    PRINCIPAL
                  </span>
                )}
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs ml-auto">
                  #{index + 1}
                </span>
              </div>

              {/* Ações - aparecem no hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {image !== mainImage && (
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(image)}
                    className="bg-gray-800 text-white px-3 py-2 rounded text-xs font-medium hover:bg-gray-700"
                    title="Definir como principal"
                  >
                    ⭐ Principal
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-red-700"
                  title="Remover"
                >
                  🗑️
                </button>
              </div>

              {/* Botões de ordenação */}
              <div className="absolute bottom-2 right-2 flex gap-1">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, 'up')}
                    className="bg-gray-800 text-gray-200 p-1 rounded shadow hover:bg-gray-700"
                    title="Mover para esquerda"
                  >
                    ←
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, 'down')}
                    className="bg-gray-800 text-gray-200 p-1 rounded shadow hover:bg-gray-700"
                    title="Mover para direita"
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-300 space-y-1">
        <p>💡 <strong>Dicas:</strong></p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>A primeira imagem será usada como principal automaticamente</li>
          <li>Clique em "⭐ Principal" para definir outra imagem como destaque</li>
          <li>Use as setas ← → para reordenar as imagens</li>
          <li>A ordem das imagens será mantida na galeria do produto</li>
        </ul>
      </div>
    </div>
  );
}
