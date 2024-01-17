"use client"
import React, { useContext, useState } from 'react'
import Link from "next/link"
import InputField from '@/components/InputField'
import { useRouter } from 'next/navigation'
import { NavigationContext } from '@/components/NavigationContext'

const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { token, setToken } = useContext(NavigationContext);

  const router = useRouter();

  const validateForm = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!email) tempErrors.email = 'Email jest wymagany';
    if (!password) {
      tempErrors.password = 'Hasło jest wymagane';
    } else {
      if (!/[A-Z]/.test(password)) {
        tempErrors.password = 'Hasło musi zawierać co najmniej jedną wielką literę.';
      }
      if (!/[!@#$%^&*]/.test(password)) {
        tempErrors.password = 'Hasło musi zawierać co najmniej jeden znak specjalny.';
      }
      if (password.length < 8) {
        tempErrors.password = 'Hasło musi zawierać co najmniej 8 znaków.';
      }
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          const token = await response.text();

          localStorage.setItem('authToken', token);
          setToken(JSON.parse(token));

          console.log('Login successful:', token);
          router.push('/');
        } else {
          const errorData = await response.text();

          if (errorData.includes('Email is already used')) {
            setErrors({ email: 'This email is already in use' });
          } else {
            console.error('Login failed:', errorData);
            setErrors({ general: 'Nieprawidłowy email lub hasło' })
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'Nieprawidłowy email lub hasło' })
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 shadow-border rounded-lg lg:max-w-xl">
        <img src="supp-logo.svg" alt="logo" className="mx-auto w-48 h-48"></img>
        <h1 className="text-3xl font-bold text-center text-gray-56">Logowanie</h1>
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
              label="Hasło"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>
          {errors.general && (
            <div className="mt-4 text-sm text-center text-orange-500">
              {errors.general}
            </div>
          )}
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-[#383838]">
              Zatwierdź
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-56">
          Nie posiadasz konta?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page