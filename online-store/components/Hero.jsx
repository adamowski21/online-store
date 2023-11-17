import Link from 'next/link'
import React from 'react'

const Hero = () => {

  return (
    <section className="container mx-auto flex-col flex md:flex-row gap-6 justify-center">
      <div>
        <Link href="/creatine">
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img src="/creatine.png"
              alt="creatine"
              className="w-full h-96 cursor-pointer object-cover max-w-xs transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute left-0 bottom-0 p-4 text-white text-3xl font-bold">
              <p> Muscle Build</p>
            </div>
          </div>
        </Link>
      </div>

      <div>
        <Link href="/protein">
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img src="/protein2.jpg"
              alt="protein"
              className="w-full h-96 cursor-pointer object-cover max-w-xs transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute left-0 bottom-0 p-4 text-white text-3xl font-bold">
              <p> Muscle Recovery</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-col flex gap-4">
        <Link href="/pre-workout">
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img src="/pre-workout.jpeg"
              alt="pre-workout"
              className="w-full h-44 object-cover cursor-pointer max-w-xs transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute left-0 bottom-0 p-4 text-white text-3xl font-bold">
              <p> Pre-workout</p>
            </div>
          </div>
        </Link>

        <Link href="/vitamins">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img src="/vitamins.jpg"
              alt="vitamins"
              className="w-full h-48 object-cover cursor-pointer max-w-xs transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute left-0 bottom-0 p-4 text-white text-3xl font-bold">
              <p> Immune Boost</p>
            </div>
          </div>
        </Link>
      </div>
      
      <div>
      <Link href="/equipment">
          <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <img src="/equipment.jpg" 
              alt="equipment"
              className="w-full h-96 cursor-pointer object-cover max-w-xs transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute left-0 bottom-0 p-4 text-white text-3xl font-bold">
              <p> Gym Equipment</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Hero
