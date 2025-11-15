'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import PermissionsSetup from '@/components/onboarding/PermissionsSetup';
import ProfileSetup from '@/components/onboarding/ProfileSetup';
import StepIndicator from '@/components/onboarding/StepIndicator';
import { Permission } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [permissions, setPermissions] = useState<Permission>({
        sms: false,
        camera: false,
        microphone: false,
    });

    const handleWelcomeNext = (language: string) => {
        setSelectedLanguage(language);
        setStep(1);
    };

    const handlePermissionsNext = (perms: Permission) => {
        setPermissions(perms);
        setStep(2);
    };

    const handlePermissionsSkip = () => {
        setStep(2);
    };

    const handleProfileComplete = (profile: any) => {
        // Save onboarding data to localStorage or API
        const onboardingData = {
            ...profile,
            permissions,
            completedAt: new Date().toISOString(),
        };

        if (typeof window !== 'undefined') {
            localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
            localStorage.setItem('hasCompletedOnboarding', 'true');
        }

        // Navigate to dashboard
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen">
            {step > 0 && step < 3 && (
                <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 py-4">
                    <StepIndicator steps={3} currentStep={step} />
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <WelcomeScreen onNext={handleWelcomeNext} />
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="permissions"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="pt-24"
                    >
                        <PermissionsSetup
                            onNext={handlePermissionsNext}
                            onSkip={handlePermissionsSkip}
                        />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="pt-24"
                    >
                        <ProfileSetup
                            onComplete={handleProfileComplete}
                            selectedLanguage={selectedLanguage}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
