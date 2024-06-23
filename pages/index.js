import styles from './index.module.css';
import Menu from '../components/menu'; 

const HomePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Menu />
      <div className={styles.sale}>
        <p>CUSTOM GOLD JEWELRY</p>
      </div>
      <div className={styles.catagory}>
        <p className={styles.men}>SHOP BRACELETS</p>
        <p className={styles.women}>SHOP NECKLACES</p>
      </div>
      <div className={styles.firstDiv}>
        <div>
          <img src="/index-1.avif" alt="First Image" />
          <div>
            <p>Culture</p>
            <p>FAME IS FLEETING, CELEBRITY MEMOIRS ARE FOREVER</p>
          </div>
          <p>Jo Livingstone Turns Over a New Leaf</p>
          <button className={styles.menButton1}>SHOP MENSWEAR</button>
        </div>
        <div>
          <img src="/index-1.avif" alt="Second Image" />
          <div>
            <p>Fashion</p>
            <p>STEAL MY SUNSHINE: VANS OG CLASSICS SS22</p>
          </div>
          <p>Photographer Lindsay Ellary and Stylist Rita Zebdi Visit Their Friends in Suburban LA</p>
          <button className={styles.womenButton1}>SHOP WOMENSWEAR</button>
        </div>
      </div>
      <div className={styles.fifthDiv}>
        <p>PERSONAL SPACE WITH JOSH ITIOLA</p>
        <p>Talking Prized Possessions with the Multi-Talented Engineer Turned Vitsœ Planner</p>
        <button>VIEW EDITORIAL</button>
      </div>
      <div className={styles.secondDiv}>
        <div>
          <img src="/index-2.avif" alt="Recent Image 1" />
          <div>
            <p>RECENT</p>
            <p>HOME SWEET DREW HOUSE</p>
          </div>
        </div>
        <div>
          <img src="/index-2.avif" alt="Recent Image 2" />
          <div>
            <p>RECENT</p>
            <p>FRESH FACE FORWARD!</p>
          </div>
        </div>
        <div>
          <img src="/index-2.avif" alt="Recent Image 3" />
          <div>
            <p>RECENT</p>
            <p>LA STORY: LEAVING RECORDS AND MUSIC FOR LIFE SUPPORT</p>
          </div>
        </div>
      </div>
      <div className={styles.thirdDiv}>
        <div>
          <h1>SCREEN TIME</h1>
          <p>VIEW ALL STORIES</p>
        </div>
        <div>
          <img src="/index-2.avif" alt="Story Image 1" />
          <div>
            <p>SPELL IT OUT WITH TEXT ART</p>
            <p>Culture</p>
          </div>
        </div>
        <div>
          <img src="/index-2.avif" alt="Story Image 2" />
          <div>
            <p>SPELL IT OUT WITH TEXT ART</p>
            <p>Culture</p>
          </div>
        </div>
        <div>
          <img src="/index-2.avif" alt="Story Image 3" />
          <div>
            <p>SPELL IT OUT WITH TEXT ART</p>
            <p>Market</p>
          </div>
        </div>
        <div>
          <img src="/index-2.avif" alt="Story Image 4" />
          <div>
            <p>SPELL IT OUT WITH TEXT ART</p>
            <p>Fashion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
