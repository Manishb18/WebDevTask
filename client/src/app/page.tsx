import React from 'react';
import Blogs from './components/_home/Blogs';

export default function Home() {
  return (
    <div className='flex flex-col gap-12 px-4 py-8 md:px-8 lg:px-12'>
      <div className='flex flex-col gap-4 md:gap-6'>
        <h1 className='text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 leading-tight'>
          Blogger Pro – Where Ideas Take Flight!
        </h1>
        <p className='text-gray-600 dark:text-gray-400 text-xs  md:text-lg max-w-6xl'>
          Dive into a world of knowledge with Blogger Pro! Explore expert insights, in-depth guides, and the latest trends in DSA, JavaScript, React, Next.js, and more. Whether you're a beginner or a pro, there's always something new to discover. Start reading, stay inspired!
        </p>
      </div>
      <Blogs />
    </div>
  );
}