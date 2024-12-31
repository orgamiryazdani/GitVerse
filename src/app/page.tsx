import { BsChevronCompactDown } from 'react-icons/bs';
import { Button } from './_components/button';
import Image from 'next/image';

export const metadata = {
  title: 'گیت ورس آنالیز گیت هاب فالوور فالووینگ آنفالو و ریپازیتوری',
  description:
    'آنالیز گیت‌هاب شامل بررسی فعالیت‌های ریپازیتوری‌ها، فالوور‌ها، فالووینگ‌ها، فالو بک‌ها و تنظیمات پروفایل مثل نمایش ریپازیتوری‌های پرایوت و تغییر تصویر پروفایل',
  alternates: {
    canonical: 'https://git-verse.vercel.app',
  },
};

export default function Home() {
  return (
    <main className="min-h-[89svh] w-svw flex items-center justify-center flex-col">
      <section className="w-full max-w-8xl min-h-[72vh] flex flex-col lg:flex-row items-center">
        <section className="lg:w-1/2 w-full lg:h-full min-h-[36vh] flex flex-col items-start lg:justify-center lg:gap-y-7 gap-y-5 lg:pr-10 p-5 dark:text-white text-black">
          <h3 className="dark:text-light-300 lg:text-sm text-xs">برای دسترسی بیشتر به امکانات وارد شوید</h3>
          <h1 className="lg:text-5xl text-2xl font-bold">گیت وِرس پلتفرم آنالیز گیت هاب</h1>
          <h2 className="lg:text-2xl text-sm font-light lg:leading-[55px] leading-10">
            امکان مشاهده فالووینگ ها فالوور ها و آنفالو خودکار یا دستی
            <br />
            مشاهده فعالیت های مربوط به ریپازیتوری های کاربر
          </h2>
          <div className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 w-full">
            <Button variant="light-100" isOutline className="font-bold text-lg">
              رایگان امتحان کنید
            </Button>
            <Button className="font-bold text-lg" variant="light-200">
              ورود با حساب گیت هاب
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
          <span>60 درخواست رایگان</span>
          <span>5000+ درخواست با ورود</span>
        </section>
        <section className="w-full min-h-[2rem] text-white text-3xl flex items-center justify-center h-1/2 relative">
          <BsChevronCompactDown className="up-down-icon-animation text-light-100 absolute" />
        </section>
      </footer>
    </main>
  );
}
