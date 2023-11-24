import React from 'react'
import Layout from '../container/layout'
import Image from 'next/image'
import ContactHandler from '../components/contact'

export default function Contact() {
  return (
    <Layout>
      <div className='w-full flex flex-col md:flex-row gap-10 justify-between text-center md:text-end items-center text-white text-xl border-2 border-white/50 rounded-xl'>
        <h1 className='font-bold p-5'>Get in touch</h1>
        <p className='max-w-2xl p-5'>
          Have a question or an exciting project in mind? We wouldd love to hear from you. Let us
          connect and create something amazing.
        </p>
      </div>
      <div className='flex flex-col gap-4 justify-between text-center items-center text-white my-20'>
        <p className='text-2xl font-bold'>Let’s connect and create</p>
        <p className='text-base text-white/60'>
          Have a question or an exciting project in mind? We wouldd love to hear from you. Let us
          connect and create something amazing.
        </p>
      </div>
      <div className='flex flex-col gap-10 justify-center items-center mx-auto px-5 md:px-20'>
        <Image
          src='/images/contact.png'
          width={500}
          height={500}
          alt='About'
          className='rounded-xl w-screen'
        />
        <p className='text-2xl font-bold'>Get in touch</p>
        <ContactHandler />
      </div>
    </Layout>
  )
}
