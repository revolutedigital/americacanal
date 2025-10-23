'use client';

import { useState } from 'react';

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  isActive: boolean;
  order: number;
}

interface ProductFAQManagerProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export default function ProductFAQManager({ faqs, onChange }: ProductFAQManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newFAQ, setNewFAQ] = useState<FAQ>({
    question: '',
    answer: '',
    isActive: true,
    order: 0,
  });

  const handleAddFAQ = () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) {
      alert('Por favor, preencha a pergunta e a resposta');
      return;
    }

    const updatedFAQs = [
      ...faqs,
      {
        ...newFAQ,
        order: faqs.length,
      },
    ];

    onChange(updatedFAQs);
    setNewFAQ({ question: '', answer: '', isActive: true, order: 0 });
  };

  const handleUpdateFAQ = (index: number, field: keyof FAQ, value: any) => {
    const updatedFAQs = faqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    onChange(updatedFAQs);
  };

  const handleRemoveFAQ = (index: number) => {
    if (!confirm('Tem certeza que deseja remover esta FAQ?')) return;

    const updatedFAQs = faqs
      .filter((_, i) => i !== index)
      .map((faq, i) => ({ ...faq, order: i }));

    onChange(updatedFAQs);
  };

  const handleMoveFAQ = (index: number, direction: 'up' | 'down') => {
    const newFAQs = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newFAQs.length) return;

    [newFAQs[index], newFAQs[targetIndex]] = [newFAQs[targetIndex], newFAQs[index]];

    // Atualizar ordem
    const reorderedFAQs = newFAQs.map((faq, i) => ({ ...faq, order: i }));
    onChange(reorderedFAQs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Perguntas Frequentes</h3>
          <p className="text-sm text-gray-300">
            Adicione FAQs para responder dúvidas comuns dos clientes
          </p>
        </div>
        <span className="text-sm font-medium text-gray-300">
          {faqs.length} {faqs.length === 1 ? 'pergunta' : 'perguntas'}
        </span>
      </div>

      {/* Lista de FAQs existentes */}
      {faqs.length > 0 && (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                faq.isActive ? 'border-gray-300' : 'border-gray-700 bg-gray-50'
              }`}
            >
              {editingIndex === index ? (
                // Modo de edição
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Pergunta *
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleUpdateFAQ(index, 'question', e.target.value)}
                      className="input-field"
                      placeholder="Ex: Este produto é legal?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Resposta *
                    </label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => handleUpdateFAQ(index, 'answer', e.target.value)}
                      className="input-field"
                      rows={3}
                      placeholder="Sim, todos os nossos produtos são 100% legais..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={faq.isActive}
                        onChange={(e) =>
                          handleUpdateFAQ(index, 'isActive', e.target.checked)
                        }
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-200">Ativo (visível no site)</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="btn-primary text-sm"
                    >
                      ✓ Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="btn-secondary text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Modo de visualização
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
                        {!faq.isActive && (
                          <span className="text-xs bg-gray-200 text-gray-300 px-2 py-0.5 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-white mb-1">
                        {faq.question}
                      </h4>
                      <p className="text-sm text-gray-300 whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingIndex(index)}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFAQ(index)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        🗑️ Remover
                      </button>
                    </div>
                  </div>

                  {/* Botões de ordenação */}
                  <div className="flex gap-2 pt-2 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => handleMoveFAQ(index, 'up')}
                      disabled={index === 0}
                      className="text-xs text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ↑ Subir
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveFAQ(index, 'down')}
                      disabled={index === faqs.length - 1}
                      className="text-xs text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ↓ Descer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Formulário para adicionar nova FAQ */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3">➕ Adicionar Nova Pergunta</h4>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Pergunta *
            </label>
            <input
              type="text"
              value={newFAQ.question}
              onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
              className="input-field"
              placeholder="Ex: Qual a concentração de CBD?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Resposta *
            </label>
            <textarea
              value={newFAQ.answer}
              onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Este produto contém 1000mg de CBD por frasco..."
            />
          </div>

          <button
            type="button"
            onClick={handleAddFAQ}
            className="btn-primary"
            disabled={!newFAQ.question.trim() || !newFAQ.answer.trim()}
          >
            ➕ Adicionar FAQ
          </button>
        </div>
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-4xl mb-2">❓</p>
          <p>Nenhuma FAQ adicionada ainda</p>
          <p className="text-sm mt-1">
            FAQs ajudam a responder dúvidas comuns e aumentam a conversão!
          </p>
        </div>
      )}
    </div>
  );
}
