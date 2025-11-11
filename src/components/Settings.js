'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignOutButton } from '@clerk/nextjs';
import styles from './Settings.module.scss';

export default function Settings() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModeEnabled);
    if (darkModeEnabled) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsContent}>
        <div className={styles.header}>
          <button 
            className={styles.backButton}
            onClick={() => router.back()}
          >
            ←
          </button>
          <h1 className={styles.settingsTitle}>Settings</h1>
        </div>
        
        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Appearance</h2>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingLabel}>Dark Mode</span>
              <span className={styles.settingDescription}>
                Switch between light and dark theme
              </span>
            </div>
            <button 
              className={styles.toggleButton}
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className={styles.toggleIcon}>{isDarkMode ? '☀️' : '🌙'}</span>
              <span className={styles.toggleText}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        </div>

        {isSignedIn && user && (
          <div className={styles.settingsSection}>
            <h2 className={styles.sectionTitle}>Account</h2>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>User Information</span>
                <span className={styles.settingDescription}>
                  {user.firstName || user.emailAddresses?.[0]?.emailAddress || 'User'}
                </span>
              </div>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingLabel}>Sign Out</span>
                <span className={styles.settingDescription}>
                  Sign out of your account
                </span>
              </div>
              <SignOutButton>
                <button className={styles.signOutButton}>
                  <span className={styles.signOutIcon}>🚪</span>
                  <span className={styles.signOutText}>Sign Out</span>
                </button>
              </SignOutButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

