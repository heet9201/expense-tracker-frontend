export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  monthlyIncome?: number;
  language: string;
  createdAt: Date;
}

export interface Permission {
  sms: boolean;
  camera: boolean;
  microphone: boolean;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  date: Date;
  source: "sms" | "manual" | "voice" | "ocr";
  notes?: string;
  image?: string;
  aiConfidence?: number;
  isSubscription?: boolean;
}

export interface BudgetCap {
  categoryId: string;
  limit: number;
  spent: number;
  percentage: number;
  status: "safe" | "warning" | "exceeded";
}

export interface DashboardStats {
  totalSpend: number;
  weeklySpend: number;
  monthlySpend: number;
  topCategories: Array<{ name: string; amount: number; percentage: number }>;
  recentExpenses: Expense[];
}
