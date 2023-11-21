import Link from 'next/link'
import React from 'react'
import { cn } from '../utils/cn'
import Image from 'next/image'

export default function Button({ message, link, icon, primary, secondary, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-3xl px-4 py-3 transition-all ease-in-out duration-300 font-bold text:xs md:text-md leading-normal',
        primary &&
          'hover:text-primary-500 hover:bg-background-900 bg-primary-500 text-background-900',
        secondary && 'hover:text-white hover:bg-primary-500 bg-background-900 text-primary-500',
        className,
      )}
      type='submit'
    >
      {link ? (
        <Link href={link}>
          <div className='inline-flex justify-center items-center px-2'>
            {icon && <Image src={icon} alt='icon' width={20} height={20} loading='lazy' />}
            <span>{message}</span>
          </div>
        </Link>
      ) : (
        <div className='inline-flex justify-center items-center px-2'>
          {icon && <Image src={icon} alt='icon' width={20} height={20} loading='lazy' />}
          <span>{message}</span>
        </div>
      )}
    </button>
  )
}
