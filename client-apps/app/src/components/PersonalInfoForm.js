import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfoForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nid: '',
        name: '',
        name2: '',
        institution: '',
        designation: '',
        mobile: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {


        if (e.target.name === 'nid') {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
                email: `${e.target.value}@test.com`,
                name: `-`,
                name2: `-`,
                institution: `-`,
                designation: `-`,
                mobile: `-`,
                password: e.target.value
            });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        document.title = 'Event name X - Provide NID!';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://userapi.bb-consent.local/api/v1/auth/email/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nid: form.nid,
                    firstName: form.name,
                    lastName: form.name2,
                    institution: form.institution,
                    designation: form.designation,
                    mobile: form.mobile,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await response.text();
            console.log();
            if (!response.ok) {
                let err = {};
                try {
                    err = JSON.parse(data)
                } catch (error) {
                    throw new Error('Registration failed');
                }

                if (err.errors.email && err.errors.email !== 'emailAlreadyExists') {
                    throw new Error('Registration failed');
                }
            }

            // Save data to localStorage or move to the next step
            localStorage.setItem('formData', JSON.stringify(form));
            navigate('/consent');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className='flex items-center'>
                <div className='inline-block size-28 rounded-full ring-2 ring-white mr-5 border border-slate-300 overflow-hidden flex items-center'>
                    <img src='./risalogo.jpg' className="object-contain" ></img>
                </div>
                <h1 className="text-2xl font-bold text-primary">RWANDA INFORMATION<br />SOCIETY AUTHORITY</h1>
            </div>
            <br />  <br />
            <div className='rounded w-full max-w-3xl overflow-hidden shadow-lg flex flex-col items-center justify-center p-10 bg-white'>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Fill in your National ID</h1>
                <p className="text-gray-800 mb-4">In order to confirm your participation to this event you have to provide your National ID below.</p>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md"
                >
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">National ID Number</label>
                        <input
                            type="text"
                            name="nid"
                            placeholder="1234567890123456"
                            value={form.nid}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-6 py-2 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Next'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
