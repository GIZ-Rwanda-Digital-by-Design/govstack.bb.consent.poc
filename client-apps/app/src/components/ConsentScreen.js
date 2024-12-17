import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsentScreen = () => {
    const navigate = useNavigate();
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    const consentUrl = `http://privacy.bb-consent.local/?nid=${encodeURIComponent(formData.nid)}`;

    useEffect(() => {
        document.title = 'Event name X - Give Consent!';
    }, []);

    const handleRedirect = () => {
        window.location.href = consentUrl;
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Consent Required</h1>
                <p className="text-gray-600 text-center mb-6 text-justify">
                    To proceed, you'll be redirected to an external consent application where your National ID will be
                    validated.
                    <br />
                    You Consent is required in order to identify with NIDA and to retrieve and store your personal information in order to confirm your participation to this event.
                    <br /><br />
                    Once completed, return to this application to finalize the process.
                </p>
                <button
                    onClick={handleRedirect}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Proceed to Consent
                </button>
            </div>
        </div >
    );
};

export default ConsentScreen;
