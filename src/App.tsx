import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteriorDesignStory } from './components/InteriorDesignStory';
import { MenuSection } from './components/MenuSection';
import { TastingMenuSection } from './components/TastingMenuSection';
import { SommelierRecommender } from './components/SommelierRecommender';
import { PrivateDiningSection } from './components/PrivateDiningSection';
import { TestimonialsReviews } from './components/TestimonialsReviews';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationZoneId, setReservationZoneId] = useState<string | undefined>();
  const [reservationNotes, setReservationNotes] = useState<string | undefined>();

  const handleOpenReservation = (menuOrNote?: string) => {
    if (menuOrNote) {
      setReservationNotes(`Menu souhaité : ${menuOrNote}`);
    } else {
      setReservationNotes(undefined);
    }
    setReservationZoneId(undefined);
    setIsReservationOpen(true);
  };

  const handleSelectZoneForReservation = (zoneId: string) => {
    setReservationZoneId(zoneId);
    setReservationNotes(undefined);
    setIsReservationOpen(true);
  };

  const handleOpenWithSommelierNotes = (notes: string) => {
    setReservationNotes(`Formule Sommelier : ${notes}`);
    setIsReservationOpen(true);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('carte');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0B0A] text-[#EDE5DA]">
      {/* Navigation */}
      <Navbar onOpenReservation={() => handleOpenReservation()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => handleOpenReservation()}
          onExploreMenu={handleExploreMenu}
        />

        {/* Interior Design & Architecture Story (Directly inspired by the photo) */}
        <InteriorDesignStory
          onSelectZoneForReservation={handleSelectZoneForReservation}
        />

        {/* Interactive Menu Section */}
        <MenuSection
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* Tasting Menus Section */}
        <TastingMenuSection
          onOpenReservation={(menuName) => handleOpenReservation(menuName)}
        />

        {/* Interactive Sommelier Recommender */}
        <SommelierRecommender
          onOpenReservationWithNotes={handleOpenWithSommelierNotes}
        />

        {/* Private Dining & Events */}
        <PrivateDiningSection />

        {/* Critical Acclaim & Press Proof */}
        <TestimonialsReviews />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenReservation={() => handleOpenReservation()} />

      {/* Reservation Wizard Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialZoneId={reservationZoneId}
        initialNotes={reservationNotes}
      />
    </div>
  );
}
