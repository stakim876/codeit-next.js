// ~/instagram-next/components/ProfileImage.jsx
import Image from 'next/image';
import styles from './ProfileImage.module.scss';

// 프로필 페이지 상단의 둥근 사진을 그림
const ProfileImage = ({ imageUrl, username }) => {
  return (
    <div className={styles.profileImageContainer}>
      <div className={styles.profileImage}>
        <img 
        src={imageUrl} 
        alt={`${username}의 프로필`} 
        width={150}
        height={150}
        loading='eager'
        />
      </div>
    </div>
  );
};

export default ProfileImage;
