import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App as CapApp } from '@capacitor/app'
import { SplashScreen } from '@capacitor/splash-screen'
import App from '../daily-reps-tracker.jsx'

// Hide the native splash screen once the web content is ready
SplashScreen.hide({ fadeOutDuration: 300 }).catch(() => {})

// Prevent the hardware back button from closing the app on Android
// (no-op on iOS but harmless)
CapApp.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    CapApp.exitApp()
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
