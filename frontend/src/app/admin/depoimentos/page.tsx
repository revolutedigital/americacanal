'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';

interface Testimonial {
  id: string;
  comment?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  customerName?: string;
  customerCity?: string;
  productName?: string;
  usageDuration?: string;
  resultType?: string;
  isActive: boolean;
  isFeatured: boolean;
  showOnHome: boolean;
  showOnProducts: boolean;
  order: number;
  createdAt: string;
}

export default function DepoimentosPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [formData, setFormData] = useState({
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    customerName: '',
    customerCity: '',
    productName: '',
    usageDuration: '',
    resultType: '',
    isActive: true,
    isFeatured: false,
    showOnHome: true,
    showOnProducts: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/default-reviews?tenantId=df192cfd-fb87-470a-8ea8-81784633409c');
      setTestimonials(response.data);
    } catch (error: any) {
      console.error('Error fetching testimonials:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (max 50MB para vídeos, 5MB para imagens)
    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`Arquivo muito grande! Tamanho máximo: ${file.type.startsWith('video/') ? '50MB' : '5MB'}`);
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Por favor, selecione uma imagem ou vídeo válido');
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    formDataUpload.append('folder', 'testimonials');

    try {
      setUploadingMedia(true);
      const response = await api.post('/api/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      setFormData({ ...formData, mediaUrl: response.data.url, mediaType });
      alert(`✅ ${mediaType === 'video' ? 'Vídeo' : 'Imagem'} enviado com sucesso!`);
    } catch (error: any) {
      console.error('Error uploading media:', error);
      alert(error.response?.data?.error || 'Erro ao fazer upload do arquivo');
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mediaUrl) {
      alert('Por favor, faça upload de uma imagem ou vídeo do depoimento');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/api/default-reviews/${editingId}`, formData);
        alert('✅ Depoimento atualizado com sucesso!');
      } else {
        await api.post('/api/default-reviews', {
          ...formData,
          tenantId: 'df192cfd-fb87-470a-8ea8-81784633409c',
        });
        alert('✅ Depoimento criado com sucesso!');
      }

      setFormData({
        mediaUrl: '',
        mediaType: 'image',
        customerName: '',
        customerCity: '',
        productName: '',
        usageDuration: '',
        resultType: '',
        isActive: true,
        isFeatured: false,
        showOnHome: true,
        showOnProducts: true,
      });
      setEditingId(null);
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error saving testimonial:', error);
      alert(error.response?.data?.error || 'Erro ao salvar depoimento');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      mediaUrl: testimonial.mediaUrl || '',
      mediaType: testimonial.mediaType || 'image',
      customerName: testimonial.customerName || '',
      customerCity: testimonial.customerCity || '',
      productName: testimonial.productName || '',
      usageDuration: testimonial.usageDuration || '',
      resultType: testimonial.resultType || '',
      isActive: testimonial.isActive,
      isFeatured: testimonial.isFeatured,
      showOnHome: testimonial.showOnHome,
      showOnProducts: testimonial.showOnProducts,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;

    try {
      await api.delete(`/api/default-reviews/${id}`);
      alert('✅ Depoimento excluído com sucesso!');
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      alert(error.response?.data?.error || 'Erro ao excluir depoimento');
    }
  };

  const toggleActive = async (id: string) => {
    try {
      await api.put(`/api/default-reviews/${id}/toggle-active`);
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error toggling active:', error);
      alert(error.response?.data?.error || 'Erro ao alterar status');
    }
  };

  const toggleFeatured = async (id: string) => {
    try {
      await api.put(`/api/default-reviews/${id}/toggle-featured`);
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error toggling featured:', error);
      alert(error.response?.data?.error || 'Erro ao alterar destaque');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      mediaUrl: '',
      mediaType: 'image',
      customerName: '',
      customerCity: '',
      productName: '',
      usageDuration: '',
      resultType: '',
      isActive: true,
      isFeatured: false,
      showOnHome: true,
      showOnProducts: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">💬 Depoimentos</h1>
        <p className="text-gray-300 mt-2">
          Gerencie os depoimentos de clientes exibidos no site
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? '✏️ Editar Depoimento' : '➕ Novo Depoimento'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Upload de Mídia */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Imagem ou Vídeo do Depoimento *
            </label>
            <p className="text-sm text-gray-400 mb-3">
              📸 Print de WhatsApp ou 🎥 Vídeo do cliente
            </p>
            <div className="space-y-3">
              {formData.mediaUrl && (
                <div className="relative w-full bg-gray-700 rounded-lg overflow-hidden">
                  {formData.mediaType === 'video' ? (
                    <video
                      src={formData.mediaUrl}
                      controls
                      className="w-full max-h-96 object-contain"
                    />
                  ) : (
                    <div className="relative w-full h-48">
                      <Image
                        src={formData.mediaUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaUrl: '', mediaType: 'image' })}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                  >
                    🗑️
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <label className="flex-1">
                  <div className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors bg-gray-700">
                    <div className="text-center">
                      <span className="text-2xl mb-2">
                        {formData.mediaType === 'video' ? '🎥' : '📸'}
                      </span>
                      <p className="text-sm text-gray-300">
                        {uploadingMedia ? 'Enviando...' : 'Clique para enviar'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Imagens (5MB) ou Vídeos (50MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                      disabled={uploadingMedia}
                    />
                  </div>
                </label>

                <div className="flex-1">
                  <input
                    type="url"
                    value={formData.mediaUrl}
                    onChange={(e) => {
                      const url = e.target.value;
                      const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
                      setFormData({
                        ...formData,
                        mediaUrl: url,
                        mediaType: isVideo ? 'video' : 'image'
                      });
                    }}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Ou cole a URL da mídia"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Campos de Contexto */}
          <div className="border-t border-gray-600 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Informações do Cliente (Opcional)
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Adicione contexto ao depoimento para aumentar a credibilidade
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome do Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ex: João Silva"
                />
              </div>

              {/* Cidade do Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={formData.customerCity}
                  onChange={(e) => setFormData({ ...formData, customerCity: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nome do Produto */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Produto Utilizado
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ex: CBD Oil Premium"
                />
              </div>

              {/* Tempo de Uso */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Tempo de Uso
                </label>
                <select
                  value={formData.usageDuration}
                  onChange={(e) => setFormData({ ...formData, usageDuration: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Selecione...</option>
                  <option value="1 semana">1 semana</option>
                  <option value="2 semanas">2 semanas</option>
                  <option value="1 mês">1 mês</option>
                  <option value="2 meses">2 meses</option>
                  <option value="3 meses">3 meses</option>
                  <option value="6 meses">6 meses</option>
                  <option value="1 ano">1 ano</option>
                  <option value="Mais de 1 ano">Mais de 1 ano</option>
                </select>
              </div>

              {/* Tipo de Resultado */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Resultado/Benefício
                </label>
                <select
                  value={formData.resultType}
                  onChange={(e) => setFormData({ ...formData, resultType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Selecione...</option>
                  <option value="Insônia">Insônia</option>
                  <option value="Ansiedade">Ansiedade</option>
                  <option value="Dor Crônica">Dor Crônica</option>
                  <option value="Relaxamento">Relaxamento</option>
                  <option value="Foco e Concentração">Foco e Concentração</option>
                  <option value="Inflamação">Inflamação</option>
                  <option value="Bem-estar Geral">Bem-estar Geral</option>
                  <option value="Estresse">Estresse</option>
                </select>
              </div>
            </div>
          </div>

          {/* Checkboxes de Exibição */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600">
              <input
                type="checkbox"
                checked={formData.showOnHome}
                onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                className="w-5 h-5 text-accent border-gray-500 rounded focus:ring-accent"
              />
              <div>
                <span className="text-sm font-medium text-white">🏠 Mostrar na Home</span>
                <p className="text-xs text-gray-400">Exibir no carrossel da página inicial</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600">
              <input
                type="checkbox"
                checked={formData.showOnProducts}
                onChange={(e) => setFormData({ ...formData, showOnProducts: e.target.checked })}
                className="w-5 h-5 text-accent border-gray-500 rounded focus:ring-accent"
              />
              <div>
                <span className="text-sm font-medium text-white">🛍️ Mostrar em Produtos</span>
                <p className="text-xs text-gray-400">Exibir nas páginas de produtos</p>
              </div>
            </label>
          </div>

          {/* Checkboxes de Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-green-500 border-gray-500 rounded focus:ring-green-500"
              />
              <div>
                <span className="text-sm font-medium text-white">✅ Depoimento Ativo</span>
                <p className="text-xs text-gray-400">Visível no site</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 text-yellow-500 border-gray-500 rounded focus:ring-yellow-500"
              />
              <div>
                <span className="text-sm font-medium text-white">⭐ Destacar</span>
                <p className="text-xs text-gray-400">Prioridade no carrossel</p>
              </div>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-accent to-accent-dark text-gray-900 px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all"
            >
              {editingId ? '💾 Salvar Alterações' : '➕ Criar Depoimento'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Depoimentos */}
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            📋 Depoimentos Cadastrados ({testimonials.length})
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-300 mb-2">Nenhum depoimento cadastrado</p>
            <p className="text-sm text-gray-500">
              Crie seu primeiro depoimento usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 hover:bg-gray-700 transition-colors">
                <div className="flex gap-4">
                  {/* Mídia do Depoimento */}
                  {testimonial.mediaUrl && (
                    <div className="flex-shrink-0 w-32 rounded-lg overflow-hidden bg-gray-700">
                      {testimonial.mediaType === 'video' ? (
                        <video
                          src={testimonial.mediaUrl}
                          className="w-full h-32 object-cover"
                          muted
                        />
                      ) : (
                        <div className="relative w-32 h-32">
                          <Image
                            src={testimonial.mediaUrl}
                            alt="Depoimento"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2 flex-wrap">
                        {testimonial.mediaType === 'video' && (
                          <span className="px-3 py-1 text-xs bg-red-500 text-white rounded-full font-semibold">
                            🎥 Vídeo
                          </span>
                        )}
                        {testimonial.isFeatured && (
                          <span className="px-3 py-1 text-xs bg-yellow-500 text-gray-900 rounded-full font-semibold">
                            ⭐ Destaque
                          </span>
                        )}
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            testimonial.isActive
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {testimonial.isActive ? '✅ Ativo' : '❌ Inativo'}
                        </span>
                        {testimonial.showOnHome && (
                          <span className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full font-semibold">
                            🏠 Home
                          </span>
                        )}
                        {testimonial.showOnProducts && (
                          <span className="px-3 py-1 text-xs bg-purple-500 text-white rounded-full font-semibold">
                            🛍️ Produtos
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">
                      {testimonial.mediaType === 'video' ? '🎥 Depoimento em vídeo' : '📸 Depoimento em imagem'}
                    </p>

                    {/* Context Info */}
                    {(testimonial.customerName || testimonial.customerCity || testimonial.productName || testimonial.usageDuration || testimonial.resultType) && (
                      <div className="mb-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-xs font-semibold text-gray-300 mb-2">Informações do Depoimento:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {testimonial.customerName && (
                            <div>
                              <span className="text-gray-400">Cliente:</span>
                              <span className="text-white ml-1 font-medium">{testimonial.customerName}</span>
                            </div>
                          )}
                          {testimonial.customerCity && (
                            <div>
                              <span className="text-gray-400">Cidade:</span>
                              <span className="text-white ml-1 font-medium">{testimonial.customerCity}</span>
                            </div>
                          )}
                          {testimonial.productName && (
                            <div>
                              <span className="text-gray-400">Produto:</span>
                              <span className="text-white ml-1 font-medium">{testimonial.productName}</span>
                            </div>
                          )}
                          {testimonial.usageDuration && (
                            <div>
                              <span className="text-gray-400">Tempo:</span>
                              <span className="text-white ml-1 font-medium">{testimonial.usageDuration}</span>
                            </div>
                          )}
                          {testimonial.resultType && (
                            <div className="col-span-2">
                              <span className="text-gray-400">Benefício:</span>
                              <span className="text-accent ml-1 font-semibold">{testimonial.resultType}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-accent hover:text-accent-dark font-medium text-sm transition-colors"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => toggleActive(testimonial.id)}
                        className="text-gray-300 hover:text-white font-medium text-sm transition-colors"
                      >
                        {testimonial.isActive ? '👁️ Desativar' : '👁️ Ativar'}
                      </button>
                      <button
                        onClick={() => toggleFeatured(testimonial.id)}
                        className="text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors"
                      >
                        {testimonial.isFeatured ? '⭐ Remover Destaque' : '⭐ Destacar'}
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-500 hover:text-red-400 font-medium text-sm transition-colors"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dicas */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-300 font-semibold mb-2">
          💡 Dicas para Depoimentos Eficazes:
        </p>
        <ul className="list-disc list-inside text-sm text-blue-200 space-y-1">
          <li>📸 Use prints de WhatsApp com depoimentos reais de clientes</li>
          <li>🎥 Vídeos de clientes falando sobre o produto têm mais impacto</li>
          <li>✅ Priorize depoimentos autênticos e verificáveis</li>
          <li>🎯 Use checkboxes para controlar onde cada depoimento aparece</li>
          <li>⭐ Destaque os melhores depoimentos para aparecerem primeiro</li>
        </ul>
      </div>
    </div>
  );
}
