import { BsChevronCompactDown } from 'react-icons/bs';
import { Button } from './_components/button';
import Image from 'next/image';

export const metadata = {
  title: 'گیت ورس | آنالیز گیت ها',
  description:
    'آنالیز گیت‌هاب شامل بررسی فعالیت‌های ریپازیتوری‌ها، فالوور‌ها، فالووینگ‌ها، فالو بک‌ها و تنظیمات پروفایل مثل نمایش ریپازیتوری‌های پرایوت و تغییر تصویر پروفایل',
  alternates: {
    canonical: 'https://git-verse.vercel.app',
  },
};

export default function Home() {
  return (
    <main className="h-[89vh] w-svw">
      <section className="w-full h-[72vh] flex">
        <section className="w-1/2 h-full flex flex-col items-start justify-center gap-y-7 pr-10 dark:text-white text-black">
          <h3 className="dark:text-light-300 text-sm">برای دسترسی بیشتر به امکانات وارد شوید</h3>
          <h1 className="text-5xl font-bold">گیت وِرس پلتفرم آنالیز گیت هاب</h1>
          <h2 className="text-2xl font-light leading-[55px]">
            امکان مشاهده فالووینگ ها فالوور ها و آنفالو خودکار یا دستی
            <br />
            مشاهده فعالیت های مربوط به ریپازیتوری های کاربر
          </h2>
          <div className="flex gap-x-5">
            <Button variant="light-100" isOutline className="font-bold text-lg">
              رایگان امتحان کنید
            </Button>
            <Button className="font-bold text-lg" variant="light-200">
              ورود با حساب گیت هاب
            </Button>
          </div>
        </section>
        <section className="w-1/2 h-full flex items-center justify-center">
          <Image width={550} height={550} alt="logo image" src="/images/homepageicon.webp" />
        </section>
      </section>
      <footer className="w-full h-[17vh] ">
        <div className="h-2/4 flex items-center justify-center gap-20 dark:text-light-300 font-bold text-2xl">
          <span>60 درخواست رایگان</span>
          <span>5000+ درخواست با ورود</span>
        </div>
        <div className="w-full text-white text-3xl flex items-center justify-center h-2/4">
          <BsChevronCompactDown className="up-down-icon-animation text-light-100" />
        </div>
      </footer>
    </main>
  );
}
