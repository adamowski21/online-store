"use client"
import React, { useState, useEffect, useContext } from 'react'
import Dialog from '@/components/Dialog'
import InputField from '@/components/InputField'
import { users } from '@/data/mockData'
import { NavigationContext } from '@/components/NavigationContext'


const UserPage = () => {

    const { token, setToken, logout } = useContext(NavigationContext);

    const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

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

    const resetPasswordFields = () => {
        setNewPassword('');
        setRepeatNewPassword('');
        setPasswordErrors({});
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (isPasswordFormValid) {
            try {
                const response = await fetch('http://localhost:8080/api/users/userDetails', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.accessToken}`
                    },
                    body: JSON.stringify({
                        password: newPassword,
                    }),
                });

                if (response.ok) {
                    setPasswordDialogOpen(false);
                    resetPasswordFields();
                    logout();
                } else {
                    const errorData = await response.text();
                    setPasswordErrors({
                        ...passwordErrors,
                        newPassword: errorData.error,
                    });
                }
            } catch (error) {
                console.error('Update password error:', error);
            }
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
                    method: 'GET',
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

    const handleDeleteConfirmation = () => {
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteAccount = async () => {
        try {
            console.log('Bearer Token:', token.accessToken);
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`
                }
            });
            console.log('Delete account response:', response);

            if (response.ok) {
                console.log('Account deleted successfully');
                setDeleteConfirmationOpen(false);
                logout();
            } else {
                console.error('Error deleting account:', response.status);
                setDeleteConfirmationOpen(false);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            setDeleteConfirmationOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationOpen(false);
    }

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
                    <Dialog isOpen={isPasswordDialogOpen} onClose={() => { setPasswordDialogOpen(false); resetPasswordFields(); }} title="Edit your password">
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
                    <button className="px-2 py-1 text-base tracking-wide rounded-full border hover:border-black" onClick={handleDeleteConfirmation}>
                        Delete
                    </button>
                </div>
                {/* <div className="mt-8 text-right mr-5">
                    <button className="px-3 py-1 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-full hover:bg-[#383838]">
                        Save
                    </button>
                </div> */}
            </div>
            <Dialog isOpen={isDeleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)} title="Confirm Deletion">
                <div className="text-center">
                    Are you sure you want to delete your account?
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                    <button className="bg-green-50 text-white px-5 py-2 rounded-full" onClick={handleDeleteAccount}>
                        Yes
                    </button>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-full" onClick={handleCancelDelete}>
                        No
                    </button>
                </div>
            </Dialog>
        </div>
    )
}

export default UserPage