'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryData {
    name: string;
    value: number;
    color: string;
    icon: string;
}

interface CategoryPieChartProps {
    data: CategoryData[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-1">
                        {data.icon} {data.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        ₹{data.value.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-500">
                        {((data.value / data.total) * 100).toFixed(1)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const dataWithTotal = data.map(item => ({ ...item, total }));

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={dataWithTotal}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {dataWithTotal.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-3 mt-6">
                {data.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-gray-600">
                            {category.icon} {category.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
