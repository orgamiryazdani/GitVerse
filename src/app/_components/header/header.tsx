import { TopNavigation } from './top-navigation';
import HeaderUserSection from './header-user-section';

export const Header: React.FC = async () => {
  return (
    <header className="dark:text-white w-full h-[11vh] dark:bg-dark-200 flex">
      <div className="container flex items-center justify-between max-w-8xl">
        <TopNavigation />
        <span className="mr-auto ml-3">
          <HeaderUserSection />
        </span>
      </div>
    </header>
  );
};
