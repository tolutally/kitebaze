import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage.jsx';
import WorkflowBuild from './pages/WorkflowBuild.jsx';
import InHouseAgent from './pages/InHouseAgent.jsx';
import ContactForm from './pages/ContactForm.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="workflow-build" element={<WorkflowBuild />} />
          <Route path="bottleneck" element={<InHouseAgent />} />
          <Route path="in-house-agent" element={<Navigate to="/bottleneck" replace />} />
          <Route path="contact-form" element={<ContactForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
