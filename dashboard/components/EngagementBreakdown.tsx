import React, { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {LoadingSpinner} from "@/components/LoadingSpinner";

const EngagementBreakdown = ({ data, isLoading }) => {
  const aggregatedData = useMemo(() => {
    if (!data.length) return [];

    // Group by week and aggregate
    const weekGroups = {};
    data.forEach(video => {
      const startWeek = new Date(video.startWeek).toISOString().slice(0, 10);
      if (!weekGroups[startWeek]) {
        weekGroups[startWeek] = {
          week: startWeek,
          totalLikes: 0,
          totalComments: 0,
          totalShares: 0,
          videoCount: 0
        };
      }
      weekGroups[startWeek].totalLikes += video.likes;
      weekGroups[startWeek].totalComments += video.comments;
      weekGroups[startWeek].totalShares += video.shares;
      weekGroups[startWeek].videoCount += 1;
    });

    return Object.values(weekGroups)
      .sort((a, b) => new Date(a.week) - new Date(b.week))
      .slice(0, 8); // Show last 8 weeks
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Engagement Breakdown by Week</h3>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="week"
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value, name) => {
                const formattedValue = value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value;
                return [formattedValue, name];
              }}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Legend />
            <Bar dataKey="totalLikes" fill="#ef4444" name="Likes" radius={[2, 2, 0, 0]} />
            <Bar dataKey="totalComments" fill="#3b82f6" name="Comments" radius={[2, 2, 0, 0]} />
            <Bar dataKey="totalShares" fill="#10b981" name="Shares" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EngagementBreakdown;