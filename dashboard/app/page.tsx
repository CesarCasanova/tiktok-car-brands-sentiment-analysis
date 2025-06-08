"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Eye, Heart, Target, TrendingUp } from 'lucide-react';
import MetricCard from "@/components/MetricCard";
import EngagementOverviewChart from "@/components/EngagementOverviewChart";
import ModelDropdown from "@/components/ModelDropdown";
import {
  ErrorMessage
} from "next/dist/client/components/react-dev-overlay/ui/components/errors/error-message/error-message";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import TopVideosChart from "@/components/TopVideosChart";
import EngagementBreakdown from "@/components/EngagementBreakdown";


export default function AutomotiveDashboard() {
    const [selectedModel, setSelectedModel] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:8000/data');
        const apiData = await response.json();

        // Transform API data to match our component structure
        const transformedData = apiData.map(item => ({
          id: item.item_id,
          hashtag: item.Hashtag,
          tiktokLink: item["TikTok Link"],
          startWeek: item["Start Week Day"],
          endWeek: item["End Week Day"],
          views: item["Video views"],
          engagementRate: item["Engagement rate"],
          likes: item["Like count"],
          comments: item["Comment count"],
          shares: parseInt(item["Share count"]),
          brand: item.brand,
          audioPath: item.audio_path,
          transcription: item.transcription,
          polarity: parseFloat(item.polarity),
          subjectivity: parseFloat(item.subjectivity),
          sentimentLabel: item.sentiment_label
        }));

        setData(transformedData);

        // Set default selected model to first available brand
        if (transformedData.length > 0 && !selectedModel) {
          const firstBrand = transformedData[0].brand;
          setSelectedModel(firstBrand);
        }

      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    // Get available models/brands
    const availableModels = useMemo(() => {
      return [...new Set(data.map(item => item.brand))];
    }, [data]);

    // Filter data based on selected model
    const filteredData = useMemo(() => {
      return data.filter(item => item.brand === selectedModel);
    }, [data, selectedModel]);

    // Calculate metrics
    const totalViews = filteredData.reduce((sum, item) => sum + item.views, 0);
    const avgEngagementRate = filteredData.length > 0
      ? (filteredData.reduce((sum, item) => sum + item.engagementRate, 0) / filteredData.length * 100).toFixed(1)
      : '0.0';
    const totalLikes = filteredData.reduce((sum, item) => sum + item.likes, 0);
    const totalVideos = filteredData.length;

    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            <ErrorMessage message={error} onRetry={fetchData} />
          </div>
        </div>
      );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Automotive TikTok Analytics</h1>
                  <p className="text-gray-600 mt-2">Social Media Performance & Engagement Insights</p>
                </div>
                <ModelDropdown
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  availableModels={availableModels}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Videos"
                value={totalVideos.toLocaleString()}
                change="+8.2%"
                icon={Target}
                trend="up"
                isLoading={isLoading}
              />
              <MetricCard
                title="Total Views"
                value={`${(totalViews / 1000000).toFixed(1)}M`}
                change="+12.3%"
                icon={Eye}
                trend="up"
                isLoading={isLoading}
              />
              <MetricCard
                title="Avg Engagement Rate"
                value={`${avgEngagementRate}%`}
                change="+0.8%"
                icon={TrendingUp}
                trend="up"
                isLoading={isLoading}
              />
              <MetricCard
                title="Total Likes"
                value={`${(totalLikes / 1000000).toFixed(1)}M`}
                change="+15.2%"
                icon={Heart}
                trend="up"
                isLoading={isLoading}
              />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <SentimentAnalysis data={filteredData} isLoading={isLoading} />
                <EngagementOverviewChart data={filteredData} isLoading={isLoading}/>
            </div>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopVideosChart data={filteredData} isLoading={isLoading} />
                <EngagementBreakdown data={filteredData} isLoading={isLoading} />

            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-gray-500 text-sm">
                <p>© 2025 Automotive Analytics Hub - Professional B2B Intelligence Platform</p>
            </div>
        </div>
    );

}