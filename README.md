# 📇 Contact API - MERN Stack Application

A full-stack contact management application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring JWT authentication and CRUD operations for managing contacts.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 👤 **User Management** - Register and authenticate users with encrypted passwords
- 📋 **Contact Management** - Full CRUD operations (Create, Read, Update, Delete)
- 🔒 **Protected Routes** - Authenticated access to sensitive operations
- 🎨 **Modern UI** - Clean and responsive React frontend
- 🚀 **Production Ready** - Single deployable service with built-in static file serving

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Modern CSS** - Styling

## 📁 Project Structure

```
Contact-api/
├── backend/
│   ├── Controllers/
│   │   ├── user.js          # User authentication logic
│   │   └── contact.js       # Contact CRUD operations
│   ├── Models/
│   │   ├── User.js          # User schema
│   │   └── Contact.js       # Contact schema
│   ├── Routes/
│   │   ├── user.js          # User routes
│   │   └── contact.js       # Contact routes
│   ├── Middlewares/
│   │   └── Auth.js          # JWT authentication middleware
│   ├── .env.example         # Environment variables template
│   ├── server.js            # Express server setup
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── package.json             # Root package with scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saurbhz-Xerox29/Contact-api.git
   cd Contact-api
   ```

2. **Install dependencies for both client and backend**
   ```bash
   npm install
   ```
   This will automatically install dependencies in both `backend/` and `client/` directories.

3. **Configure environment variables**

   Create a `.env` file in the `backend/` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/NodeJs_Mastery_Course
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/NodeJs_Mastery_Course?retryWrites=true&w=majority
   
   JWT=your_secret_jwt_key_here
   JWT_EXPIRES_IN=1d
   CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   ```

   **⚠️ IMPORTANT**: Never commit your `.env` file to GitHub! It's already in `.gitignore`.

4. **Start the development servers**

   From the root directory:
   ```bash
   npm run dev
   ```
   This starts both the backend (port 5000) and frontend (port 5173) concurrently.

   Or start them separately:
   ```bash
   # Backend only
   npm run start

   # Frontend only (from client directory)
   cd client
   npm run dev:client
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/user/register` | Register a new user | No |
| POST | `/api/user/login` | Login user and get JWT token | No |

### Contacts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/contact/` | Get all contacts | No |
| GET | `/api/contact/:id` | Get contact by ID | No |
| GET | `/api/contact/userid/:id` | Get user-specific contacts | No |
| POST | `/api/contact/new` | Create new contact | Yes |
| PUT | `/api/contact/:id` | Update contact by ID | Yes |
| DELETE | `/api/contact/:id` | Delete contact by ID | Yes |

### Request Examples

**Register User:**
```json
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login:**
```json
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Create Contact (Protected):**
```json
POST /api/contact/new
Content-Type: application/json
Auth: <your-jwt-token>

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "type": "personal"
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require the JWT token in the `Auth` header:

```
Auth: <your-jwt-token>
```

The frontend automatically handles this using localStorage.

## 🏗️ Building for Production

1. **Build the frontend**
   ```bash
   npm run build
   ```
   This creates an optimized production build in `client/dist/`.

2. **Set environment variable**
   ```bash
   export NODE_ENV=production  # Linux/Mac
   set NODE_ENV=production     # Windows
   ```

3. **Start the production server**
   ```bash
   npm start
   ```
   The backend will serve both API routes and the static frontend from a single server.

## 🧪 Available Scripts

From the **root directory**:

- `npm install` - Install all dependencies (backend + client)
- `npm run dev` - Start frontend dev server (also starts backend)
- `npm run build` - Build frontend for production
- `npm start` - Start backend server

From the **backend directory**:

- `npm start` - Start backend server
- `npm run dev` - Start backend in development mode

From the **client directory**:

- `npm run dev` - Start both backend and frontend
- `npm run dev:client` - Start only frontend
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌍 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/db_name` |
| `DB_NAME` | MongoDB database name (optional) | `NodeJs_Mastery_Course` |
| `JWT` | Secret key for JWT signing | `your_secret_key_here` |
| `JWT_EXPIRES_IN` | JWT expiration time | `1d` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:5173` |

### Frontend (`client/.env`) - Optional

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000` |

## 🔐 Security Notes

- ✅ Passwords are hashed using bcryptjs before storage
- ✅ JWT tokens are used for stateless authentication
- ✅ Protected routes use authentication middleware
- ✅ `.env` files are excluded from version control
- ⚠️ Make sure to use strong JWT secrets in production
- ⚠️ Always use HTTPS in production environments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Saurabh Kumar**
- GitHub: [@Saurbhz-Xerox29](https://github.com/Saurbhz-Xerox29)

## 🐛 Known Issues

- None currently reported

## 📮 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Made with ❤️ using MERN Stack**
