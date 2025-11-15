'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Camera, Mic, ChevronRight, Shield } from 'lucide-react';
import { useState } from 'react';
import { Permission } from '@/lib/types';

interface PermissionsSetupProps {
    onNext: (permissions: Permission) => void;
    onSkip: () => void;
}

const PERMISSIONS = [
    {
        key: 'sms' as const,
        icon: MessageSquare,
        title: 'SMS Access',
        description: 'Auto-import bank transactions from SMS to track expenses automatically',
        illustration: '📱',
        color: 'from-blue-400 to-indigo-500',
    },
    {
        key: 'camera' as const,
        icon: Camera,
        title: 'Camera Access',
        description: 'Scan receipts and bills to extract expense details instantly',
        illustration: '📸',
        color: 'from-purple-400 to-pink-500',
    },
    {
        key: 'microphone' as const,
        icon: Mic,
        title: 'Microphone Access',
        description: 'Add expenses using voice input in your preferred language',
        illustration: '🎤',
        color: 'from-green-400 to-emerald-500',
    },
];

export default function PermissionsSetup({ onNext, onSkip }: PermissionsSetupProps) {
    const [permissions, setPermissions] = useState<Permission>({
        sms: false,
        camera: false,
        microphone: false,
    });

    const togglePermission = (key: keyof Permission) => {
        setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleContinue = () => {
        onNext(permissions);
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
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Grant Permissions</h1>
                    <p className="text-lg text-gray-600">
                        Enable these features for the best expense tracking experience
                    </p>
                </div>

                {/* Permissions List */}
                <div className="space-y-4 mb-8">
                    {PERMISSIONS.map((permission, index) => {
                        const Icon = permission.icon;
                        const isEnabled = permissions[permission.key];

                        return (
                            <motion.div
                                key={permission.key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all cursor-pointer ${isEnabled ? 'border-indigo-500' : 'border-transparent'
                                    }`}
                                onClick={() => togglePermission(permission.key)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-5xl">{permission.illustration}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {permission.title}
                                            </h3>
                                            <motion.div
                                                animate={{ scale: isEnabled ? 1 : 0.9 }}
                                                className={`w-14 h-8 rounded-full p-1 transition-colors ${isEnabled ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-300'
                                                    }`}
                                            >
                                                <motion.div
                                                    animate={{ x: isEnabled ? 24 : 0 }}
                                                    className="w-6 h-6 bg-white rounded-full shadow-md"
                                                />
                                            </motion.div>
                                        </div>
                                        <p className="text-gray-600">{permission.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Privacy Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg mb-8"
                >
                    <p className="text-sm text-amber-800">
                        <strong>Privacy First:</strong> Your data is encrypted and stored securely. You can change these permissions anytime in settings.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSkip}
                        className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Skip for Now
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleContinue}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                        Continue
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
