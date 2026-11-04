// ~/instagram-next/components/CreateFeedModal.jsx
// 새 게시물 창. 고른 사진을 미리 보여주고, 배경이나 X를 누르면 닫힌다.
// 고른 파일을 상태로 다루므로 클라이언트 컴포넌트여야 한다.
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { FaImages, FaXmark } from 'react-icons/fa6';
import styles from './CreateFeedModal.module.scss';
import carousel from './Carousel.module.scss';

const CreateFeedModal = ({ onClose }) => {
  // 미리보기 주소. 없으면 사진 고르기 화면을 그린다.
  const [previewUrl, setPreviewUrl] = useState(null);
  // 화면에 안 보이는 파일 입력. 버튼이 이 입력을 대신 누른다.
  const fileInputRef = useRef(null);

  // 숨긴 파일 입력을 눌러 컴퓨터의 파일 창을 연다.
  const handlePick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // 고른 파일을 브라우저 주소로 만들어 미리보기에 넣는다.
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    // 같은 사진을 다시 골라도 change가 나게 입력값을 비운다.
    fileInputRef.current.value = '';
  };

  return (
    <div className={styles.modalContainer}>
      {/* 어두운 배경을 누르면 onClose로 창을 닫는다 */}
      <div
        className={styles.modalBackdrop}
        onClick={onClose}
      />

      <button
        className={styles.modalCloseButton}
        onClick={onClose}
        type='button'>
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>새 게시물 만들기</h2>
        </div>

        <div className={styles.modalBody}>
          <div className={`${styles.step}${styles.active}`}>
            <div className={styles.uploadContainer}>
              <input
                type='file'
                ref={fileInputRef}
                accept='image/jpeg,image/png,image/gif,image/webp,image/avif'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* 미리보기가 있으면 사진과 다시 고르기, 없으면 처음 고르기 화면 */}
              {previewUrl ? (
                <>
                  <div className={styles.previewContainer}>
                    <div className={styles.previewArea}>
                      <div className={carousel.carouselSlide}>
                        <Image
                          src={previewUrl}
                          alt='고른 사진 미리보기'
                          width={600}
                          height={600}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.uploadButton}
                    onClick={handlePick}
                    type='button'>
                    다른 사진 고르기
                  </button>
                </>
              ) : (
                <div className={styles.uploadArea}>
                  <FaImages
                    size={48}
                    color='#262626'
                  />
                  <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                  <button
                    className={styles.uploadButton}
                    onClick={handlePick}
                    type='button'>
                    컴퓨터에서 선택
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedModal;