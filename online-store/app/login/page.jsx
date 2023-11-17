"use client"
import React, { useState } from 'react'
import Link from "next/link"
import InputField from '@/components/InputField'

const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!email) tempErrors.email = 'Email is required';
    if (!password) {
      tempErrors.password = 'Password is required';
    } else {
      if (!/[A-Z]/.test(password)) {
        tempErrors.password = 'Password must contain at least one uppercase letter';
      }
      if (!/[!@#$%^&*]/.test(password)) {
        tempErrors.password = 'Password must contain at least one special character';
      }
      if (password.length < 8) {
        tempErrors.password = 'Password must be at least 8 characters long';
      }
    }

    setErrors(tempErrors);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 shadow-border rounded-lg lg:max-w-xl">
        <img src="supp-logo.png" alt="logo" className="mx-auto w-48 h-48"></img>
        <h1 className="text-3xl font-bold text-center text-gray-56 m-10">Log in</h1>
        <form className="mt-6" onSubmit={validateForm}>
          <div className="mb-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-90 rounded-md hover:bg-black">
              Submit
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-56">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page