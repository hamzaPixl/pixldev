import React from 'react'
import injected from '../injected.json'
import Image from 'next/image'
import Link from 'next/link'
import Button from './button'
import { useTranslate } from '../hooks/useTranslate'
import { useScrollPosition } from '../hooks/useScrollPostition'
import { cn } from '../utils/cn'
import ChatIcon from '../icons/chat'
import getIcon from '../icons/icon'
import BurgerIcon from './burger'

export default function Header() {
  const scrollPosition = useScrollPosition()
  const { t } = useTranslate()
  return (
    <nav
      className={cn(
        'z-50 sticky top-0 mx-auto overflow-auto transition-all duration-300 ease-in-out shadow-sm text-white',
        scrollPosition > 0 ? 'py-5 bg-background-900' : 'py-5',
      )}
    >
      <div className={`py-5 px-5 w-full max-w-screen-xl mx-auto`}>
        <div className='font-bold leading-normal w-full flex flex-row gap-2 items-center justify-between'>
          <Link href={'/'} className='md:hidden block'>
            <Image width={100} height={60} src='/logo-inverted.png' alt={`Logo`} />
          </Link>
          <Link href={'/'} className='hidden md:block'>
            <Image width={80} height={60} src='/logo-inverted.png' alt={`Logo`} />
          </Link>
          <div className='md:flex md:flex-row gap-4 hidden'>
            {injected.pages
              .filter((i) => !i.hideHeader)
              .map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className='text-white font-normal text-sm md:text-md leading-normal flex flex-row gap-1 items-center py-2 hover:text-primary-600 transition-all ease-in-out duration-300'
                >
                  {item.icon && getIcon(item.icon)}
                  {t(item.title)}
                </Link>
              ))}
          </div>
          <div className='block sm:hidden'>
            <button
              data-collapse-toggle='navbar-hamburger'
              type='button'
              className='inline-flex items-center justify-center p-2 focus:outline-none focus:ring-0'
              aria-controls='navbar-hamburger'
              aria-expanded='false'
            >
              <BurgerIcon />
            </button>
          </div>
          <div className='hidden sm:block'>
            <Button message={t('header.contact')} link='/contact' primary={true}>
              <ChatIcon />
            </Button>
          </div>
        </div>
        <div
          className='hidden w-full mt-10 pb-5 border-primary-500 border-b-2 text-center'
          id='navbar-hamburger'
        >
          {injected.pages
            .filter((i) => !i.hideHeader)
            .map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className='text-white font-normal mb-2 text-lg leading-normal flex flex-row gap-10 items-center py-2 hover:text-primary-600 transition-all ease-in-out duration-300'
              >
                {item.icon && getIcon(item.icon)}
                {t(item.title)}
              </Link>
            ))}
          <Button
            message={t('header.contact')}
            link='/contact'
            primary={true}
            className='mt-5 w-full'
          >
            <ChatIcon />
          </Button>
        </div>
      </div>
    </nav>
  )
}
