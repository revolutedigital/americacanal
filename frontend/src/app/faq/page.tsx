'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

const faqs = [
  {
    category: 'Qualidade e Tecnologia',
    questions: [
      {
        q: 'Como são fabricados os produtos?',
        a: 'Nossos produtos são desenvolvidos em laboratórios de última geração, utilizando tecnologia de ponta e seguindo rigorosos protocolos GMP (Good Manufacturing Practices). Cada etapa do processo é controlada e documentada para garantir máxima qualidade.',
      },
      {
        q: 'Os produtos possuem certificado de análise?',
        a: 'Sim! Todos os produtos possuem COA (Certificate of Analysis) - certificado laboratorial que comprova a pureza, concentração de compostos ativos, ausência de contaminantes microbiológicos e conformidade com nossos padrões de qualidade internacional.',
      },
      {
        q: 'Qual o diferencial dos produtos America Cannabis?',
        a: 'Utilizamos tecnologia laboratorial avançada, equipamentos de última geração, controle total de cada etapa produtiva, testes rigorosos de qualidade, rastreabilidade completa e equipe técnica altamente especializada. Investimos continuamente em P&D para oferecer os melhores produtos do mercado.',
      },
      {
        q: 'Como é feito o controle de qualidade?',
        a: 'Implementamos múltiplas camadas de controle: análise de matéria-prima, monitoramento durante produção, testes laboratoriais completos (microbiológicos, químicos, de pureza), análise final de cada lote e armazenamento controlado. Cada produto passa por no mínimo 5 testes diferentes antes de ser liberado.',
      },
      {
        q: 'Os produtos têm certificações internacionais?',
        a: 'Sim! Trabalhamos com certificações GMP (Good Manufacturing Practices) reconhecidas internacionalmente, garantindo que nossos produtos atendem aos mais altos padrões de qualidade global.',
      },
      {
        q: 'Como sei qual produto escolher?',
        a: 'Nossa equipe técnica especializada está disponível para ajudá-lo a escolher o produto ideal baseado em suas necessidades específicas. Entre em contato via WhatsApp (+595 98 257-4068) para consultoria personalizada com nossos especialistas.',
      },
    ],
  },
  {
    category: 'Produtos e Especificações',
    questions: [
      {
        q: 'Qual a concentração dos compostos ativos?',
        a: 'Cada produto possui especificações técnicas detalhadas disponíveis na página do produto, incluindo concentração precisa de todos os compostos ativos. O COA (certificado de análise) comprova essas informações para cada lote específico.',
      },
      {
        q: 'Os produtos são puros?',
        a: 'Sim! Utilizamos processos de extração e purificação de alto nível tecnológico. Nossos laboratórios garantem pureza superior a 95% nos compostos principais, conforme comprovado pelos certificados de análise.',
      },
      {
        q: 'Como os produtos são armazenados?',
        a: 'Mantemos ambiente controlado com temperatura, umidade e luminosidade ideais para preservar todas as propriedades dos produtos. Utilizamos embalagens especiais que protegem contra oxidação, luz UV e contaminação.',
      },
      {
        q: 'Qual a validade dos produtos?',
        a: 'Quando armazenados corretamente (conforme instruções na embalagem), nossos produtos mantêm suas propriedades por até 24 meses. Cada embalagem indica a data de fabricação e validade específica do lote.',
      },
    ],
  },
  {
    category: 'Pedidos e Entrega',
    questions: [
      {
        q: 'Como faço um pedido?',
        a: 'Você pode fazer seu pedido diretamente pelo site, clicando em "Comprar via WhatsApp" no produto desejado, ou entrando em contato com nossa equipe. Nossos especialistas estarão prontos para auxiliar.',
      },
      {
        q: 'Qual o prazo de entrega?',
        a: 'O prazo varia de acordo com sua região. Em média, entregas para capitais levam de 3 a 7 dias úteis. Produtos saem de nosso centro de distribuição em embalagens especiais para preservar todas as propriedades.',
      },
      {
        q: 'Fazem entrega em todo Brasil?',
        a: 'Sim, realizamos entregas para todo o território nacional através de transportadoras de confiança, sempre com embalagens apropriadas para manter a integridade dos produtos.',
      },
      {
        q: 'Como acompanho meu pedido?',
        a: 'Após a confirmação do pedido, você receberá um código de rastreamento via WhatsApp para acompanhar a entrega em tempo real.',
      },
      {
        q: 'A embalagem é discreta e segura?',
        a: 'Sim! Todos os pedidos são enviados em embalagens discretas, sem identificação externa do conteúdo, e com proteção especial para preservar a qualidade dos produtos durante o transporte.',
      },
    ],
  },
  {
    category: 'Pagamento',
    questions: [
      {
        q: 'Quais formas de pagamento são aceitas?',
        a: 'Aceitamos pagamento via Pix. O pagamento via Pix é instantâneo, seguro e rastreável através do sistema do Banco Central do Brasil.',
      },
      {
        q: 'Como funciona o pagamento via Pix?',
        a: 'Após confirmar seu pedido pelo WhatsApp, você receberá uma chave Pix ou QR Code para realizar o pagamento. Assim que confirmado, seu pedido é processado imediatamente.',
      },
      {
        q: 'O pagamento é seguro?',
        a: 'Sim! O Pix é um método de pagamento oficial do Banco Central do Brasil, totalmente seguro e rastreável. Não armazenamos dados bancários e utilizamos criptografia SSL em todas as transações.',
      },
    ],
  },
  {
    category: 'Segurança e Privacidade',
    questions: [
      {
        q: 'Meus dados estão seguros?',
        a: 'Absolutamente! Não compartilhamos seus dados com terceiros e utilizamos criptografia SSL de nível bancário para proteger todas as transações. Suas informações são usadas exclusivamente para processar e entregar seu pedido.',
      },
      {
        q: 'Como funciona a segurança do site?',
        a: 'Utilizamos certificado SSL de alto nível, servidores seguros, conformidade com LGPD (Lei Geral de Proteção de Dados) e políticas rigorosas de acesso às informações.',
      },
      {
        q: 'Posso confiar na America Cannabis?',
        a: 'Somos uma empresa estabelecida com produtos fabricados em laboratórios certificados internacionalmente (GMP), certificados de análise disponíveis, atendimento transparente e equipe técnica especializada. Confira nossos selos de segurança e avaliações de clientes satisfeitos.',
      },
    ],
  },
  {
    category: 'Suporte Técnico',
    questions: [
      {
        q: 'Posso tirar dúvidas técnicas sobre os produtos?',
        a: 'Sim! Nossa equipe técnica especializada está disponível para responder questões sobre composição, concentrações, métodos de extração, certificações e qualquer aspecto técnico dos produtos.',
      },
      {
        q: 'Vocês fornecem orientações de uso?',
        a: 'Sim! Cada produto vem com guia detalhado de uso baseado em pesquisas e melhores práticas. Nossa equipe também oferece suporte personalizado.',
      },
      {
        q: 'Como entro em contato com o suporte?',
        a: 'Você pode entrar em contato através do WhatsApp (+595 98 257-4068) ou e-mail (contato@americacannabis.com). Horário de atendimento: Segunda a Sexta, 9h às 18h | Sábado, 9h às 13h.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>('Qualidade e Tecnologia');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Encontre respostas sobre nossa tecnologia, qualidade e processos laboratoriais
            </p>

            <div className="space-y-8">
              {faqs.map((section, sectionIdx) => (
                <div key={sectionIdx} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setOpenCategory(openCategory === section.category ? null : section.category)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-left flex items-center justify-between hover:from-primary-dark hover:to-secondary-dark transition-all"
                  >
                    <span className="text-lg">{section.category}</span>
                    <span className="text-2xl">{openCategory === section.category ? '−' : '+'}</span>
                  </button>

                  {openCategory === section.category && (
                    <div className="p-6 space-y-4">
                      {section.questions.map((faq, idx) => {
                        const globalIdx = `${sectionIdx}-${idx}`;
                        return (
                          <div key={idx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                            <button
                              onClick={() => setOpenIndex(openIndex === globalIdx ? null : globalIdx)}
                              className="w-full text-left flex items-start justify-between gap-4 py-2 hover:text-primary transition-colors"
                            >
                              <span className="font-semibold text-gray-900">{faq.q}</span>
                              <span className="text-primary flex-shrink-0">
                                {openIndex === globalIdx ? '▼' : '▶'}
                              </span>
                            </button>
                            {openIndex === globalIdx && (
                              <div className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-primary">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 text-center shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Não encontrou sua resposta?</h2>
              <p className="mb-6">
                Nossa equipe técnica especializada está pronta para ajudar! Entre em contato e tire suas dúvidas sobre nossos produtos e processos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/595982574068"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="mailto:contato@americacannabis.com"
                  className="inline-block bg-primary-dark text-white font-bold px-8 py-3 rounded-full hover:bg-primary transition-colors shadow-md"
                >
                  📧 E-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
