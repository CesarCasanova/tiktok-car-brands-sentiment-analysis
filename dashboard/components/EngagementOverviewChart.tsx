import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';
import {LoadingSpinner} from "@/components/LoadingSpinner";

const EngagementOverviewChart: React.FC<{ data, isLoading }> = ({ data, isLoading }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-gray-900">TikTok Engagement Overview</h3>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Target className="w-4 h-4" />
        <span>Weekly Performance</span>
      </div>
    </div>
  {isLoading ? (
      <LoadingSpinner />
    ) : (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="week"
          stroke="#666"
          fontSize={12}
        />
        <YAxis
          stroke="#666"
          fontSize={12}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#ef4444"
          strokeWidth={3}
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="likes"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>

      )}
  </div>
);

export default EngagementOverviewChart;