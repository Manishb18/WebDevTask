'use client';
import { useParams } from 'next/navigation';
import { allBlogs } from '@/app/components/_home/Blogs';  // You'll need to export allBlogs from Blogs.tsx

export default function BlogPage() {
  const params = useParams();
  const blogId = Number(params.id);
  
  const blog = allBlogs.find(blog => blog.id === blogId);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Blog not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div 
        className="w-full h-96 bg-cover bg-center rounded-lg mb-8"
        style={{ backgroundImage: `url(${blog.bannerImage})` }}
      />
      
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      
      {blog.sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.type === 'paragraph' && (
            <p className="text-lg text-gray-700 leading-relaxed">
              {section.content}
            </p>
          )}
        </div>
      ))}
    </article>
  );
}