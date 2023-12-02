"use client"
import React, { useState, useEffect } from 'react'
import Dialog from '@/components/Dialog'
import InputField from '@/components/InputField'


const UserPage = () => {

    const [isDialogOpen, setDialogOpen] = useState(false);

    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [repeatNewEmail, setRepeatNewEmail] = useState('');
    const [errors, setErrors] = useState({});

    const handleCurrentEmailChange = (e) => setCurrentEmail(e.target.value);
    const handleNewEmailChange = (e) => setNewEmail(e.target.value);
    const handleRepeatNewEmailChange = (e) => setRepeatNewEmail(e.target.value);

    useEffect(() => {
        let tempErrors = {};

        if (!newEmail) tempErrors.newEmail = 'New Email is required';
        else if (!/\S+@\S+\.\S+/.test(newEmail)) tempErrors.newEmail = 'Email is not valid';
        if (newEmail !== repeatNewEmail) tempErrors.repeatNewEmail = 'New Email and Repeat New Email must match';

        setErrors(tempErrors);
    }, [newEmail, repeatNewEmail]);

    const isFormValid = Object.keys(errors).length === 0 && newEmail && repeatNewEmail && newEmail === repeatNewEmail;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            // Perform some action when the form is submitted
            console.log('Form submitted:', newEmail);
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
                        <input type="email" name="email" className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="button" className="underline text-sm" onClick={() => setDialogOpen(true)}>
                            Edit
                        </button>
                    </div>
                    <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="Current Email"
                                type="email"
                                value={currentEmail}
                                onChange={handleCurrentEmailChange}
                                error={errors.currentEmail}
                            />
                            <InputField
                                label="New Email"
                                type="email"
                                value={newEmail}
                                onChange={handleNewEmailChange}
                                error={errors.newEmail}
                            />
                            <InputField
                                label="Repeat New Email"
                                type="email"
                                value={repeatNewEmail}
                                onChange={handleRepeatNewEmailChange}
                                error={errors.repeatNewEmail}
                            />
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className={`border rounded-full px-4 ${isFormValid ? 'bg-black text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    disabled={!isFormValid}
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
                        <input type="password" name="password" className="border border-black rounded-lg p-3 w-full" />
                    </div>
                    <div className="w-full flex justify-end">
                        <button className="underline text-sm">
                            Edit
                        </button>
                    </div>
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