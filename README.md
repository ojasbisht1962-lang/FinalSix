# CareerCompass - Complete Career Guidance Platform

Welcome to **CareerCompass**, a comprehensive career guidance platform that helps students make informed decisions about their educational and career paths.

## 🌟 Project Overview

CareerCompass combines a React-based frontend with a FastAPI backend to provide:
- **Interactive Career Assessment Quiz** - Personalized career suggestions based on student responses
- **Educational Institution Explorer** - Detailed information about schools and colleges
- **Career Pathways Guide** - Comprehensive career information with expandable cards
- **Smart Recommendations** - AI-powered suggestions for education and career choices

## 📁 Repository Structure

```
Final-One/
├── frontend/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── routes/          # Page components (Schools, Colleges, Careers, etc.)
│   │   ├── data/            # Educational data and career information
│   │   ├── services/        # API integration services
│   │   └── utils/           # Helper functions and constants
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
└── backend/                  # FastAPI Backend Application
    ├── routes/              # API route handlers
    ├── models/              # Database models
    ├── services/            # Business logic services
    ├── seed/                # Database seeding scripts
    └── requirements.txt     # Backend dependencies
```

## 🚀 Features

### Frontend Features
- **Modern UI/UX** with Tailwind CSS styling
- **Expandable Information Cards** with smooth animations
- **Interactive Quiz System** for career assessment
- **Search and Filter Functionality** for institutions and careers
- **Responsive Design** for mobile and desktop
- **Real-time Data Integration** with backend APIs

### Backend Features
- **RESTful API** built with FastAPI
- **Quiz Processing Engine** for career recommendations
- **Educational Data Management** for schools, colleges, and careers
- **User Management System** with authentication
- **Comprehensive Suggestion Algorithm** based on user responses

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.11+** - Programming language
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server
- **Virtual Environment** - Dependency isolation

## 🔧 Setup and Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.11 or higher)
- **Git** for version control

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
# Activate virtual environment (Windows)
Blogv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

### Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📊 Key Components

### Educational Data Structure
- **Schools**: 14+ institutions with establishment dates, boards, and official websites
- **Colleges**: 13+ higher education institutions with degree programs and affiliations
- **Careers**: 10+ career paths with salary ranges, progression paths, and skill requirements

### Quiz System
- Multi-question assessment covering interests, aptitudes, and preferences
- Intelligent scoring algorithm for career matching
- Personalized recommendations with detailed explanations

### Expandable Cards
- Smooth animation effects using CSS keyframes
- Comprehensive information display on expansion
- Interactive elements with hover effects and responsive design

## 🌐 Live Deployment

This project is hosted on GitHub and can be accessed at:
**Repository**: https://github.com/ojasbisht1962-lang/Final-One.git

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please reach out through the GitHub repository issues section.

---

**CareerCompass** - Guiding your journey to the perfect career! 🎯