import { NAV_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import logoPng from '@/public/supp-logo.png'

const Navbar = () => {
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

        <div className="lg:flexCenter hidden gap-16">
            <Link href="/login">
                <Button />
            </Link>

            <Link href="/cart">
                <Image src="/cart-button.svg" 
                    alt="cart"
                    width={40}
                    height={40}
                    className="rounded-full hover:bg-gray-10 p-2"
                />
            </Link>

            <Link href="/user">
                <button className="lg:flexCenter hidden">
                    <Image src="/user.svg" 
                        alt="user"
                        width={32}
                        height={32}
                        className="flexCenter rounded-full border border-gray-20 bg-black hover:bg-[#383838] p-1"
                    />
                </button>
            </Link>
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