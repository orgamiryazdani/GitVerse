import { BsChevronCompactDown } from 'react-icons/bs';
import { Button } from './_components/button';
import Image from 'next/image';
import { getDictionary } from './dictionaries';
import { lang } from '@/types/languages';
import { FramerMotionAnimation } from './_components/framer-motion';
import { Counter } from './_components/counter';
import { RepoAnalysis } from './_components/repo-analysis';

const arrowVariants = {
  initial: {
    y: -15,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut',
    },
  },
};

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
    <main className="min-h-[89vh]  w-vw flex items-center justify-center flex-col">
      <section className="w-full max-w-8xl min-h-[72vh] md:max-h-[500px] flex flex-col lg:flex-row items-center">
        <section
          className={`lg:w-1/2 w-full lg:h-full min-h-[36vh] flex flex-col items-start lg:justify-center lg:gap-y-7 gap-y-5 ${lang === 'fa' ? 'lg:pr-10' : 'lg:pl-10'} p-5 dark:text-white text-black`}
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
      <footer className="w-full h-[10vh] md:h-[17vh] max-h-[125px] max-w-8xl flex flex-col md:justify-center">
        <section className="h-1/2 min-h-[50px] flex flex-row items-center justify-center lg:gap-20 gap-5 dark:text-light-300 font-bold md:text-2xl text-sm">
          <div className="flex items-center justify-center">
            <div className="md:w-8 w-5">
              <Counter endNumber={60} />
            </div>
            <span className={lang === 'fa' ? 'mb-1' : ''}>{dict.free_requests}</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center md:w-[84px] w-12 gap-x-[1px]">
              <div className={lang === 'fa' ? 'mb-1' : ''}>+</div>
              <Counter endNumber={5000} />
            </div>
            <span className={lang === 'fa' ? 'mb-1' : ''}>{dict.premium_requests}</span>
          </div>
        </section>
        <FramerMotionAnimation
          tag="section"
          initial="initial"
          animate="animate"
          variants={arrowVariants}
          className="w-full min-h-[50px] text-white text-3xl flex items-center justify-center h-1/2 -z-10"
        >
          <BsChevronCompactDown className="dark:text-light-100 text-dark-100" />
        </FramerMotionAnimation>
      </footer>
      <RepoAnalysis />
    </main>
  );
}
