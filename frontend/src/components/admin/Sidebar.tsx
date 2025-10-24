'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import {
  DashboardIcon,
  MoneyIcon,
  PackageIcon,
  PlusIcon,
  FolderIcon,
  TagIcon,
  StarIcon,
  MessageIcon,
  GiftIcon,
  ImageIcon,
  SettingsIcon,
  GlobeIcon,
  LogoutIcon,
  UserIcon,
} from '@/components/admin/icons/AdminIcons';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const navSections = [
    {
      title: null, // Sem título (Dashboard fica sozinho)
      items: [
        { href: '/admin/dashboard', label: 'Dashboard', Icon: DashboardIcon },
      ],
    },
    {
      title: 'Vendas',
      items: [
        { href: '/admin/vendas', label: 'Registrar Venda', Icon: MoneyIcon },
      ],
    },
    {
      title: 'Catálogo',
      items: [
        { href: '/admin/produtos', label: 'Todos os Produtos', Icon: PackageIcon },
        { href: '/admin/produtos/novo', label: 'Novo Produto', Icon: PlusIcon },
        { href: '/admin/categorias', label: 'Categorias', Icon: FolderIcon },
        { href: '/admin/marcas', label: 'Marcas', Icon: TagIcon },
      ],
    },
    {
      title: 'Conteúdo',
      items: [
        { href: '/admin/reviews', label: 'Avaliações', Icon: StarIcon },
        { href: '/admin/depoimentos', label: 'Depoimentos', Icon: MessageIcon },
        { href: '/admin/beneficios', label: 'Benefícios Globais', Icon: GiftIcon },
        { href: '/admin/banners', label: 'Banners', Icon: ImageIcon },
      ],
    },
    {
      title: 'Configurações',
      items: [
        { href: '/admin/configuracoes', label: 'Configurações', Icon: SettingsIcon },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-primary via-primary-dark to-primary-vibrant shadow-2xl h-screen sticky top-0 flex flex-col border-r-2 border-accent/30">
      {/* Header */}
      <div className="p-4 border-b-2 border-accent/20">
        <div className="bg-gradient-to-br from-accent/30 to-primary-vibrant/30 rounded-xl p-3 mb-3 border-2 border-accent/40 shadow-lg">
          <div className="bg-white rounded-lg px-3 py-2 flex items-center justify-center">
            <img
              src="/brand.webp"
              alt="America Cannabis Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>
        {user && (
          <div className="flex items-center gap-2 text-xs text-accent-light font-semibold truncate">
            <UserIcon size={14} className="flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {navSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h3 className="text-xs font-bold text-accent-light uppercase tracking-wider mb-2 px-4">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  const ItemIcon = item.Icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-accent to-accent-dark text-white font-bold shadow-lg scale-105'
                            : 'text-white/80 hover:bg-white/10 hover:text-white hover:scale-105'
                        }`}
                      >
                        <ItemIcon size={20} className="flex-shrink-0" />
                        <span className="text-sm font-semibold">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-accent/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-info to-info-dark hover:scale-105 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <GlobeIcon size={18} />
          <span>Ver Site</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <LogoutIcon size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
