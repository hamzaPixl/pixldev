import React from 'react'
import Layout from '../container/layout'
import injected from '../injected.json'
import Teams from '../components/teams'
import Testimonials from '../components/testimonials'
import CTA from '../components/cta'
import Usps from '../components/usps'
import Image from 'next/image'

export default function About() {
  return (
    <Layout>
      <div className='flex flex-col gap-10 text-center justify-center text-white'>
        <h1 className='text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl'>
          Driven by passion. Guided by expertise.
        </h1>
        <div className='flex flex-col justify-center items-center mx-auto px-5 md:px-20'>
          <Image
            src='/images/about.png'
            width={500}
            height={500}
            alt='About'
            className='rounded-xl w-screen'
          />
          <div className='text-white flex flex-col sm:flex-row justify-between text-center sm:text-start gap-5 pt-10'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className='opacity-50'>
              Discover the essence and core of our vision. We are here to empower businesses, big
              and small, with cutting-edge digital solutions. Join us in the digital process.
            </p>
          </div>
        </div>
      </div>
      <Usps usps={injected.usps} />
      <Testimonials testimonials={injected.testimonials} />
      <Teams teams={injected.teams} />
      <CTA title='Ready to get started?' description='Get in touch or create an account.' />
    </Layout>
  )
}
