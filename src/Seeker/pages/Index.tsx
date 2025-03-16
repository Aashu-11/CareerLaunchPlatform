import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/welcome page/ui/toast';
import Layout from '../components/welcome page/Layout';
import Hero from '../components/welcome page/Hero';
import UserSelection from './UserSelection';

const Index = () => {
  const [userSelection, setUserSelection] = useState<'seeker' | 'recruiter' | null>(null);
  const navigate = useNavigate();

  const handleUserSelect = (role: 'seeker' | 'recruiter') => {
    setUserSelection(role);
    
    if (role === 'seeker') {
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="pages-index flex flex-col min-h-screen text-navy">
        {/* Hero Section */}
        <Hero />
        
        {/* User Selection Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
          <UserSelection onSelect={handleUserSelect} />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
