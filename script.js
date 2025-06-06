document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
      });
    }
    
    // Word carousel animation
    const words = document.querySelectorAll(".word-carousel div");
    if (words.length > 0) {
      let currentWordIndex = 0;
      words[0].classList.add("visible");
      setInterval(() => {
        words[currentWordIndex].classList.remove("visible");
        currentWordIndex = (currentWordIndex + 1) % words.length;
        words[currentWordIndex].classList.add("visible");
      }, 3000);
    }
  
    // LEOSPHERE Meaning Section animations
    const meaningSection = document.getElementById("LEOSPHERE-Meaning");
    if (meaningSection) {
      const meaningCards = meaningSection.querySelectorAll(".meaning-card");
      
      // Add entrance classes to cards
      meaningCards.forEach((card, index) => {
        // Assign different entrance animations based on position
        if (index % 3 === 0) {
          card.classList.add("left-enter");
        } else if (index % 3 === 2) {
          card.classList.add("right-enter");
        } else {
          card.classList.add("middle-enter");
        }
      });
      
      // Function to handle meaning section animations
      function handleMeaningAnimations() {
        const sectionTop = meaningSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;
        const isAboveViewport = sectionTop > window.innerHeight;
        
        if (sectionTop < triggerPoint) {
          meaningCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate");
            }, 150 * index); // Staggered delay based on card index
          });
        } else if (isAboveViewport) {
          // Reset animations when scrolled far above
          meaningCards.forEach(card => {
            card.classList.remove("animate");
          });
        }
      }
      
      // Initial check and scroll event listener
      handleMeaningAnimations();
      window.addEventListener("scroll", handleMeaningAnimations);
    }
  
    // Benefits cards click effect
    const benefitsContainer = document.querySelector(".benefits-container");
    const benefitCards = document.querySelectorAll(".benefit-card");
    const benefitsOverlay = document.querySelector(".benefits-overlay");
    let activeCard = null;
    
    if (benefitCards.length > 0 && benefitsOverlay) {
      benefitCards.forEach((card) => {
        card.addEventListener("click", function (e) {
          // Only prevent default if not clicking a link or button
          if (!e.target.closest('a') && !e.target.closest('button')) {
            e.stopPropagation();
            
            if (this.classList.contains("active")) {
              // If clicking active card (but not a link/button), do nothing
              // Links and buttons will work normally
            } else {
              // If clicking new card, deactivate old one and activate new
              if (activeCard) {
                activeCard.classList.remove("active");
              }
              
              // Show overlay and card simultaneously
              benefitsOverlay.classList.remove("hidden");
              
              // Add a small delay before adding the active class for better animation
              setTimeout(() => {
                this.classList.add("active");
                activeCard = this;
                
                // Ensure the card is scrolled to the top when opened
                this.scrollTop = 0;
              }, 10);
            }
          }
        });
      });
      
      // Close active card when clicking on overlay
      benefitsOverlay.addEventListener("click", function () {
        if (activeCard) {
          // Add transition class for smooth closing animation
          activeCard.classList.add("closing");
          
          // Wait for animation to complete before hiding
          setTimeout(() => {
            activeCard.classList.remove("active");
            activeCard.classList.remove("closing");
            benefitsOverlay.classList.add("hidden");
            activeCard = null;
          }, 300);
        }
      });
      
      // Close with ESC key
      document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && activeCard) {
          // First fade out the overlay
          benefitsOverlay.style.opacity = "0";
          
          // Add transition class for smooth closing animation
          activeCard.classList.add("closing");
          
          // Then after a short delay, remove the active class and hide overlay
          setTimeout(() => {
            activeCard.classList.remove("active");
            activeCard.classList.remove("closing");
            benefitsOverlay.classList.add("hidden");
            benefitsOverlay.style.opacity = "1"; // Reset opacity for next time
            activeCard = null;
          }, 300);
        }
      });
    }
  
    // FAQ accordion
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentElement;
        const icon = this.querySelector("i");
        if (!icon) return;
        
        // Toggle active class
        faqItem.classList.toggle("active");
        // Toggle icon
        if (faqItem.classList.contains("active")) {
          icon.classList.remove("ri-add-line");
          icon.classList.add("ri-subtract-line");
        } else {
          icon.classList.remove("ri-subtract-line");
          icon.classList.add("ri-add-line");
        }
      });
    });
  
    // File upload button
    const fileUploadButton = document.querySelector(
      "[onclick=\"document.getElementById('file-upload').click()\"]"
    );
    if (fileUploadButton) {
      const fileUploadInput = document.getElementById("file-upload");
      if (!fileUploadInput) return;
      
      const uploadArea = fileUploadButton.closest(".border-dashed");
      if (!uploadArea) return;
      
      // Drag and drop functionality
      uploadArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add("border-primary");
      });
      
      uploadArea.addEventListener("dragleave", function () {
        this.classList.remove("border-primary");
      });
      
      uploadArea.addEventListener("drop", function (e) {
        e.preventDefault();
        this.classList.remove("border-primary");
        fileUploadInput.files = e.dataTransfer.files;
        updateFileName(e.dataTransfer.files);
      });
      
      fileUploadInput.addEventListener("change", function () {
        updateFileName(this.files);
      });
      
      function updateFileName(files) {
        if (files.length > 0) {
          const fileNames = Array.from(files)
            .map((file) => file.name)
            .join(", ");
          const fileInfoText = uploadArea.querySelector("p:first-of-type");
          if (fileInfoText) {
            fileInfoText.textContent = fileNames;
          }
        }
      }
    }
    
    // Industries Section animations
    const industriesSection = document.getElementById("industries");
    if (industriesSection) {
      const industryCards = industriesSection.querySelectorAll(".grid > a");
      
      // Initially set up all cards
      industryCards.forEach((card, index) => {
        // Remove existing animation classes
        card.classList.remove("left-enter", "middle-enter", "right-enter");
        
        // Set initial state - all cards except the second one should be invisible
        if (index !== 1) {
          card.style.opacity = "0";
        }
        
        // Add animation classes based on position
        if (index === 0) {
          // Card 1: fadeInRight
          card.classList.add("animate__animated", "animate__fadeInRight");
        } else if (index === 2) {
          // Card 3: fadeInLeft
          card.classList.add("animate__animated", "animate__fadeInLeft");
        } else if (index === 3) {
          // Card 4: fadeInTopRight
          card.classList.add("animate__animated", "animate__fadeInTopRight");
        } else if (index === 4) {
          // Card 5: fadeInDown
          card.classList.add("animate__animated", "animate__fadeInDown");
        } else if (index === 5) {
          // Card 6: fadeInTopLeft
          card.classList.add("animate__animated", "animate__fadeInTopLeft");
        }
        
        // Set animation delay for staggered effect
        if (index !== 1) {
          card.style.animationDelay = `${(index < 1 ? index : index - 1) * 0.15 + 0.2}s`;
          card.style.animationPlayState = "paused";
        }
      });
      
      // Setup Intersection Observer for animation trigger
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            // Wait until the section is sufficiently visible before triggering animations
            setTimeout(() => {
              // Get all cards except the second one
              industryCards.forEach((card, index) => {
                if (index !== 1) {
                  // Make card visible and play animation
                  card.style.opacity = "1";
                  card.style.animationPlayState = "running";
                }
              });
            }, 300); // Add a small delay to ensure the section is visible enough
            
            // Disconnect observer after triggering animations
            observer.disconnect();
          }
        });
      }, {
        threshold: 0.4 // Trigger when 60% of the section is visible
      });
      
      // Start observing the industries section
      observer.observe(industriesSection);
    }
    
    // Benefits Section animations
    const benefitsSection = document.getElementById("benefits");
    if (benefitsSection) {
      const benefitCards = document.querySelectorAll(".benefit-card");
      
      // Add animation class to all benefit cards
      benefitCards.forEach(card => {
        card.classList.add("benefit-card-animate");
      });
      
      // Function to handle benefits section animations
      function handleBenefitsAnimations() {
        const sectionTop = benefitsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;
        
        if (sectionTop < triggerPoint) {
          benefitCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("visible");
            }, 150 * index); // Staggered delay based on card index
          });
          // Remove event listener once animation is triggered
          window.removeEventListener("scroll", handleBenefitsAnimations);
        }
      }
      
      // Initial check and scroll event listener
      window.addEventListener("scroll", handleBenefitsAnimations);
      setTimeout(handleBenefitsAnimations, 500);
    }
    
    // Testimonials Section animations
    const testimonialCards = document.querySelectorAll('.py-20 .grid.grid-cols-1.md\\:grid-cols-3 > div');
    
    testimonialCards.forEach(card => {
      card.classList.add('testimonial-card');
      
      const quoteIcon = card.querySelector('.ri-double-quotes-l');
      if (quoteIcon) {
        quoteIcon.classList.add('quote-icon');
      }
      
      card.addEventListener('mouseenter', function() {
        this.classList.add('testimonial-card-animated');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('testimonial-card-animated');
      });
    });
    
    // Industries Section hover animations
    const industryCards = document.querySelectorAll('#industries .grid > div');
    industryCards.forEach(card => {
      card.classList.add('industry-hover-card');
    });
    
    // Services Section hover animations
    const serviceCards = document.querySelectorAll('#services .bg-white');
    serviceCards.forEach(card => {
      card.classList.add('service-hover-card');
    });
});
