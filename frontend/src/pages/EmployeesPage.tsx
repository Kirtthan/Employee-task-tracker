import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import {
    Button, Dialog, DialogTitle, DialogContent, TextField,
    DialogActions, IconButton, Avatar
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon, Email as EmailIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const EmployeesPage = () => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();

    const { data: employees, isLoading } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const { data } = await api.get('/employees');
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await api.post('/employees', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setOpen(false);
            reset();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/employees/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });

    const onSubmit = (data: any) => {
        createMutation.mutate(data);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
                {employees?.length > 0 && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        className="glass-button rounded-full"
                    >
                        Add New Employee
                    </Button>
                )}
            </div>

            {employees?.length === 0 ? (
                // Empty State
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel p-12 flex flex-col items-center justify-center text-center h-[500px]"
                >
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-full opacity-50 animate-ping"></div>
                        <SearchIcon style={{ fontSize: 48, color: '#6366f1' }} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No employees found</h3>
                    <p className="text-gray-500 mb-8">It seems here no team members here yet</p>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        className="glass-button bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-xl text-lg"
                    >
                        Add First Employee
                    </Button>
                </motion.div>
            ) : (
                // List View
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6"
                >
                    <div className="space-y-4">
                        {employees?.map((employee: any) => (
                            <div key={employee.id} className="flex items-center justify-between p-4 bg-white/40 rounded-xl hover:bg-white/60 transition-all group">
                                <div className="flex items-center gap-4">
                                    <Avatar sx={{ bgcolor: '#818cf8', width: 48, height: 48 }}>
                                        {employee.name.charAt(0)}
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-gray-800 text-lg">{employee.name}</div>
                                        <div className="text-gray-500 text-sm">{employee.role}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center text-gray-500 gap-2 bg-white/50 px-3 py-1 rounded-lg">
                                        <EmailIcon fontSize="small" />
                                        <span className="text-sm">{employee.email}</span>
                                    </div>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <IconButton size="small" className="bg-blue-100 text-blue-600 hover:bg-blue-200">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            className="bg-red-100 text-red-500 hover:bg-red-200"
                                            onClick={() => deleteMutation.mutate(employee.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ className: 'glass-panel' }}>
                <DialogTitle className="text-indigo-900 font-bold">Add New Employee</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent className="space-y-4 min-w-[400px]">
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            {...register('name', { required: true })}
                            className="bg-white/50"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            {...register('email', { required: true })}
                            className="bg-white/50"
                        />
                        <TextField
                            fullWidth
                            label="Role"
                            variant="outlined"
                            {...register('role', { required: true })}
                            className="bg-white/50"
                        />
                    </DialogContent>
                    <DialogActions className="p-4">
                        <Button onClick={() => setOpen(false)} className="text-gray-600">Cancel</Button>
                        <Button type="submit" variant="contained" className="bg-indigo-600">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default EmployeesPage;
