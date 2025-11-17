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
  ListIcon,
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
        { href: '/admin/blog', label: 'Blog', Icon: ListIcon },
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
    <aside className="w-64 bg-gray-900 shadow-2xl h-screen sticky top-0 flex flex-col border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-600">
          <img
            src="/brand.webp"
            alt="America Cannabis Logo"
            className="h-10 w-auto object-contain mx-auto"
          />
        </div>
        {user && (
          <div className="flex items-center gap-2 text-xs text-gray-300 font-medium truncate">
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
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4">
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
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white font-semibold shadow-md'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <ItemIcon size={20} className="flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
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
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <GlobeIcon size={18} />
          <span>Ver Site</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <LogoutIcon size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
