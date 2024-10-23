import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Search } from 'lucide-react';
import { BMICalculator } from './tools/BMICalculator';
import { categories } from '../data/categories';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getToolComponent = (toolId: string) => {
    switch (toolId) {
      case 'bmi-calculator':
        return <BMICalculator />;
      default:
        return <div>Tool not implemented yet</div>;
    }
  };

  const handleToolClick = (tool: string) => {
    setSelectedTool(tool.toLowerCase().replace(/\s+/g, '-'));
  };

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">Diabetology</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Dr. {user?.name}</span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!selectedTool ? (
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Medical Tools</h2>
                  <p className="mt-1 text-gray-600">Select a tool to begin your analysis</p>
                </div>
                <div className="relative w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <category.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      {category.tools.map((tool, index) => (
                        <button
                          key={index}
                          onClick={() => handleToolClick(tool)}
                          className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mr-2 mb-2 hover:bg-indigo-100 transition-colors duration-200"
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 sm:px-0">
            <button
              onClick={() => setSelectedTool(null)}
              className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-700"
            >
              ← Back to tools
            </button>
            {getToolComponent(selectedTool)}
          </div>
        )}
      </main>
    </div>
  );
}