'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Camera, FileText, ArrowRight } from 'lucide-react';
import { Expense } from '@/lib/types';
import { DEFAULT_CATEGORIES } from '@/lib/constants';

interface RecentExpensesProps {
    expenses: Expense[];
    onViewAll: () => void;
}

export default function RecentExpenses({ expenses, onViewAll }: RecentExpensesProps) {
    const getSourceIcon = (source: Expense['source']) => {
        switch (source) {
            case 'sms':
                return <MessageSquare className="w-4 h-4" />;
            case 'ocr':
                return <Camera className="w-4 h-4" />;
            case 'manual':
                return <FileText className="w-4 h-4" />;
            case 'voice':
                return <span className="text-xs">🎤</span>;
        }
    };

    const getCategoryInfo = (categoryId: string) => {
        return DEFAULT_CATEGORIES.find((c) => c.id === categoryId) || DEFAULT_CATEGORIES[0];
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Expenses</h3>
                <button
                    onClick={onViewAll}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                >
                    View All
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-3">
                {expenses.map((expense, index) => {
                    const category = getCategoryInfo(expense.category);
                    return (
                        <motion.div
                            key={expense.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-xl shadow-md`}>
                                    {category.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{expense.merchant}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">
                                            {new Date(expense.date).toLocaleDateString('en-IN', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <div className="flex items-center gap-1 text-gray-500">
                                            {getSourceIcon(expense.source)}
                                            <span className="text-xs capitalize">{expense.source}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-800 text-lg">
                                    ₹{expense.amount.toLocaleString('en-IN')}
                                </p>
                                {expense.aiConfidence && (
                                    <p className="text-xs text-gray-500">
                                        {expense.aiConfidence}% AI confidence
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
