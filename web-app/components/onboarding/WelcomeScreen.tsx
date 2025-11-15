'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { LANGUAGES, ONBOARDING_FEATURES } from '@/lib/constants';
import { useState } from 'react';

interface WelcomeScreenProps {
    onNext: (language: string) => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleGetStarted = () => {
        onNext(selectedLanguage);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
            {/* Header with Logo and Language Selector */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-6 flex justify-between items-center"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                        💰
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ExpenseTracker
                        </h1>
                        <p className="text-xs text-gray-500">AI-Powered Budget Management</p>
                    </div>
                </div>

                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.nativeName}
                        </option>
                    ))}
                </select>
            </motion.div>

            {/* Carousel */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full text-center"
                >
                    <div className="text-8xl mb-6">
                        {ONBOARDING_FEATURES[currentSlide].icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {ONBOARDING_FEATURES[currentSlide].title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        {ONBOARDING_FEATURES[currentSlide].description}
                    </p>
                </motion.div>

                {/* Carousel Indicators */}
                <div className="flex gap-2 mb-12">
                    {ONBOARDING_FEATURES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-2"
                >
                    Get Started
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
