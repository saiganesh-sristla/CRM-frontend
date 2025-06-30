import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Invoices from './pages/Invoices';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-bold text-blue-600">CRM</Link>
                <div className="hidden md:flex space-x-4">
                  <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                  <Link to="/companies" className="text-gray-700 hover:text-blue-600">Companies</Link>
                  <Link to="/contacts" className="text-gray-700 hover:text-blue-600">Contacts</Link>
                  <Link to="/deals" className="text-gray-700 hover:text-blue-600">Deals</Link>
                  <Link to="/invoices" className="text-gray-700 hover:text-blue-600">Invoices</Link>
                  <Link to="/tasks" className="text-gray-700 hover:text-blue-600">Tasks</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;