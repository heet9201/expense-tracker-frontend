'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { BudgetCap } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BudgetCapCardProps {
    budgetCap: BudgetCap;
    categoryName: string;
    categoryIcon: string;
}

export default function BudgetCapCard({
    budgetCap,
    categoryName,
    categoryIcon,
}: BudgetCapCardProps) {
    const { limit, spent, percentage, status } = budgetCap;

    const statusConfig = {
        safe: {
            color: 'from-green-400 to-emerald-500',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            icon: CheckCircle,
            iconColor: 'text-green-500',
            barColor: 'bg-gradient-to-r from-green-400 to-emerald-500',
        },
        warning: {
            color: 'from-yellow-400 to-orange-500',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: AlertCircle,
            iconColor: 'text-yellow-500',
            barColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        },
        exceeded: {
            color: 'from-red-400 to-pink-500',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: AlertTriangle,
            iconColor: 'text-red-500',
            barColor: 'bg-gradient-to-r from-red-400 to-pink-500',
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                'rounded-2xl p-6 border-2 transition-all',
                config.bgColor,
                config.borderColor
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{categoryIcon}</span>
                    <div>
                        <h4 className="font-semibold text-gray-800">{categoryName}</h4>
                        <p className="text-sm text-gray-500">Budget Cap</p>
                    </div>
                </div>
                <Icon className={cn('w-6 h-6', config.iconColor)} />
            </div>

            <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">₹{spent.toLocaleString('en-IN')} spent</span>
                    <span className="font-semibold text-gray-800">₹{limit.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={cn('h-full', config.barColor)}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className={cn('text-sm font-semibold', config.iconColor)}>
                    {percentage.toFixed(0)}% used
                </span>
                {status === 'exceeded' && (
                    <span className="text-xs text-red-600 font-medium">
                        ₹{(spent - limit).toLocaleString('en-IN')} over budget
                    </span>
                )}
            </div>
        </motion.div>
    );
}
