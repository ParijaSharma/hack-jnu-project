import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google' // Import Provider
import App from "./App";
import './index.css'

// Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Client ID from Google Cloud Console
const clientId = "712992482660-0lhsst8cb860tohq9f8pfmjqub3jqhql.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)