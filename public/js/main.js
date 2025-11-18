// Tronixs Express Logistics - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuToggle && navMenu) {
        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (isActive) {
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            } else {
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
            }
        }

        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Handle dropdowns on mobile first
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('> a');
            if (dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Close menu when clicking on a link (but not dropdown parent links)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    // Check if it's a dropdown parent link
                    const parent = link.closest('.dropdown');
                    const isDropdownParent = parent && link === parent.querySelector('> a');
                    // Don't close if it's a dropdown parent link - those toggle dropdowns
                    if (!isDropdownParent) {
                        // Close menu for regular links and dropdown child links
                        toggleMenu();
                    }
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (navMenu.classList.contains('active')) {
                    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                        toggleMenu();
                    }
                }
            }
        });

        // Close menu on window resize if it becomes desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    }

    // Hero Slider Functionality
    // Initialize Hero Slider
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.hero-slide');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        const nextBtn = slider.querySelector('.slider-btn.next');
        let currentSlide = 0;
        let autoSlideInterval;

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }

            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);

        // Start auto-slide
        startAutoSlide();
    }

    // Track Form Handler (Homepage)
    const trackFormMain = document.getElementById('trackFormMain');
    if (trackFormMain) {
        trackFormMain.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = this.querySelector('input[type="text"]').value.trim();
            if (trackingNumber) {
                window.location.href = `track.html?tracking=${encodeURIComponent(trackingNumber)}`;
            }
        });
    }

    // Quote Form Handler
    const quoteFormMain = document.getElementById('quoteFormMain');
    if (quoteFormMain) {
        quoteFormMain.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                origin: formData.get('origin') || '',
                destination: formData.get('destination') || '',
                weight: formData.get('weight') || '',
                dimensions: formData.get('dimensions') || '',
                service_type: [],
                fragile: formData.get('fragile') ? true : false,
                explosive: formData.get('explosive') ? true : false,
                discrete: formData.get('discrete') ? true : false,
                express: formData.get('express') ? true : false,
                insurance: formData.get('insurance') ? true : false,
                packaging: formData.get('packaging') ? true : false
            };

            // Get service types
            if (formData.get('air_freight')) data.service_type.push('Air Freight');
            if (formData.get('land_freight')) data.service_type.push('Land Freight');
            if (formData.get('ocean_freight')) data.service_type.push('Ocean Freight');
            if (formData.get('rail_freight')) data.service_type.push('Rail Freight');
            data.service_type = data.service_type.join(', ');

            fetch('api/quote.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                const messageDiv = document.getElementById('quoteMessageMain');
                if (messageDiv) {
                    messageDiv.className = 'message ' + (result.success ? 'success' : 'error');
                    messageDiv.textContent = result.message || (result.success ? 'Quote request submitted successfully!' : 'Error submitting quote request.');
                }
                if (result.success) {
                    quoteFormMain.reset();
                }
            })
            .catch(error => {
                const messageDiv = document.getElementById('quoteMessageMain');
                if (messageDiv) {
                    messageDiv.className = 'message error';
                    messageDiv.textContent = 'Error submitting quote request. Please try again.';
                }
            });
        });
    }

    // Auto-submit track form if tracking number in URL
    const urlParams = new URLSearchParams(window.location.search);
    const trackingNumber = urlParams.get('tracking');
    if (trackingNumber) {
        const trackInput = document.querySelector('#trackForm input[type="text"]');
        const trackForm = document.getElementById('trackForm');
        if (trackInput && trackForm) {
            trackInput.value = trackingNumber;
            trackForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Track Form Handler (Track Page)
document.addEventListener('DOMContentLoaded', function() {
    const trackForm = document.getElementById('trackForm');
    if (trackForm) {
        trackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trackingNumber = this.querySelector('input[type="text"]').value.trim();
            if (!trackingNumber) {
                alert('Please enter a tracking number');
                return;
            }

            fetch('api/track.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tracking_number: trackingNumber })
            })
            .then(response => response.json())
            .then(data => {
                displayTrackingResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('trackingResults').innerHTML = 
                    '<div class="message error">Error tracking shipment. Please try again.</div>';
            });
        });
    }

    function displayTrackingResults(data) {
        const resultsDiv = document.getElementById('trackingResults');
        if (!resultsDiv) return;

        if (!data.success || !data.shipment) {
            resultsDiv.innerHTML = '<div class="message error">' + (data.message || 'Shipment not found') + '</div>';
            return;
        }

        const shipment = data.shipment;
        const history = data.history || [];

        let statusClass = 'status-badge';
        if (shipment.status === 'Delivered') {
            statusClass += ' delivered';
        } else if (shipment.status === 'In Transit') {
            statusClass += ' in-transit';
        } else if (shipment.status === 'Pending') {
            statusClass += ' pending';
        } else if (shipment.status === 'Processing') {
            statusClass += ' processing';
        } else if (shipment.status === 'Out for Delivery') {
            statusClass += ' out-for-delivery';
        }

        // Format date
        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        // Format address
        function formatAddress(address, city, state, zip, country) {
            let addr = address || '';
            if (city) addr += (addr ? ', ' : '') + city;
            if (state) addr += (addr ? ', ' : '') + state;
            if (zip) addr += (addr ? ' ' : '') + zip;
            if (country) addr += (addr ? ', ' : '') + country;
            return addr || 'N/A';
        }

        let html = `
            <div class="shipment-info-card">
                <h3>Shipment Overview</h3>
                <div class="info-grid-detailed">
                    <div class="info-item-detailed">
                        <strong>Tracking Number</strong>
                        <span class="tracking-number-display">${shipment.tracking_number}</span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Status</strong>
                        <span><span class="${statusClass}">${shipment.status || 'Pending'}</span></span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Current Location</strong>
                        <span>${shipment.current_location || 'N/A'}</span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Service Type</strong>
                        <span>${shipment.service_type || 'N/A'}</span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Origin</strong>
                        <span>${shipment.origin || 'N/A'}</span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Destination</strong>
                        <span>${shipment.destination || 'N/A'}</span>
                    </div>
                    ${shipment.estimated_delivery_date ? `
                    <div class="info-item-detailed">
                        <strong>Estimated Delivery</strong>
                        <span>${formatDate(shipment.estimated_delivery_date)}</span>
                    </div>
                    ` : ''}
                    ${shipment.actual_delivery_date ? `
                    <div class="info-item-detailed">
                        <strong>Actual Delivery</strong>
                        <span>${formatDate(shipment.actual_delivery_date)}</span>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="shipment-info-card">
                <h3>Sender Information</h3>
                <div class="info-grid-detailed">
                    <div class="info-item-detailed">
                        <strong>Name</strong>
                        <span>${shipment.sender_name || 'N/A'}</span>
                    </div>
                    ${shipment.sender_email ? `
                    <div class="info-item-detailed">
                        <strong>Email</strong>
                        <span>${shipment.sender_email}</span>
                    </div>
                    ` : ''}
                    ${shipment.sender_phone ? `
                    <div class="info-item-detailed">
                        <strong>Phone</strong>
                        <span>${shipment.sender_phone}</span>
                    </div>
                    ` : ''}
                    <div class="info-item-detailed full-width">
                        <strong>Address</strong>
                        <span>${formatAddress(shipment.sender_address, shipment.sender_city, shipment.sender_state, shipment.sender_zip, shipment.sender_country)}</span>
                    </div>
                </div>
            </div>

            <div class="shipment-info-card">
                <h3>Recipient Information</h3>
                <div class="info-grid-detailed">
                    <div class="info-item-detailed">
                        <strong>Name</strong>
                        <span>${shipment.recipient_name || 'N/A'}</span>
                    </div>
                    ${shipment.recipient_email ? `
                    <div class="info-item-detailed">
                        <strong>Email</strong>
                        <span>${shipment.recipient_email}</span>
                    </div>
                    ` : ''}
                    ${shipment.recipient_phone ? `
                    <div class="info-item-detailed">
                        <strong>Phone</strong>
                        <span>${shipment.recipient_phone}</span>
                    </div>
                    ` : ''}
                    <div class="info-item-detailed full-width">
                        <strong>Address</strong>
                        <span>${formatAddress(shipment.recipient_address, shipment.recipient_city, shipment.recipient_state, shipment.recipient_zip, shipment.recipient_country)}</span>
                    </div>
                </div>
            </div>

            <div class="shipment-info-card">
                <h3>Cargo Details</h3>
                <div class="info-grid-detailed">
                    ${shipment.cargo_type ? `
                    <div class="info-item-detailed">
                        <strong>Cargo Type</strong>
                        <span>${shipment.cargo_type}</span>
                    </div>
                    ` : ''}
                    ${shipment.quantity ? `
                    <div class="info-item-detailed">
                        <strong>Quantity</strong>
                        <span>${shipment.quantity}</span>
                    </div>
                    ` : ''}
                    ${shipment.cargo_description ? `
                    <div class="info-item-detailed full-width">
                        <strong>Description</strong>
                        <span>${shipment.cargo_description}</span>
                    </div>
                    ` : ''}
                    ${shipment.weight ? `
                    <div class="info-item-detailed">
                        <strong>Weight</strong>
                        <span>${shipment.weight} ${shipment.weight_unit || 'kg'}</span>
                    </div>
                    ` : ''}
                    ${(shipment.length && shipment.width && shipment.height) ? `
                    <div class="info-item-detailed">
                        <strong>Dimensions</strong>
                        <span>${shipment.length} × ${shipment.width} × ${shipment.height} ${shipment.dimension_unit || 'cm'}</span>
                    </div>
                    ` : ''}
                    ${shipment.declared_value ? `
                    <div class="info-item-detailed">
                        <strong>Declared Value</strong>
                        <span>${shipment.currency || 'USD'} ${parseFloat(shipment.declared_value).toLocaleString()}</span>
                    </div>
                    ` : ''}
                    ${shipment.insurance == 1 ? `
                    <div class="info-item-detailed">
                        <strong>Insurance</strong>
                        <span>Yes${shipment.insurance_value ? ' - ' + (shipment.currency || 'USD') + ' ' + parseFloat(shipment.insurance_value).toLocaleString() : ''}</span>
                    </div>
                    ` : ''}
                </div>
            </div>

            ${(shipment.fragile == 1 || shipment.hazardous == 1 || shipment.temperature_controlled == 1 || shipment.requires_signature == 1 || shipment.special_instructions) ? `
            <div class="shipment-info-card">
                <h3>Special Requirements</h3>
                <div class="info-grid-detailed">
                    ${shipment.fragile == 1 ? `
                    <div class="info-item-detailed">
                        <strong>Fragile</strong>
                        <span class="special-badge">Handle with Care</span>
                    </div>
                    ` : ''}
                    ${shipment.hazardous == 1 ? `
                    <div class="info-item-detailed">
                        <strong>Hazardous</strong>
                        <span class="special-badge warning">Hazardous Materials</span>
                    </div>
                    ` : ''}
                    ${shipment.temperature_controlled == 1 ? `
                    <div class="info-item-detailed">
                        <strong>Temperature</strong>
                        <span class="special-badge">Temperature Controlled</span>
                    </div>
                    ` : ''}
                    ${shipment.requires_signature == 1 ? `
                    <div class="info-item-detailed">
                        <strong>Delivery</strong>
                        <span class="special-badge">Requires Signature</span>
                    </div>
                    ` : ''}
                    ${shipment.special_instructions ? `
                    <div class="info-item-detailed full-width">
                        <strong>Special Instructions</strong>
                        <span>${shipment.special_instructions}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}

            ${shipment.delivery_notes ? `
            <div class="shipment-info-card">
                <h3>Delivery Notes</h3>
                <div class="info-grid-detailed">
                    <div class="info-item-detailed full-width">
                        <span>${shipment.delivery_notes}</span>
                    </div>
                </div>
            </div>
            ` : ''}
        `;

        if (history.length > 0) {
            html += `
                <div class="tracking-history-card">
                    <h3>Tracking History</h3>
                    <div class="history-list-detailed">
            `;
            
            history.forEach((item, index) => {
                let itemStatusClass = 'status-badge';
                if (item.status === 'Delivered') {
                    itemStatusClass += ' delivered';
                } else if (item.status === 'In Transit') {
                    itemStatusClass += ' in-transit';
                } else if (item.status === 'Pending') {
                    itemStatusClass += ' pending';
                } else if (item.status === 'Processing') {
                    itemStatusClass += ' processing';
                } else if (item.status === 'Out for Delivery') {
                    itemStatusClass += ' out-for-delivery';
                }

                const timestamp = item.timestamp ? formatDate(item.timestamp) + ' ' + new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A';
                
                html += `
                    <div class="history-item-detailed ${index === 0 ? 'latest' : ''}">
                        <div class="history-status">
                            <span class="${itemStatusClass}">${item.status || 'N/A'}</span>
                        </div>
                        <div class="history-location">
                            <strong>Location:</strong> ${item.location || 'N/A'}
                        </div>
                        ${item.notes ? `
                        <div class="history-notes">
                            <strong>Notes:</strong> ${item.notes}
                        </div>
                        ` : ''}
                        <div class="history-timestamp">
                            <strong>Date & Time:</strong> ${timestamp}
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="tracking-history-card">
                    <h3>Tracking History</h3>
                    <div class="history-list-detailed">
                        <div class="no-history">No tracking history available yet.</div>
                    </div>
                </div>
            `;
        }

        resultsDiv.innerHTML = html;
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

