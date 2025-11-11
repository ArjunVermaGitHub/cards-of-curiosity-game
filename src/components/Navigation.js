'use client';

import Link from 'next/link';
import DarkModeButton from './DarkModeButton';
import styles from './Navigation.module.scss';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

export function Navigation() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className={styles.navigation}>
      <div className={styles.logo}>
        <Link href="/">Cards of Curiosity</Link>
      </div>

      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          <span className={styles.navText}>Home</span>
          <span className={styles.navIcon}>🏠</span>
        </Link>
        <Link href="/game" className={styles.navLink}>
          <span className={styles.navText}>Play Game</span>
          <span className={styles.navIcon}>🎮</span>
        </Link>
      </div>

      <div className={styles.authButtons}>
        <DarkModeButton />
        
        {isSignedIn && (
          <div className={styles.userSection}>
            <span className={styles.userName}>
              <span className={styles.userText}>Hello, {user.firstName || user.emailAddresses[0].emailAddress}!</span>
              <span className={styles.userIcon}>👤</span>
            </span>
            <SignOutButton>
        <button className={styles.textBtn}>
                <span className={styles.btnText}>Sign Out</span>
                <span className={styles.btnIcon}>🚪</span>
        </button>
            </SignOutButton>
          </div>
        )}
      </div>
    </nav>
  );
}
