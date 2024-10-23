import React from 'react';
import { Stethoscope } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="flex justify-center">
          <Stethoscope className="w-20 h-20 text-indigo-600" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Diabetology</h1>
          <p className="text-lg text-gray-600">
            Complete toolkit for doctors practicing diabetes management
          </p>
        </div>
        <div className="space-y-4 pt-8">
          <button className="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-indigo-700 transition-colors">
            Login
          </button>
          <button className="w-full bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg px-6 py-3 font-semibold hover:bg-indigo-50 transition-colors">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}