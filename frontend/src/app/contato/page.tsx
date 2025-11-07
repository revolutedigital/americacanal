import Header from '@/components/ClientHeader';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contato',
  description: 'Entre em contato com a America Cannabis. Estamos prontos para atender você!',
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Estamos prontos para atendê-lo! Escolha o canal que preferir.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* WhatsApp */}
              <a
                href="https://wa.me/595982574068"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-8 text-center transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-2xl font-bold mb-2">WhatsApp</h2>
                <p className="mb-4">Atendimento rápido e direto</p>
                <p className="font-mono text-lg">+595 98 257-4068</p>
                <div className="mt-4 bg-white/20 rounded px-4 py-2">
                  Clique para iniciar conversa
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:contato@americacannabis.com"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-8 text-center transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="text-6xl mb-4">📧</div>
                <h2 className="text-2xl font-bold mb-2">E-mail</h2>
                <p className="mb-4">Envie sua mensagem</p>
                <p className="font-mono text-lg">contato@americacannabis.com</p>
                <div className="mt-4 bg-white/20 rounded px-4 py-2">
                  Clique para enviar e-mail
                </div>
              </a>
            </div>

            {/* Informações Adicionais */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Informações de Atendimento
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🕐</div>
                  <h3 className="font-bold mb-2">Horário de Atendimento</h3>
                  <p className="text-gray-700">Segunda a Sexta</p>
                  <p className="text-gray-700">9h às 18h</p>
                  <p className="text-gray-700 mt-2">Sábado</p>
                  <p className="text-gray-700">9h às 13h</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-3">📍</div>
                  <h3 className="font-bold mb-2">Localização</h3>
                  <p className="text-gray-700">São Paulo, SP</p>
                  <p className="text-gray-700 mt-2">Entrega em todo Brasil</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold mb-2">Tempo de Resposta</h3>
                  <p className="text-gray-700">WhatsApp: Imediato</p>
                  <p className="text-gray-700 mt-2">E-mail: até 24h úteis</p>
                </div>
              </div>
            </div>

            {/* Dúvidas Frequentes */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tem Dúvidas?
              </h2>
              <p className="text-gray-700 mb-6">
                Confira nossa página de Perguntas Frequentes para respostas rápidas às dúvidas mais comuns.
              </p>
              <a
                href="/faq"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                Ver Perguntas Frequentes
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
