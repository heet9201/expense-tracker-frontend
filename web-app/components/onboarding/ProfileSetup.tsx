'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, DollarSign, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { DEFAULT_CATEGORIES } from '@/lib/constants';

interface ProfileSetupProps {
    onComplete: (profile: any) => void;
    selectedLanguage: string;
}

export default function ProfileSetup({ onComplete, selectedLanguage }: ProfileSetupProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        monthlyIncome: '',
        selectedCategory: DEFAULT_CATEGORIES[0].id,
        categoryBudget: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({
            ...formData,
            language: selectedLanguage,
        });
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Create Your Profile</h1>
                    <p className="text-lg text-gray-600">
                        Let's personalize your expense tracking experience
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="Enter your name"
                            />
                        </div>
                    </motion.div>

                    {/* Email or Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email (Optional)
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Monthly Income */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Monthly Income (Optional)
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={formData.monthlyIncome}
                                onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="₹ 50,000"
                            />
                        </div>
                    </motion.div>

                    {/* Budget Setup */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-200"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Set Your First Budget Cap
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={formData.selectedCategory}
                                    onChange={(e) => handleChange('selectedCategory', e.target.value)}
                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                >
                                    {DEFAULT_CATEGORIES.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.icon} {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Budget Limit
                                </label>
                                <input
                                    type="number"
                                    value={formData.categoryBudget}
                                    onChange={(e) => handleChange('categoryBudget', e.target.value)}
                                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="₹ 5,000"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                        Complete Setup
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
