// frontend/src/pages/index.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';

type AnalyticsData = {
  active_users: number;
  total_users: number;
  returning_users_percentage: number;
  favorite_events: Array<{
    _id: string;
    title: string;
    registrations_count: number;
  }>;
  forms_filled_percentages: Array<{
    event_id: string;
    event_title: string;
    forms_filled_percentage: number;
  }>;
  total_comments: number;
  total_articles: number;
  total_forum_threads: number;
  most_active_users: Array<{
    _id: string;
    comments_count: number;
  }>;
  popular_articles: Array<{
    _id: string;
    title: string;
    comments_count: number;
  }>;
};

const MetricCard = ({
  title,
  value,
  bgColor = 'bg-gray-800',
}: {
  title: string;
  value: number | string;
  bgColor?: string;
}) => {
  return (
    <div
      className={`p-6 rounded-3xl shadow-lg text-white ${bgColor} transform transition-transform duration-300 hover:scale-105`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-4 text-4xl font-bold">{value}</p>
    </div>
  );
};

const ListCard = ({
  title,
  items,
  bgColor = 'bg-gray-700',
}: {
  title: string;
  items: Array<{ name: string; count: number }>;
  bgColor?: string;
}) => {
  return (
    <div
      className={`p-8 rounded-3xl shadow-2xl text-white ${bgColor} transition-shadow duration-300 hover:shadow-3xl`}
    >
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-3 border-b border-gray-600 opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <span className="font-medium">{item.name}</span>
            <span className="text-lg">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/admin'); // Ensure this endpoint is correctly set up
        setAnalytics(res.data);
      } catch (err: any) {
        setError(
          err.response?.data?.error || 'An error occurred while fetching analytics data.'
        );
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        <svg
          className="animate-spin h-16 w-16 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-900 to-red-800">
        <p className="text-red-200 text-xl">{error || 'No data available.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-10">
      <h1 className="text-5xl font-extrabold text-center text-white mb-16">
        Event Dashboards
      </h1>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <MetricCard title="Total Users" value={analytics.total_users} />
        <MetricCard title="Active Users (30d)" value={analytics.active_users} />
        <MetricCard
          title="Returning Users (%)"
          value={`${analytics.returning_users_percentage.toFixed(2)}%`}
          bgColor="bg-yellow-600"
        />
        <MetricCard
          title="Total Comments"
          value={analytics.total_comments}
          bgColor="bg-red-600"
        />
      </div>

      {/* Favorite Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ListCard
          title="Top 5 Favorite Events"
          items={analytics.favorite_events.map((event) => ({
            name: event.title,
            count: event.registrations_count,
          }))}
          bgColor="bg-gray-700"
        />

        {/* Forms Filled Percentage */}
        <div className="p-8 bg-gray-800 rounded-3xl shadow-2xl text-white transition-shadow duration-300 hover:shadow-3xl">
          <h3 className="text-2xl font-semibold mb-6">Forms Filled Percentage</h3>
          <div className="space-y-6">
            {analytics.forms_filled_percentages.map((form, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{form.event_title}</span>
                  <span className="text-lg">{form.forms_filled_percentage.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-indigo-500 h-3 rounded-full"
                    style={{ width: `${form.forms_filled_percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Total Articles */}
        <MetricCard
          title="Total Articles"
          value={analytics.total_articles}
          bgColor="bg-purple-600"
        />

        {/* Total Forum Threads */}
        <MetricCard
          title="Total Forum Threads"
          value={analytics.total_forum_threads}
          bgColor="bg-pink-600"
        />

        {/* Most Active Users */}
        <ListCard
          title="Top 5 Active Users"
          items={analytics.most_active_users.map((user) => ({
            name: `User ID: ${user._id}`,
            count: user.comments_count,
          }))}
          bgColor="bg-gray-700"
        />
      </div>

      {/* Popular Articles */}
      <div className="p-8 bg-gray-800 rounded-3xl shadow-2xl text-white transition-shadow duration-300 hover:shadow-3xl">
        <h3 className="text-2xl font-semibold mb-6">Top 5 Popular Articles</h3>
        <ul>
          {analytics.popular_articles.map((article, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-600 opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <span>{article.title}</span>
              <span className="text-lg font-medium">{article.comments_count} Comments</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
