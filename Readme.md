# BlogNest 📝

A modern, full-stack blog platform built with the MERN stack, designed for developers, writers, and content creators to share their thoughts and knowledge with the world.

## 🚀 Features

### 🔐 Authentication & Authorization
- **Secure Registration & Login** - Email and password authentication
- **JWT Token-based Authentication** - Secure and stateless authentication
- **Protected Routes** - Restrict access to authenticated users only
- **Global Auth State Management** - React Context for seamless auth handling

### ✍️ Blog Management
- **Create Blogs** - Rich text editor with title, content, tags, and image uploads
- **Edit Blogs** - Full editing capabilities for your published content
- **Delete Blogs** - Remove blogs with confirmation
- **Image Uploads** - Upload and display featured images for blogs
- **Blog Sorting** - Blogs displayed in descending order of creation

### 👤 User Profiles
- **Dynamic Avatars** - Auto-generated using Dicebear API with regeneration option
- **Editable Bio** - Personalize your profile with a custom bio
- **Blog Statistics** - Track total number of blogs written
- **Profile Updates** - Real-time profile updates via secure API calls

### 🎨 User Experience
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Theme Support** - 32 Themes available
- **Live Preview** - Preview blogs before publishing
- **Interactive Notifications** - Toast notifications for user feedback
- **Loading States** - Smooth loading indicators throughout the app

## 🛠️ Technology Stack

### Frontend
- **React.js** (Vite) - Fast, modern UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS + DaisyUI** - Utility-first styling with beautiful components
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload middleware
- **dotenv** - Environment variable management

## 📂 Project Structure

```
BlogNest/
├── backend/
|    ├── src/
|    │   ├── config/          
|    │   ├── controllers/      
|    │   ├── middleware/        
|    │   ├── models/        
|    │   ├── routes/        
|    │   └── server.js        
|    └──package.json       
│
└── frontend/
    ├── src/
    │   ├── pages/           
    │   ├── components/     
    │   ├── context/        
    │   ├── constants/       
    │   ├── services/       
    │   ├── store/       
    │   └── App.jsx        
    ├── public/             
    └── package.json        
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blognest.git
   cd blognest
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5050
   CLOUDINARY_CLOUD_NAME=cloud_name
   CLOUDINARY_API_KEY=api_key
   CLOUDINARY_API_SECRET=api_secret
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Set up the frontend**
   
   Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

6. **Start the frontend development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/user/profile` - Get user profile
- `PUT /api/auth/update/profile` - Update user profile

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get specific blog
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/comments` - Add Comment
- `DELETE /api/blogs/:blogId/comments/:commentId` - Delete Comment
- `POST /api/blogs/:id/like` - Like a Blog


## 🧪 Testing

The application includes comprehensive manual testing for:
- User registration and login flows
- Blog CRUD operations
- Profile management
- Image upload functionality
- Error handling and validation


## 📦 Sample Data

The application includes sample blogs covering:
- "Mastering React Router"
- "10 Tips to Boost Your JavaScript Productivity"
- "Understanding MongoDB Aggregation"
- "How I Deployed My MERN App on Render"

## 🐛 Known Issues & Solutions

- **Multipart Form Data**: Handled using Multer for image uploads
- **Auth State Sync**: Resolved using React Context for global state management
- **Profile Updates**: Implemented real-time updates with immediate UI reflection

## 🚧 Future Enhancements

- [ ] Markdown editor with live preview
- [ ] Blog likes, comments, and view counts
- [ ] Admin dashboard for content moderation
- [ ] Pagination and tag-based filtering
- [ ] SEO optimization
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Search functionality
- [ ] Blog categories

## 🚀 Deployment

### Recommended Deployment Options
- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas

### Deployment Steps
1. Build the frontend: `npm run build`
2. Deploy backend to your chosen platform
3. Deploy frontend build to static hosting
4. Update environment variables in production

## 👤 Author

**Raman**
- GitHub: [@Raman1645](https://github.com/Raman1645)
- Email: ramann00016@gmail.com


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

If you found this project helpful, please give it a star! ⭐

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact me directly.

---

**Happy Blogging with BlogNest! 🎉**
