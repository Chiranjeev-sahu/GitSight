# GitSight 🔍

> AI-powered GitHub repository summarizer that transforms complex codebases into comprehensive, easy-to-understand summaries.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.x-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-yellow.svg)](https://python.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-purple.svg)](https://ai.google.dev/)

## 🌟 Overview

GitSight is an intelligent web application that analyzes GitHub repositories and generates comprehensive summaries using AI. Instead of manually browsing through countless files and documentation, GitSight provides instant insights into any public GitHub repository's structure, purpose, and functionality.

## ✨ Features

- **🤖 AI-Powered Analysis**: Leverages Google Gemini AI for intelligent code understanding
- **📊 Repository Insights**: Comprehensive analysis of project structure and dependencies
- **⚡ Real-time Processing**: Direct GitHub API integration for up-to-date information
- **🎯 Developer-Friendly**: Clean, organized summaries tailored for developers
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices
- **🔍 Deep Code Analysis**: Understands context, not just file listings

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library with hooks
- **CSS** - Responsive styling
- **JavaScript** - Modern JavaScript features

### Backend
- **FastAPI** - High-performance Python web framework
- **Python** - Core backend language
- **Uvicorn** - ASGI server for FastAPI

### APIs & Services
- **Google Gemini API** - AI-powered code analysis
- **GitHub REST API** - Repository data retrieval
- **CORS Middleware** - Cross-origin resource sharing


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chiranjeev-sahu/GitSight.git
   cd GitSight
   ```

2. **Backend Setup**
   ```bash
     
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file in backend directory
   touch .env
   ```
   
   Add the following variables to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GITHUB_TOKEN=your_github_token_here  # Optional
   ```

4. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd ../gitsight-frontend
   
   # Install dependencies
   npm install
   ```

5. **Run the Application**
   
   **Start Backend Server:**
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```
   
   **Start Frontend Development Server:**
   ```bash
   cd gitsight-frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📖 Usage

1. **Enter Repository URL**: Paste any public GitHub repository URL
2. **Click Analyze**: Start the AI-powered analysis process
3. **View Results**: Get comprehensive insights including:
   - Project overview and purpose
   - Technology stack identification
   - Key features and functionality
   - File structure analysis
   - Installation and setup instructions
   - Dependencies and requirements

### Example
```
Input: https://github.com/facebook/react
Output: Detailed summary of React library including file architecture, tech-stack and roadmap
```

## 🏗️ Project Structure

```
gitsight/
gitsight/
├── 📄 .gitignore
├── 📄 main.py
├── 📄 requirements.txt
├── 📄 test_gemini.py
└── 📁 gitsight-frontend/
    ├── 📄 .gitignore
    ├── 📄 README.md
    ├── 📄 eslint.config.js
    ├── 📄 index.html
    ├── 📄 package-lock.json
    ├── 📄 package.json
    ├── 📄 vite.config.js
    └── 📁 src/
        ├── 📄 App.css
        ├── 📄 App.jsx
        ├── 📄 index.css
        ├── 📄 main.jsx
        ├── 📁 assets/
        │   ├── 📄 GitSight_landing_background.jpg
        │   ├── 📄 favicon.png
        │   ├── 📄 github.png
        │   ├── 📄 logo.png
        │   └── 📄 twitter.png
        ├── 📁 components/
        │   ├── 📁 ChartComponent/
        │   │   ├── 📄 ChartComponent.css
        │   │   └── 📄 ChartComponent.jsx
        │   └── 📁 FileCategoryBox/
        │       ├── 📄 FileCategoryBox.css
        │       └── 📄 FileCategoryBox.jsx
        └── 📁 features/
            ├── 📁 landing/
            │   ├── 📄 LandingPage.css
            │   ├── 📄 LandingPage.jsx
            │   └── 📁 components/
            │       ├── 📄 Header.css
            │       ├── 📄 Header.jsx
            │       ├── 📄 InputForm.css
            │       └── 📄 InputForm.jsx
            ├── 📁 loading/
            │   ├── 📄 LoadingOverlay.css
            │   └── 📄 LoadingOverlay.jsx
            └── 📁 results/
                ├── 📄 ResultsDisplay.css
                ├── 📄 ResultsDisplay.jsx
                └── 📁 components/
                    ├── 📄 DescriptionSection.css
                    ├── 📄 DescriptionSection.jsx
                    ├── 📄 FileStructureDisplay.css
                    ├── 📄 FileStructureDisplay.jsx
                    ├── 📄 LanguageChartSection.css
                    ├── 📄 LanguageChartSection.jsx
                    ├── 📄 LanguagesDisplay.css
                    ├── 📄 LanguagesDisplay.jsx
                    ├── 📄 RoadmapSection.css
                    ├── 📄 RoadmapSection.jsx
                    ├── 📄 TechStackDisplay.css
                    └── 📄 TechStackDisplay.jsx
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI analysis | Yes |
| `GITHUB_TOKEN` | GitHub personal access token | No |
| `PORT` | Backend server port (default: 8000) | No |

### API Rate Limits
- **GitHub API**: 60 requests/hour (unauthenticated), 5000/hour (authenticated)
- **Gemini API**: Varies by plan and usage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


### Common Issues

1. **API Key Errors**
   - Ensure your Gemini API key is valid and properly set in `.env`
   - Check API quotas and billing settings

2. **CORS Issues**
   - Verify backend is running on correct port
   - Check CORS middleware configuration

3. **GitHub API Rate Limits**
   - Add GitHub token for higher rate limits
   - Implement caching for frequently accessed repositories




