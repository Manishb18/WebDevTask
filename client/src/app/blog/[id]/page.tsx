'use client';
import { useParams } from 'next/navigation';
import { useBlogContext } from '@/app/BlogContext';
import { baseUrl } from '@/lib/utils';

export default function BlogPage() {
  const params = useParams();
  const blogId = Number(params.id);
  const { allBlogs } = useBlogContext();

  const blog = allBlogs?.find(blog => blog.id === blogId);

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
        style={{ backgroundImage: `url(${baseUrl}${blog.bannerimage})` }}
      />
      
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      
      {blog.sections.map((section, index) => (
        <div key={index} className="mb-6">
          {section.type === 'paragraph' && (
            <p className="text-lg text-gray-700 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.type === 'heading' && (
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {section.content}
            </h2>
          )}
          {section.type === 'subheading' && (
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {section.content}
            </h3>
          )}
          {section.type === 'image' && (
            <img
              src={`${baseUrl}${section.content}`}
              alt=""
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>
      ))}
    </article>
  );
}