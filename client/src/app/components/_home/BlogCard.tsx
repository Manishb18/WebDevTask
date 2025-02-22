import React from 'react';
import Link from 'next/link';
import { baseUrl } from '@/lib/utils';

type BlogCardProps = {
  blog: {
    id: number;
    title: string;
    description: string;
    bannerimage: string;
    sections: { type: string; content: string }[];
    author_id: number;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  console.log("blog :: ", blog)
  const description = blog.description.substring(0, 100) + '...';

  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${baseUrl}${blog.bannerimage})` }}
        ></div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}