import { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PipelinePage from './PipelinePage.jsx';
import './index.css';

class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-dvh items-center justify-center bg-kb-canvas p-6 text-center">
        <div>
          <p className="text-sm text-kb-ink">Something went wrong loading the pipeline.</p>
          <button type="button" className="mt-3 text-sm text-kb-accent-ink underline" onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <PipelinePage />
    </ErrorBoundary>
  </StrictMode>,
);
