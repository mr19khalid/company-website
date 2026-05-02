import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import EnhancedHero from './components/EnhancedHero';
import EnhancedServices from './components/EnhancedServices';
import ServiceCalculator from './components/ServiceCalculator';
import ProjectTimeline from './components/ProjectTimeline';
import MaterialSelector3D from './components/MaterialSelector3D';
import AdvancedPortfolio from './components/AdvancedPortfolio';
import VirtualConsultation from './components/VirtualConsultation';
import AIEstimator from './components/AIEstimator';
// import ProjectDashboard from './components/ProjectDashboard';
import ARVisualizer from './components/ARVisualizer';
import ClientPortal from './components/ClientPortal';
// import ChatSystem from './components/ChatSystem';
import DocumentManager from './components/DocumentManager';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <EnhancedHero />
          <EnhancedServices />
          <ServiceCalculator />
          <ProjectTimeline />
          <MaterialSelector3D />
          <AdvancedPortfolio />
          <AIEstimator />
          {/* <ProjectDashboard /> */}
          <ARVisualizer />
          <ClientPortal />
          {/* <ChatSystem /> */}
          <DocumentManager />
          <VirtualConsultation />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
export {};
