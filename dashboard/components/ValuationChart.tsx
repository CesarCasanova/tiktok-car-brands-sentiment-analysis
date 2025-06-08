import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {  Calendar } from 'lucide-react';
import {valuationData} from "@/data/mock";


const ValuationChart = () => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-gray-900">Vehicle Valuation Trend</h3>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>2006-2025</span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={valuationData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="year"
          stroke="#666"
          fontSize={12}
        />
        <YAxis
          stroke="#666"
          fontSize={12}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, 'Valuation']}
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#2563eb"
          fill="#3b82f6"
          fillOpacity={0.1}
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default ValuationChart;