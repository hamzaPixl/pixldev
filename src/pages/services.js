import React from 'react'
import Layout from '../container/layout'
import injected from '../injected.json'
import CTA from '../components/cta'
import Button from '../components/button'
import { useTranslate } from '../hooks/useTranslate'
import Link from 'next/link'
import MoreIcon from '../icons/more'
import Image from 'next/image'

export default function Services() {
  const { t } = useTranslate()
  return (
    <Layout>
      <div className='w-full flex flex-row gap-10 justify-between text-start items-center text-white rounded-xl border-2 border-white/50 font-bold text-2xl'>
        <h1 className='border-r-2 border-white/50 p-5'>Our Services</h1>
        <p className='p-5'>
          We’ve worked with a wide range of businesses, from startups to enterprises. We are
          confident that we can help you achieve your goals.
        </p>
      </div>
      <div className='gap-10 my-8 grid sm:mt-12'>
        {injected.services.map((service, index) => (
          <Link
            key={index}
            href={service.link}
            className='text-white font-bold flex flex-col gap-4 px-5 py-5 rounded-xl relative'
          >
            <Image
              loading='lazy'
              width={900}
              height={300}
              src={service.image}
              className='relative rounded-xl h-96 object-cover'
              alt='service illustration'
            />
            <div className='absolute bottom-0 right-0 rounded-2xl mr-20 mb-20 py-5 pl-5 pr-10 bg-background-900 text-white text-base flex flex-col gap-2'>
              <h2 className='font-extrabold'>{t(service.title)}</h2>
              <div className='text-primary-500 flex flex-row items-center gap-5'>
                <p>Learn more</p>
                <MoreIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CTA title='Ready to get started?' description='Get in touch or create an account.'>
        <Button className='w-full' link='/contact' primary={true} message='Contact Us' />
      </CTA>
    </Layout>
  )
}
