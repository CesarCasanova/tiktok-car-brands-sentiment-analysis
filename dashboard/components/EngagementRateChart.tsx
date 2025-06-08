import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';


const EngagementRateChart: React.FC<{ tiktokData }> = ({ tiktokData }) =>  (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-6">Engagement Rate Trend</h3>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={tiktokData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="week"
          stroke="#666"
          fontSize={12}
        />
        <YAxis
          stroke="#666"
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Engagement Rate']}
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Area
          type="monotone"
          dataKey="engagementRate"
          stroke="#8b5cf6"
          fill="#a855f7"
          fillOpacity={0.2}
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default EngagementRateChart;
