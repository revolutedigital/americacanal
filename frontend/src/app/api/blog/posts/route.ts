import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'src/data/blog-posts.json');

// GET - List all posts
export async function GET() {
  try {
    const fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
    const posts = JSON.parse(fileContent);

    // Sort by date (newest first)
    posts.sort((a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  try {
    const newPost = await request.json();

    // Read existing posts
    const fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
    const posts = JSON.parse(fileContent);

    // Check if slug already exists
    const existingPost = posts.find((p: any) => p.slug === newPost.slug);
    if (existingPost) {
      return NextResponse.json(
        { error: 'Um post com este slug já existe' },
        { status: 400 }
      );
    }

    // Add new post
    posts.push(newPost);

    // Save to file
    fs.writeFileSync(
      BLOG_POSTS_FILE,
      JSON.stringify(posts, null, 2),
      'utf-8'
    );

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    );
  }
}