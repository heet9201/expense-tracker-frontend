'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyTrendProps {
    data: Array<{ day: string; amount: number }>;
}

export default function WeeklyTrend({ data }: WeeklyTrendProps) {
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{payload[0].payload.day}</p>
                    <p className="text-sm text-indigo-600">
                        ₹{payload[0].value.toLocaleString('en-IN')}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="day"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="amount"
                        fill="url(#colorGradient)"
                        radius={[8, 8, 0, 0]}
                    />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
