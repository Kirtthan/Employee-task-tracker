import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import {
    Button, Dialog, DialogTitle, DialogContent, TextField,
    DialogActions, MenuItem, Avatar, Typography
} from '@mui/material';
import { Add as AddIcon, CheckCircle, RadioButtonUnchecked, PlayCircleOutline, Assignment } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const TasksPage = () => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await api.get('/tasks');
            return data;
        },
    });

    const { data: employees } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const { data } = await api.get('/employees');
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await api.post('/tasks', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setOpen(false);
            reset();
        },
    });

    const onSubmit = (data: any) => {
        createMutation.mutate(data);
    };

    if (isLoading) return <div>Loading...</div>;

    const columns = [
        { id: 'TODO', title: 'To Do', color: 'bg-indigo-100', icon: <RadioButtonUnchecked className="text-indigo-500" /> },
        { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-blue-100', icon: <PlayCircleOutline className="text-blue-500" /> },
        { id: 'DONE', title: 'Completed', color: 'bg-emerald-100', icon: <CheckCircle className="text-emerald-500" /> },
    ];

    const getTasksByStatus = (status: string) => tasks?.filter((t: any) => t.status === status) || [];

    return (
        <div className="space-y-6 h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Task Management</h2>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    className="glass-button rounded-full"
                >
                    Add Task
                </Button>
            </div>

            {tasks?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] glass-panel text-center p-12">
                    <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-500">
                        <Assignment style={{ fontSize: 48 }} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No tasks assigned</h2>
                    <p className="text-gray-500 mb-8">It seems like you don't have any tasks yet</p>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        className="glass-button rounded-full px-8 py-3 text-lg"
                    >
                        Create New Task
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] overflow-hidden">
                    {columns.map((col) => (
                        <div key={col.id} className="glass-panel p-4 flex flex-col h-full bg-white/20">
                            <div className="flex items-center justify-between mb-4 p-2">
                                <div className="flex items-center gap-2">
                                    {col.icon}
                                    <h3 className="font-bold text-gray-700">{col.title}</h3>
                                </div>
                                <span className="bg-white/50 px-2 py-1 rounded-md text-sm font-medium text-gray-600">
                                    {getTasksByStatus(col.id).length}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                {getTasksByStatus(col.id).map((task: any) => (
                                    <motion.div
                                        key={task.id}
                                        layoutId={task.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white/60 p-4 rounded-xl shadow-sm border border-white/40 cursor-pointer hover:shadow-md transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <Typography variant="subtitle1" className="font-bold text-gray-800 leading-tight">
                                                {task.title}
                                            </Typography>
                                            {task.status === 'DONE' && <CheckCircle fontSize="small" className="text-emerald-500" />}
                                        </div>

                                        <Typography variant="body2" className="text-gray-500 mb-4 line-clamp-2">
                                            {task.description}
                                        </Typography>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    sx={{ width: 24, height: 24, fontSize: 12, bgcolor: col.color.replace('bg-', 'text-').replace('100', '500') }}
                                                >
                                                    {task.employee?.name?.charAt(0) || '?'}
                                                </Avatar>
                                                <span className="text-xs font-medium text-gray-600">
                                                    {task.employee?.name || 'Unassigned'}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ className: 'glass-panel' }}>
                <DialogTitle className="text-indigo-900 font-bold">Create New Task</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent className="space-y-4 min-w-[400px]">
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            {...register('title', { required: true })}
                            className="bg-white/50"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                            variant="outlined"
                            {...register('description')}
                            className="bg-white/50"
                        />
                        <TextField
                            select
                            fullWidth
                            label="Assign To"
                            defaultValue=""
                            inputProps={register('employeeId', { required: true })}
                            className="bg-white/50"
                        >
                            {employees?.map((emp: any) => (
                                <MenuItem key={emp.id} value={emp.id}>
                                    {emp.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            defaultValue="TODO"
                            inputProps={register('status')}
                            className="bg-white/50"
                        >
                            <MenuItem value="TODO">To Do</MenuItem>
                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                            <MenuItem value="DONE">Done</MenuItem>
                        </TextField>
                    </DialogContent>
                    <DialogActions className="p-4">
                        <Button onClick={() => setOpen(false)} className="text-gray-600">Cancel</Button>
                        <Button type="submit" variant="contained" className="bg-indigo-600">Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default TasksPage;
