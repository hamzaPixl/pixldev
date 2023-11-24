import Image from 'next/image'
import { useTranslate } from '../hooks/useTranslate'
import PlusIcon from '../icons/plus'
import HintIcon from '../icons/hint'

export default function Services({ services }) {
  const { t } = useTranslate()
  return (
    <section className='my-20 w-full'>
      <div>
        <div className='mb-6 lg:mb-8 flex flex-row gap-4 text-white'>
          <HintIcon />
          <h2 className='text-3xl lg:text-4xl tracking-tight font-extrabold text-left'>
            {t('home.services.title')}
          </h2>
        </div>
        <div>
          <div
            id='services-flush'
            data-accordion='collapse'
            data-active-classes='text-white'
            data-inactive-classes='text-white/60'
          >
            {services.map((item, index) => (
              <div key={index}>
                <h2 id={`services-flush-heading-${index + 1}`}>
                  <button
                    type='button'
                    className='flex justify-between items-center py-5 w-full font-medium text-left'
                    data-accordion-target={`#services-flush-body-${index + 1}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`services-flush-body-${index + 1}`}
                  >
                    <div className='flex flex-row gap-4 items-center'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={40}
                        className='rounded-xl h-6 sm:h-10 object-cover w-20 sm:w-32'
                      />
                      <span className='text-lg sm:text-xl font-bold'>{t(item.title)}</span>
                    </div>
                    <PlusIcon />
                  </button>
                </h2>
                <div
                  id={`services-flush-body-${index + 1}`}
                  aria-labelledby={`services-flush-heading-${index + 1}`}
                >
                  <div className='py-5'>
                    <p className='mb-2 text-white'>{t(item.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
