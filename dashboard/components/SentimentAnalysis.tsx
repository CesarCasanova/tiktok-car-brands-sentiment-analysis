import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const SentimentAnalysis = ({ data, isLoading }) => {
  const sentimentData = useMemo(() => {
    if (!data.length) return [];

    const sentimentCounts = data.reduce((acc, video) => {
      const sentiment = video.sentimentLabel || 'neutral';
      acc[sentiment] = (acc[sentiment] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(sentimentCounts).map(([sentiment, count]) => ({
      sentiment: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
      count,
      percentage: ((count / data.length) * 100).toFixed(1)
    }));
  }, [data]);

  const COLORS = {
    'Positive': '#10b981',
    'Negative': '#ef4444',
    'Neutral': '#6b7280'
  };

  const EMOJIS = {
    'Positive': '😊',
    'Negative': '😢',
    'Neutral': '😐'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{EMOJIS[data.payload.sentiment]}</span>
            <span className="font-medium">{data.payload.sentiment}</span>
          </div>
          <p className="text-sm text-gray-600">
            Count: {data.payload.count} ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-2xl">{EMOJIS[entry.payload.sentiment]}</span>
            <div className="text-sm">
              <div className="font-medium text-gray-700">{entry.payload.sentiment}</div>
              <div className="text-gray-500">{entry.payload.count} ({entry.payload.percentage}%)</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, sentiment }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="24"
      >
        {EMOJIS[sentiment]}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Sentiment Analysis</h3>

      {isLoading ? (
        <LoadingSpinner />
      ) : sentimentData.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No data available
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.sentiment]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;