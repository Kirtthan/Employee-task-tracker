import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowForward, Speed, Security, Group } from '@mui/icons-material';

const LandingPage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navbar */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                    TaskTracker
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                    <Link to="/register" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                            Streamline Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
                                Workflow
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-lg">
                            Streamline your workflow, track employee performance, and manage tasks effortlessly with our premium glassmorphic dashboard.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/register" className="group bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all flex items-center gap-2">
                                Start Free Trial <ArrowForward className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="px-8 py-4 rounded-full text-lg font-medium text-gray-600 hover:bg-white/50 transition-all">
                                View Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Laptop Mockup / Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="glass-panel p-2 rounded-3xl transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-all duration-700 shadow-2xl">
                            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-video border border-gray-200 relative">
                                {/* Mockup Content - Simplified Dashboard */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 p-4">
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-1/4 h-20 bg-white/60 rounded-xl" />
                                        <div className="w-1/4 h-20 bg-white/60 rounded-xl" />
                                        <div className="w-1/4 h-20 bg-white/60 rounded-xl" />
                                        <div className="w-1/4 h-20 bg-white/60 rounded-xl" />
                                    </div>
                                    <div className="flex gap-4 h-40">
                                        <div className="w-2/3 bg-white/60 rounded-xl" />
                                        <div className="w-1/3 bg-white/60 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 glass-card p-4 w-40"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Speed fontSize="small" /></div>
                                <div className="text-sm font-bold text-gray-800">Efficiency</div>
                            </div>
                            <div className="text-2xl font-bold text-green-500">+24%</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Speed fontSize="large" />, title: "Fast Performance", desc: "Optimized for speed and efficiency." },
                        { icon: <Security fontSize="large" />, title: "Secure Data", desc: "Enterprise-grade security for your team." },
                        { icon: <Group fontSize="large" />, title: "Team Collaboration", desc: "Seamlessly manage your workforce." }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="glass-card p-8 text-center"
                        >
                            <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
