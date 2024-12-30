import { TopNavigation } from './top-navigation';
import HeaderUserSection from './header-user-section';

export const Header: React.FC = async () => {
  return (
    <header className="dark:text-white w-full h-[11vh] dark:bg-dark-200 flex">
      <div className="container flex items-center justify-between">
        <TopNavigation />
        <span className="mr-auto">
          <HeaderUserSection />
        </span>
      </div>
    </header>
  );
};
