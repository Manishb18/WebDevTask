export type BlogSection = {
    type: "heading" | "subheading" | "paragraph" | "image";
    content: string;
  };
  
  export type Blog = {
    id?: number;
    title: string;  
    description: string;
    bannerImage: string;
    sections: BlogSection[];
    category_id: number;
    author_id: number; // admin who created the blog
    created_at?: Date;
    updated_at?: Date;
  };