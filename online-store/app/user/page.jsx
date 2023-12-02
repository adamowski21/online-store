"use client"
import React, { useState, useEffect } from 'react'
import Dialog from '@/components/Dialog'
import InputField from '@/components/InputField'
import { users } from '@/data/mockData'

const UserPage = () => {

    const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
    const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);

    const [currentEmail, setCurrentEmail] = useState(users[0].email);
    const [newEmail, setNewEmail] = useState('');
    const [repeatNewEmail, setRepeatNewEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState({});

    const handleCurrentEmailChange = (e) => setCurrentEmail(e.target.value);
    const handleNewEmailChange = (e) => setNewEmail(e.target.value);
    const handleRepeatNewEmailChange = (e) => setRepeatNewEmail(e.target.value);

    const [currentPassword, setCurrentPassword] = useState(users[0].password);
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({});

    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleRepeatNewPasswordChange = (e) => setRepeatNewPassword(e.target.value);


    useEffect(() => {
        let tempErrors = {};

        if (!newEmail) tempErrors.newEmail = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(newEmail)) tempErrors.newEmail = 'Email is not valid';
        if (newEmail !== repeatNewEmail) tempErrors.repeatNewEmail = 'Emails must match';

        setEmailErrors(tempErrors);
    }, [newEmail, repeatNewEmail]);

    const isEmailFormValid = Object.keys(emailErrors).length === 0 && newEmail && repeatNewEmail && newEmail === repeatNewEmail;

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (isEmailFormValid) {
            // Perform some action when the form is submitted
            console.log('Form submitted:', newEmail);
        }
    };

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
            // Perform some action when the form is submitted
            console.log('Password form submitted:', newPassword);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center m-10 text-lg">
            <h1 className="text-4xl font-semibold text-center mb-10">Account details</h1>
            <form className="space-y-6">
                <div>
                    <div>
                        <label className="text-sm">Email:</label>
                    </div>
                    <div>
                        <input type="email" name="email" value={currentEmail} readOnly className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="button" className="underline text-sm" onClick={() => setEmailDialogOpen(true)}>
                            Edit
                        </button>
                    </div>
                    <Dialog isOpen={isEmailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
                        <form onSubmit={handleEmailSubmit}>
                            <InputField
                                label="Current Email"
                                type="email"
                                value={currentEmail}
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
                    <Dialog isOpen={isPasswordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
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
            </form>
        </div>
    )
}

export default UserPage