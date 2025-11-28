import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from '@mui/icons-material';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-300/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-12 text-center max-w-lg w-full"
            >
                <div className="w-24 h-24 mx-auto mb-6 text-red-400">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h2>
                <p className="text-gray-500 mb-8">
                    Please try again or contact support
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-indigo-500 text-white px-8 py-3 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30 font-medium w-full"
                >
                    Reload Page
                </button>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
