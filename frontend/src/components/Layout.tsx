import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Assignment as TaskIcon,
    ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const navItems = [
        { path: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { path: '/employees', icon: <PeopleIcon />, label: 'Employees', adminOnly: true },
        { path: '/tasks', icon: <TaskIcon />, label: 'Tasks' },
    ];

    const filteredNavItems = navItems.filter(item => !item.adminOnly || user?.role === 'ADMIN');

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-64 glass-panel m-4 flex flex-col"
            >
                <div className="p-6 border-b border-white/20">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                        TaskTracker
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                                ? 'bg-indigo-500/10 text-indigo-700 shadow-sm border border-indigo-200/50'
                                : 'text-gray-600 hover:bg-white/40 hover:text-indigo-600'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/20">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center text-white font-bold">
                            {user?.username?.[0]?.toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{user?.username}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogoutIcon fontSize="small" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="h-full"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default Layout;
