import { useTranslate } from '../hooks/useTranslate'
import Image from 'next/image'

export default function Usps({ usps }) {
  const { t } = useTranslate()
  return (
    <section>
      <div className='gap-4 my-8 sm:grid grid-cols-3 sm:mt-12'>
        {usps.map((usp, index) => (
          <div className='rounded-xl border-2 border-white/50 m-2' key={index}>
            <Image
              width={600}
              height={200}
              src={usp.image}
              className='rounded-t-xl h-60 object-cover'
              alt='usp gallery'
            />
            <div className='text-white font-bold rounded-xl flex flex-col gap-4 px-5 py-5'>
              <h2 className='text-2xl font-extrabold'>{t(usp.name)}</h2>
              <p className='text-xl opacity-60'>{t(usp.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
