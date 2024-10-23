import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export function KidneyAssessment() {
  const [creatinine, setCreatinine] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [egfrResult, setEgfrResult] = useState(null);

  const calculateEGFR = async () => {
    try {
      const response = await fetch('/api/calculate_egfr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creat: parseFloat(creatinine),
          female: gender === 'female',
          age: parseInt(age)
        })
      });
      const data = await response.json();
      setEgfrResult(data.egfr);
    } catch (error) {
      console.error('Error calculating eGFR:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">eGFR Calculator</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Creatinine (mg/dL)</label>
            <input
              type="number"
              step="0.1"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateEGFR}
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate eGFR
        </button>

        {egfrResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold text-gray-900">eGFR: {egfrResult} mL/min/1.73m²</p>
          </div>
        )}
      </div>
    </div>
  );
}