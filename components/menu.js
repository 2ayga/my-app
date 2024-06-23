import Link from 'next/link';
import styles from './menu.module.css';

const Menu = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.leftPage}>
        <div>
          <p>
            <Link href="/bracelets">Bracelets</Link>
          </p>
        </div>

        <div className={styles.allProduct}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              MENU
              <i className="fa fa-caret-down"></i>
            </button>
            <div className={styles.dropdownContent}>
              <span className={styles.mens}>MENSWEAR</span>
              <span className={styles.womens}>WOMENSWEAR</span>
              <span className={styles.else}>EVERYTHING ELSE</span>
              <span className={styles.wish}>WISHLIST</span>
              <span className={styles.search}>SEARCH</span>
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <div>
        <Link href="/">
          <img className={styles.brandLogo} src="/logo.svg" alt="Brand Logo" />
        </Link>
      </div>

      <div></div>

      <div className={styles.rightPage}>
        <div>
          <p>
            <Link href="/sign-in">Account</Link>
          </p>
          <p>
            <Link href="/wish">my designs</Link>
          </p>
          <p>
            <Link href="/bag">
              bag <span className={styles.countShow}></span>
            </Link>
          </p>
        </div>

        {/* <div className={styles.cartLogo}>
          <img className={styles.accountLogo} src="" alt="Account" />
          <img className={styles.shoppingLogo} src="" alt="Image" />
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
