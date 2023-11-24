import React from 'react'
import Layout from '../container/layout'
import injected from '../injected.json'
import CTA from '../components/cta'
import { useTranslate } from '../hooks/useTranslate'
import Link from 'next/link'
import MoreIcon from '../icons/more'
import Image from 'next/image'

export default function Projects() {
  const { t } = useTranslate()
  return (
    <Layout>
      <div className='w-full flex flex-col md:flex-row gap-10 justify-between text-center md:text-end items-center text-white text-xl border-2 border-white/50 rounded-xl'>
        <h1 className='font-bold p-5'>Our Work</h1>
        <p className='max-w-2xl p-5'>
          We’ve worked with a wide range of businesses, from startups to enterprises. We are
          confident that we can help you achieve your goals.
        </p>
      </div>
      <div className='gap-10 my-8 grid sm:mt-12'>
        {injected.projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            className='text-white font-bold flex flex-col gap-4 px-5 py-5 rounded-xl relative overflow-hidden'
          >
            <Image
              width={900}
              height={300}
              src={project.image}
              className='relative rounded-xl h-96 object-cover w-screen'
              alt='project illustration'
            />
            <div className='absolute bottom-0 right-0 rounded-2xl mr-10 sm:mr-20 mb-20 py-5 pl-5 pr-10 bg-background-900 text-white text-base flex flex-col gap-2  ease-in-out duration-500 hover:rotate-6 hover:scale-125'>
              <h2 className='font-extrabold'>{t(project.name)}</h2>
              <div className='text-primary-500 flex flex-row items-center gap-5'>
                <p>Learn more</p>
                <MoreIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CTA title='Ready to get started?' description='Get in touch or create an account.' />
    </Layout>
  )
}
