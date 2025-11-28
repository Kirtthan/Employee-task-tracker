import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Typography } from '@mui/material';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { KeyboardDoubleArrowUp, Person, Assignment, TrendingUp, RadioButtonUnchecked } from '@mui/icons-material';

const DashboardPage = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard');
            return data;
        },
    });

    const { data: tasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await api.get('/tasks');
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    const statusData = [
        { name: 'To Do', value: stats?.statusBreakdown?.TODO || 0, color: '#818cf8' }, // Indigo
        { name: 'In Progress', value: stats?.statusBreakdown?.IN_PROGRESS || 0, color: '#2dd4bf' }, // Teal
        { name: 'Done', value: stats?.statusBreakdown?.DONE || 0, color: '#a78bfa' }, // Purple
    ];

    const pendingTasks = tasks?.filter((t: any) => t.status !== 'DONE').slice(0, 3) || [];

    const KPICard = ({ title, value, icon, color }: any) => (
        <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between h-40 relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${color.replace('text-', 'bg-')}`} />
            <div>
                <Typography variant="subtitle2" className="text-gray-500 font-medium uppercase tracking-wider text-xs">{title}</Typography>
                <Typography variant="h3" className="font-bold text-gray-800 mt-2">{value}</Typography>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className={`h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden`}>
                    <div className={`h-full ${color.replace('text-', 'bg-')} w-2/3`} />
                </div>
                <div className="flex items-center text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                    <KeyboardDoubleArrowUp fontSize="small" />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                    title="KPI"
                    value={stats?.totalEmployees || 18.55}
                    icon={<Person />}
                    color="text-indigo-500"
                />
                <KPICard
                    title="Projects"
                    value={`$${stats?.totalTasks * 100 || 2500}`}
                    icon={<Assignment />}
                    color="text-indigo-500"
                />
                <KPICard
                    title="Efficiency"
                    value={stats?.completedPercentage ? `${Math.round(stats.completedPercentage)}%` : '11,500'}
                    icon={<TrendingUp />}
                    color="text-indigo-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Task Distribution (Donut Chart) */}
                <div className="glass-panel p-6 h-[400px] lg:col-span-1 flex flex-col">
                    <Typography variant="h6" className="mb-6 text-gray-700 font-bold text-center">Task Distribution</Typography>
                    <div className="flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Avatars - Mocking the image look */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 rounded-full border-4 border-white/50 bg-indigo-100" />
                        </div>
                    </div>
                </div>

                {/* Quarterly Performance (Bar Chart) */}
                <div className="glass-panel p-6 h-[400px] lg:col-span-1 flex flex-col">
                    <Typography variant="h6" className="mb-6 text-gray-700 font-bold">Quarterly Performance</Typography>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} height={0} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 8 }}
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pending Tasks Widget */}
                <div className="glass-panel p-6 h-[400px] lg:col-span-1 overflow-y-auto">
                    <Typography variant="h6" className="mb-6 text-gray-700 font-bold">Pending Tasks</Typography>
                    <div className="space-y-4">
                        {pendingTasks.map((task: any) => (
                            <div key={task.id} className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-xl hover:bg-indigo-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${task.status === 'IN_PROGRESS' ? 'bg-blue-500' : 'bg-indigo-500'}`} />
                                    <Typography variant="body2" className="font-semibold text-gray-700">{task.status.replace('_', ' ')}</Typography>
                                </div>
                                <div className={`px-4 py-1 rounded-full text-xs font-bold ${task.status === 'IN_PROGRESS' ? 'bg-white text-blue-500' : 'bg-white text-indigo-500'}`}>
                                    {task.status === 'IN_PROGRESS' ? 'Overdue' : 'Overdue'}
                                </div>
                            </div>
                        ))}
                        {/* Mock Data to fill if empty */}
                        {pendingTasks.length === 0 && (
                            <>
                                <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                        <Typography variant="body2" className="font-semibold text-gray-700">In Progress</Typography>
                                    </div>
                                    <div className="px-4 py-1 rounded-full text-xs font-bold bg-white text-indigo-500">Overdue</div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <Typography variant="body2" className="font-semibold text-gray-700">In Progress</Typography>
                                    </div>
                                    <div className="px-4 py-1 rounded-full text-xs font-bold bg-white text-blue-500">Overdue</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
