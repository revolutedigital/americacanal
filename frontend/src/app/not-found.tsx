import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-8xl mb-6">🔍</div>

        <h1 className="text-6xl font-bold text-primary mb-3">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Desculpe, a página que você está procurando não existe ou foi movida.
          Que tal explorar nossos produtos?
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Voltar para a Página Inicial
          </Link>

          <Link
            href="/produtos"
            className="block w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Ver Todos os Produtos
          </Link>

          <a
            href="https://wa.me/595982574068?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20para%20encontrar%20algo"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:outline-none"
          >
            Falar com Atendimento
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Páginas mais visitadas:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/" className="text-sm text-primary hover:underline">
              Início
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/produtos" className="text-sm text-primary hover:underline">
              Produtos
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/sobre" className="text-sm text-primary hover:underline">
              Sobre Nós
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/contato" className="text-sm text-primary hover:underline">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
