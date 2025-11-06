import Link from 'next/link';

export default function BlogFooter() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Guia do Iniciante', slug: 'guia-iniciante' },
    { name: 'Saúde & Bem-Estar', slug: 'saude-bem-estar' },
    { name: 'Produtos & Reviews', slug: 'produtos' },
    { name: 'Pesquisa & Ciência', slug: 'pesquisa' },
    { name: 'Legal & Regulamentação', slug: 'legal' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-vibrant rounded-lg flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">America Cannabis</div>
                <div className="text-xs text-gray-600">BLOG & REVISTA</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sua fonte confiável de informação sobre cannabis medicinal, CBD, e os benefícios terapêuticos da planta.
              Educação baseada em ciência e experiência.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/americacannabis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/americacannabis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-all hover:scale-105"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categorias</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/categoria/${cat.slug}`}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Páginas Importantes */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Todos os Artigos
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Loja de Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Receba artigos e novidades direto no seu e-mail.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-vibrant text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform text-sm"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>
              © {currentYear} <strong>America Cannabis Blog</strong>. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/privacidade" className="hover:text-primary transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link href="/contato" className="hover:text-primary transition-colors">
                Contato
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            <strong>Aviso Legal:</strong> Este site contém informações educacionais sobre cannabis. Consulte sempre um profissional de saúde antes de iniciar qualquer tratamento.
          </p>
        </div>
      </div>
    </footer>
  );
}
