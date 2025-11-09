'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { getImageUrl } from '@/lib/pocketbase';
import styles from './index.module.scss';

const ALT_PREFIX = 'Image';

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ProductImageGalleryProps {
  productId: string;
  productTitle: string;
  images: string[];
}

export function ProductImageGallery({ productId, productTitle, images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (images.length === 0) {
    return <div className={styles.mainImageWrapper} style={{ background: 'var(--color-border)' }} />;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const lightboxSlides = images.map((img) => ({
    src: getImageUrl('products', productId, img, '1600x1600'),
  }));

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <Image
          src={getImageUrl('products', productId, images[currentIndex], '800x800')}
          alt={productTitle}
          fill
          className={styles.image}
          priority
          onClick={() => setIsLightboxOpen(true)}
          style={{ cursor: 'pointer' }}
        />
        {images.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navButtonLeft}`}
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ArrowLeftIcon />
            </button>
            <button
              className={`${styles.navButton} ${styles.navButtonRight}`}
              onClick={handleNext}
              aria-label="Next image"
            >
              <ArrowRightIcon />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnailGrid}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`${styles.thumbnail} ${idx === currentIndex ? styles.thumbnailActive : ''}`}
              onClick={() => setCurrentIndex(idx)}
            >
              <Image
                src={getImageUrl('products', productId, img, '200x200')}
                alt={`${productTitle} ${ALT_PREFIX} ${idx + 1}`}
                fill
                className={styles.image}
              />
            </div>
          ))}
        </div>
      )}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={lightboxSlides}
        index={currentIndex}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
      />
    </div>
  );
}

