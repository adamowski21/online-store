import Link from 'next/link'
import React from 'react'

const LowerFeaturedBanner = () => {
  return (
    <section id="banner">
        <div className="container">
            <div className="featured-banner-container">
                <div className="featured-right">
                    <img src="bottom-banner.jpg"
                        alt=""
                        className="banner-img"
                    />
                </div>
                <div className="featured-left">
                    <h2 className="banner-title">Whey protein</h2>
                    <p className="featured-desc">See our offer of the best quality whey proteins</p>
                    <Link href="/protein">
                        <button className="actionBtn" type="button"> SHOP NOW</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LowerFeaturedBanner