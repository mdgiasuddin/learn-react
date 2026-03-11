import {type SubmitEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/AuthService';

export function UserRegister() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            await AuthService.registerUser({name, username, password});
            navigate('/login');
        } catch (err) {
            let message = 'Registration failed. Please try again.';
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || message;
            }
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-800 text-black dark:text-white transition-colors duration-300 p-4">
            <div className="w-full max-w-md bg-gray-100 dark:bg-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Please enter your details to register</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                         role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-teal-500 hover:text-teal-600 font-semibold transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
