'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary via-primary-dark to-primary-vibrant text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="mb-4 inline-block">
              <Image
                src="/brand.webp"
                alt="America Cannabis"
                width={180}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-white/90 leading-relaxed mb-4">
              Especialistas em produtos canábicos premium de alta qualidade.
            </p>
            {/* Contato Direto */}
            <div className="space-y-2">
              <a
                href="https://wa.me/595982574068"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 btn-gradient-accent hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Fale Conosco no WhatsApp
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-light">Links Rápidos</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Produtos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-info hover:translate-x-1 inline-block transition-all duration-200">
                  → Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-info hover:translate-x-1 inline-block transition-all duration-200">
                  → Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog & Educação */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-light">📚 Conteúdo</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/blog?categoria=guia-iniciante" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Guia do Iniciante
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=saude-bem-estar" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Saúde & Bem-Estar
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=legislacao" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Legislação
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=ciencia" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Ciência & Pesquisa
                </Link>
              </li>
              <li>
                <Link href="/blog?categoria=produtos" className="hover:text-accent-light hover:translate-x-1 inline-block transition-all duration-200">
                  → Reviews de Produtos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-info">Contato</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-info">📧</span>
                <a href="mailto:contato@americacannabis.com" className="hover:text-info hover:underline transition-all">
                  contato@americacannabis.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-light">📱</span>
                <a href="https://wa.me/595982574068" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light hover:underline transition-all">
                  +595 98 257-4068
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-urgent">🕐</span>
                <span>Seg-Sex: 9h às 18h<br/>Sáb: 9h às 13h</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-vibrant">📍</span>
                <span>São Paulo, SP<br/>Entrega em todo Brasil</span>
              </li>
            </ul>
          </div>

          {/* Informações Legais */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-vibrant">Informações</h3>
            <ul className="space-y-2 text-white/80 mb-4">
              <li>
                <Link href="/termos-uso" className="hover:text-info hover:translate-x-1 inline-block transition-all duration-200">
                  → Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-info hover:translate-x-1 inline-block transition-all duration-200">
                  → Perguntas Frequentes
                </Link>
              </li>
            </ul>

            {/* Selos de Segurança */}
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-lg p-3 text-center text-sm font-semibold">
                🔒 Site Seguro SSL
              </div>
              <div className="bg-gradient-to-r from-gold-400/20 to-gold-500/10 border border-gold-400/30 rounded-lg p-3 text-center text-sm font-semibold">
                ✓ Produtos Certificados
              </div>
            </div>
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <h4 className="text-center font-bold mb-4 text-accent-light text-xl">Forma de Pagamento</h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="bg-gradient-to-r from-accent to-accent-dark px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform duration-200">
              💳 Pix
            </div>
          </div>
          <p className="text-center text-white/90 text-sm mt-4 font-semibold">
            ⚡ Pagamento rápido, seguro e instantâneo via Pix
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/70">
          <p>&copy; {currentYear} America Cannabis. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Produtos de laboratório com tecnologia de ponta
          </p>
        </div>
      </div>
    </footer>
  );
}
