/*
  복습: 새 게시물 창에서 고른 사진을 미리보기
  핵심: 파일 선택 버튼이 숨긴 input을 누르고, 고른 파일은 임시 주소로 미리보기에 넣는다. 닫기는 onClose다.
  이유: 창을 닫는 상태는 이 컴포넌트가 갖지 않는다. 부모인 CreateFeedModalRoot가 스토어의 closeCreateFeed를 넘긴다.
  실행: 사진이 없으면 고르기 안내가 나오고, 있으면 600 크기 미리보기와 다른 사진 고르기가 나온다. 배경이나 X를 누르면 onClose가 호출된다. 이 파일은 서버에 글을 올리지 않는다.
  활용: 만들기 버튼으로 연 창에서 사진만 먼저 고르게 할 때 쓴다.
*/

// ~/instagram-next/components/CreateFeedModal.jsx
// 새 게시물 창. 사진을 고르면 미리보기를 보여 주고, 닫기는 부모의 onClose에 맡긴다.
import { useRef, useState } from "react";
import Image from "next/image";
import { FaImages, FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import carousel from "./Carousel.module.scss";

const CreateFeedModal = ({ onClose }) => {

  // 렌더 확인용. 주석을 풀면 이 창이 다시 그려질 때마다 콘솔에 찍힌다.
  // console.log('[render] CreateFeedModal');
  // 고른 사진의 임시 주소. 없으면 고르기 화면을 보여 준다.
  const [previewUrl, setPreviewUrl] = useState(null);
  // 숨긴 file input. 버튼 클릭으로 파일 창을 연다.
  const fileInputRef = useRef(null);

  // 화면의 버튼이 숨긴 input을 대신 누른다.
  const handlePick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // 고른 파일을 브라우저 임시 주소로 바꿔 미리보기에 쓴다.
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    // 같은 파일을 다시 골라도 change가 나게 선택을 비운다.
    fileInputRef.current.value = "";
  };

  return (
    <div className={styles.modalContainer}>
      {/* 어두운 배경을 누르면 창을 닫는다. */}
      <div className={styles.modalBackdrop} 
      onClick={onClose} 
      />

      <button
        className={styles.modalCloseButton}
        onClick={onClose}
        type="button">
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>새 게시물 만들기</h2>
        </div>

        <div className={styles.modalBody}>
          <div className={`${styles.step} ${styles.active}`}>
            <div className={styles.uploadContainer}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {/* 사진이 있으면 미리보기, 없으면 고르기 안내를 보여 준다. */}
              {previewUrl ? (
                <>
                  <div className={styles.previewContainer}>
                    <div className={styles.previewArea}>
                      <div className={carousel.carouselSlide}>
                        <Image
                          src={previewUrl}
                          alt="고른 사진 미리보기"
                          width={600}
                          height={600}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.uploadButton}
                    onClick={handlePick}
                    type="button">
                    다른 사진 고르기
                  </button>
                </>
              ) : (
                <div className={styles.uploadArea}>
                  <FaImages size={48} color="#262626" />
                  <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                  <button
                    className={styles.uploadButton}
                    onClick={handlePick}
                    type="button"
                  >
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
