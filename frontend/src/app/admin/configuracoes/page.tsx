'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface TrustBadge {
  icon: string;
  title: string;
  text: string;
}

interface TenantConfig {
  id: string;

  // Theme Colors
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;

  whatsappNumber: string;
  whatsappMessage?: string;

  // Tracking & Analytics
  metaPixelId?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;

  // Policies
  shippingPolicy?: string;
  returnPolicy?: string;
  privacyPolicy?: string;
  termsOfService?: string;

  // Trust & Social Proof
  trustBadges?: TrustBadge[];
  socialProofText?: string;
  enableDefaultReviews: boolean;
  enableGlobalBenefits: boolean;

  // Urgency & Scarcity
  enableUrgency: boolean;
  urgencyThreshold: number;
  enableViewCount: boolean;

  // Reviews
  requireApproval: boolean;
  allowGuestReviews: boolean;

  // Product Page
  showRelatedProducts: boolean;
  relatedProductsCount: number;
  enableProductFAQ: boolean;
  enableZoom: boolean;
}

type TabType = 'theme' | 'general' | 'tracking' | 'policies' | 'trust' | 'urgency' | 'reviews' | 'product';

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<TenantConfig>({
    id: '',
    primaryColor: '#2D1B4E',
    secondaryColor: '#B8986B',
    accentColor: '#5FAD56',
    backgroundColor: '#FFFFFF',
    textColor: '#1A1A1A',
    whatsappNumber: '',
    whatsappMessage: '',
    metaPixelId: '',
    googleAnalyticsId: '',
    googleTagManagerId: '',
    shippingPolicy: '',
    returnPolicy: '',
    privacyPolicy: '',
    termsOfService: '',
    trustBadges: [],
    socialProofText: '',
    enableDefaultReviews: false,
    enableGlobalBenefits: false,
    enableUrgency: true,
    urgencyThreshold: 5,
    enableViewCount: false,
    requireApproval: true,
    allowGuestReviews: false,
    showRelatedProducts: true,
    relatedProductsCount: 4,
    enableProductFAQ: true,
    enableZoom: true,
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/tenant/config');
      if (response.data) {
        setConfig({
          ...config,
          ...response.data,
          trustBadges: response.data.trustBadges || [],
        });
      }
    } catch (error: any) {
      console.error('Error fetching config:', error);
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put('/api/tenant/config', config);
      toast.success('✅ Configurações salvas com sucesso!', {
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('❌ Erro ao salvar configurações. Tente novamente.', {
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const addTrustBadge = () => {
    setConfig({
      ...config,
      trustBadges: [
        ...(config.trustBadges || []),
        { icon: '🚚', title: 'Título', text: 'Descrição' },
      ],
    });
  };

  const updateTrustBadge = (index: number, field: keyof TrustBadge, value: string) => {
    const updated = [...(config.trustBadges || [])];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, trustBadges: updated });
  };

  const removeTrustBadge = (index: number) => {
    const updated = (config.trustBadges || []).filter((_, i) => i !== index);
    setConfig({ ...config, trustBadges: updated });
  };

  const tabs = [
    { id: 'theme' as TabType, label: 'Tema & Cores', icon: '🎨' },
    { id: 'general' as TabType, label: 'Geral', icon: '⚙️' },
    { id: 'tracking' as TabType, label: 'Tracking & Analytics', icon: '📊' },
    { id: 'policies' as TabType, label: 'Políticas', icon: '📋' },
    { id: 'trust' as TabType, label: 'Confiança', icon: '✅' },
    { id: 'urgency' as TabType, label: 'Urgência', icon: '⚡' },
    { id: 'reviews' as TabType, label: 'Avaliações', icon: '⭐' },
    { id: 'product' as TabType, label: 'Página de Produto', icon: '📦' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Configurações da Loja</h1>
        <p className="text-gray-300 mt-2">
          Configure sua loja e personalize a experiência dos clientes
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Tab: Tema & Cores */}
          {activeTab === 'theme' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Personalização de Cores</h2>
                <p className="text-gray-300 mb-6">
                  Customize as cores do seu site para combinar com sua marca. As cores serão aplicadas automaticamente em todos os componentes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Color */}
                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Cor Primária (Primary)
                    </label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="color"
                        value={config.primaryColor || '#2D1B4E'}
                        onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                        className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={config.primaryColor || '#2D1B4E'}
                          onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                          className="input-field font-mono text-sm"
                          placeholder="#2D1B4E"
                        />
                        <p className="text-xs text-gray-300 mt-2">
                          Usada em cabeçalhos, botões principais e destaques
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Cor Secundária (Secondary)
                    </label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="color"
                        value={config.secondaryColor || '#B8986B'}
                        onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                        className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={config.secondaryColor || '#B8986B'}
                          onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                          className="input-field font-mono text-sm"
                          placeholder="#B8986B"
                        />
                        <p className="text-xs text-gray-300 mt-2">
                          Usada em botões secundários e elementos de destaque
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Cor de Destaque (Accent)
                    </label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="color"
                        value={config.accentColor || '#C4FF61'}
                        onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                        className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={config.accentColor || '#C4FF61'}
                          onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                          className="input-field font-mono text-sm"
                          placeholder="#C4FF61"
                        />
                        <p className="text-xs text-gray-300 mt-2">
                          Usada em CTAs, promoções e elementos de urgência
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Cor de Fundo (Background)
                    </label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="color"
                        value={config.backgroundColor || '#FFFFFF'}
                        onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                        className="w-20 h-20 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={config.backgroundColor || '#FFFFFF'}
                          onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                          className="input-field font-mono text-sm"
                          placeholder="#FFFFFF"
                        />
                        <p className="text-xs text-gray-300 mt-2">
                          Cor de fundo principal do site
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paletas Pré-definidas */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Paletas Pré-definidas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Roxo Sofisticado */}
                    <button
                      type="button"
                      onClick={() => setConfig({
                        ...config,
                        primaryColor: '#2D1B4E',
                        secondaryColor: '#B8986B',
                        accentColor: '#C4FF61',
                      })}
                      className="p-4 border-2 border-gray-300 rounded-xl hover:border-primary transition-all"
                    >
                      <div className="flex gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#2D1B4E' }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#B8986B' }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#C4FF61' }}></div>
                      </div>
                      <p className="text-sm font-semibold text-white">Roxo Sofisticado</p>
                      <p className="text-xs text-gray-300">Premium & Elegante</p>
                    </button>

                    {/* Verde Natural */}
                    <button
                      type="button"
                      onClick={() => setConfig({
                        ...config,
                        primaryColor: '#1A5D1A',
                        secondaryColor: '#D4AF37',
                        accentColor: '#93C572',
                      })}
                      className="p-4 border-2 border-gray-300 rounded-xl hover:border-primary transition-all"
                    >
                      <div className="flex gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#1A5D1A' }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#D4AF37' }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#93C572' }}></div>
                      </div>
                      <p className="text-sm font-semibold text-white">Verde Natural</p>
                      <p className="text-xs text-gray-300">Orgânico & Cannabis</p>
                    </button>

                    {/* Azul Confiável */}
                    <button
                      type="button"
                      onClick={() => setConfig({
                        ...config,
                        primaryColor: '#1E3A8A',
                        secondaryColor: '#0891B2',
                        accentColor: '#FBBF24',
                      })}
                      className="p-4 border-2 border-gray-300 rounded-xl hover:border-primary transition-all"
                    >
                      <div className="flex gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#1E3A8A' }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#0891B2' }}></div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#FBBF24' }}></div>
                      </div>
                      <p className="text-sm font-semibold text-white">Azul Confiável</p>
                      <p className="text-xs text-gray-300">Profissional & Seguro</p>
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> As cores são fundamentais para transmitir confiança e profissionalismo.
                    Escolha uma paleta que reflita os valores da sua marca e mantenha consistência em todos os elementos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Geral */}
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Configurações Gerais</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Número do WhatsApp *
                    </label>
                    <input
                      type="text"
                      value={config.whatsappNumber}
                      onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                      className="input-field"
                      placeholder="5511999999999"
                    />
                    <p className="text-sm text-gray-300 mt-1">
                      Formato: código do país + DDD + número (sem espaços ou caracteres especiais)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Mensagem Padrão do WhatsApp
                    </label>
                    <textarea
                      value={config.whatsappMessage || ''}
                      onChange={(e) => setConfig({ ...config, whatsappMessage: e.target.value })}
                      className="input-field"
                      rows={3}
                      placeholder="Olá! Gostaria de saber mais sobre..."
                    />
                    <p className="text-sm text-gray-300 mt-1">
                      Mensagem inicial quando o cliente clicar no botão WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Políticas */}
          {activeTab === 'policies' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Políticas da Loja</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Política de Envio
                    </label>
                    <textarea
                      value={config.shippingPolicy || ''}
                      onChange={(e) => setConfig({ ...config, shippingPolicy: e.target.value })}
                      className="input-field"
                      rows={6}
                      placeholder="Descreva suas políticas de envio, prazos, valores, etc..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Política de Devolução
                    </label>
                    <textarea
                      value={config.returnPolicy || ''}
                      onChange={(e) => setConfig({ ...config, returnPolicy: e.target.value })}
                      className="input-field"
                      rows={6}
                      placeholder="Descreva suas políticas de devolução e reembolso..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Política de Privacidade
                    </label>
                    <textarea
                      value={config.privacyPolicy || ''}
                      onChange={(e) => setConfig({ ...config, privacyPolicy: e.target.value })}
                      className="input-field"
                      rows={8}
                      placeholder="Descreva como você coleta, usa e protege os dados dos clientes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Termos de Serviço
                    </label>
                    <textarea
                      value={config.termsOfService || ''}
                      onChange={(e) => setConfig({ ...config, termsOfService: e.target.value })}
                      className="input-field"
                      rows={8}
                      placeholder="Descreva os termos e condições de uso da sua loja..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Confiança */}
          {activeTab === 'trust' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Trust Badges & Social Proof
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Texto de Social Proof
                    </label>
                    <input
                      type="text"
                      value={config.socialProofText || ''}
                      onChange={(e) => setConfig({ ...config, socialProofText: e.target.value })}
                      className="input-field"
                      placeholder="12.000+ clientes satisfeitos em todo Brasil"
                    />
                    <p className="text-sm text-gray-300 mt-1">
                      Exibido no topo do site para aumentar credibilidade
                    </p>
                  </div>

                  {/* Default Reviews Toggle */}
                  <div className="border-t pt-6">
                    <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                      <input
                        type="checkbox"
                        checked={config.enableDefaultReviews}
                        onChange={(e) => setConfig({ ...config, enableDefaultReviews: e.target.checked })}
                        className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-200 block">
                          Usar Avaliações Padrão
                        </span>
                        <span className="text-xs text-gray-300">
                          Quando ativado, exibe avaliações padrão ao invés de avaliações reais de clientes
                        </span>
                      </div>
                    </label>
                    {config.enableDefaultReviews && (
                      <div className="mt-2 ml-8 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800">
                          ⚠️ Gerencie as avaliações padrão em: <a href="/admin/avaliacoes-padrao" className="underline font-medium">Conteúdo &gt; Avaliações Padrão</a>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Global Benefits Toggle */}
                  <div>
                    <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                      <input
                        type="checkbox"
                        checked={config.enableGlobalBenefits}
                        onChange={(e) => setConfig({ ...config, enableGlobalBenefits: e.target.checked })}
                        className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-200 block">
                          Usar Benefícios Globais
                        </span>
                        <span className="text-xs text-gray-300">
                          Quando ativado, todos os produtos exibem os mesmos benefícios (até 10)
                        </span>
                      </div>
                    </label>
                    {config.enableGlobalBenefits && (
                      <div className="mt-2 ml-8 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-blue-800">
                          💡 Gerencie os benefícios globais em: <a href="/admin/beneficios" className="underline font-medium">Conteúdo &gt; Benefícios Globais</a>
                        </p>
                      </div>
                    )}
                    {!config.enableGlobalBenefits && (
                      <div className="mt-2 ml-8 p-3 bg-gray-800 border border-gray-700 rounded">
                        <p className="text-xs text-gray-300">
                          ℹ️ Quando desativado, você pode adicionar benefícios específicos por produto
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-200">
                        Trust Badges
                      </label>
                      <button
                        type="button"
                        onClick={addTrustBadge}
                        className="btn-primary text-sm"
                      >
                        ➕ Adicionar Badge
                      </button>
                    </div>

                    {(config.trustBadges || []).length === 0 ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <p className="text-gray-300">Nenhum trust badge adicionado</p>
                        <p className="text-sm text-gray-300 mt-1">
                          Trust badges aumentam a confiança dos clientes
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(config.trustBadges || []).map((badge, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1">
                                  Ícone (emoji)
                                </label>
                                <input
                                  type="text"
                                  value={badge.icon}
                                  onChange={(e) => updateTrustBadge(index, 'icon', e.target.value)}
                                  className="input-field text-2xl text-center"
                                  maxLength={2}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1">
                                  Título
                                </label>
                                <input
                                  type="text"
                                  value={badge.title}
                                  onChange={(e) => updateTrustBadge(index, 'title', e.target.value)}
                                  className="input-field"
                                  placeholder="Entrega Rápida"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1">
                                  Descrição
                                </label>
                                <input
                                  type="text"
                                  value={badge.text}
                                  onChange={(e) => updateTrustBadge(index, 'text', e.target.value)}
                                  className="input-field"
                                  placeholder="Receba em todo Brasil"
                                />
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <button
                                type="button"
                                onClick={() => removeTrustBadge(index)}
                                className="text-sm text-red-600 hover:text-red-700"
                              >
                                🗑️ Remover
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Urgência */}
          {activeTab === 'urgency' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Configurações de Urgência & Escassez
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.enableUrgency}
                      onChange={(e) => setConfig({ ...config, enableUrgency: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Habilitar Alertas de Urgência
                      </span>
                      <span className="text-xs text-gray-300">
                        Mostra "Últimas X unidades!" quando o estoque estiver baixo
                      </span>
                    </div>
                  </label>

                  {config.enableUrgency && (
                    <div className="ml-8">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Limite de Estoque para Alerta
                      </label>
                      <input
                        type="number"
                        value={config.urgencyThreshold}
                        onChange={(e) =>
                          setConfig({ ...config, urgencyThreshold: parseInt(e.target.value) || 5 })
                        }
                        className="input-field"
                        min="1"
                        max="50"
                      />
                      <p className="text-sm text-gray-300 mt-1">
                        Exibe alerta quando o estoque atingir esta quantidade ou menos
                      </p>
                    </div>
                  )}

                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.enableViewCount}
                      onChange={(e) => setConfig({ ...config, enableViewCount: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Exibir Contador de Visualizações
                      </span>
                      <span className="text-xs text-gray-300">
                        Mostra "X pessoas visualizaram este produto" (aumenta urgência)
                      </span>
                    </div>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Dica:</strong> Urgência e escassez podem aumentar a taxa de conversão em
                    30-40%, mas use com moderação para manter credibilidade.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Avaliações */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Configurações de Avaliações
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.requireApproval}
                      onChange={(e) => setConfig({ ...config, requireApproval: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Exigir Aprovação Manual
                      </span>
                      <span className="text-xs text-gray-300">
                        Avaliações precisam ser aprovadas antes de aparecer no site
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.allowGuestReviews}
                      onChange={(e) => setConfig({ ...config, allowGuestReviews: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Permitir Avaliações de Visitantes
                      </span>
                      <span className="text-xs text-gray-300">
                        Permite que não-clientes deixem avaliações (não recomendado)
                      </span>
                    </div>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠️ Recomendação:</strong> Manter aprovação manual ativada e permitir apenas
                    avaliações de clientes que compraram aumenta a credibilidade.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Tracking & Analytics */}
          {activeTab === 'tracking' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Tracking & Analytics
                </h2>
                <p className="text-gray-300 mb-6">
                  Configure pixels de rastreamento e ferramentas de análise para monitorar o comportamento dos usuários e otimizar suas campanhas de marketing.
                </p>
              </div>

              {/* Meta Pixel (Facebook) */}
              <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl">
                    📘
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Meta Pixel (Facebook)</h3>
                    <p className="text-sm text-gray-400">
                      Rastreie conversões, otimize anúncios e crie públicos personalizados
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-200">
                    Pixel ID
                  </label>
                  <input
                    type="text"
                    value={config.metaPixelId || ''}
                    onChange={(e) => setConfig({ ...config, metaPixelId: e.target.value })}
                    placeholder="123456789012345"
                    className="input-field font-mono"
                  />
                  <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                    <p className="text-xs text-gray-400 font-semibold">📝 Como encontrar seu Pixel ID:</p>
                    <ol className="text-xs text-gray-400 space-y-1 ml-4 list-decimal">
                      <li>Acesse <a href="https://business.facebook.com/events_manager2" target="_blank" className="text-accent hover:underline">Meta Events Manager</a></li>
                      <li>Clique em "Pixels de dados"</li>
                      <li>Copie o ID de 15 dígitos</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Google Analytics GA4 */}
              <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Google Analytics GA4</h3>
                    <p className="text-sm text-gray-400">
                      Analise o comportamento dos usuários e métricas de e-commerce
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-200">
                    Measurement ID (GA4)
                  </label>
                  <input
                    type="text"
                    value={config.googleAnalyticsId || ''}
                    onChange={(e) => setConfig({ ...config, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="input-field font-mono"
                  />
                  <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                    <p className="text-xs text-gray-400 font-semibold">📝 Como encontrar seu Measurement ID:</p>
                    <ol className="text-xs text-gray-400 space-y-1 ml-4 list-decimal">
                      <li>Acesse <a href="https://analytics.google.com" target="_blank" className="text-accent hover:underline">Google Analytics</a></li>
                      <li>Vá em "Admin" → "Data Streams"</li>
                      <li>Copie o ID que começa com "G-"</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Google Tag Manager */}
              <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
                    🏷️
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Google Tag Manager</h3>
                    <p className="text-sm text-gray-400">
                      Gerencie todos os seus tags de rastreamento em um só lugar
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-200">
                    Container ID
                  </label>
                  <input
                    type="text"
                    value={config.googleTagManagerId || ''}
                    onChange={(e) => setConfig({ ...config, googleTagManagerId: e.target.value })}
                    placeholder="GTM-XXXXXXX"
                    className="input-field font-mono"
                  />
                  <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                    <p className="text-xs text-gray-400 font-semibold">📝 Como encontrar seu Container ID:</p>
                    <ol className="text-xs text-gray-400 space-y-1 ml-4 list-decimal">
                      <li>Acesse <a href="https://tagmanager.google.com" target="_blank" className="text-accent hover:underline">Google Tag Manager</a></li>
                      <li>Selecione seu container</li>
                      <li>Copie o ID que começa com "GTM-"</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
                  <p className="text-xs text-yellow-200">
                    <strong>⚠️ Atenção:</strong> Se você usar Google Tag Manager, pode configurar o Meta Pixel e o GA4 através dele. Nesse caso, deixe os campos acima vazios para evitar rastreamento duplicado.
                  </p>
                </div>
              </div>

              {/* Status e Verificação */}
              <div className="bg-accent/10 border-2 border-accent/30 p-6 rounded-xl space-y-4">
                <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
                  ✅ Status da Configuração
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-300">Meta Pixel:</span>
                    <span className={`text-sm font-semibold ${config.metaPixelId ? 'text-green-400' : 'text-gray-500'}`}>
                      {config.metaPixelId ? '✓ Configurado' : '○ Não configurado'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-300">Google Analytics GA4:</span>
                    <span className={`text-sm font-semibold ${config.googleAnalyticsId ? 'text-green-400' : 'text-gray-500'}`}>
                      {config.googleAnalyticsId ? '✓ Configurado' : '○ Não configurado'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-300">Google Tag Manager:</span>
                    <span className={`text-sm font-semibold ${config.googleTagManagerId ? 'text-green-400' : 'text-gray-500'}`}>
                      {config.googleTagManagerId ? '✓ Configurado' : '○ Não configurado'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                  <p className="text-xs text-gray-400 font-semibold">🧪 Como testar se está funcionando:</p>
                  <ol className="text-xs text-gray-400 space-y-1 ml-4 list-decimal">
                    <li>Instale a extensão <strong>Meta Pixel Helper</strong> ou <strong>Google Tag Assistant</strong></li>
                    <li>Salve as configurações acima</li>
                    <li>Acesse o site público e veja se os pixels aparecem na extensão</li>
                    <li>Verifique eventos sendo enviados em tempo real</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Página de Produto */}
          {activeTab === 'product' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Configurações da Página de Produto
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.showRelatedProducts}
                      onChange={(e) =>
                        setConfig({ ...config, showRelatedProducts: e.target.checked })
                      }
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Mostrar Produtos Relacionados
                      </span>
                      <span className="text-xs text-gray-300">
                        Exibe seção "Você também pode gostar" nas páginas de produto
                      </span>
                    </div>
                  </label>

                  {config.showRelatedProducts && (
                    <div className="ml-8">
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Quantidade de Produtos Relacionados
                      </label>
                      <input
                        type="number"
                        value={config.relatedProductsCount}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            relatedProductsCount: parseInt(e.target.value) || 4,
                          })
                        }
                        className="input-field"
                        min="2"
                        max="8"
                      />
                      <p className="text-sm text-gray-300 mt-1">
                        Recomendado: 4 produtos (ideal para layout)
                      </p>
                    </div>
                  )}

                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.enableProductFAQ}
                      onChange={(e) => setConfig({ ...config, enableProductFAQ: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Habilitar FAQs de Produto
                      </span>
                      <span className="text-xs text-gray-300">
                        Permite adicionar perguntas frequentes em cada produto
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.enableZoom}
                      onChange={(e) => setConfig({ ...config, enableZoom: e.target.checked })}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-200 block">
                        Habilitar Zoom nas Imagens
                      </span>
                      <span className="text-xs text-gray-300">
                        Permite ampliar imagens ao passar o mouse
                      </span>
                    </div>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900">
                    <strong>✅ Dica:</strong> Todas essas features aumentam a taxa de conversão.
                    Recomendamos manter todas ativadas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : '💾 Salvar Configurações'}
          </button>
        </div>
      </div>
    </div>
  );
}
