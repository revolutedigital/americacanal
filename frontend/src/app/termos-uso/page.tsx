import Header from '@/components/ClientHeader';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso da America Cannabis - Produtos de laboratório com tecnologia de ponta.',
};

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Termos de Uso
            </h1>
            <p className="text-gray-600 mb-8">
              Última atualização: Janeiro de 2025
            </p>

            <div className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔬</span> 1. Sobre Nossos Produtos
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  A <strong>America Cannabis</strong> é especializada na comercialização de produtos canábicos premium desenvolvidos em ambiente laboratorial controlado, utilizando tecnologia de ponta e processos científicos avançados.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Todos os nossos produtos são fabricados seguindo rigorosos protocolos de qualidade, com controle total sobre cada etapa do processo produtivo, desde a seleção das matérias-primas até o produto final.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚗️</span> 2. Tecnologia e Qualidade
                </h2>
                <p className="text-gray-700 mb-3">
                  Nossos laboratórios utilizam equipamentos de última geração e metodologias científicas comprovadas para garantir:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Pureza e consistência dos compostos ativos</li>
                  <li>Controle preciso de concentrações e dosagens</li>
                  <li>Análises laboratoriais completas em cada lote (COA - Certificate of Analysis)</li>
                  <li>Rastreabilidade total do processo produtivo</li>
                  <li>Certificações de qualidade internacional (GMP - Good Manufacturing Practices)</li>
                  <li>Testes microbiológicos e de segurança</li>
                </ul>
                <p className="text-gray-700">
                  Investimos continuamente em pesquisa e desenvolvimento para oferecer produtos com os mais altos padrões de qualidade do mercado internacional.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🛡️</span> 3. Compromisso com a Segurança e Qualidade
                </h2>
                <p className="text-gray-700 mb-3">
                  A segurança e satisfação dos nossos clientes é prioridade absoluta. Implementamos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Protocolos rigorosos de boas práticas de fabricação (GMP)</li>
                  <li>Múltiplos testes de controle de qualidade em cada lote</li>
                  <li>Análises de segurança microbiológica e química</li>
                  <li>Embalagens seguras com informações técnicas detalhadas</li>
                  <li>Armazenamento adequado para preservação das propriedades</li>
                  <li>Equipe técnica especializada</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso do Site</h2>
                <p className="text-gray-700 mb-3">Ao usar o site, você concorda em:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Utilizar o site apenas para fins permitidos</li>
                  <li>Não violar direitos de propriedade intelectual</li>
                  <li>Não tentar acessar áreas restritas do site</li>
                  <li>Não realizar atividades que prejudiquem o funcionamento do site</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Produtos e Serviços</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Nossos produtos passam por rigoroso controle de qualidade laboratorial e são fabricados com tecnologia de ponta.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Reservamo-nos o direito de modificar preços sem aviso prévio</li>
                  <li>Produtos sujeitos à disponibilidade em estoque</li>
                  <li>Imagens são meramente ilustrativas</li>
                  <li>Descrições podem conter pequenas variações</li>
                  <li>Cada lote é testado e certificado (COA disponível)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pedidos e Pagamentos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ao realizar um pedido, você garante que:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>Tem capacidade legal para efetuar a compra</li>
                  <li>As informações fornecidas são corretas</li>
                  <li>O meio de pagamento é válido e possui fundos suficientes</li>
                  <li>Aceita receber comunicações sobre o pedido</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Reservamo-nos o direito de cancelar pedidos em caso de fraude, dados incorretos ou
                  indisponibilidade de produtos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Entrega</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Nossos produtos são embalados com cuidado especial em ambiente controlado para preservar todas as suas propriedades durante o transporte. Utilizamos embalagens discretas e seguras.
                </p>
                <p className="text-gray-700">
                  Prazos de entrega são estimados e podem variar. Trabalhamos apenas com transportadoras de confiança. Não nos responsabilizamos por atrasos causados por transportadoras, greves, condições climáticas ou casos fortuitos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Política de Vendas</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nossas vendas são finalizadas via WhatsApp. Após a confirmação do pedido e pagamento via Pix:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>O produto será enviado assim que o pagamento for confirmado</li>
                  <li>Em caso de problemas com o produto, entre em contato imediatamente</li>
                  <li>Avaliamos cada situação individualmente para garantir sua satisfação</li>
                  <li>Entre em contato através dos nossos canais oficiais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎓</span> 8. Informação e Educação
                </h2>
                <p className="text-gray-700 mb-3">
                  A America Cannabis está comprometida com a educação e informação de qualidade. Disponibilizamos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Informações técnicas detalhadas sobre nossos produtos</li>
                  <li>Certificados de análise (COA) de cada lote</li>
                  <li>Guias de uso e recomendações baseadas em pesquisas</li>
                  <li>Suporte especializado com equipe técnica</li>
                  <li>Conteúdo educativo sobre tecnologia e inovação</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Propriedade Intelectual</h2>
                <p className="text-gray-700 leading-relaxed">
                  Todo o conteúdo do site (textos, imagens, logos, design, processos) é protegido por direitos autorais
                  e pertence à America Cannabis ou seus licenciadores. É proibida a reprodução sem autorização prévia.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitação de Responsabilidade</h2>
                <p className="text-gray-700 leading-relaxed">
                  A America Cannabis não se responsabiliza por:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>Uso inadequado dos produtos ou em desacordo com as orientações</li>
                  <li>Reações individuais ou sensibilidades específicas</li>
                  <li>Problemas causados por informações incorretas fornecidas pelo cliente</li>
                  <li>Danos causados por armazenamento inadequado após a entrega</li>
                  <li>Produtos adquiridos através de canais não autorizados</li>
                  <li>Indisponibilidade temporária do site</li>
                  <li>Danos indiretos ou consequenciais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Privacidade e Dados</h2>
                <p className="text-gray-700 leading-relaxed">
                  Respeitamos sua privacidade e não compartilhamos seus dados com terceiros.
                  Todas as informações coletadas são utilizadas exclusivamente para processar seu pedido
                  e entrar em contato sobre a entrega. Utilizamos criptografia SSL para proteger todas as transações.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Alterações nos Termos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento para refletir melhorias em nossos processos, tecnologias e serviços. As alterações entrarão em vigor imediatamente após a publicação no site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Lei Aplicável</h2>
                <p className="text-gray-700 leading-relaxed">
                  Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa
                  será submetida ao foro da comarca de São Paulo, SP.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📞</span> 14. Contato
                </h2>
                <p className="text-gray-700">
                  Para dúvidas sobre estes termos ou sobre nossos processos e tecnologias, nossa equipe especializada está à disposição:
                </p>
                <div className="bg-purple-50 rounded-lg p-6 mt-4">
                  <p className="text-gray-700"><strong>E-mail:</strong> contato@americacannabis.com</p>
                  <p className="text-gray-700"><strong>WhatsApp:</strong> +595 98 257-4068</p>
                  <p className="text-gray-700"><strong>Horário:</strong> Segunda a Sexta, 9h às 18h | Sábado, 9h às 13h</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
