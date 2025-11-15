'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
    steps: number;
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: steps }).map((_, index) => (
                <div key={index} className="flex items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{
                            scale: currentStep === index ? 1.2 : 1,
                            opacity: currentStep >= index ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm',
                            currentStep > index
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                                : currentStep === index
                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-400'
                        )}
                    >
                        {currentStep > index ? <Check className="w-5 h-5" /> : index + 1}
                    </motion.div>
                    {index < steps - 1 && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: currentStep > index ? '100%' : '0%' }}
                            className={cn(
                                'h-1 w-12 mx-1 rounded',
                                currentStep > index ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-200'
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
