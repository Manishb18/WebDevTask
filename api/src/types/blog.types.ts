export type BlogSection = {
    type: "heading" | "subheading" | "paragraph" | "image";
    content: string;
  };
  
  export type Blog = {
    id?: number;
    title: string;
    sections: BlogSection[];
    author_id: number; // admin who created the blog
    created_at?: Date;
    updated_at?: Date;
  };