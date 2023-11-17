import Link from 'next/link'
import React from 'react'

const FeaturedBanner = () => {
  return (
    <section id="banner">
        <div className="container">
            <div className="featured-banner-container">
                <div className="featured-left">
                    <h2 className="banner-title">Gain muscle with us</h2>
                    <p className="featured-desc">Check out our high class creatine offer</p>
                    <Link href="/creatine">
                        <button className="actionBtn" type="button"> SHOP NOW</button>
                    </Link>
                </div>
                <div className="featured-right">
                    <img src="top-banner.jpg"
                        alt="top-banner"
                        className="banner-img"
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default FeaturedBanner