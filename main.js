// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Set window.toggleCheckbox for mobile menu
    window.toggleCheckbox = function(checkbox) {
        if (checkbox) {
            document.body.classList.toggle('menu-open', checkbox.checked);
        }
    };
    
    // Initialize package tabs on pricing page
    initPackageTabs();
    
    // Handle form submission with Formspree
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        setupFormspreeForm(bookingForm);
    }
});

// Function to initialize package tabs on pricing page
function initPackageTabs() {
    const packageTabs = document.querySelectorAll('[data-package-type]');
    const packageSections = document.querySelectorAll('.package-section');
    const categoryTitle = document.getElementById('package-category-title');
    
    if (packageTabs.length > 0 && packageSections.length > 0) {
        packageTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs
                packageTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all package sections
                packageSections.forEach(section => {
                    section.classList.add('d-none');
                    section.classList.remove('active');
                });
                
                // Show the appropriate package section
                const packageType = this.getAttribute('data-package-type');
                const targetSection = document.getElementById(`${packageType}-packages`);
                
                if (targetSection) {
                    targetSection.classList.remove('d-none');
                    targetSection.classList.add('active');
                }
                
                // Update the category title
                if (categoryTitle) {
                    if (packageType === 'wedding') {
                        categoryTitle.textContent = 'Wedding Photography Packages';
                    } else if (packageType === 'pre_wedding') {
                        categoryTitle.textContent = 'Pre-Wedding Photography Packages';
                    } else if (packageType === 'ring_ceremony') {
                        categoryTitle.textContent = 'Ring Ceremony Photography Packages';
                    }
                }
            });
        });
    }
}

// Function to setup form submission with EmailJS
function setupFormspreeForm(form) {
    // Get URL parameters to pre-select package
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('package_type');
    const tier = urlParams.get('tier');
    
    // Debug: log the URL parameters to console
    console.log("URL parameters:", window.location.search);
    console.log("Package type from URL:", packageType);
    console.log("Tier from URL:", tier);
    
    // Set package type selection if parameter exists
    if (packageType) {
        const packageTypeSelect = document.getElementById('package_type');
        if (packageTypeSelect) {
            for (let i = 0; i < packageTypeSelect.options.length; i++) {
                if (packageTypeSelect.options[i].value === packageType) {
                    packageTypeSelect.selectedIndex = i;
                    
                    // Update summary display
                    const summaryPackageType = document.getElementById('summary-package-type');
                    if (summaryPackageType) {
                        // Convert to display format (e.g., pre_wedding → Pre-Wedding)
                        let displayText = packageType;
                        if (packageType === 'pre_wedding') {
                            displayText = 'Pre-Wedding';
                        } else if (packageType === 'wedding') {
                            displayText = 'Wedding';
                        } else if (packageType === 'ring_ceremony') {
                            displayText = 'Ring Ceremony';
                        }
                        summaryPackageType.textContent = displayText;
                    }
                    break;
                }
            }
        }
    }
    
    // Set package tier selection if parameter exists
    if (tier) {
        const tierSelect = document.getElementById('tier');
        if (tierSelect) {
            for (let i = 0; i < tierSelect.options.length; i++) {
                if (tierSelect.options[i].value === tier) {
                    tierSelect.selectedIndex = i;
                    
                    // Update summary display
                    const summaryTier = document.getElementById('summary-tier');
                    if (summaryTier) {
                        // Convert to display format (e.g., standard → Standard)
                        let displayText = tier.charAt(0).toUpperCase() + tier.slice(1);
                        summaryTier.textContent = displayText;
                    }
                    break;
                }
            }
        }
    }
    
    // Form submission is now handled directly in booking.html with handleFormSubmit
    
    // Setup package price display based on package_type and tier selections
    const packageTypeSelect = document.getElementById('package_type');
    const tierSelect = document.getElementById('tier');
    const basePriceDisplay = document.getElementById('base-price');
    const totalPriceDisplay = document.getElementById('total-price');
    
    // Package prices mapping - making it available globally via window object
    window.packagePrices = {
        'wedding_basic': 69999,
        'wedding_standard': 99999,
        'wedding_premium': 149999,
        'pre_wedding_basic': 59999,
        'pre_wedding_standard': 89999,
        'pre_wedding_premium': 129999,
        'ring_ceremony_basic': 49999,
        'ring_ceremony_standard': 79999,
        'ring_ceremony_premium': 119999
    };
    
    // Package features for each package type and tier - making it available globally via window object
    window.packageFeatures = {
        'wedding_basic': [
            '8 hours of photography coverage',
            '1 photographer',
            'Online gallery with all edited images',
            '100 high-resolution digital images'
        ],
        'wedding_standard': [
            '10 hours of photography coverage',
            '2 photographers',
            'Online gallery with all edited images',
            '300 high-resolution digital images',
            'Engagement photo session',
            'Wedding album (20 pages)'
        ],
        'wedding_premium': [
            'Full day photography coverage (up to 12 hours)',
            '2 photographers',
            'Online gallery with all edited images',
            'All high-resolution digital images',
            'Engagement photo session',
            'Bridal photoshoot',
            'Deluxe wedding album (30 pages)',
            'Two parent albums',
            'Wedding day highlight slideshow'
        ],
        'pre_wedding_basic': [
            '6 hours of pre-wedding photography',
            '1 professional photographer',
            'Scenic outdoor locations',
            '80 edited digital images',
            'Online gallery with downloadable photos'
        ],
        'pre_wedding_standard': [
            '8 hours of pre-wedding photography',
            '2 professional photographers',
            'Multiple outfit changes (up to 3)',
            'Multiple premium locations',
            '150 edited digital images',
            'Custom photo album (20 pages)',
            'Online gallery with downloadable photos'
        ],
        'pre_wedding_premium': [
            '2-day pre-wedding photoshoot (16 hours)',
            '2 professional photographers + 1 assistant',
            'Unlimited outfit changes',
            'Drone photography & cinematography',
            'Premium destination locations',
            '300+ edited digital images',
            'Luxury photo album (30 pages)',
            '5-minute cinematic highlight film',
            'Private online gallery'
        ],
        'ring_ceremony_basic': [
            '4 hours of ring ceremony coverage',
            '1 dedicated photographer',
            'In-venue photography',
            '75 edited digital images',
            'Private online gallery'
        ],
        'ring_ceremony_standard': [
            '6 hours of ring ceremony coverage',
            '2 coordinated photographers',
            'Family group photos',
            'Couple\'s portraiture session',
            '150 edited digital images',
            'Ring ceremony photo album (20 pages)',
            'Private online gallery'
        ],
        'ring_ceremony_premium': [
            'Full day ring ceremony coverage (10 hours)',
            '2 photographers + 1 cinematographer',
            'Pre-ceremony preparation photos',
            'Venue and décor detail shots',
            'Family formal portraits',
            '250+ edited digital images',
            'Luxury ring ceremony album (30 pages)',
            '3-5 minute highlight film',
            'Two parent albums',
            'Private online gallery with downloadable content'
        ]
    };
    
    // No need for autoresponse email handling as we're using EmailJS now
    
    // Get references to package feature display elements
    const packageTitleEl = document.getElementById('package-title');
    const totalPriceDisplayEl = document.getElementById('total-price-display');
    const featuresListEl = document.getElementById('package-features-list');
    
    // Function to update price and package details display
    function updatePriceDisplay() {
        if (packageTypeSelect && tierSelect) {
            const packageType = packageTypeSelect.value;
            const tier = tierSelect.value;
            const packageKey = `${packageType}_${tier}`;
            
            // Format package display name
            let packageDisplayName = packageType === 'pre_wedding' ? 'Pre-Wedding' : 
                                    packageType === 'ring_ceremony' ? 'Ring Ceremony' : 'Wedding';
            const tierDisplayName = tier.charAt(0).toUpperCase() + tier.slice(1);
            const fullPackageName = tierDisplayName + ' ' + packageDisplayName + ' Package';
            
            // Update package title if element exists
            if (packageTitleEl) {
                packageTitleEl.textContent = fullPackageName;
            }
            
            if (window.packagePrices[packageKey]) {
                // Format the price in Indian rupees format (₹)
                const price = window.packagePrices[packageKey];
                const formattedPrice = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(price);
                
                // Update price displays in original elements if they exist
                if (basePriceDisplay) basePriceDisplay.textContent = formattedPrice;
                if (totalPriceDisplay) totalPriceDisplay.textContent = formattedPrice;
                
                // Update new price display element if it exists
                if (totalPriceDisplayEl) {
                    totalPriceDisplayEl.textContent = formattedPrice;
                }
                
                // Add package price to a hidden input for EmailJS
                let priceInput = document.getElementById('package-price-input');
                if (!priceInput && form) {
                    priceInput = document.createElement('input');
                    priceInput.type = 'hidden';
                    priceInput.name = 'package_price';
                    priceInput.id = 'package-price-input';
                    form.appendChild(priceInput);
                }
                if (priceInput) priceInput.value = price;
                
                // Update package features if the elements exist
                if (featuresListEl && window.packageFeatures[packageKey]) {
                    // Clear previous features
                    featuresListEl.innerHTML = '';
                    
                    // Add new features
                    window.packageFeatures[packageKey].forEach(feature => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="fas fa-check me-2"></i> ${feature}`;
                        featuresListEl.appendChild(li);
                    });
                }
            }
        }
    }
    
    // Add event listeners to update price when selections change
    if (packageTypeSelect && tierSelect) {
        packageTypeSelect.addEventListener('change', updatePriceDisplay);
        tierSelect.addEventListener('change', updatePriceDisplay);
        
        // Initial update of price display
        updatePriceDisplay();
    }
}