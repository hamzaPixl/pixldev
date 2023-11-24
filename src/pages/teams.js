import React from 'react'
import Layout from '../container/layout'
import injected from '../injected.json'
import CTA from '../components/cta'
import { useTranslate } from '../hooks/useTranslate'
import Image from 'next/image'

export default function Team() {
  const { t } = useTranslate()
  return (
    <Layout>
      <div className='w-full flex flex-col md:flex-row gap-10 justify-between text-center md:text-end items-center text-white text-xl border-2 border-white/50 rounded-xl'>
        <h1 className='font-bold p-5'>Our Team</h1>
        <p className='max-w-2xl p-5'>
          Meet the individuals behind our mission, turning your business into a digital reality.
        </p>
      </div>
      <div className='gap-4 my-8 sm:grid grid-cols-3 sm:mt-12'>
        {injected.teams.map((member, index) => (
          <div key={index} className='rounded-xl border-2 border-white/50 m-2'>
            <Image
              width={600}
              height={100}
              src={member.image}
              className='rounded-t-xl h-60 object-cover'
              alt='member gallery'
            />
            <div className='text-white font-bold rounded-xl flex flex-col gap-4 px-5 py-5'>
              <h2 className='text-2xl font-extrabold text-white'>{member.name}</h2>
              <p className='text-xl text-white/50'>{t(member.role)}</p>
            </div>
          </div>
        ))}
      </div>
      <CTA title='Ready to get started?' description='Get in touch or create an account.' />
    </Layout>
  )
}
