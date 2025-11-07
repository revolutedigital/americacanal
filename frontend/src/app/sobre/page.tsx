import Header from '@/components/ClientHeader';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a America Cannabis, especialistas em produtos canábicos premium de alta qualidade.',
};

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre a America Cannabis
            </h1>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quem Somos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>America Cannabis</strong> é uma empresa especializada na importação e comercialização
                  de produtos canábicos premium de alta qualidade. Nossa missão é fornecer acesso a produtos
                  de cannabis medicinal e wellness, sempre priorizando a qualidade, segurança e satisfação dos nossos clientes.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Trabalhamos apenas com fornecedores certificados e produtos que passam por rigorosos controles
                  de qualidade, garantindo a procedência e a excelência de cada item comercializado.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
                <p className="text-gray-700 leading-relaxed">
                  Proporcionar bem-estar e qualidade de vida através de produtos canábicos premium,
                  oferecendo atendimento personalizado, informações transparentes e entrega ágil em todo o Brasil.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Qualidade:</strong> Todos os produtos passam por rigoroso controle de qualidade
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <strong>Segurança:</strong> Produtos certificados e seguros para consumo
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💚</span>
                    <div>
                      <strong>Transparência:</strong> Informações claras sobre procedência e composição
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <strong>Agilidade:</strong> Entrega rápida e eficiente em todo território nacional
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <strong>Compromisso:</strong> Atendimento dedicado e suporte ao cliente
                    </div>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Por Que Escolher a America Cannabis?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2">🏆 Produtos Premium</h3>
                    <p className="text-gray-700">
                      Seleção criteriosa de produtos de alta qualidade de fornecedores certificados internacionalmente.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2">📦 Entrega Segura</h3>
                    <p className="text-gray-700">
                      Embalagens discretas e seguras, com rastreamento completo para todo o Brasil.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2">💬 Atendimento Especializado</h3>
                    <p className="text-gray-700">
                      Equipe treinada para tirar suas dúvidas e ajudar na escolha do produto ideal.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-2">🔐 Compra Segura</h3>
                    <p className="text-gray-700">
                      Site protegido com SSL e múltiplas opções de pagamento seguras.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
                <p className="mb-6">
                  Tem dúvidas ou precisa de ajuda para escolher o produto ideal?
                  Nossa equipe está pronta para atendê-lo!
                </p>
                <a
                  href="https://wa.me/595982574068"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  💬 Fale Conosco no WhatsApp
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
