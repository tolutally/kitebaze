import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import RouteMetadata from './components/RouteMetadata.jsx';
import './index.css';

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage.jsx'));
const WorkflowBuild = lazy(() => import('./pages/WorkflowBuild.jsx'));
const InHouseAgent = lazy(() => import('./pages/InHouseAgent.jsx'));
const ContactForm = lazy(() => import('./pages/ContactForm.jsx'));
const BookWorkflowReview = lazy(() => import('./pages/BookWorkflowReview.jsx'));
const Diagnostics = lazy(() => import('./pages/Diagnostics.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse.jsx'));
const VulnerabilityDisclosure = lazy(() => import('./pages/VulnerabilityDisclosure.jsx'));
const ResponsibleAutomation = lazy(() => import('./pages/ResponsibleAutomation.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouteMetadata />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="about" element={<Navigate to="/about-us" replace />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="workflow-build" element={<WorkflowBuild />} />
            <Route path="workflow" element={<Navigate to="/workflow-build" replace />} />
            <Route path="bottleneck" element={<InHouseAgent />} />
            <Route path="in-house-agent" element={<Navigate to="/bottleneck" replace />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="contact-form" element={<Navigate to="/contact" replace />} />
            <Route path="book-workflow-review" element={<BookWorkflowReview />} />
            <Route path="workflow-discovery" element={<Navigate to="/book-workflow-review" replace />} />
            <Route path="diagnostics" element={<Diagnostics />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfUse />} />
            <Route path="terms-of-use" element={<Navigate to="/terms-of-service" replace />} />
            <Route path="vulnerability-disclosure" element={<VulnerabilityDisclosure />} />
            <Route path="responsible-automation" element={<ResponsibleAutomation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
