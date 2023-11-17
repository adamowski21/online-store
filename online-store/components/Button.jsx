import Image from 'next/image'
import React from 'react'

const Button = () => {
  return (
    <button className ="flexCenter gap-3 rounded-full border btn_dark_green" type="button">
        <Image src="/user.svg" alt="user" width={24} height={24} />
        Login
    </button>
  )
}

export default Button