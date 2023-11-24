import Link from 'next/link'
import { useTranslate } from '../hooks/useTranslate'
import HintIcon from '../icons/hint'
import Image from 'next/image'
import Button from './button'
import NextIcon from '../icons/next'

export default function Blog({ articles }) {
  const { t } = useTranslate()
  return (
    <section className='my-20'>
      <div className='mb-6 lg:mb-8 flex flex-row gap-4 text-white'>
        <HintIcon />
        <h2 className='text-3xl lg:text-4xl tracking-tight font-extrabold text-left'>
          {t('home.blog.title')}
        </h2>
      </div>
      <div className='gap-4 my-8 sm:grid grid-cols-3 sm:mt-12'>
        {articles.map((article, index) => (
          <Link key={index} href={article.link}>
            <div className='rounded-xl border-2 border-white/50 m-2'>
              <Image
                width={600}
                height={200}
                src={article.image}
                className='rounded-t-xl h-60 object-cover'
                alt='article gallery'
              />
              <div className='text-white font-bold rounded-xl flex flex-col gap-4 px-5 py-5'>
                <h2 className='text-2xl font-extrabold'>{t(article.name)}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Button
        className='w-full'
        link='/articles'
        primary={true}
        message={t('home.articles.button')}
      >
        <NextIcon />
      </Button>
    </section>
  )
}
