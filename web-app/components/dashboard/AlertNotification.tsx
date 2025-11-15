'use client';

import { motion } from 'framer-motion';
import { X, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';

interface AlertNotificationProps {
    type: 'warning' | 'info' | 'recommendation';
    title: string;
    message: string;
    onDismiss: () => void;
    actionLabel?: string;
    onAction?: () => void;
}

export default function AlertNotification({
    type,
    title,
    message,
    onDismiss,
    actionLabel,
    onAction,
}: AlertNotificationProps) {
    const config = {
        warning: {
            bg: 'from-yellow-50 to-orange-50',
            border: 'border-yellow-400',
            icon: AlertCircle,
            iconColor: 'text-yellow-600',
            buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
        },
        info: {
            bg: 'from-blue-50 to-indigo-50',
            border: 'border-blue-400',
            icon: TrendingUp,
            iconColor: 'text-blue-600',
            buttonColor: 'bg-blue-600 hover:bg-blue-700',
        },
        recommendation: {
            bg: 'from-purple-50 to-pink-50',
            border: 'border-purple-400',
            icon: Lightbulb,
            iconColor: 'text-purple-600',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
        },
    };

    const style = config[type];
    const Icon = style.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`bg-gradient-to-r ${style.bg} border-l-4 ${style.border} rounded-xl p-4 shadow-lg`}
        >
            <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${style.iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
                    <p className="text-sm text-gray-600">{message}</p>
                    {actionLabel && onAction && (
                        <button
                            onClick={onAction}
                            className={`mt-3 px-4 py-2 ${style.buttonColor} text-white rounded-lg text-sm font-semibold transition-colors`}
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>
                <button
                    onClick={onDismiss}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
}
