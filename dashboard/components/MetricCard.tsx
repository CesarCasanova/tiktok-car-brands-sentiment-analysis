import React from 'react';
import {TrendingUp, TrendingDown, Icon} from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, trend, isLoading }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
    {isLoading ? (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    ) : (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    )}
  </div>
);

export default MetricCard;