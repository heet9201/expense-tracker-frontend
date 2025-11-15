'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasCompletedOnboarding =
      typeof window !== 'undefined' &&
      localStorage.getItem('hasCompletedOnboarding') === 'true';

    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-9xl mb-6"
        >
          💰
        </motion.div>
        <h1 className="text-5xl font-bold text-white mb-4">ExpenseTracker</h1>
        <p className="text-xl text-white/80">AI-Powered Budget Management</p>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}
