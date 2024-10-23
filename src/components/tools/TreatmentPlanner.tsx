import React, { useState } from 'react';
import { Pill } from 'lucide-react';

export function TreatmentPlanner() {
  const [needsInsulin, setNeedsInsulin] = useState(null);
  const [formData, setFormData] = useState({
    ketosis: 0,
    osmotic: 0,
    pp2bs: '',
    hba1c: '',
    fbs: '',
    antibody: 0
  });

  const checkInsulinNeed = async () => {
    try {
      const response = await fetch('/api/check_insulin_need', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pp2bs: parseFloat(formData.pp2bs),
          hba1c: parseFloat(formData.hba1c),
          fbs: parseFloat(formData.fbs)
        })
      });
      const data = await response.json();
      setNeedsInsulin(data.needs_insulin);
    } catch (error) {
      console.error('Error checking insulin need:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target.checked ? 1 : 0) : value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Pill className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Insulin Need Assessment</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="ketosis"
                  checked={formData.ketosis === 1}
                  onChange={handleInputChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Ketosis Present</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="osmotic"
                  checked={formData.osmotic === 1}
                  onChange={handleInputChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Osmotic Symptoms</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">PP2BS (mg/dL)</label>
              <input
                type="number"
                name="pp2bs"
                value={formData.pp2bs}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">HbA1c (%)</label>
              <input
                type="number"
                step="0.1"
                name="hba1c"
                value={formData.hba1c}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">FBS (mg/dL)</label>
              <input
                type="number"
                name="fbs"
                value={formData.fbs}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="antibody"
                checked={formData.antibody === 1}
                onChange={handleInputChange}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Antibody Positive</span>
            </label>
          </div>
        </div>

        <button
          onClick={checkInsulinNeed}
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Check Insulin Need
        </button>

        {needsInsulin !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold text-gray-900">
              {needsInsulin 
                ? "Patient requires insulin therapy"
                : "Patient may not require immediate insulin therapy"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}