import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function getWhatsAppUrl(productName: string, price?: number): string {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';

  if (price) {
    const formattedPrice = formatPrice(price);
    const message = `Olá! Tenho interesse no produto: *${productName}* - ${formattedPrice}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  } else {
    const message = `Olá! Gostaria de saber sobre a disponibilidade do produto: *${productName}*`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
