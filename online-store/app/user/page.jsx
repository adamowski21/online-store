"use client"
import React, { useState, useEffect, useContext } from 'react'
import Dialog from '@/components/Dialog'
import InputField from '@/components/InputField'
import { users } from '@/data/mockData'
import { NavigationContext } from '@/components/NavigationContext'


const UserPage = () => {

    const { token, setToken } = useContext(NavigationContext);

    const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
    const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);

    const [currentEmail, setCurrentEmail] = useState(users[0].email);
    const [newEmail, setNewEmail] = useState('');
    const [repeatNewEmail, setRepeatNewEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState({});

    const handleNewEmailChange = (e) => setNewEmail(e.target.value);
    const handleRepeatNewEmailChange = (e) => setRepeatNewEmail(e.target.value);

    useEffect(() => {
        let tempErrors = {};

        if (!newEmail) tempErrors.newEmail = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(newEmail)) tempErrors.newEmail = 'Email is not valid';
        if (newEmail !== repeatNewEmail) tempErrors.repeatNewEmail = 'Emails must match';

        setEmailErrors(tempErrors);
    }, [newEmail, repeatNewEmail]);

    const isEmailFormValid = Object.keys(emailErrors).length === 0 && newEmail && repeatNewEmail && newEmail === repeatNewEmail;

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (newEmail !== repeatNewEmail) {
            setEmailErrors({
                ...emailErrors,
                repeatNewEmail: 'The new emails do not match',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/userDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({
                    email: newEmail,
                }),
            });

            if (response.ok) {
                setUser({
                    ...user,
                    email: newEmail,
                });
                setEmailDialogOpen(false);
            } else {
                const errorData = await response.text();
                setEmailErrors({
                    ...emailErrors,
                    newEmail: errorData.error,
                });
            }
        } catch (error) {
            console.error('Update email error:', error);
        }
    };

    const [currentPassword, setCurrentPassword] = useState(users[0].password);
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({});

    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleRepeatNewPasswordChange = (e) => setRepeatNewPassword(e.target.value);

    useEffect(() => {
        let tempPasswordErrors = {};

        if (newPassword.length < 8) tempPasswordErrors.newPassword = 'Password must be at least 8 characters';
        if (newPassword !== repeatNewPassword) tempPasswordErrors.repeatNewPassword = 'Passwords must match';

        setPasswordErrors(tempPasswordErrors);
    }, [newPassword, repeatNewPassword]);

    const isPasswordFormValid = Object.keys(passwordErrors).length === 0 && newPassword && repeatNewPassword && newPassword === repeatNewPassword;

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (isPasswordFormValid) {
            console.log('Password form submitted:', newPassword);
        }
    };

    const [user, setUser] = useState({ email: '' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('authToken:', token.accessToken);

                if (!token) {
                    console.error('No authToken found in localStorage');
                    return;
                }

                const response = await fetch('http://localhost:8080/api/users/userDetails', {
                    headers: {
                        'Authorization': `Bearer ${token.accessToken}`
                    }
                });

                if (!response.ok) {
                    console.error('Failed to fetch user:', response.status);
                    return;
                }

                const fetchedUser = await response.json();
                setUser({ email: fetchedUser.email });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (token) {
            fetchUser();
        }

    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center m-10 text-lg">
            <h1 className="text-4xl font-semibold text-center mb-10">Account details</h1>
            <div className="space-y-6">
                <div>
                    <div>
                        <label className="text-sm">Email:</label>
                    </div>
                    <div>
                        <input type="email" name="email" value={user.email} readOnly className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="button" className="underline text-sm" onClick={() => setEmailDialogOpen(true)}>
                            Edit
                        </button>
                    </div>
                    <Dialog isOpen={isEmailDialogOpen} onClose={() => setEmailDialogOpen(false)} title="Edit your email">
                        <form onSubmit={handleEmailSubmit}>
                            <InputField
                                label="Current Email"
                                type="email"
                                value={user.email}
                                readOnly
                            />
                            <InputField
                                label="New Email"
                                type="email"
                                value={newEmail}
                                onChange={handleNewEmailChange}
                                error={emailErrors.newEmail}
                            />
                            <InputField
                                label="Repeat New Email"
                                type="email"
                                value={repeatNewEmail}
                                onChange={handleRepeatNewEmailChange}
                                error={emailErrors.repeatNewEmail}
                            />
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className={`border rounded-full px-4 ${isEmailFormValid ? 'bg-black text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    disabled={!isEmailFormValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Dialog>
                </div>
                <div>
                    <div>
                        <label className="text-sm">Password:</label>
                    </div>
                    <div>
                        <input type="password" name="password" value={currentPassword} readOnly className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="button" className="underline text-sm" onClick={() => setPasswordDialogOpen(true)}>
                            Edit
                        </button>
                    </div>
                    <Dialog isOpen={isPasswordDialogOpen} onClose={() => setPasswordDialogOpen(false)} title="Edit your email">
                        <form onSubmit={handlePasswordSubmit}>
                            <InputField
                                label="Current Password"
                                type="password"
                                value={currentPassword}
                                readOnly
                            />
                            <InputField
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                error={passwordErrors.newPassword}
                            />
                            <InputField
                                label="Repeat New Password"
                                type="password"
                                value={repeatNewPassword}
                                onChange={handleRepeatNewPasswordChange}
                                error={passwordErrors.repeatNewPassword}
                            />
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className={`border rounded-full px-4 ${isPasswordFormValid ? 'bg-black text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    disabled={!isPasswordFormValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Dialog>
                </div>
                <div className="flex justify-between items-center border-t border-b p-6">
                    <div className="mr-10">
                        Delete account
                    </div>
                    <button className="px-2 py-1 text-base tracking-wide rounded-full border hover:border-black">
                        Delete
                    </button>
                </div>
                <div className="mt-8 text-right mr-5">
                    <button className="px-3 py-1 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-full hover:bg-[#383838]">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserPage