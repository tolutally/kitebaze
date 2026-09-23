import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import './index.css';

const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage.jsx'));
const WorkflowBuild = lazy(() => import('./pages/WorkflowBuild.jsx'));
const InHouseAgent = lazy(() => import('./pages/InHouseAgent.jsx'));
const ContactForm = lazy(() => import('./pages/ContactForm.jsx'));
const BookWorkflowReview = lazy(() => import('./pages/BookWorkflowReview.jsx'));
const Diagnostics = lazy(() => import('./pages/Diagnostics.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="workflow-build" element={<WorkflowBuild />} />
            <Route path="bottleneck" element={<InHouseAgent />} />
            <Route path="in-house-agent" element={<Navigate to="/bottleneck" replace />} />
            <Route path="contact-form" element={<ContactForm />} />
            <Route path="book-workflow-review" element={<BookWorkflowReview />} />
            <Route path="workflow-discovery" element={<BookWorkflowReview />} />
            <Route path="diagnostics" element={<Diagnostics />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
