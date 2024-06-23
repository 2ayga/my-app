import React, { useState, useEffect } from 'react';

export const braceletData = [
    {
        id: 1,
        designURL: "/byzantine.svg",
        modelURL: "/byzantine-chain.glb",
        designName: "Byzantine",
        category: "Chain",
        price: "",
        lengthRange: {
            min: 16,
            max: 24 // in cm
        },
        widthRange: {
            min: 5,
            max: 10 // in mm
        },
        description: "The Byzantine chain, originating from the Byzantine Empire, is renowned for its complex, rope-like pattern formed by interconnected links, where each link passes through four others. This intricate design showcases the advanced metalworking skills of Byzantine artisans and remains popular in modern jewelry. It's typically worn for formal or elegant occasions, and may not be suitable for casual or active settings due to its elaborate and delicate nature.",
        karats: [14, 18, 22],
        make: "Lab-made",
    },
    {
        id: 2,
        designURL: "/figaro.svg",
        modelURL: "/figaro.svg",
        designName: "Figaro",
        category: "Cuff",
        price: "",
        lengthRange: {
            min: 18,
            max: 22 // in cm
        },
        widthRange: {
            min: 4,
            max: 8 // in mm
        },
        description: "The Figaro bracelet features a pattern of three small circular links followed by one elongated oval link, making it a timeless piece.",
        karats: [10, 14, 18],
        make: "Handmade",
    },
    {
        id: 3,
        designURL: "/cuban.svg",
        modelURL: "/cuban.svg",
        designName: "Cuban",
        category: "Bangle",
        price: "",
        lengthRange: {
            min: 19,
            max: 21 // in cm
        },
        widthRange: {
            min: 6,
            max: 12 // in mm
        },
        description: "The Cuban bracelet is a classic design known for its sturdy, interlocking pattern, giving it a bold and stylish look.",
        karats: [14, 18, 24],
        make: "Handmade",
    },
];

export const claspData = [
    {
        name: 'Lobster',
        url: '/lobster.svg',
        claspModelurl: '/lobster.svg'
    },
    {
        name: 'Spring Ring',
        url: '/spring-ring.svg',
        claspModelurl: '/spring-ring.svg'
    },
    {
        name: 'Push Button',
        url: '/push-button.svg',
        claspModelurl: '/push-button.svg'
    },
];

export const BraceletsApp = () => {
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [selectedKarat, setSelectedKarat] = useState(null);
    const [selectedClasp, setSelectedClasp] = useState(null);
    const [selectedLength, setSelectedLength] = useState(null);
    const [selectedWidth, setSelectedWidth] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [filteredDesigns, setFilteredDesigns] = useState(braceletData);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const modifyDesignData = JSON.parse(localStorage.getItem("modifyDesignData"));
        if (modifyDesignData) {
            setSelectedDesign(braceletData.find(design => design.designName === modifyDesignData.designName));
            setSelectedKarat(modifyDesignData.karat);
            setSelectedClasp(claspData.find(clasp => clasp.name === modifyDesignData.clasp));
            setSelectedLength(modifyDesignData.size.length);
            setSelectedWidth(modifyDesignData.size.width);
            localStorage.removeItem("modifyDesignData");
        }
        setTimeout(() => {
            populateCategoryDropdown(braceletData);
            generateDesignButtons(braceletData);
        }, 0);
        updateModelContPosition();
        window.addEventListener('resize', updateModelContPosition);
        return () => window.removeEventListener('resize', updateModelContPosition);
    }, []);

    const handleCategoryFilter = (category) => {
        const filtered = category === 'all-bracelets' 
            ? braceletData 
            : braceletData.filter(design => design.category === category);
        setFilteredDesigns(filtered);
    };

    const handleDesignSelection = (design) => {
        setSelectedDesign(design);
        changeRightImage(design.modelURL);
        updatePopupDescription(design);
        updateSizeLabels(design);
    };

    const handleClaspSelection = (clasp) => {
        setSelectedClasp(clasp);
        changeRightImage(clasp.claspModelurl);
        updateOverviewDesign();
    };

    const handleLengthChange = (value) => {
        if (validateLength(value)) {
            setSelectedLength(value);
        }
    };

    const handleWidthChange = (value) => {
        if (validateWidth(value)) {
            setSelectedWidth(value);
        }
    };

    const handleKaratSelection = (karat) => {
        setSelectedKarat(karat);
        updatePricingBreakdown(karat);
    };

    const validateLength = (value) => {
        if (typeof value !== 'string') {
            alert("Invalid length value.");
            return false;
        }
    
        if (value.includes('.') && value.split('.')[1].length > 1) {
            alert("Please enter a length with no more than 1 decimal place.");
            return false;
        }
    
        return true;
    };
    

    const validateWidth = (value) => {
        if (typeof value !== 'string') {
            alert("Invalid width value.");
            return false;
        }
    
        if (value.includes('.')) {
            alert("Please enter a width with no decimal places.");
            return false;
        }
    
        return true;
    };
    

    const updatePricingBreakdown = (karat) => {
        const weight = 32; // Example weight
        const goldValue = karat * 100; // Example calculation
        const laborFees = 562.86; // Example labor and fees
        const total = goldValue + laborFees;
        setTotalPrice(total);

        // Update DOM elements (you might want to use state for these in React)
        document.getElementById('total-price').textContent = `$${formatNumberWithCommas(total.toFixed(2))}`;
        document.getElementById('weight').textContent = formatNumberWithCommas(weight);
        document.getElementById('gold-value').textContent = formatNumberWithCommas(goldValue.toFixed(2));
        document.getElementById('labor-fees').textContent = formatNumberWithCommas(laborFees.toFixed(2));
        updateOverviewDesign();
    };

    const handleNextButtonClick = () => {
        if (currentStep === 1 && selectedDesign) {
            setCurrentStep(2);
            goToStep2();
        } else if (currentStep === 2) {
            const isValidLength = validateLength(selectedLength);
            const isValidWidth = validateWidth(selectedWidth);
            if (isValidLength && isValidWidth &&
                selectedLength >= selectedDesign.lengthRange.min && 
                selectedLength <= selectedDesign.lengthRange.max &&
                selectedWidth >= selectedDesign.widthRange.min && 
                selectedWidth <= selectedDesign.widthRange.max) {
                setCurrentStep(3);
                goToStep3();
            } else {
                alert(`Please enter valid dimensions. Length must be between ${selectedDesign.lengthRange.min} and ${selectedDesign.lengthRange.max} cm. Width must be between ${selectedDesign.widthRange.min} and ${selectedDesign.widthRange.max} mm.`);
            }
        } else if (currentStep === 3 && selectedClasp) {
            setCurrentStep(4);
            goToStep4();
        } else if (currentStep === 4 && selectedKarat) {
            // Final step - you can add any final actions here
        } else {
            alert("Please complete the current step before proceeding.");
        }
    };

    const handleBackButtonClick = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            if (currentStep === 2) goToStep1();
            else if (currentStep === 3) goToStep2();
            else if (currentStep === 4) goToStep3();
        }
    };

    const saveToWishList = () => {
        if (selectedDesign && selectedLength && selectedWidth && selectedClasp && selectedKarat) {
            const wishItem = {
                designName: selectedDesign.designName,
                category: selectedDesign.category,
                size: { length: selectedLength, width: selectedWidth },
                price: totalPrice.toFixed(2),
                imgUrl: selectedDesign.designURL,
                clasp: selectedClasp.name,
                karat: selectedKarat
            };

            let wishData = JSON.parse(localStorage.getItem("wishdata")) || [];
            wishData.push(wishItem);
            localStorage.setItem("wishdata", JSON.stringify(wishData));
            alert("Design saved to wish list!");
        } else {
            alert("Please complete all steps to save the design to the wish list.");
        }
    };

    const addToCart = () => {
        if (selectedDesign && selectedLength && selectedWidth && selectedClasp && selectedKarat) {
            const bagItem = {
                designName: selectedDesign.designName,
                category: selectedDesign.category,
                size: { length: selectedLength, width: selectedWidth },
                price: totalPrice.toFixed(2),
                imgUrl: selectedDesign.designURL,
                clasp: selectedClasp.name,
                karat: selectedKarat,
                make: selectedDesign.make
            };

            let bagData = JSON.parse(localStorage.getItem("bagdata")) || [];
            bagData.push(bagItem);
            localStorage.setItem("bagdata", JSON.stringify(bagData));
            alert("Item added to bag!");
            updateCartCount();
        } else {
            alert("Please complete all steps to add the item to the bag.");
        }
    };

    const updateCartCount = () => {
        let previewDataFromLs = JSON.parse(localStorage.getItem("bagdata")) || [];
        document.querySelector(".countShow").innerText = `(${previewDataFromLs.length})`;
    };

    const changeRightImage = (modelURL, placeholderText = '') => {
        const rightImages = document.querySelectorAll('.model-img');
    
        rightImages.forEach((rightImage) => {
            const rightCont = rightImage.parentElement;
            if (modelURL) {
                rightImage.src = modelURL;
                rightImage.style.display = 'block';
                const placeholder = rightCont.querySelector('.placeholder');
                if (placeholder) {
                    placeholder.remove();
                }
            } else {
                rightImage.style.display = 'none';
                if (!rightCont.querySelector('.placeholder')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder';
                    placeholder.textContent = placeholderText;
                    rightCont.appendChild(placeholder);
                }
            }
        });
        updateModelContPosition();
    };

    const updatePopupDescription = (design) => {
        const descriptionElement = document.querySelector('.popup-description');
        const nameElement = document.querySelector('.popup-title');
        if (descriptionElement && nameElement) {
            descriptionElement.textContent = design.description;
            nameElement.textContent = design.designName;
        }
    };

    const updateSizeLabels = (design) => {
        const lengthLabel = document.getElementById('bracelet-length-label');
        const widthLabel = document.getElementById('bracelet-width-label');
        
        if (lengthLabel) {
            lengthLabel.textContent = `Length (${design.lengthRange.min} - ${design.lengthRange.max} cm):`;
        } else {
            console.error('Element with ID "bracelet-length-label" not found.');
        }
        
        if (widthLabel) {
            widthLabel.textContent = `Width (${design.widthRange.min} - ${design.widthRange.max} mm):`;
        } else {
            console.error('Element with ID "bracelet-width-label" not found.');
        }
    };
    

    const updateOverviewDesign = () => {
        const overviewDesign = document.getElementById('overview-design');
        if (overviewDesign) {
            overviewDesign.innerHTML = `
                <span class="gap">Bracelet</span>
                <span class="gap">${selectedDesign.category}</span>
                <span class="gap">${selectedDesign.designName}</span>
                <span class="gap">${selectedClasp ? selectedClasp.name : 'Spring Ring'} Clasp</span>
                <span class="gap">${selectedWidth} mm Wide</span>
                <span class="gap">${selectedLength} cm Long</span>
                <span class="gap">${selectedKarat}K Gold</span>
            `;
        }
    };

    const updateModelContPosition = () => {
        const leftConts = document.querySelectorAll('.left-cont');
        const centerButtons = document.querySelector('.center-buttons');
        const modelConts = document.querySelectorAll('.model-cont');
    
        if (window.innerWidth <= 963) {
            leftConts.forEach((leftCont, index) => {
                const modelCont = modelConts[index];
    
                if (leftCont && centerButtons && modelCont) {
                    const y1 = leftCont.offsetHeight + leftCont.offsetTop;
                    const y2 = centerButtons.offsetTop;
                    const modelContHeight = y2 - y1 - 140;
    
                    modelCont.style.setProperty('--model-cont-top', `${y1}px`);
                    modelCont.style.setProperty('--model-cont-bottom', `${y2}px`);
                    modelCont.style.setProperty('height', `${modelContHeight}px`);
                }
            });
        } else {
            modelConts.forEach((modelCont) => {
                modelCont.style.removeProperty('--model-cont-top');
                modelCont.style.removeProperty('--model-cont-bottom');
                modelCont.style.setProperty('height', 'calc(100vh - 185px)');
            });
        }
    };

    const showPopup = (popupId) => {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add('show');
            popup.setAttribute('closable', 'true');
        }
    };

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const goToStep1 = () => {
        document.querySelector('.design-cont').style.display = 'block';
        document.getElementById('size-cont').style.display = 'none';
        document.getElementById('clasp-cont').style.display = 'none';
        document.getElementById('karat-cont').style.display = 'none';
        updateModelContPosition();
    };

    const goToStep2 = () => {
        const designCont = document.querySelector('.design-cont');
        const sizeCont = document.getElementById('size-cont');
        const claspCont = document.getElementById('clasp-cont');
        const karatCont = document.getElementById('karat-cont');
    
        if (designCont) {
            designCont.style.display = 'none';
        } else {
            console.error('Element with class "design-cont" not found.');
        }
    
        if (sizeCont) {
            sizeCont.style.display = 'block';
        } else {
            console.error('Element with ID "size-cont" not found.');
        }
    
        if (claspCont) {
            claspCont.style.display = 'none';
        } else {
            console.error('Element with ID "clasp-cont" not found.');
        }
    
        if (karatCont) {
            karatCont.style.display = 'none';
        } else {
            console.error('Element with ID "karat-cont" not found.');
        }
    };
    
    const goToStep3 = () => {
        document.querySelector('.design-cont').style.display = 'none';
        document.getElementById('size-cont').style.display = 'none';
        document.getElementById('clasp-cont').style.display = 'block';
        document.getElementById('karat-cont').style.display = 'none';
        if (selectedClasp) {
            changeRightImage(selectedClasp.claspModelurl);
        } else {
            changeRightImage('', 'Please click a clasp to view it');
        }
        updateModelContPosition();
    };
    
    const goToStep4 = () => {
        document.querySelector('.design-cont').style.display = 'none';
        document.getElementById('size-cont').style.display = 'none';
        document.getElementById('clasp-cont').style.display = 'none';
        document.getElementById('karat-cont').style.display = 'block';
        populateKaratDropdown(selectedDesign.karats);
        if (selectedDesign) {
            changeRightImage(selectedDesign.modelURL);
        }
        updateModelContPosition();
    };
    
    const populateKaratDropdown = (karats) => {
        const dropdown = document.getElementById('karat-dropdown');
        dropdown.innerHTML = '<option value="">Select Karat</option>';
    
        karats.forEach(karat => {
            const option = document.createElement('option');
            option.value = karat;
            option.textContent = `${karat}k (${getKaratPurity(karat)})`;
            dropdown.appendChild(option);
        });
    
        dropdown.addEventListener('change', (e) => handleKaratSelection(e.target.value));
    };
    
    const getKaratPurity = (karat) => {
        switch (karat) {
            case 10: return '41.7% gold';
            case 14: return '58.3% gold';
            case 18: return '75% gold';
            case 22: return '91.7% gold';
            case 24: return '100% gold';
            default: return '';
        }
    };

    const populateCategoryDropdown = (data) => {
        const categories = new Set(data.map(design => design.category));
        const dropdown = document.getElementById('category-filter');
        
        if (dropdown) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                dropdown.appendChild(option);
            });
        }
    };
    

    useEffect(() => {
        // Populate dropdown and design buttons
        populateCategoryDropdown(braceletData);
        generateDesignButtons(braceletData);
    
        // Add event listener to the category filter dropdown if it exists
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterDesigns);
        } else {
            console.error('Element with ID "category-filter" not found.');
        }
    
        // Add event listener to the next button container if it exists
        const nextButtonContainer = document.getElementById('nextButtonContainer');
        if (nextButtonContainer) {
            nextButtonContainer.addEventListener('click', handleNextButtonClick);
        } else {
            console.error('Element with ID "nextButtonContainer" not found.');
        }
    
        // Add event listener to the back button container if it exists
        const backButtonContainer = document.getElementById('backButtonContainer');
        if (backButtonContainer) {
            backButtonContainer.addEventListener('click', handleBackButtonClick);
        } else {
            console.error('Element with ID "backButtonContainer" not found.');
        }
    
        // Add event listener to the info icon if it exists
        const infoIcon = document.getElementById('info-icon');
        if (infoIcon) {
            infoIcon.addEventListener('click', () => {
                if (selectedDesign) {
                    const popupContainer = document.getElementById('design-popup-cont');
                    if (popupContainer) {
                        updatePopupDescription(selectedDesign); // Update the popup description
                        popupContainer.classList.add('show');
                        popupContainer.setAttribute('closable', 'true');
                    }
                } else {
                    alert("Please select a design first.");
                }
            });
        } else {
            console.error('Element with ID "info-icon" not found.');
        }
    
        // Add event listener to the popup container if it exists
        const popupContainer = document.getElementById('design-popup-cont');
        if (popupContainer) {
            popupContainer.addEventListener('click', (e) => {
                if (e.target === popupContainer && popupContainer.getAttribute('closable') === 'true') {
                    popupContainer.classList.remove('show');
                }
            });
        } else {
            console.error('Element with ID "design-popup-cont" not found.');
        }
    
        changeRightImage('', 'Please click a design to view it');
        populateClasps(claspData);
    
        updateModelContPosition(); // Initial call
        window.addEventListener('resize', updateModelContPosition);
        window.addEventListener('load', updateModelContPosition);
    
        const lengthInput = document.getElementById('bracelet-length');
        const widthInput = document.getElementById('bracelet-width');
    
        if (lengthInput) {
            lengthInput.addEventListener('blur', () => validateLength(lengthInput));
        } else {
            console.error('Element with ID "bracelet-length" not found.');
        }
    
        if (widthInput) {
            widthInput.addEventListener('blur', () => validateWidth(widthInput));
        } else {
            console.error('Element with ID "bracelet-width" not found.');
        }
    
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleNextButtonClick();
            }
        });
    
        const karatDropdown = document.getElementById('karat-dropdown');
        if (karatDropdown) {
            karatDropdown.addEventListener('change', () => {
                if (karatDropdown.value) {
                    setSelectedKarat(karatDropdown.value);
                    document.querySelectorAll('.karat-row-cont, .save-button').forEach(element => {
                        element.style.visibility = 'visible';
                    });
                }
            });
        } else {
            console.error('Element with ID "karat-dropdown" not found.');
        }
    
        // Retrieve data from localStorage if modifying a design
        const modifyDesignData = JSON.parse(localStorage.getItem("modifyDesignData"));
        if (modifyDesignData) {
            setSelectedDesign(braceletData.find(design => design.designName === modifyDesignData.designName));
            setSelectedKarat(modifyDesignData.karat);
            setSelectedClasp(claspData.find(clasp => clasp.name === modifyDesignData.clasp));
            setSelectedLength(modifyDesignData.size.length);
            setSelectedWidth(modifyDesignData.size.width);
    
            // Populate the form fields with the saved data
            changeRightImage(selectedDesign.modelURL);
            document.getElementById('bracelet-length').value = selectedLength;
            document.getElementById('bracelet-width').value = selectedWidth;
            document.getElementById('karat-dropdown').value = selectedKarat;
            updatePopupDescription(selectedDesign); // Update the popup description
            updateOverviewDesign();
            updateModelContPosition(); // Call this to update the UI
        }
    
        // Clear the modify data from localStorage to avoid reuse
        localStorage.removeItem("modifyDesignData");
    }, []);
    
const generateDesignButtons = (data) => {
    const container = document.getElementById('bracelets-container');
    if (container) {
        container.innerHTML = ''; // Clear existing buttons

        data.forEach(design => {
            const designButton = document.createElement('div');
            designButton.className = 'option-button';
            designButton.addEventListener('click', () => {
                setSelectedDesign(design);
                changeRightImage(design.modelURL);
                updatePopupDescription(design); 
                updateSizeLabels(design); 
            });

            const designName = document.createElement('div');
            designName.className = 'design-name-left';
            designName.textContent = design.designName.toLowerCase();

            const designImage = document.createElement('img');
            designImage.className = 'design-image-left';
            designImage.alt = design.designName;
            designImage.src = design.designURL;

            designButton.appendChild(designName);
            designButton.appendChild(designImage);
            container.appendChild(designButton);
        });
    } else {
        console.error('Element with ID "bracelets-container" not found.');
    }
};

    const filterDesigns = () => {
        const selectedCategory = document.getElementById('category-filter').value;
        const filteredData = selectedCategory === 'all-bracelets' ? braceletData : braceletData.filter(design => design.category === selectedCategory);
        generateDesignButtons(filteredData);
        updateModelContPosition(); 
    }

    const populateClasps = (clasps) => {
        const container = document.getElementById('clasps-container');
        if (container) {
            container.innerHTML = ''; // Clear existing clasps
            clasps.forEach(clasp => {
                const claspButton = document.createElement('div');
                claspButton.className = 'option-button';
                claspButton.addEventListener('click', () => {
                    setSelectedClasp(clasp);
                    changeRightImage(clasp.claspModelurl); // Update image with selected clasp model URL
                    updateOverviewDesign(); // Update overview design with selected clasp
                });
    
                const claspName = document.createElement('div');
                claspName.className = 'design-name-left';
                claspName.textContent = clasp.name.toLowerCase();
    
                const claspImage = document.createElement('img');
                claspImage.className = 'clasp-image-left';
                claspImage.alt = clasp.name;
                claspImage.src = clasp.url;
    
                claspButton.appendChild(claspName);
                claspButton.appendChild(claspImage);
                container.appendChild(claspButton);
            });
        } else {
            console.error('Element with ID "clasps-container" not found.');
        }
    };
    
    
    return {
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
        populateKaratDropdown,
        getKaratPurity,
        generateDesignButtons,
        filterDesigns,
        populateClasps,
        populateCategoryDropdown 
    };
};
