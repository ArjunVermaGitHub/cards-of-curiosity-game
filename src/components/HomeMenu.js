'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShareModal from './ShareModal';
import styles from './HomeMenu.module.scss';

export default function HomeMenu() {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    router.prefetch('/choose-set');
    router.prefetch('/request-question');
    router.prefetch('/feedback');
    router.prefetch('/settings');
  }, [router]);
  
  const menuOptions = [
    { id: 'choose-set', text: 'Choose a set.' },
    { id: 'feedback', text: 'Feedback' },
    { id: 'suggest', text: 'Suggest questions' },
    { id: 'settings', text: 'Settings' },
    { id: 'share', text: 'Share' },
    { id: 'buy-paper', text: 'Buy a paper set' }
  ];

  const handleMenuClick = (optionId) => {
    switch(optionId) {
      case 'choose-set':
        router.push('/choose-set');
        break;
      case 'suggest':
        router.push('/request-question');
        break;
      case 'feedback':
        router.push('/feedback');
        break;
      case 'share':
        setShowShareModal(true);
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.homeMenu}>
      {/* Menu Container */}
      <div className={styles.menuContainer}>
        <h1 className={styles.menuTitle}>Menu</h1>
        
        <div className={styles.menuGrid}>
          {menuOptions.map((option) => (
            option.id === 'buy-paper' ? (
              <a
                key={option.id}
                href="https://cardsofcuriosity.in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuOption}
              >
                {option.text}
              </a>
            ) : (
              <button
                key={option.id}
                className={styles.menuOption}
                onClick={() => handleMenuClick(option.id)}
              >
                {option.text}
              </button>
            )
          ))}
        </div>
      </div>
      
      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
      />
    </div>
  );
}
