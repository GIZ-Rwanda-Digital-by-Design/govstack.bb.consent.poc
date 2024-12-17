import React from 'react';
import '@testing-library/jest-dom'
import { AdminContext } from 'react-admin';
import { render, screen } from '@testing-library/react';

import Login from './Login';

test('renders the Govstack logo', async () => {
    render(
        <AdminContext>
            <Login />
        </AdminContext>
    );
    const logo = screen.getByAltText('Logo1');
    expect(logo).toBeInTheDocument();
})

test('renders the "Login to Admin Dashboard" text', async () => {
    render(
        <AdminContext>
            <Login />
        </AdminContext>
    );
    const text = screen.getByText('Login to Admin Dashboard');
    expect(text).toBeInTheDocument();
})

test('renders the User ID and Password input fields', async () => {
    render(
        <AdminContext>
            <Login />
        </AdminContext>
    );
    const userIDInput = screen.getByPlaceholderText('User ID');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(userIDInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
})


test('renders the "Remember Me" checkbox', async () => {
    render(
        <AdminContext>
            <Login />
        </AdminContext>
    );
    const checkbox = screen.getByLabelText('Remember Me');

    expect(checkbox).toBeInTheDocument();
})