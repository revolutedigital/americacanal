import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'src/data/blog-posts.json');

// GET - Get single post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
    const posts = JSON.parse(fileContent);

    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error reading blog post:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar post' },
      { status: 500 }
    );
  }
}

// PUT - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const updatedData = await request.json();

    // Read existing posts
    const fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
    const posts = JSON.parse(fileContent);

    // Find post index
    const postIndex = posts.findIndex((p: any) => p.slug === params.slug);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    // Update post keeping the original slug
    posts[postIndex] = {
      ...posts[postIndex],
      ...updatedData,
      slug: params.slug, // Preserve original slug
      updatedAt: new Date().toISOString(),
    };

    // Save to file
    fs.writeFileSync(
      BLOG_POSTS_FILE,
      JSON.stringify(posts, null, 2),
      'utf-8'
    );

    return NextResponse.json(posts[postIndex]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Read existing posts
    const fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
    const posts = JSON.parse(fileContent);

    // Find post
    const postIndex = posts.findIndex((p: any) => p.slug === params.slug);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    // Remove post
    const deletedPost = posts[postIndex];
    posts.splice(postIndex, 1);

    // Save to file
    fs.writeFileSync(
      BLOG_POSTS_FILE,
      JSON.stringify(posts, null, 2),
      'utf-8'
    );

    return NextResponse.json(deletedPost);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar post' },
      { status: 500 }
    );
  }
}