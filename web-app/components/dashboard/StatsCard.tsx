'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    ArrowUpRight,
    Wallet,
} from 'lucide-react';

interface StatsCardProps {
    title: string;
    amount: number;
    change?: number;
    period: string;
    color?: string;
}

export default function StatsCard({
    title,
    amount,
    change,
    period,
    color = 'from-indigo-500 to-purple-600',
}: StatsCardProps) {
    const isPositive = change && change > 0;

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">
                        ₹{amount.toLocaleString('en-IN')}
                    </h3>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md`}>
                    <Wallet className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">{period}</span>
                </div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
                        {isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : (
                            <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-semibold">{Math.abs(change)}%</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
