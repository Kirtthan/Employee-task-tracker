import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const { register, handleSubmit } = useForm();
    const registerMutation = useRegister();

    const onSubmit = (data: any) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center mb-2 text-indigo-900">Create Account</h2>
                <p className="text-center text-gray-600 mb-8">Join the team and start tracking</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        {...register('username', { required: true })}
                        className="bg-white/50 rounded-lg"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register('password', { required: true })}
                        className="bg-white/50 rounded-lg"
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={registerMutation.isPending}
                        className="glass-button h-12 text-lg font-semibold"
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                            textTransform: 'none',
                        }}
                    >
                        {registerMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
