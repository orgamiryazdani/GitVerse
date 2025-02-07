import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import { EmailForm } from './_components/email';
import { lang } from '@/types/languages';
import { getDictionary } from '../dictionaries';

type Params = Promise<lang>;

export async function generateMetadata({ params }: { params: Params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta_title_about,
    description: dict.meta_description_about,
    alternates: {
      canonical: `https://git-verse.vercel.app/${lang}/about-us`,
    },
  };
}

export default async function AboutUs({ params }: { params: Params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="dark:text-white text-dark-400 md:p-10 p-4 w-full max-w-[1500px] h-[89vh]">
        <h1 className="md:text-3xl text-2xl font-bold">{dict.about_us}</h1>
        <h2 className="md:text-lg text-sm font-bold mt-2">{dict.about_title}</h2>
        <EmailForm />
        <h3 className="mt-5 font-bold md:text-base text-sm">{dict.about_social_text}</h3>
        <div
          dir="ltr"
          className="flex flex-wrap gap-y-3 text-white w-full items-center gap-x-5 mt-5 pb-5 lg:pb-0 md:[&>*]:w-44 [&>*]:w-full [&>*]:h-14 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:gap-x-1 [&>*]:rounded-md [&>*]:text-lg"
        >
          <Link target="_blank" className="bg-black" href="https://github.com/orgamiryazdani">
            Github
            <FaGithub className="text-2xl md:mb-[4px] mb-[5px]" />
          </Link>
          <Link className="bg-[#0a66c1]" href="https://www.linkedin.com/in/amiryazdanii">
            Linkedin
            <FaLinkedin className="text-2xl md:mb-[4px] mb-[5px]" />
          </Link>
          <Link className="bg-[#0ec244]" href="https://wa.me/989174510960">
            Whatsapp
            <FaWhatsapp className="text-2xl md:mb-[3px] mb-[5px]" />
          </Link>
          <Link className="bg-[#ea4335]" href="mailto:orgamiryazdani@gmail.com">
            Gmail
            <SiGmail className="text-2xl md:mb-[4px] mb-[5px]" />
          </Link>
          <Link className="bg-[#2b9fd8]" href="https://t.me/amiiiirryz">
            Telegram
            <FaTelegram className="text-2xl md:mb-[3px] mb-[5px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
