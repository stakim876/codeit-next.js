// ~/instagram-next/components/Carousel.jsx
// 한 글의 사진을 가로로 넘긴다. 지금 장 번호와 하트는 브라우저에서만 바뀌므로 클라이언트 컴포넌트다.
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa6';
import styles from './Carousel.module.scss';

const Carousel = ({ imageUrls, alt, isFirst, onImageDoubleClick }) => { 
  // 지금 보이는 장의 번호. 0이 첫 장이다.
  const [currentIndex, setCurrentIndex] = useState(0);
  // true인 동안만 가운데 하트를 그린다.
  const [showHeart, setShowHeart] = useState(false);
  
  // 첫 장보다 앞이나 마지막 장보다 뒤로는 가지 않는다.
  const goToSlide = (index) => {
    if (index < 0 || index >= imageUrls.length) return;
    setCurrentIndex(index);
  };

  // 사진을 두 번 누르면 하트가 0.8초 동안 커졌다 사라진다.
  const handleDoubleClick = () => {
    onImageDoubleClick();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };
  
  return (
    <div className={styles.carouselContainer}>
      {/* 한 장이 너비의 100%다. currentIndex가 1이면 -100%라 둘째 장이 들어온다. */}
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
        {imageUrls.map((imageUrl, index) => (
           <div
             key={index}
             className={styles.carouselSlide}
             onDoubleClick={handleDoubleClick}>
             <Image
               src={imageUrl}
               alt={alt}
               width={600}
               height={600}
               // 첫 글의 첫 장만 바로 받는다. 나머지는 가까워지면 받는다.
               loading={isFirst && index === 0 ? 'eager' : 'lazy'}
              />
              {/* showHeart가 켜진 0.8초 동안 이 장 위에 하트를 겹친다. */}
              {showHeart && <FaHeart className={styles.doubleClickHeart} />}
            </div>       
        ))}    
        </div>  

        {/* 사진이 두 장 이상일 때만 화살표와 점을 그린다. */}
        {imageUrls.length > 1 && (
          <>
           {/* 첫 장이면 왼쪽 화살표를 숨긴다. */}
           <button
             className={`${styles.carouselButton} ${styles.prev}`}
             onClick={() => goToSlide(currentIndex - 1)}
             style={{ display: currentIndex === 0 ? 'none' : 'flex' }}>
             <FaChevronLeft />   
             </button>

             {/* 마지막 장이면 오른쪽 화살표를 숨긴다. */}
             <button
               className={`${styles.carouselButton} ${styles.next}`}
               onClick={() => goToSlide(currentIndex + 1)}
               style={{
                  display: currentIndex === imageUrls.length -1 ? 'none' : 'flex', 
             }}>
             <FaChevronRight />   
             </button>

             {/* 점은 사진 수만큼 있다. 점을 누르면 그 번호의 장으로 간다. */}
             <div className={styles.indicators}>
               {imageUrls.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                   />    
                ))}
             </div>
          </>  
        )}
    </div>
  );
};;;       

export default Carousel;