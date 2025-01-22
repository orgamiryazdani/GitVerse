import { getDictionary } from './dictionaries';
import { lang } from '@/types/languages';
import { RepoAnalysis } from './_components/repo-analysis';
import { HomeHeroSection } from './_components/homeherosection';

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
      <HomeHeroSection dict={dict} lang={lang} />
      <RepoAnalysis />
    </main>
  );
}
