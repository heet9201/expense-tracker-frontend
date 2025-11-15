'use client';

import { motion } from 'framer-motion';
import { Camera, Mic, Edit, Plus } from 'lucide-react';

interface QuickActionButtonsProps {
    onScanReceipt: () => void;
    onVoiceInput: () => void;
    onManualEntry: () => void;
}

export default function QuickActionButtons({
    onScanReceipt,
    onVoiceInput,
    onManualEntry,
}: QuickActionButtonsProps) {
    const actions = [
        {
            icon: Camera,
            label: 'Scan Receipt',
            color: 'from-purple-500 to-pink-500',
            onClick: onScanReceipt,
        },
        {
            icon: Edit,
            label: 'Manual Entry',
            color: 'from-indigo-500 to-blue-500',
            onClick: onManualEntry,
        },
        {
            icon: Mic,
            label: 'Voice Input',
            color: 'from-green-500 to-emerald-500',
            onClick: onVoiceInput,
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                    <motion.button
                        key={action.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={action.onClick}
                        className={`relative overflow-hidden bg-gradient-to-br ${action.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Icon className="w-7 h-7" />
                            </div>
                            <span className="font-semibold text-sm">{action.label}</span>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    </motion.button>
                );
            })}
        </div>
    );
}
