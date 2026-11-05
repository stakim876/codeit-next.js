// ~/instagram-next/components/CreateFeedModal.jsx
// 새 게시물 창. 고른 사진을 미리 보여주고, 배경이나 X를 누르면 닫힌다.
// 고른 파일을 상태로 다루므로 클라이언트 컴포넌트여야 한다.
import { useRef, useState } from "react";
import Image from "next/image";
import { FaImages, FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import carousel from "./Carousel.module.scss";

// onClose는 만들기 창을 닫는다. Provider가 열림 상태를 false로 되돌린다.
const CreateFeedModal = ({ onClose }) => {
  // 미리보기 주소. 없으면 사진 고르기 화면을 그린다.
  const [previewUrl, setPreviewUrl] = useState(null);
  // 화면에 안 보이는 파일 입력. 버튼이 이 입력을 대신 누른다.
  const fileInputRef = useRef(null);

  // 숨긴 파일 입력을 눌러 컴퓨터의 파일 창을 연다.
  const handlePick = () => {
    fileInputRef.current.click();
  };

  // 파일 창에서 고르면 미리보기 주소로 바꾸고, 같은 파일도 다시 고를 수 있게 한다.
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // 고른 파일을 브라우저 주소로 만들어 미리보기에 넣는다.
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    // 같은 사진을 다시 골라도 change가 나게 입력값을 비운다.
    fileInputRef.current.value = "";
  };

  return (
    <div className={styles.modalContainer}>
      {/* 어두운 배경을 누르면 onClose로 창을 닫는다 */}
      <div className={styles.modalBackdrop} onClick={onClose} />

      {/* X도 배경과 같이 onClose로 창을 닫는다 */}
      <button
        className={styles.modalCloseButton}
        onClick={onClose}
        type="button"
      >
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>새 게시물 만들기</h2>
        </div>

        <div className={styles.modalBody}>
          {/* active가 붙은 단계만 보인다. 지금은 사진 고르기 한 단계다. */}
          <div className={`${styles.step}${styles.active}`}>
            <div className={styles.uploadContainer}>
              {/* 입력은 숨기고, 아래 버튼이 ref로 대신 누른다. accept는 사진만 고르게 한다. */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {/* 미리보기가 있으면 사진과 다시 고르기, 없으면 처음 고르기 화면 */}
              {previewUrl ? (
                <>
                  <div className={styles.previewContainer}>
                    <div className={styles.previewArea}>
                      {/* 피드 슬라이드 칸을 빌려, 고른 사진이 영역을 채우게 한다. */}
                      <div className={carousel.carouselSlide}>
                        {/* previewUrl은 고른 파일의 임시 주소다. */}
                        <Image
                          src={previewUrl}
                          alt="고른 사진 미리보기"
                          width={600}
                          height={600}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 다시 고르기도 같은 숨긴 파일 입력을 연다. */}
                  <button
                    className={styles.uploadButton}
                    onClick={handlePick}
                    type="button"
                  >
                    다른 사진 고르기
                  </button>
                </>
              ) : (
                <div className={styles.uploadArea}>
                  {/* 아직 사진이 없을 때. 버튼이 컴퓨터의 파일 창을 연다. */}
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
