'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQ[];
}

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        // Normalizar author e category para strings
        const normalizedPost = {
          ...data,
          author: typeof data.author === 'string' ? data.author : data.author?.name || 'America Cannabis',
          category: typeof data.category === 'string' ? data.category : data.category?.name || 'Cannabis',
        };
        setPost(normalizedPost);
        setImagePreview(data.imageUrl || '');
      } else {
        alert('Post não encontrado');
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Erro ao carregar post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/blog/posts/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert('✅ Post atualizado com sucesso!');
        router.push('/admin/blog');
      } else {
        const error = await response.text();
        alert(`Erro ao atualizar post: ${error}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Erro ao atualizar post');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (url: string) => {
    setPost({ ...post!, imageUrl: url });
    setImagePreview(url);
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setPost({ ...post!, tags });
  };

  const addFAQ = () => {
    const faqs = post?.faqs || [];
    setPost({
      ...post!,
      faqs: [...faqs, { question: '', answer: '' }]
    });
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const faqs = [...(post?.faqs || [])];
    faqs[index] = { ...faqs[index], [field]: value };
    setPost({ ...post!, faqs });
  };

  const removeFAQ = (index: number) => {
    const faqs = (post?.faqs || []).filter((_, i) => i !== index);
    setPost({ ...post!, faqs });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return <div>Post não encontrado</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Editar Post</h1>
          <p className="text-gray-300">Editando: {post.title}</p>
        </div>
        <Link href="/admin/blog" className="btn-secondary">
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Informações Básicas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={post.slug}
                disabled
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-400 rounded-lg opacity-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoria *
              </label>
              <input
                type="text"
                value={post.category}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Autor *
              </label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={post.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cannabis, cbd, saúde"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tempo de Leitura (minutos)
              </label>
              <input
                type="number"
                value={post.readTime}
                onChange={(e) => setPost({ ...post, readTime: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resumo *
            </label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Imagem do Post</h2>

          <ImageUpload
            currentImageUrl={post.imageUrl}
            onImageUploaded={(url) => setPost({ ...post, imageUrl: url })}
            label="Imagem de Destaque do Post"
            maxSizeMB={10}
            uploadType="blog"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ou use uma URL externa
            </label>
            <input
              type="url"
              value={post.imageUrl}
              onChange={(e) => handleImageChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Você pode fazer upload de uma imagem acima ou inserir uma URL externa
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Conteúdo do Post</h2>

          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={20}
            required
            placeholder="Escreva o conteúdo do post aqui..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Você pode usar Markdown para formatar o texto
          </p>
        </div>

        {/* FAQs */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Perguntas Frequentes (FAQs)</h2>
            <button
              type="button"
              onClick={addFAQ}
              className="btn-secondary text-sm"
            >
              ➕ Adicionar FAQ
            </button>
          </div>

          {post.faqs && post.faqs.length > 0 ? (
            <div className="space-y-4">
              {post.faqs.map((faq, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm text-gray-400">FAQ #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFAQ(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      ✕ Remover
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Pergunta
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite a pergunta..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Resposta
                      </label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Digite a resposta..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Nenhuma FAQ adicionada ainda
            </p>
          )}
        </div>

        {/* SEO */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">SEO</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meta Título
              </label>
              <input
                type="text"
                value={post.metaTitle || ''}
                onChange={(e) => setPost({ ...post, metaTitle: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Deixe vazio para usar o título do post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Meta Descrição
              </label>
              <textarea
                value={post.metaDescription || ''}
                onChange={(e) => setPost({ ...post, metaDescription: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Deixe vazio para usar o resumo do post"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}