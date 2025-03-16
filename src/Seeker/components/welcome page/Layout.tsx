
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Background from './Background';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-navy-900">
      <Background />
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
