import Link from 'next/link';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col w-[99.8vw] h-[89vh] dark:text-white text-black gap-y-5 text-xl items-center justify-center">
      <Link className="border-b" href="https://github.com/orgamiryazdani">
        Amir Yazdani Github
      </Link>
      <Link className="border-b" href="https://www.linkedin.com/in/amiryazdanii">
        Amir Yazdani Linkedin
      </Link>
      <Link className="border-b" href="https://wa.me/989174510960">
        Amir Yazdani Whatsapp
      </Link>
      <Link className="border-b" href="mailto:orgamiryazdani@gmail.com">
        Amir Yazdani Gmail
      </Link>
      <Link className="border-b" href="https://t.me/amiiiirryz">
        Amir Yazdani Telegram
      </Link>
    </div>
  );
};

export default AboutUs;
