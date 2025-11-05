#!/usr/bin/env python3
"""
Script para gerar assets de SEO (OG image e favicons) baseados no logo do site.
Gera:
- og-image.jpg (1200x630) - Open Graph image
- favicon.ico (multi-size)
- icon-16x16.png
- icon-32x32.png
- icon-192x192.png
- icon-512x512.png
- apple-icon.png (180x180)
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Configurações
PUBLIC_DIR = "public"
BRAND_GRADIENT_START = (191, 255, 0)  # #BFFF00 Verde-limão
BRAND_GRADIENT_MID = (159, 216, 0)    # #9FD800
BRAND_GRADIENT_END = (124, 184, 0)    # #7CB800
PINK = (255, 105, 180)                # #FF69B4
CYAN = (0, 206, 209)                  # #00CED1

def ensure_public_dir():
    """Garante que o diretório public existe"""
    if not os.path.exists(PUBLIC_DIR):
        os.makedirs(PUBLIC_DIR)

def hex_to_rgb(hex_color):
    """Converte cor hexadecimal para RGB"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def interpolate_color(color1, color2, ratio):
    """Interpola entre duas cores RGB"""
    return tuple(int(color1[i] + (color2[i] - color1[i]) * ratio) for i in range(3))

def create_logo_image(width, height):
    """Cria uma imagem do logo simplificado"""
    # Criar imagem com fundo transparente
    img = Image.new('RGBA', (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)

    # Calcular tamanhos proporcionais
    scale = min(width / 600, height / 200)

    # Desenhar retângulo de fundo com gradiente verde
    for y in range(height):
        ratio = y / height
        if ratio < 0.5:
            color = interpolate_color(BRAND_GRADIENT_START, BRAND_GRADIENT_MID, ratio * 2)
        else:
            color = interpolate_color(BRAND_GRADIENT_MID, BRAND_GRADIENT_END, (ratio - 0.5) * 2)
        draw.line([(0, y), (width, y)], fill=color + (255,))

    # Tentar carregar uma fonte
    try:
        # Tentar fontes comuns do sistema
        font_paths = [
            '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
            '/System/Library/Fonts/Helvetica.ttc',
            '/Library/Fonts/Arial.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            'C:\\Windows\\Fonts\\arialbd.ttf',
        ]

        font_size = int(64 * scale)
        font = None

        for font_path in font_paths:
            if os.path.exists(font_path):
                try:
                    font = ImageFont.truetype(font_path, font_size)
                    break
                except:
                    continue

        if font is None:
            font = ImageFont.load_default()

    except:
        font = ImageFont.load_default()

    # Desenhar texto "America Cannabis" centralizado
    text1 = "America"
    text2 = "Cannabis"

    # Posições do texto
    text1_pos = (int(width * 0.35), int(height * 0.25))
    text2_pos = (int(width * 0.35), int(height * 0.55))

    # Desenhar com sombra
    shadow_offset = max(2, int(3 * scale))

    # Sombra
    draw.text((text1_pos[0] + shadow_offset, text1_pos[1] + shadow_offset),
              text1, fill=(0, 0, 0, 50), font=font)
    draw.text((text2_pos[0] + shadow_offset, text2_pos[1] + shadow_offset),
              text2, fill=(0, 0, 0, 50), font=font)

    # Texto principal
    draw.text(text1_pos, text1, fill=(255, 255, 255, 255), font=font)
    draw.text(text2_pos, text2, fill=(255, 255, 255, 255), font=font)

    # Desenhar alguns elementos decorativos (círculos que representam o urso/molécula)
    circle_size = int(30 * scale)
    circle_pos = (int(width * 0.15), int(height * 0.4))

    # Círculo principal (urso simplificado)
    draw.ellipse([circle_pos[0], circle_pos[1],
                  circle_pos[0] + circle_size, circle_pos[1] + circle_size],
                 fill=(255, 255, 255, 200))

    return img

def create_og_image():
    """Cria a Open Graph image (1200x630)"""
    print("Gerando OG image (1200x630)...")

    # Criar imagem com gradiente verde
    og_img = Image.new('RGB', (1200, 630), color='#ffffff')
    draw = ImageDraw.Draw(og_img)

    # Gradiente vertical suave
    for y in range(630):
        ratio = y / 630
        if ratio < 0.5:
            color = interpolate_color((255, 255, 255), BRAND_GRADIENT_START, ratio * 2)
        else:
            color = interpolate_color(BRAND_GRADIENT_START, BRAND_GRADIENT_MID, (ratio - 0.5) * 2)
        draw.line([(0, y), (1200, y)], fill=color)

    # Adicionar logo
    logo = create_logo_image(900, 300)
    logo_x = (1200 - 900) // 2
    logo_y = (630 - 300) // 2

    # Converter logo para RGB se necessário e colar
    if logo.mode == 'RGBA':
        og_img.paste(logo, (logo_x, logo_y), logo)
    else:
        og_img.paste(logo, (logo_x, logo_y))

    # Salvar como JPEG de alta qualidade
    og_img.save(
        os.path.join(PUBLIC_DIR, "og-image.jpg"),
        "JPEG",
        quality=95,
        optimize=True
    )
    print("✓ og-image.jpg criado com sucesso!")

def create_favicon_from_logo(size):
    """Cria um favicon simples com as cores da marca"""
    # Criar imagem quadrada
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)

    # Gradiente circular
    center = size // 2
    max_radius = size // 2

    for r in range(max_radius):
        ratio = r / max_radius
        color = interpolate_color(BRAND_GRADIENT_START, BRAND_GRADIENT_END, ratio)
        draw.ellipse([center - r, center - r, center + r, center + r],
                    fill=color, outline=color)

    # Adicionar detalhe central (letra 'A')
    if size >= 32:
        # Desenhar 'A' simplificado
        margin = size // 4
        draw.line([(margin, size - margin), (center, margin)], fill='white', width=max(2, size // 16))
        draw.line([(center, margin), (size - margin, size - margin)], fill='white', width=max(2, size // 16))
        draw.line([(margin + size // 8, center + margin // 2),
                  (size - margin - size // 8, center + margin // 2)],
                 fill='white', width=max(2, size // 16))

    return img

def create_favicon_ico():
    """Cria favicon.ico multi-size (16x16, 32x32, 48x48)"""
    print("Gerando favicon.ico...")

    sizes = [16, 32, 48]
    images = [create_favicon_from_logo(size) for size in sizes]

    # Salvar como ICO multi-size
    images[0].save(
        os.path.join(PUBLIC_DIR, "favicon.ico"),
        format='ICO',
        sizes=[(s, s) for s in sizes],
        append_images=images[1:]
    )
    print("✓ favicon.ico criado com sucesso!")

def create_png_icons():
    """Cria ícones PNG em vários tamanhos"""
    sizes = {
        'icon-16x16.png': 16,
        'icon-32x32.png': 32,
        'icon-192x192.png': 192,
        'icon-512x512.png': 512,
        'apple-icon.png': 180,
    }

    for filename, size in sizes.items():
        print(f"Gerando {filename}...")

        img = create_favicon_from_logo(size)

        # Salvar PNG
        img.save(
            os.path.join(PUBLIC_DIR, filename),
            'PNG',
            optimize=True
        )
        print(f"✓ {filename} criado com sucesso!")

def main():
    """Função principal"""
    print("=" * 60)
    print("Gerando assets de SEO para America Cannabis")
    print("=" * 60)
    print()

    ensure_public_dir()

    try:
        # Gerar OG image
        create_og_image()
        print()

        # Gerar favicon.ico
        create_favicon_ico()
        print()

        # Gerar PNGs
        create_png_icons()
        print()

        print("=" * 60)
        print("✅ Todos os assets foram gerados com sucesso!")
        print("=" * 60)
        print()
        print("Arquivos gerados:")
        print("  • og-image.jpg (1200x630)")
        print("  • favicon.ico (multi-size)")
        print("  • icon-16x16.png")
        print("  • icon-32x32.png")
        print("  • icon-192x192.png")
        print("  • icon-512x512.png")
        print("  • apple-icon.png (180x180)")

    except Exception as e:
        print(f"❌ Erro ao gerar assets: {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0

if __name__ == "__main__":
    exit(main())
