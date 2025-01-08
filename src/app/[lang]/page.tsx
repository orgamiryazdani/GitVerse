import { BsChevronCompactDown } from 'react-icons/bs';
import { Button } from './_components/button';
import Image from 'next/image';
import { getDictionary } from './dictionaries';
import { lang } from '@/types/languages';

type Params = Promise<lang>;

export async function generateMetadata({ params }: { params: Params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta_title_home,
    description: dict.meta_description_home,
    alternates: {
      canonical: 'https://git-verse.vercel.app',
    },
  };
}

export default async function Home({ params }: { params: Params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-[89svh] w-svw flex items-center justify-center flex-col">
      <section className="w-full max-w-8xl min-h-[72vh] flex flex-col lg:flex-row items-center">
        <section
          className={`lg:w-1/2 w-full lg:h-full min-h-[36vh] flex flex-col items-start lg:justify-center lg:gap-y-7 gap-y-5 ${lang === 'fa' ? 'lg:pr-10' : 'px-10'} p-5 dark:text-white text-black`}
        >
          <h3 className="dark:text-light-300 text-dark-300 lg:text-sm text-xs">{dict.access_more_features}</h3>
          <h1 className="lg:text-5xl text-2xl font-bold">{dict.platform_title}</h1>
          <h2 className="lg:text-2xl text-sm font-light lg:leading-[55px] leading-10">{dict.platform_description}</h2>
          <div className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 w-full">
            <Button variant="light-200" isOutline className="font-bold text-lg">
              {dict.try_for_free}
            </Button>
            <Button className="font-bold text-lg" variant="light-200">
              {dict.login_with_github}
            </Button>
          </div>
        </section>
        <section className="lg:w-1/2 w-full lg:h-full min-h-[36vh] flex items-center justify-center">
          <Image
            src="/images/homepageicon.webp"
            alt="logo image"
            width={550}
            height={311}
            className="w-[350px] lg:w-[550px]"
          />
        </section>
      </section>
      <footer className="w-full min-h-[17vh] flex flex-col md:justify-center">
        <section className="h-1/2 min-h-[8.5svh] flex flex-col lg:flex-row items-center justify-center lg:gap-20 gap-5 dark:text-light-300 font-bold md:text-2xl text-lg">
          <span>{dict.free_requests}</span>
          <span>{dict.premium_requests}</span>
        </section>
        <section className="w-full min-h-[2rem] text-white text-3xl flex items-center justify-center h-1/2 relative">
          <BsChevronCompactDown className="up-down-icon-animation dark:text-light-100 text-dark-100 absolute" />
        </section>
      </footer>
    </main>
  );
}
