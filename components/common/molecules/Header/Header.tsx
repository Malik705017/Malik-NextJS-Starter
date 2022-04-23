import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import { useUIEffect } from 'models/uiEffect';
import { useAuth } from 'models/auth';
import { appRoute } from 'utils/config/appRoute.config';

import Icon from 'components/common/atoms/Icon';
import NavBar from 'components/common/molecules/NavBar';
import Portal from 'components/common/atoms/Portal';
import Backdrop from 'components/common/atoms/Backdrop';

import styles from './Header.module.scss';

const navData = [
  { link: '/', name: 'Docs' },
  { link: '/', name: 'Blog' },
  { link: '/', name: 'Contact' },
  { link: '/', name: 'About' },
];

const Header: FC = () => {
  const [{ dropDown }, { changeUIEffect }] = useUIEffect();
  const [{ userName, userPhoto, isSignIn }, { logOut }] = useAuth();
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <Icon
        className={styles.navIcon}
        alt="nav"
        src="/icons/menu.icon.png"
        width={32}
        height={32}
        onClick={() => setShowMobileNav((prev) => !prev)}
      />
      {showMobileNav && (
        <>
          <NavBar className={styles.navbar} isMobile data={navData} />
          <Portal>
            <Backdrop onClick={() => setShowMobileNav(false)} />
          </Portal>
        </>
      )}
      <h1
        className={styles.title}
        onClick={() => {
          router.push(appRoute.home);
        }}
      >
        {"Malik's NextJS Starter"}
      </h1>
      <NavBar data={navData} />
      {isSignIn ? (
        <>
          <span
            className={styles.userName}
            onClick={() => {
              if (dropDown.isOpen) changeUIEffect({ uiKey: 'dropDown', value: false });
              changeUIEffect({ uiKey: 'dropDown', value: true });
            }}
          >
            {userName}
          </span>
          {dropDown.isOpen && (
            <div
              className={styles.userDropdown}
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件繼續向上傳遞，若向上傳遞到 Layout 層就會把 dropdown 關掉
              }}
            >
              <div
                className={styles.user}
                onClick={() => {
                  router.push(appRoute.profile);
                  changeUIEffect({ uiKey: 'dropDown', value: false });
                }}
              >
                <Icon
                  className={styles.userHeadShot}
                  src={userPhoto || '/icons/user-white.icon.png'}
                  width={48}
                  height={48}
                />
                <div className={styles.userProfile}>
                  <h3>{userName}</h3>
                  <p>See my profile</p>
                </div>
              </div>
              <hr className={styles.borderLine} />
              <div className={styles.userDropdownItem}>Write a story</div>
              <div className={styles.userDropdownItem}>Design your profile</div>
              <div className={styles.userDropdownItem} onClick={logOut}>
                Sign out
              </div>
            </div>
          )}
        </>
      ) : (
        <Icon
          className={styles.userIcon}
          src={'/icons/user-white.icon.png'}
          alt="userIcon"
          width={32}
          height={32}
          onClick={() => changeUIEffect({ uiKey: 'modal', value: true })}
        />
      )}
    </header>
  );
};

export default Header;
