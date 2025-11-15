'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Menu,
    Bell,
    Settings,
    User,
    Filter,
    Search,
    ChevronDown,
    LogOut,
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import BudgetCapCard from '@/components/dashboard/BudgetCapCard';
import CategoryPieChart from '@/components/dashboard/CategoryPieChart';
import WeeklyTrend from '@/components/dashboard/WeeklyTrend';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import QuickActionButtons from '@/components/dashboard/QuickActionButtons';
import AlertNotification from '@/components/dashboard/AlertNotification';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { Expense, BudgetCap } from '@/lib/types';

export default function DashboardPage() {
    const [showAlert, setShowAlert] = useState(true);
    const [userName, setUserName] = useState('User');
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        // Load user data from localStorage
        if (typeof window !== 'undefined') {
            const onboardingData = localStorage.getItem('onboardingData');
            if (onboardingData) {
                const data = JSON.parse(onboardingData);
                setUserName(data.name || 'User');
            }
        }
    }, []);

    // Mock data for demonstration
    const mockExpenses: Expense[] = [
        {
            id: '1',
            amount: 1250,
            category: 'food',
            merchant: 'Swiggy - Lunch',
            date: new Date('2025-11-09'),
            source: 'sms',
            aiConfidence: 95,
        },
        {
            id: '2',
            amount: 850,
            category: 'groceries',
            merchant: 'BigBasket',
            date: new Date('2025-11-08'),
            source: 'ocr',
            aiConfidence: 92,
        },
        {
            id: '3',
            amount: 450,
            category: 'transport',
            merchant: 'Uber Trip',
            date: new Date('2025-11-08'),
            source: 'sms',
            aiConfidence: 98,
        },
        {
            id: '4',
            amount: 2500,
            category: 'shopping',
            merchant: 'Amazon India',
            date: new Date('2025-11-07'),
            source: 'manual',
        },
        {
            id: '5',
            amount: 599,
            category: 'entertainment',
            merchant: 'BookMyShow',
            date: new Date('2025-11-07'),
            source: 'voice',
            aiConfidence: 88,
        },
    ];

    const mockBudgetCaps: BudgetCap[] = [
        {
            categoryId: 'food',
            limit: 5000,
            spent: 4250,
            percentage: 85,
            status: 'warning',
        },
        {
            categoryId: 'groceries',
            limit: 8000,
            spent: 3200,
            percentage: 40,
            status: 'safe',
        },
        {
            categoryId: 'transport',
            limit: 3000,
            spent: 3450,
            percentage: 115,
            status: 'exceeded',
        },
    ];

    const mockCategoryData = [
        { name: 'Food', value: 4250, color: '#f97316', icon: '🍽️' },
        { name: 'Groceries', value: 3200, color: '#10b981', icon: '🛒' },
        { name: 'Transport', value: 3450, color: '#3b82f6', icon: '🚗' },
        { name: 'Shopping', value: 2500, color: '#ec4899', icon: '🛍️' },
        { name: 'Entertainment', value: 1599, color: '#8b5cf6', icon: '🎬' },
    ];

    const mockWeeklyData = [
        { day: 'Mon', amount: 1200 },
        { day: 'Tue', amount: 1800 },
        { day: 'Wed', amount: 950 },
        { day: 'Thu', amount: 2200 },
        { day: 'Fri', amount: 1500 },
        { day: 'Sat', amount: 3200 },
        { day: 'Sun', amount: 2100 },
    ];

    const totalSpent = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                                <Menu className="w-6 h-6 text-gray-600" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-md">
                                    💰
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        ExpenseTracker
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                                        {userName}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>

                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                                    >
                                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700">
                                            <User className="w-4 h-4" />
                                            Profile
                                        </button>
                                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700">
                                            <Settings className="w-4 h-4" />
                                            Settings
                                        </button>
                                        <hr className="my-2" />
                                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600">
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome back, {userName}! 👋
                    </h2>
                    <p className="text-gray-600">
                        Here's your expense overview for November 2025
                    </p>
                </motion.div>

                {/* Alert Section */}
                {showAlert && (
                    <div className="mb-6">
                        <AlertNotification
                            type="warning"
                            title="Budget Alert: Transport"
                            message="You've exceeded your transport budget by ₹450 this month. Consider reviewing your spending."
                            onDismiss={() => setShowAlert(false)}
                            actionLabel="See Details"
                            onAction={() => console.log('View details')}
                        />
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Spent (Month)"
                        amount={15999}
                        change={12}
                        period="November 2025"
                        color="from-indigo-500 to-purple-600"
                    />
                    <StatsCard
                        title="Total Spent (Week)"
                        amount={5649}
                        change={-8}
                        period="This Week"
                        color="from-blue-500 to-cyan-500"
                    />
                    <StatsCard
                        title="Budget Remaining"
                        amount={14001}
                        period="Overall Budget: ₹30,000"
                        color="from-green-500 to-emerald-500"
                    />
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <QuickActionButtons
                        onScanReceipt={() => console.log('Scan receipt')}
                        onVoiceInput={() => console.log('Voice input')}
                        onManualEntry={() => console.log('Manual entry')}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <CategoryPieChart data={mockCategoryData} />
                    <WeeklyTrend data={mockWeeklyData} />
                </div>

                {/* Budget Caps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Budget Status</h3>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                            Manage Budgets
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockBudgetCaps.map((cap) => {
                            const category = DEFAULT_CATEGORIES.find((c) => c.id === cap.categoryId);
                            return (
                                <BudgetCapCard
                                    key={cap.categoryId}
                                    budgetCap={cap}
                                    categoryName={category?.name || ''}
                                    categoryIcon={category?.icon || ''}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Recent Expenses */}
                <div className="mb-8">
                    <RecentExpenses
                        expenses={mockExpenses}
                        onViewAll={() => console.log('View all expenses')}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-gray-500">
                        © 2025 ExpenseTracker. Made with ❤️ for India. All data encrypted & secure.
                    </p>
                </div>
            </footer>
        </div>
    );
}
