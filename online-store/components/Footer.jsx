import { FOOTER_LINKS, FOOTER_CONTACT_INFO, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import logoPng from '@/public/supp-logo-white.svg'
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer margin">
      <div className="padding-container max-container flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-[10%] md:flex-row">
          {/* <Link href="/" className="mb-10">
            <Image src={logoPng} alt="logo" width={74} height={29} className="" />
          </Link> */}

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
            {FOOTER_LINKS.map((columns) => (
              <FooterColumn title={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {columns.links.map((link) => (
                    <Link href="/" key={link}>
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link href="/" key={link.label} className="flex gap-4 md:flex-col lg:flex-row text-white">
                    <p className="whitespace-nowrap">
                      {link.label}:
                    </p>
                    <p className="medium-14 whitespace-nowrap text-white">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex gap-4 text-white">
                  {SOCIALS.links.map((link) => (
                    <Link href="/" key={link}>
                      <Image src={link} alt="logo" width={24} height={24} />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        <Link href="/" className="flex justify-center">
          <Image src={logoPng} alt="logo" width={74} height={29} className="" />
        </Link>

        <div className="bg-gray-20" />
        <p className="regular-14 w-full text-center text-white">2023 SuppStore | All rights reserved</p>
      </div>
    </footer>
  )
}

const FooterColumn = (props) => {
  const { title, children } = props
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap text-white">
        {title}
      </h4>
      {children}
    </div>
  )
}

export default Footer