import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  id: number;
  title: string;
  icon: React.ReactNode;
  tools: string[];
}

const CategoryCard = ({ title, icon, tools }: CategoryCardProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3 text-white">
            {icon}
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <div className="mt-2">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;