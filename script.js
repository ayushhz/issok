
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Symptom form functionality
    const symptomForm = document.getElementById('symptomForm');
    const symptomResults = document.getElementById('symptomResults');

    symptomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(symptomForm);
        const symptoms = formData.get('symptoms');
        const age = formData.get('age');
        const gender = formData.get('gender');
        const duration = formData.get('duration');

        if (!symptoms.trim()) {
            alert('Please describe your symptoms.');
            return;
        }

        // Simulate API call with loading state
        const submitBtn = symptomForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Analyzing...
        `;
        submitBtn.disabled = true;

        // Simulate processing time
        setTimeout(() => {
            displaySymptomResults(symptoms, age, gender, duration);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    function displaySymptomResults(symptoms, age, gender, duration) {
        const resultsContent = symptomResults.querySelector('.results-content');
        
        resultsContent.innerHTML = `
            <div class="results-summary">
                <h4 style="margin-bottom: 1rem; color: #1e40af;">Analysis Summary</h4>
                <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e0f2fe; margin-bottom: 1rem;">
                    <p><strong>Symptoms:</strong> ${symptoms}</p>
                    ${age ? `<p><strong>Age:</strong> ${age}</p>` : ''}
                    ${gender ? `<p><strong>Gender:</strong> ${gender}</p>` : ''}
                    ${duration ? `<p><strong>Duration:</strong> ${duration}</p>` : ''}
                </div>
                <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <p style="color: #92400e; font-weight: 600;">⚠️ Important Disclaimer</p>
                    <p style="color: #92400e; font-size: 0.875rem; margin-top: 0.5rem;">
                        This analysis is for informational purposes only and should not replace professional medical consultation. 
                        Please consult with a healthcare provider for proper diagnosis and treatment.
                    </p>
                </div>
                <div style="background: #dcfce7; border: 1px solid #22c55e; padding: 1rem; border-radius: 0.5rem;">
                    <p style="color: #166534; font-weight: 600;">💡 AI Analysis Complete</p>
                    <p style="color: #166534; font-size: 0.875rem; margin-top: 0.5rem;">
                        Based on the symptoms provided, we recommend scheduling an appointment with your healthcare provider 
                        for a comprehensive evaluation.
                    </p>
                </div>
            </div>
        `;
        
        symptomResults.classList.remove('hidden');
        symptomResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Image upload functionality
    const imageForm = document.getElementById('imageForm');
    const imageResults = document.getElementById('imageResults');
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File input change
    imageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert('File size must be less than 10MB.');
            return;
        }

        // Display file info
        const uploadTitle = uploadArea.querySelector('.upload-title');
        const uploadDescription = uploadArea.querySelector('.upload-description');
        
        uploadTitle.textContent = file.name;
        uploadDescription.textContent = `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`;
        uploadArea.style.background = '#f0f9ff';
        uploadArea.style.borderColor = '#2563eb';
    }

    // Image form submission
    imageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(imageForm);
        const imageFile = formData.get('imageInput');
        const imageType = formData.get('imageType');

        if (!imageFile || imageFile.size === 0) {
            alert('Please upload an image.');
            return;
        }

        if (!imageType) {
            alert('Please select an image type.');
            return;
        }

        // Simulate processing
        const submitBtn = imageForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Processing...
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
            displayImageResults(imageFile.name, imageType);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });

    function displayImageResults(fileName, imageType) {
        const resultsContent = imageResults.querySelector('.results-content');
        
        resultsContent.innerHTML = `
            <div class="results-summary">
                <h4 style="margin-bottom: 1rem; color: #1e40af;">Image Analysis Complete</h4>
                <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e0f2fe; margin-bottom: 1rem;">
                    <p><strong>File:</strong> ${fileName}</p>
                    <p><strong>Type:</strong> ${imageType}</p>
                    <p><strong>Status:</strong> Successfully processed</p>
                </div>
                <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <p style="color: #92400e; font-weight: 600;">⚠️ Medical Disclaimer</p>
                    <p style="color: #92400e; font-size: 0.875rem; margin-top: 0.5rem;">
                        This AI analysis is preliminary and should not be used as a substitute for professional medical diagnosis. 
                        Always consult with qualified healthcare professionals for proper medical evaluation.
                    </p>
                </div>
                <div style="background: #dcfce7; border: 1px solid #22c55e; padding: 1rem; border-radius: 0.5rem;">
                    <p style="color: #166534; font-weight: 600;">📋 Next Steps</p>
                    <p style="color: #166534; font-size: 0.875rem; margin-top: 0.5rem;">
                        Please share these results with your healthcare provider along with your medical history 
                        for comprehensive evaluation and treatment planning.
                    </p>
                </div>
            </div>
        `;
        
        imageResults.classList.remove('hidden');
        imageResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .diagnosis-form, .section-header').forEach(el => {
        observer.observe(el);
    });

    // Add spinning animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
window.addEventListener('load', function() {
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
