import React from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import Button from '../button'
import { useRouter } from 'next/router'

export default function ContactForm({ formSuccess, handleSubmit, formError }) {
  const { t } = useTranslate()
  const router = useRouter()
  return (
    <form
      method='POST'
      onSubmit={handleSubmit}
      name='contact'
      netlify-honeypot='bot-field'
      action={router.pathname}
      data-netlify='true'
      className='grid grid-cols-2 gap-8 mx-auto max-w-screen-md items-center'
    >
      <input type='hidden' name='form-name' value='contact' />
      <p className='hidden'>
        <label>
          Don’t fill this out if you’re human: <input name='bot-field' />
        </label>
      </p>
      <div className='flex flex-col gap-2 items-left'>
        <label className='text-sm my-2 text-white/50'>{t('contact.form.firstName')}</label>
        <input
          type='text'
          name='first-name'
          className='shadow-sm text-white bg-background-900 border-b-2 border-0 focus:border-white focus:ring-0 focus:outline-0'
          required
        />
      </div>
      <div className='flex flex-col gap-2 items-left'>
        <label className='text-sm my-2 text-white/50'>{t('contact.form.lastName')}</label>
        <input
          type='text'
          name='last-name'
          className='shadow-sm text-white bg-background-900 border-b-2 border-0 focus:border-white focus:ring-0 focus:outline-0'
          required
        />
      </div>
      <div className='col-span-2 flex flex-col gap-2 items-left'>
        <label className='text-sm my-2 text-white/50'>{t('contact.form.email')}</label>
        <input
          type='email'
          name='email'
          className='shadow-sm text-sm text-white bg-background-900 border-b-2 border-0 focus:border-white focus:ring-0 focus:outline-0'
          required
        />
      </div>
      <div className='col-span-2 flex flex-col gap-2 items-left'>
        <label className='text-sm my-2 text-white/50'>{t('contact.form.phoneNumber')}</label>
        <input
          type='tel'
          name='phone-number'
          className='shadow-sm text-white bg-background-900 border-b-2 border-0 focus:border-white focus:ring-0 focus:outline-0'
          required
        />
      </div>
      <div className='col-span-2'>
        <label className='text-sm my-2 text-white/50'>{t('contact.form.message')}</label>
        <textarea
          name='message'
          rows='6'
          className='w-full text-sm shadow-sm text-white bg-background-900 border-b-2 border-0 focus:border-white focus:ring-0 focus:outline-0'
        ></textarea>
        {formSuccess && (
          <div className='mt-4 text-white p-2 bg-green-500 rounded-2xl text-center'>
            {formSuccess.message}
          </div>
        )}
        {formError && (
          <div className='mt-4 text-white p-2 bg-red-500 rounded-2xl text-center'>
            {formError.message}
          </div>
        )}
      </div>
      <Button message={t('contact.form.submit')} primary={true} className='col-span-2' />
    </form>
  )
}
