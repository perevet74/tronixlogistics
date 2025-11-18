// Tronixs Express Logistics - Main JavaScript

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
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
        }

        let html = `
            <div class="shipment-info-card">
                <h3>Shipment Information</h3>
                <div class="info-grid-detailed">
                    <div class="info-item-detailed">
                        <strong>Tracking Number</strong>
                        <span>${shipment.tracking_number}</span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Status</strong>
                        <span><span class="${statusClass}">${shipment.status}</span></span>
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
                    <div class="info-item-detailed">
                        <strong>Weight</strong>
                        <span>${shipment.weight || 'N/A'}</span>
                    </div>
                    <div class="info-item-detailed">
                        <strong>Dimensions</strong>
                        <span>${shipment.dimensions || 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;

        if (history.length > 0) {
            html += `
                <div class="tracking-history-card">
                    <h3>Tracking History</h3>
                    <div class="history-list-detailed">
            `;
            
            history.forEach(item => {
                html += `
                    <div class="history-item">
                        <div class="status">${item.status}</div>
                        <div class="location">${item.location || 'N/A'}</div>
                        ${item.notes ? '<div class="notes">' + item.notes + '</div>' : ''}
                        <div class="timestamp">${item.timestamp}</div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }

        resultsDiv.innerHTML = html;
    }
});

