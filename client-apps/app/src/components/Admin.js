import React, { useState, useEffect, useRef } from 'react';

import { CheckCircleIcon, XCircleIcon, ChevronDownIcon, ChevronUpIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [users, setUsers] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        document.title = 'Employer Institution - Administration';
    }, []);

    useEffect(() => {
        setToken(localStorage.getItem('token') || null);
        setRefreshToken(localStorage.getItem('refreshToken') || null);
        setShowPage(true);
    }, [])

    // Save token to localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUsers(token, 1); // Fetch first page
        } else {
            setUsers([]);
        }
    }, [token]);

    useEffect(() => {
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }, [refreshToken]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://userapi.bb-consent.local/api/v1/auth/email/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setToken(data.token);
            setRefreshToken(data.refreshToken);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async (authToken, page) => {
        try {
            if (page == 1) {
                setUsers([]);
            }
            console.log('users', users);
            setLoadingMore(true);
            const response = await fetch(`http://userapi.bb-consent.local/api/v1/users?page=${page}&filters=${JSON.stringify({ roles: [{ id: 2 }] })}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 401) {
                // Token expired, try refreshing
                const newToken = await refreshAccessToken();
                if (newToken) {
                    fetchUsers(newToken, page);
                } else {
                    throw new Error('Session expired, please log in again.');
                }
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch users');
            }

            // Update state with new data
            setUsers((prevUsers) => [...prevUsers, ...data.data]);
            setHasNextPage(data.hasNextPage);
            setCurrentPage(page);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingMore(false);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await fetch('http://userapi.bb-consent.local/api/v1/auth/refresh', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setRefreshToken(data.refreshToken);
                return data.token;
            }
        } catch (err) {
            console.error('Failed to refresh token:', err);
        }

        handleLogout();
        return null;
    };

    const handleLogout = () => {
        setToken(null);
        setRefreshToken(null);
        setUsers([]);
        setHasNextPage(false);
        setCurrentPage(1);
        setError('');
        localStorage.removeItem('token');
    };

    const [expandedRows, setExpandedRows] = useState({});

    // Toggle a row's expanded state
    const toggleRow = (id) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    if (!showPage) {
        return <></>;
    }

    if (token) {
        return (
            <div className="p-6 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div className='flex items-center'>
                        <img class="inline-block size-20 rounded-full ring-2 ring-white mr-5 border border-slate-300" src='./logo-placeholder.jpg' ></img>
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-semibold">Employer Instution Application</h1>
                            <h2 className="text-lg font-semibold">Attendees List for Event X</h2>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                {users.length > 0 ? (
                    <div>
                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border-collapse border border-slate-200 mb-4 table-auto ">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="border border-slate-300 px-4 py-2">National ID</th>
                                    <th className="border border-slate-300 px-4 py-2">Name</th>
                                    <th className="border border-slate-300 px-4 py-2">Email</th>
                                    <th className="border border-slate-300 px-4 py-2">Institution</th>
                                    <th className="border border-slate-300 px-4 py-2">Designation</th>
                                    <th className="border border-slate-300 px-4 py-2">All Consent Given?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <React.Fragment key={user.id}>
                                        <tr>
                                            <td className="border border-slate-300 px-4 py-2">{user.nid}</td>
                                            <td className="border border-slate-300 px-4 py-2">{user.firstName} {user.lastName}</td>
                                            <td className="border border-slate-300 px-4 py-2">{user.email}</td>
                                            <td className="border border-slate-300 px-4 py-2">{user.institution}</td>
                                            <td className="border border-slate-300 px-4 py-2">{user.designation}</td>
                                            <td className="border border-slate-300 px-4 py-2">
                                                <div className='flex justify-between'>
                                                    {
                                                        user.allConsentGiven ? <CheckCircleIcon className="h-6 w-6 text-green-500" /> :
                                                            !user.consent ? <ExclamationCircleIcon className="h-6 w-6 text-orange-500" title="Consent still pending" /> : <XCircleIcon className="h-6 w-6 text-red-500" />
                                                    }
                                                    <div
                                                        onClick={() => toggleRow(user.id)}
                                                    >
                                                        {expandedRows[user.id] ? <ChevronUpIcon className="h-6 w-6 text-slate-500"></ChevronUpIcon> : <ChevronDownIcon className="h-6 w-6 text-slate-500"></ChevronDownIcon>}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedRows[user.id] && (
                                            <tr>
                                                <td colSpan="6" className="border px-4 py-2 bg-gray-50">
                                                    <table className="text-sm text-gray-700">
                                                        <tbody>
                                                            {!user.consent ? <p>Consent still pending</p> : <></>}
                                                            {Object.values(user.consent || {}).map((x, index) =>
                                                                <tr key={index}>
                                                                    <td> {x.optIn ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> :
                                                                        <XCircleIcon className="h-4 w-4 text-red-500" />}</td>
                                                                    <td> {x.agreement.purpose} </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        {hasNextPage && (
                            <button
                                onClick={() => fetchUsers(token, currentPage + 1)}
                                className={`px-6 py-2 text-white font-semibold rounded-lg ${loadingMore ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                disabled={loadingMore}
                            >
                                {loadingMore ? 'Loading...' : 'Load More'}
                            </button>
                        )}
                    </div>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full px-6 py-2 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Admin;
