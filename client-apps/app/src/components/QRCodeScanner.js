import React, { useEffect } from 'react';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = ({ onNext }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Event name X - Join today!';
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Event X!</h1>
                <p className="text-gray-600 mb-6">Please scan the QR code provided to confirm your participation at Event X.</p>
                <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                    <QRCode value="/step=1" />
                </div>
                <button
                    onClick={() => navigate('/form')}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Confirm participation to Event X
                </button>
            </div>
        </div>
    );
};

export default QRCodeScanner;
