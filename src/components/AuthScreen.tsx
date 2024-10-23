import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Stethoscope } from 'lucide-react';

export function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Stethoscope className="w-16 h-16 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Diabetology</h2>
          <p className="mt-2 text-sm text-gray-600">
            Complete toolkit for doctors practicing diabetes management
          </p>
        </div>

        {isLogin ? (
          <LoginForm onToggleForm={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}