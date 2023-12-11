"use client"
import React, { useState } from 'react'
import Link from "next/link"
import InputField from "@/components/InputField.jsx"

const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = async (e) => {
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
      if (password !== repeatPassword) {
        tempErrors.repeatPassword = 'Passwords must match';
      }
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        console.log(data);
        alert('Registration was successful');
        window.location.href = '/login';
      } else {
        console.error(data);
        if (data.includes('Email is already used')) {
          setErrors({ email: 'Email is already in use' })
        }
        alert('Registration failed: ' + data);
      }

    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 shadow-border rounded-lg lg:max-w-xl m-10">
        <img src="supp-logo.svg" alt="logo" className="mx-auto w-48 h-48"></img>
        <h1 className="text-3xl font-bold text-center text-gray-56">Sign up</h1>
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
            <InputField
              label="Repeat password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              error={errors.repeatPassword}
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-90 rounded-md hover:bg-black">
              Submit
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-56">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page