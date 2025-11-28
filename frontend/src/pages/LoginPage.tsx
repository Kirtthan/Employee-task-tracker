import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { LockOutlined } from '@mui/icons-material';

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const loginMutation = useLogin();

    const onSubmit = (data: any) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating shapes for background effect */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 left-20 w-32 h-32 bg-purple-300/30 rounded-3xl blur-xl"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300/30 rounded-full blur-xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-10 w-full max-w-md relative z-10 flex flex-col items-center"
            >
                <div className="w-20 h-20 bg-blue-100/50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg text-white">
                        <LockOutlined fontSize="large" />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                    <div className="space-y-4">
                        <input
                            placeholder="Username"
                            {...register('username', { required: true })}
                            className="w-full glass-input"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            {...register('password', { required: true })}
                            className="w-full glass-input"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full glass-button bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/30"
                    >
                        {loginMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </motion.button>
                </form>

                <div className="mt-8 flex justify-between w-full text-sm text-gray-500 px-2">
                    <button className="hover:text-indigo-600 transition-colors">Forgot Password?</button>
                    <Link to="/register" className="hover:text-indigo-600 transition-colors font-medium">
                        Create Account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
