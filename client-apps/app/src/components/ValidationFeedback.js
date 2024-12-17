import React, { useEffect } from 'react';

const ValidationFeedback = () => {
    const validationResult = {
        success: true,
        message: 'Your participation has been confirmed!.',
    };

    useEffect(() => {
        document.title = 'Event name X - Confirmed!';
    }, []);

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
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Participation Confirmed</h1>
                {validationResult.success ? (
                    <p className="text-green-600 font-semibold">{validationResult.message}</p>
                ) : (
                    <p className="text-red-600 font-semibold">{validationResult.message}</p>
                )}
                <button
                    onClick={() => (window.location.href = '/')}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default ValidationFeedback;
