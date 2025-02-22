# Blog Management System

## Objective
The development of a fully functional blog management website has been successfully completed. This website allows public users to browse blog posts while enabling an admin to dynamically add, edit, and delete blog content.

Frontend hosted on vercel : https://web-dev-task-teal.vercel.app/

Backend hosted on render.com

admin login credentials :

email : admin1@gmail.com

password : admin@123

## Tech Stack
- **Backend:** Node.js, Express, PostgreSQL, Multer
- **Frontend:** Next.js, Tailwind CSS, Aceternity UI, Shadcn UI
- **Authentication:** Firebase (for authentication) or JWT as an alternative
- **Security:** Implemented using CORS and Rate Limiter

## Completed Features

### 1. Frontend
- **User Interface:**
  - ✅ Homepage displaying a list of blog posts, designed similar to Interview Pro
  - ✅ Blog Post Page with multiple sections (headings, paragraphs, images, etc.), styled using Tailwind CSS, Aceternity UI, and Shadcn UI
  - ✅ Responsive Design ensuring compatibility on both desktop and mobile devices

- **Navigation & Features:**
  - ✅ Implemented Search and Filters to allow users to search posts by title or category
  - ✅ Routing enabled using Next.js navigation between pages (homepage, individual posts, etc.)

### 2. Backend
- **Server & Database:**
  - ✅ Created Express API with RESTful endpoints for CRUD operations on blog posts
  - ✅ PostgreSQL database to store all blog data (title, content sections, images, timestamps, etc.)
  - ✅ Integrated Multer for handling image uploads during blog post creation and editing

- **Authentication & Security:**
  - ✅ Secure Admin Authentication using Firebase Auth (or JWT-based authentication as an alternative)
  - ✅ Security Middleware implemented, including CORS for cross-origin requests and a rate limiter to prevent abuse
  - ✅ Proper error handling and validations added to API endpoints

### 3. Admin Panel
- **Dashboard Features:**
  - ✅ Secure Login for admin authentication
  - ✅ CRUD Operations:
    - Add: Create new blog posts with sections for headings, paragraphs, and images
    - Edit: Update existing posts
    - Delete: Remove posts
    - View: List all posts with options to search and filter
  - ✅ File Uploads: Utilized Multer for handling image/file uploads within blog posts

### 4. Additional Considerations
- ✅ **Code Quality:** Followed clean, maintainable, and well-documented coding practices
- ✅ **Version Control:** Used Git for source control with clear commit messages
- ✅ **Deployment:** Successfully deployed the application for demonstration purposes

## Status
✅ The blog management system has been successfully developed and deployed.

