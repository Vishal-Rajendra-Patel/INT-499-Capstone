// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLoginSuccess = (credentialResponse) => {
        console.log("Google OAuth Success:", credentialResponse);
        sessionStorage.setItem('eztech_logged_in', 'true');
        setIsLoggedIn(true);
        navigate('/');
    };

    const handleLoginError = () => {
        console.error('Google Sign-In Failed');
        alert('Google Authentication failed. Please try again.');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f0f4f9',
            margin: 0,
            position: 'absolute',
            top: 0,
            left: 0
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center',
                zIndex: 10
            }}>
                <h2 style={{ color: '#202124', marginBottom: '8px', fontFamily: 'sans-serif' }}>EZTechMovie Secure Portal</h2>
                <p style={{ color: '#5f6368', fontSize: '14px', marginBottom: '30px', fontFamily: 'sans-serif' }}>
                    Management Mandate: Please authenticate using Google OAuth to access the system.
                </p>

                {/* Official Google OAuth Sign-In Button Container */}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                        useOneTap
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;