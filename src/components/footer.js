import React from 'react'
import injected from '../injected.json'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslate } from '../hooks/useTranslate'
import { getIcon } from '../icons/socials'

export default function Footer() {
  const { t } = useTranslate()

  return (
    <footer>
      <div className={`p-6 md:p-8 w-full max-w-screen-xl mx-auto text-white`}>
        <div className='my-20 grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-4'>
          <div className='flex flex-col gap-4 text-white/70'>
            <Link href={'/'}>
              <Image width={80} height={60} src='/logo-inverted.png' alt={`Logo`} />
            </Link>
          </div>
          <div className='flex flex-col gap-4 text-white/70'>
            <div className='font-bold text-white'>{injected.companyName}</div>
            <div>{injected.tva}</div>
            <Link href={`tel:${injected.tel}`}>
              <div className='hover:text-primary-500 transition-all ease-in-out duration-300'>
                {injected.tel}
              </div>
            </Link>
            <Link href={`mailto:${injected.email}`}>
              <div className='hover:text-primary-500 transition-all ease-in-out duration-300'>
                {injected.email}
              </div>
            </Link>
            <div>{injected.address.address}</div>
          </div>
          <div className='flex flex-col gap-4 text-white/70'>
            <div className='font-bold text-white'>{t('footer.navigation')}</div>
            <div className='flex flex-col gap-4'>
              {injected.pages.map((item, index) => (
                <div className='flex flex-row gap-5 text-md hover:text-primary-500' key={index}>
                  <Link href={item.link}>{t(item.title)}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className='flex gap-5 flex-col text-white/70'>
            <div className='font-bold text-white'>{t('footer.follow')}</div>
            <div className='flex gap-5 flex-row'>
              {injected.socials.map((item, index) => (
                <Link key={index} href={item.link} className={'text-white hover:text-primary-500'}>
                  {getIcon(item.title)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary-500 text-background-900 w-full'>
        <div className='p-6 md:p-8 mx-auto leading-normal max-w-screen-xl flex flex-col md:flex-row gap-8 justify-center items-center text-xs'>
          <div className='flex flex-col md:flex-row items-center gap-2'>
            {injected.sla.map((item, index) => (
              <Link
                key={index}
                className='text-sm md:text-md leading-normal hover:font-bold transition-all ease-in-out duration-300'
                href={item.link}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
