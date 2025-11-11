'use client';

import React, { useState } from 'react';
import styles from './ChooseSetSlider.module.scss';

export default function ChooseSetSlider() {
  const [currentPage, setCurrentPage] = useState(0);

  const cardSets = [
    { id: 'career', name: 'Career & Ambition', icon: '/chemistry.png' },
    { id: 'character', name: 'Character & Quirks', icon: '/chemistry.png' },
    { id: 'conflict', name: 'Conflict & Communication', icon: '/chemistry.png' },
    { id: 'finances', name: 'Finances & Money Mindset', icon: '/chemistry.png' },
    { id: 'lifestyle', name: 'Lifestyle & Habits', icon: '/chemistry.png' },
    { id: 'love', name: 'Love & Intimacy', icon: '/chemistry.png' },
    { id: 'parenting', name: 'Parenting & Family', icon: '/chemistry.png' },
    { id: 'values', name: 'Values & Beliefs', icon: '/chemistry.png' },
    { id: 'chemistry', name: 'Chemistry', icon: '/chemistry.png' }
  ];

  const setsPerPage = 3;
  const totalPages = Math.ceil(cardSets.length / setsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleSetSelect = (setId) => {
    window.location.href = `/choose-how-to-play?set=${setId}`;
  };

  return (
    <div className={styles.chooseSetPage}>
      <div className={styles.background} />
      <div className={styles.content}>
        <button className={styles.backButton} onClick={() => window.history.back()}>←</button>
        <h1 className={styles.title}>Choose a Set</h1>

        <div className={styles.menuContainer}>
          <div className={styles.setsContainer}>
            {currentPage > 0 && (
              <button className={styles.prevButton} onClick={handlePrevPage}>←</button>
            )}

            <div className={styles.setsRow}>
              <div
                className={styles.setsSlider}
                style={{
                  transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
                  width: `${totalPages * 100}%`
                }}
              >
                {Array.from({ length: totalPages }, (_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className={styles.pageContainer}
                    style={{ width: `${100 / totalPages}%` }}
                  >
                    {cardSets
                      .slice(pageIndex * setsPerPage, (pageIndex + 1) * setsPerPage)
                      .map((set) => (
                        <button
                          key={set.id}
                          className={styles.setCard}
                          onClick={() => handleSetSelect(set.id)}
                        >
                          <div className={styles.cardIcon}>
                            <img src={set.icon} alt={set.name} className={styles.iconImage} />
                          </div>
                          <div className={styles.cardTitle}>{set.name}</div>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {currentPage < totalPages - 1 && (
              <button className={styles.nextButton} onClick={handleNextPage}>→</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
