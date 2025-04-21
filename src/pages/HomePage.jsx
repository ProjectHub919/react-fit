
import React from 'react';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import StatsMarquee from '../components/StatsMarquee';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactForm from '../components/ContactForm';

//Main landing page component of the application.
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSection />
      <StatsMarquee />
      <TestimonialsSection />
      <ContactForm />
    </>
  );
}