
import { useState, useRef } from 'react';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { SymptomDiagnosis } from '@/components/SymptomDiagnosis';
import { ImageDiagnosis } from '@/components/ImageDiagnosis';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const symptomsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      symptoms: symptomsRef,
      image: imageRef,
    };
    
    const targetRef = refs[section as keyof typeof refs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <div ref={homeRef}>
        <Hero onNavigate={scrollToSection} />
      </div>
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={symptomsRef}>
        <SymptomDiagnosis />
      </div>
      
      <div ref={imageRef}>
        <ImageDiagnosis />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
