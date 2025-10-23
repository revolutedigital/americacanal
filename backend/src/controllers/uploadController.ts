import { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Criar diretório de uploads se não existir
const uploadsDir = path.join(__dirname, '../../uploads');
const imagesDir = path.join(uploadsDir, 'images');
const productsDir = path.join(imagesDir, 'products');
const categoriesDir = path.join(imagesDir, 'categories');
const logosDir = path.join(imagesDir, 'logos');
const bannersDir = path.join(imagesDir, 'banners');

[uploadsDir, imagesDir, productsDir, categoriesDir, logosDir, bannersDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configuração do Multer para upload temporário
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Aceitar apenas imagens
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo
  },
});

// Upload de imagem de produto
export const uploadProductImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhuma imagem fornecida' });
      return;
    }

    const filename = `${uuidv4()}.jpg`;
    const filepath = path.join(productsDir, filename);

    // Processar imagem com Sharp
    // Criar versão otimizada: max 1200px de largura, qualidade 85
    await sharp(req.file.buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85 })
      .toFile(filepath);

    // URL pública da imagem
    const imageUrl = `/uploads/images/products/${filename}`;

    res.status(200).json({
      success: true,
      imageUrl,
      filename,
      message: 'Imagem enviada com sucesso',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
};

// Upload de múltiplas imagens de produto
export const uploadProductImages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({ error: 'Nenhuma imagem fornecida' });
      return;
    }

    const uploadedImages: string[] = [];

    for (const file of req.files) {
      const filename = `${uuidv4()}.jpg`;
      const filepath = path.join(productsDir, filename);

      await sharp(file.buffer)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 })
        .toFile(filepath);

      uploadedImages.push(`/uploads/images/products/${filename}`);
    }

    res.status(200).json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
      message: `${uploadedImages.length} imagens enviadas com sucesso`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erro ao fazer upload das imagens' });
  }
};

// Upload de imagem de categoria
export const uploadCategoryImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhuma imagem fornecida' });
      return;
    }

    const filename = `${uuidv4()}.jpg`;
    const filepath = path.join(categoriesDir, filename);

    // Processar imagem: max 800px, qualidade 85
    await sharp(req.file.buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85 })
      .toFile(filepath);

    const imageUrl = `/uploads/images/categories/${filename}`;

    res.status(200).json({
      success: true,
      imageUrl,
      filename,
      message: 'Imagem enviada com sucesso',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
};

// Upload de logo
export const uploadLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhuma imagem fornecida' });
      return;
    }

    const filename = `${uuidv4()}.png`;
    const filepath = path.join(logosDir, filename);

    // Processar logo: max 500px, manter transparência
    await sharp(req.file.buffer)
      .resize(500, 500, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .png({ quality: 90 })
      .toFile(filepath);

    const imageUrl = `/uploads/images/logos/${filename}`;

    res.status(200).json({
      success: true,
      imageUrl,
      filename,
      message: 'Logo enviado com sucesso',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erro ao fazer upload do logo' });
  }
};

// Upload de imagem de banner
export const uploadBannerImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhuma imagem fornecida' });
      return;
    }

    const filename = `${uuidv4()}.jpg`;
    const filepath = path.join(bannersDir, filename);

    // Processar imagem com Sharp (banners podem ser maiores)
    await sharp(req.file.buffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 90 })
      .toFile(filepath);

    const imageUrl = `http://localhost:4000/uploads/images/banners/${filename}`;

    res.status(200).json({
      success: true,
      url: imageUrl,
      filename,
      message: 'Banner enviado com sucesso',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erro ao fazer upload do banner' });
  }
};

// Deletar imagem
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      res.status(400).json({ error: 'URL da imagem não fornecida' });
      return;
    }

    // Extrair caminho do arquivo da URL
    const imagePath = imageUrl.replace('/uploads/', '');
    const filepath = path.join(uploadsDir, imagePath);

    // Verificar se arquivo existe
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.status(200).json({
        success: true,
        message: 'Imagem deletada com sucesso',
      });
    } else {
      res.status(404).json({ error: 'Imagem não encontrada' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Erro ao deletar imagem' });
  }
};
