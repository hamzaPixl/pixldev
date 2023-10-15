import Image from 'next/image'
import { useTranslate } from '../hooks/useTranslate'

export default function FeatureList({ services }) {
  const { t } = useTranslate()
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto space-y-12 max-w-screen-xl lg:space-y-20 sm:py-16 lg:px-6 flex flex-col gap-10'>
        {services.map((service, index) => (
          <div
            className={`gap-8 items-center md:gap-16 flex justify-between flex-col ${
              index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
            key={index}
          >
            <Image
              className='w-full md:w-1/2'
              loading='lazy'
              width={300}
              height={60}
              src={service.image}
              alt={`feature illustration`}
            />

            <div className='text-black sm:text-lg flex-2'>
              <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-primary-600'>
                {t(service.title)}
              </h2>
              <p className='mb-8 font-light lg:text-xl'>{t(service.cta)}</p>
              <ul role='list' className='pt-8 my-7 space-y-5 border-t border-primary-600'>
                {service.features.map((feature, indexF) => (
                  <li className={`flex space-x-3`} key={indexF}>
                    <Image
                      loading='lazy'
                      width={10}
                      height={10}
                      alt='Contact hint illustration'
                      src={'/icons/hint.svg'}
                    />
                    <span className='text-base font-medium leading-tight'>{t(feature)}</span>
                  </li>
                ))}
              </ul>
              <p className='mb-8 font-light lg:text-xl'>{t(service.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
