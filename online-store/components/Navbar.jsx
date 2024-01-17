"use client"
import { NAV_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import React from 'react'
import logoPng from '@/public/supp-logo.svg'
import { NavigationContext } from './NavigationContext'

const Navbar = () => {

    const router = useRouter();

    const { token, setToken } = useContext(NavigationContext);

    const [userRole, setUserRole] = useState(null);

    const fetchUserRole = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/userDetails', {
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`,
                },
            });

            if (response.ok) {
                const { roles } = await response.json();
                setUserRole(roles.some(role => role.name === 'ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER');
            } else {
                console.error('Error fetching user details:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserRole();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        router.push('/login');
        console.log('Logout successful');
    };

    return (
        <nav className="flexBetween relative z-30 py-5 shadow-md px-36">
            <Link href="/">
                <Image src={logoPng} alt="logo" width={74} height={29} />
            </Link>
            <ul className="hidden h-full gap-12 lg:flex">
                {NAV_LINKS.map((link) => (
                    <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                        {link.label}
                    </Link>
                ))}
            </ul>
            <div className="lg:flexCenter hidden gap-28">
                {token ? (
                    <>
                        <Link href="/cart">
                            <Image src="/cart-button.svg"
                                alt="cart"
                                width={40}
                                height={40}
                                className="rounded-full hover:bg-gray-10 p-2"
                            />
                        </Link>
                        <Link href="/user">
                            <button className="lg:flexCenter">
                                <Image src="/user.svg"
                                    alt="user"
                                    width={32}
                                    height={32}
                                    className="flexCenter rounded-full border border-gray-20 bg-black hover:bg-[#383838] p-1"
                                />
                            </button>
                        </Link>
                        <button className="lg:flexCenter px-4 py-2 text-sm hover:underline" onClick={handleLogout}>
                            Wyloguj
                        </button>
                        {userRole === 'ROLE_ADMIN' && (
                            <Link href="/admin">
                                <Image src="/admin-icon.svg"
                                    alt="admin"
                                    width={48}
                                    height={48}
                                    className="rounded-full hover:bg-gray-10 p-2"
                                />
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <button className="flexCenter gap-3 rounded-full border btn_dark_green" type="button">
                                <Image src="/user.svg"
                                    alt="user"
                                    width={24}
                                    height={24}
                                />
                                Logowanie
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="flexCenter gap-3 rounded-full border btn_dark_green" type="button">
                                <Image src="/user.svg"
                                    alt="user"
                                    width={24}
                                    height={24}
                                />
                                Rejestracja
                            </button>
                        </Link>
                    </>
                )}
            </div>
            <Image src="/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer lg:hidden"
            />
        </nav>
    )
}

export default Navbar