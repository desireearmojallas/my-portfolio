

import { useState } from 'react';
import LandingSection from './components/LandingSection';
import JourneySection from './components/JourneySection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [selectedRole, setSelectedRole] = useState<'designer' | 'developer' | null>(null);

  const handleRoleSelect = (role: 'designer' | 'developer') => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-pink-50/20" id="root">
      <Header />
      <main className="pt-16">
        <section id="home">
          <LandingSection onRoleSelect={handleRoleSelect} />
        </section>
        
        {selectedRole && (
          <>
            <section id="journey">
              <JourneySection role={selectedRole} />
            </section>
            <section id="projects">
              <ProjectsSection role={selectedRole} />
            </section>
          </>
        )}
        
        <section id="contact">
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;
