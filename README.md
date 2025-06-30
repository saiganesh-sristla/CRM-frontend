# CRM Frontend

[Deployed Link](https://crm-frontend-flax-tau.vercel.app/)

A modern React-based CRM frontend application built with TailwindCSS, featuring a clean and responsive user interface for managing companies, contacts, deals, tasks, and invoices.

## ✨ Features

- **Dashboard** with interactive chart widgets and analytics
- **Companies Management** - Complete CRUD operations for company records
- **Contacts Management** - Manage customer and prospect contacts
- **Deals Pipeline** - Kanban-style drag & drop deal management
- **Task Management** - Tasks linked to companies, contacts, or deals
- **Invoice System** - Auto-generated invoices with PDF download capability
- **Responsive Design** - Mobile-friendly interface built with TailwindCSS
- **Modern Navigation** - Smooth routing with React Router

## 🛠 Tech Stack

- **React** - Component-based UI framework
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Beautiful DnD** - Drag and drop functionality
- **Vite** - Fast build tool and development server

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/saiganesh-sristla/CRM-frontend.git
cd CRM-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── pages/           # Main application pages
│   ├── Dashboard/   # Dashboard with widgets
│   ├── Companies/   # Company management
│   ├── Contacts/    # Contact management
│   ├── Deals/       # Deal pipeline
│   ├── Tasks/       # Task management
│   └── Invoices/    # Invoice system
├── services/        # API configuration and services
├── components/      # Reusable UI components
└── App.jsx         # Main application component
```


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request