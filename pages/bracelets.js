import React, { useEffect } from 'react';
import Menu from '../components/menu';
import styles from './bracelets.module.css';
import { BraceletsApp, braceletData, claspData, getKaratPurity } from './bracelets-app';

const Bracelets = () => {
  const {
    selectedDesign,
    selectedKarat,
    selectedClasp,
    selectedLength,
    selectedWidth,
    currentStep,
    filteredDesigns,
    totalPrice,
    handleCategoryFilter,
    handleDesignSelection,
    handleClaspSelection,
    handleLengthChange,
    handleWidthChange,
    handleKaratSelection,
    handleNextButtonClick,
    handleBackButtonClick,
    saveToWishList,
    addToCart,
    updateCartCount,
    changeRightImage,
    updatePopupDescription,
    updateSizeLabels,
    updateOverviewDesign,
    updateModelContPosition,
    showPopup,
    formatNumberWithCommas,
    goToStep1,
    goToStep2,
    goToStep3,
    goToStep4,
    populateKaratDropdown
  } = BraceletsApp();

  useEffect(() => {
    updateModelContPosition();
    window.addEventListener('resize', updateModelContPosition);
    return () => window.removeEventListener('resize', updateModelContPosition);
  }, [updateModelContPosition]);

  return (
    <>
      <Menu />
      <div className={styles.cont}>
        {currentStep === 1 && (
          <div className={styles['design-cont']}>
            <div className={styles['build-step']}>What kind of design do you want?</div>
            <div className={styles['content-cont']}>
              <div className={styles['left-cont']}>
                <select className={styles['category-dropdown']} onChange={(e) => handleCategoryFilter(e.target.value)}>
                  <option value="all-bracelets">All Bracelets</option>
                  {/* Add other category options here */}
                </select>
                <div className={styles['bracelets-left-side']}>
                  {filteredDesigns.map(design => (
                    <div
                      key={design.id}
                      className={styles['option-button']}
                      onClick={() => handleDesignSelection(design)}
                    >
                      <div className={styles['design-name-left']}>{design.designName.toLowerCase()}</div>
                      <img className={styles['design-image-left']} src={design.designURL} alt={design.designName} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles['model-cont']}>
                <img className={styles['model-img']} src={selectedDesign ? selectedDesign.modelURL : ''} alt="" />
                <img className={styles['info-icon']} src="/info.svg" alt="" onClick={() => showPopup('design-info-popup')} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles['size-cont']}>
            <div className={styles['build-step']}>Choose your bracelet size</div>
            <div className={styles['content-cont']}>
              <div className={styles['left-cont']}>
                <label id="bracelet-length-label" htmlFor="bracelet-length">Length (cm):</label>
                <input
                  type="number"
                  id="bracelet-length"
                  name="bracelet-length"
                  step="0.1"
                  value={selectedLength || ''}
                  onChange={(e) => handleLengthChange(e.target.value)}
                />
                <label id="bracelet-width-label" htmlFor="bracelet-width">Width (mm):</label>
                <input
                  type="number"
                  id="bracelet-width"
                  name="bracelet-width"
                  step="1"
                  value={selectedWidth || ''}
                  onChange={(e) => handleWidthChange(e.target.value)}
                />
              </div>
              <div className={styles['model-cont']}>
                <img className={styles['model-img']} alt="Selected Design" src={selectedDesign ? selectedDesign.modelURL : ''} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles['clasp-cont']}>
            <div className={styles['build-step']}>Choose your clasp</div>
            <div className={styles['content-cont']}>
              <div className={styles['left-cont']}>
                {claspData.map(clasp => (
                  <div
                    key={clasp.name}
                    className={styles['option-button']}
                    onClick={() => handleClaspSelection(clasp)}
                  >
                    <div className={styles['design-name-left']}>{clasp.name.toLowerCase()}</div>
                    <img className={styles['clasp-image-left']} src={clasp.url} alt={clasp.name} />
                  </div>
                ))}
              </div>
              <div className={styles['model-cont']}>
                <img className={styles['model-img']} alt="Selected Clasp" src={selectedClasp ? selectedClasp.claspModelurl : ''} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className={styles['karat-cont']}>
            <div className={styles['build-step']}>What kind of karat do you want?</div>
            <div className={styles['content-cont']}>
              <div className={styles['left-cont']}>
                <select id="karat-dropdown" className={styles['category-dropdown']} onChange={(e) => handleKaratSelection(e.target.value)}>
                  <option value="">Select Karat</option>
                  {selectedDesign && selectedDesign.karats.map(karat => (
                    <option key={karat} value={karat}>{karat}k ({getKaratPurity(karat)})</option>
                  ))}
                </select>
                <div id="overview-design"></div>
                <div id="pricing-breakdown">
                  <p>Weight: <span id="weight"></span> grams</p>
                  <p>Gold Value: $<span id="gold-value"></span></p>
                  <p>Labor and Fees: $<span id="labor-fees"></span></p>
                  <p>Total Price: $<span id="total-price"></span></p>
                </div>
              </div>
              <div className={styles['model-cont']}>
                <img className={styles['model-img']} alt="" src={selectedDesign ? selectedDesign.modelURL : ''} />
              </div>
            </div>
          </div>
        )}

        <div className={styles['center-buttons']}>
          <div className={styles['back-button']} onClick={handleBackButtonClick}>
            <img alt="" src="/back.svg" />
            <div className={styles['build-footer-text']}>Back</div>
          </div>
          <div className={styles['next-button']} onClick={handleNextButtonClick}>
            <div className={styles['build-footer-text']}>Next</div>
            <img alt="" src="/next.svg" />
          </div>
        </div>

        <button onClick={saveToWishList}>Save to Wish List</button>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </>
  );
};

export default Bracelets;
