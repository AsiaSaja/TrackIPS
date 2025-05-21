import '../css/app.css';  
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';

// Configure Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const token = document.querySelector('meta[name="csrf-token"]');
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Make axios available globally for debugging
window.axios = axios;

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})

// Import ziggy route helper for use in inertia pages
import { route } from 'ziggy-js';
window.route = route;