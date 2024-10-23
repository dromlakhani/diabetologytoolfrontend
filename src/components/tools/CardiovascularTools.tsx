import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export function CardiovascularTools() {
  const [age, setAge] = useState('');
  const [ast, setAst] = useState('');
  const [alt, setAlt] = useState('');
  const [platelets, setPlatelets] = useState('');
  const [fib4Result, setFib4Result] = useState(null);
  const [advisory, setAdvisory] = useState('');

  const calculateFIB4 = async () => {
    try {
      const response = await fetch('/api/calculate_fib4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(age),
          ast: parseFloat(ast),
          platelets: parseFloat(platelets),
          alt: parseFloat(alt)
        })
      });
      const data = await response.json();
      setFib4Result(data.fib4);
      setAdvisory(data.advisory);
    } catch (error) {
      console.error('Error calculating FIB-4:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">FIB-4 Calculator</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <label className="block text-sm font-medium text-gray-700">AST (U/L)</label>
            <input
              type="number"
              value={ast}
              onChange={(e) => setAst(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ALT (U/L)</label>
            <input
              type="number"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Platelets (×10⁹/L)</label>
            <input
              type="number"
              value={platelets}
              onChange={(e) => setPlatelets(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={calculateFIB4}
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate FIB-4
        </button>

        {fib4Result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-2">
            <p className="text-lg font-semibold text-gray-900">FIB-4 Score: {fib4Result}</p>
            <p className="text-gray-700">{advisory}</p>
          </div>
        )}
      </div>
    </div>
  );
}