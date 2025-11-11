'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RequestQuestion.module.scss';
import Notification from './Notification';

export default function Feedback() {
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ ...notification, show: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    try {
      // Reuse the same endpoint contract as question suggestions
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: feedback }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('Feedback submitted! Thank you.', 'success');
        setFeedback('');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        showNotification(data.error || 'Failed to submit feedback. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showNotification('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.formOverlay}>
            <div className={styles.header}>
              <h1 className={styles.title}>Feedback</h1>
              <button 
                className={styles.closeButton}
                onClick={() => router.push('/')}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                className={styles.input}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                rows={10}
                required
              />
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting || !feedback.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Notification
        message={notification.message}
        show={notification.show}
        onClose={hideNotification}
        type={notification.type}
      />
    </>
  );
}



