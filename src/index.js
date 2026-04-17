import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Disable the browser's automatic scroll restoration so a refresh always
// lands the user at the top of the current page (otherwise the browser
// remembers mid-scroll positions, which is disorienting on a scroll-driven
// experience).
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
// Belt-and-suspenders: jump to the top before React mounts so there's no
// initial flash of a remembered scroll position.
window.scrollTo(0, 0);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
