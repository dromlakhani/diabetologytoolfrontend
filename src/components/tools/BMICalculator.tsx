import React, { useState } from 'react';
import { Scale } from 'lucide-react';

interface BMIResponse {
  bmi: number;
}

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isAsian, setIsAsian] = useState(false);
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBMICategory = (bmi: number, isAsian: boolean) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (isAsian) {
      if (bmi < 23) return { category: 'Normal weight', color: 'text-green-600' };
      if (bmi < 25) return { category: 'Overweight', color: 'text-yellow-600' };
      if (bmi < 30) return { category: 'Obesity Class I', color: 'text-orange-600' };
      if (bmi < 35) return { category: 'Obesity Class II', color: 'text-red-600' };
      return { category: 'Obesity Class III', color: 'text-red-800' };
    } else {
      if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
      if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
      if (bmi < 35) return { category: 'Obesity Class I', color: 'text-orange-600' };
      if (bmi < 40) return { category: 'Obesity Class II', color: 'text-red-600' };
      return { category: 'Obesity Class III', color: 'text-red-800' };
    }
  };

  const calculateBMI = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://diabetologybackendversion-2-dromlakhani.replit.app/calculate_bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weight: parseFloat(weight),
          height: parseFloat(height)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to calculate BMI');
      }

      const data: BMIResponse = await response.json();
      setBmiResult(data.bmi);
    } catch (err) {
      setError('Failed to calculate BMI. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height) {
      setError('Please fill in all fields');
      return;
    }
    calculateBMI();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Scale className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">BMI Calculator</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="asian"
              type="checkbox"
              checked={isAsian}
              onChange={(e) => setIsAsian(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="asian" className="ml-2 block text-sm text-gray-700">
              Use Asian BMI classification
            </label>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Calculating...' : 'Calculate BMI'}
          </button>
        </form>

        {bmiResult !== null && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Your BMI:</span>
              <span className="text-lg font-semibold text-gray-900">
                {bmiResult.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Category:</span>
              <span className={`font-semibold ${getBMICategory(bmiResult, isAsian).color}`}>
                {getBMICategory(bmiResult, isAsian).category}
              </span>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>BMI Categories {isAsian ? '(Asian Classification)' : '(WHO Classification)'}:</p>
              <ul className="mt-2 space-y-1">
                <li>• Underweight: &lt; 18.5</li>
                <li>• Normal weight: {isAsian ? '18.5 - 22.9' : '18.5 - 24.9'}</li>
                <li>• Overweight: {isAsian ? '23 - 24.9' : '25 - 29.9'}</li>
                <li>• Obesity Class I: {isAsian ? '25 - 29.9' : '30 - 34.9'}</li>
                <li>• Obesity Class II: {isAsian ? '30 - 34.9' : '35 - 39.9'}</li>
                <li>• Obesity Class III: {isAsian ? '≥ 35' : '≥ 40'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}