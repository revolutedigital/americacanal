'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-premium text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-all text-white font-semibold"
              >
                Fale Conosco no WhatsApp
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-accent transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-accent transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-accent transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <a href="mailto:contato@americacannabis.com" className="hover:text-accent">
                  contato@americacannabis.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <a href="https://wa.me/595982574068" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  +595 98 257-4068
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>Seg-Sex: 9h às 18h<br/>Sáb: 9h às 13h</span>
              </li>
              <li className="flex items-start gap-2">
                <span>São Paulo, SP<br/>Entrega em todo Brasil</span>
              </li>
            </ul>
          </div>

          {/* Informações Legais */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informações</h3>
            <ul className="space-y-2 text-white/80 mb-4">
              <li>
                <Link href="/termos-uso" className="hover:text-accent transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>

            {/* Selos de Segurança */}
            <div className="space-y-2">
              <div className="bg-white/10 rounded-lg p-2 text-center text-sm">
                Site Seguro SSL
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center text-sm">
                Produtos Certificados
              </div>
            </div>
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <h4 className="text-center font-bold mb-4">Formas de Pagamento</h4>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="bg-white/10 px-6 py-3 rounded-lg font-semibold">Pix</div>
            <div className="bg-white/10 px-6 py-3 rounded-lg font-semibold">Dinheiro</div>
          </div>
          <p className="text-center text-white/70 text-sm mt-4">
            Pagamento rápido e seguro via Pix
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
