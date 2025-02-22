"use client";
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

export const allBlogs = [
    {
      id: 1,
      title: 'Introduction to Data Structures and Algorithms',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn the basics of DSA and why it is important.' },
      ],
      author_id: 1,
    },
    {
      id: 2,
      title: 'Mastering JavaScript ES6+ Features',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Explore the new features in JavaScript ES6+.' },
      ],
      author_id: 2,
    },
    {
      id: 3,
      title: 'ReactJS Best Practices for 2024',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Discover the best practices for ReactJS development.' },
      ],
      author_id: 1,
    },
    {
      id: 4,
      title: 'Node.js Scalable Architecture',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn how to build scalable Node.js applications.' },
      ],
      author_id: 2,
    },
    {
      id: 5,
      title: 'Python for Data Science',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'An introduction to using Python for data science tasks.' },
      ],
      author_id: 1,
    },
    {
      id: 6,
      title: 'GraphQL vs REST API',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'A comparison between GraphQL and REST APIs.' },
      ],
      author_id: 2,
    },
    {
      id: 7,
      title: 'Understanding Docker Containers',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn the basics of Docker containers and how to use them.' },
      ],
      author_id: 1,
    },
    {
      id: 8,
      title: 'Kubernetes for Beginners',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'An introductory guide to Kubernetes.' },
      ],
      author_id: 2,
    },
    {
      id: 9,
      title: 'CI/CD Pipelines Explained',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn about CI/CD pipelines and how they can improve your development workflow.' },
      ],
      author_id: 1,
    },
    {
      id: 10,
      title: 'Getting Started with AWS',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'A beginner\'s guide to Amazon Web Services (AWS).' },
      ],
      author_id: 2,
    },
    {
      id: 11,
      title: 'Introduction to Machine Learning',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn the basics of machine learning and its applications.' },
      ],
      author_id: 1,
    },
    {
      id: 12,
      title: 'Deep Learning with TensorFlow',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'A practical guide to deep learning using TensorFlow.' },
      ],
      author_id: 2,
    },
      {
      id: 13,
      title: 'Introduction to Data Structures and Algorithms',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn the basics of DSA and why it is important.' },
      ],
      author_id: 1,
    },
    {
      id: 14,
      title: 'Mastering JavaScript ES6+ Features',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Explore the new features in JavaScript ES6+.' },
      ],
      author_id: 2,
    },
    {
      id: 15,
      title: 'ReactJS Best Practices for 2024',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Discover the best practices for ReactJS development.' },
      ],
      author_id: 1,
    },
    {
      id: 16,
      title: 'Node.js Scalable Architecture',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn how to build scalable Node.js applications.' },
      ],
      author_id: 2,
    },
    {
      id: 17,
      title: 'Python for Data Science',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'An introduction to using Python for data science tasks.' },
      ],
      author_id: 1,
    },
    {
      id: 18,
      title: 'GraphQL vs REST API',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'A comparison between GraphQL and REST APIs.' },
      ],
      author_id: 2,
    },
    {
      id: 19,
      title: 'Understanding Docker Containers',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn the basics of Docker containers and how to use them.' },
      ],
      author_id: 1,
    },
    {
      id: 20,
      title: 'Kubernetes for Beginners',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'An introductory guide to Kubernetes.' },
      ],
      author_id: 2,
    },
    {
      id: 21,
      title: 'CI/CD Pipelines Explained',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn about CI/CD pipelines and how they can improve your development workflow.' },
      ],
      author_id: 1,
    },
    {
      id: 22,
      title: 'Getting Started with AWS',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'A beginner\'s guide to Amazon Web Services (AWS).' },
      ],
      author_id: 2,
    },
    {
      id: 23,
      title: 'Introduction to Machine Learning',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'Learn the basics of machine learning and its applications.' },
      ],
      author_id: 1,
    },
    {
      id: 24,
      title: 'Deep Learning with TensorFlow',
      bannerImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      sections: [
        { type: 'paragraph', content: 'A practical guide to deep learning using TensorFlow.' },
      ],
      author_id: 2,
    },
];

export default function BlogList() {
  const [visibleBlogs, setVisibleBlogs] = useState(allBlogs.slice(0, 6));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreBlogs = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    setTimeout(() => { // Simulating API delay
      const currentLength = visibleBlogs.length;
      const moreBlogs = allBlogs.slice(currentLength, currentLength + 6);
      
      if (moreBlogs.length === 0) {
        setHasMore(false);
      } else {
        setVisibleBlogs((prev) => [...prev, ...moreBlogs]);
      }
      setLoading(false);
    }, 1000); // Reduced timeout for better UX
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      loadMoreBlogs();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleBlogs, loading, hasMore]); // Added dependencies

  return (
    <div className="min-h-screen">
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center py-4 text-gray-600">
          No more blogs to load
        </div>
      )}
    </div>
  );
}
