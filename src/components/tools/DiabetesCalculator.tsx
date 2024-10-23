import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export function DiabetesCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = async () => {
    try {
      const response = await fetch('/api/calculate_bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight: parseFloat(weight), height: parseFloat(height) })
      });
      const data = await response.json();
      setBmiResult(data.bmi);
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">BMI Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate BMI
        </button>

        {bmiResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold text-gray-900">BMI: {bmiResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}