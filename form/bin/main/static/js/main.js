/**
 * 수호대행 - Main JavaScript
 * 페이지 공통 기능 및 유틸리티
 */

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== Form Validation ==========
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
  });
  
  return isValid;
}

// ========== Email Validation ==========
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ========== Phone Validation ==========
function isValidPhone(phone) {
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regex.test(phone);
}

// ========== Format Phone Number ==========
function formatPhoneNumber(phone) {
  // 숫자만 추출
  const numbers = phone.replace(/[^0-9]/g, '');
  
  // 포맷팅
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  
  return phone;
}

// ========== Loading Spinner ==========
function showLoading() {
  const spinner = document.createElement('div');
  spinner.id = 'loading-spinner';
  spinner.innerHTML = `
    <div class="spinner-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  document.body.appendChild(spinner);
}

function hideLoading() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

// ========== Auto-hide Alerts ==========
document.addEventListener('DOMContentLoaded', function() {
  const alerts = document.querySelectorAll('.alert-dismissible');
  
  alerts.forEach(alert => {
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 5000);
  });
});

// ========== Copy to Clipboard ==========
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      $toast('클립보드에 복사되었습니다.', 'success');
    });
  } else {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    $toast('클립보드에 복사되었습니다.', 'success');
  }
}

// ========== Image Slider with Slick ==========
function initImageSlider() {
  const slider = $('.slider-container');
  if (!slider.length) return;

  // Initialize Slick slider
  slider.slick({
    dots: true, // Slick 기본 dots 사용
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'ease-in-out',
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false, // 커스텀 화살표 사용
    appendDots: $('.image-slider'), // dots를 image-slider 내부에 추가
    // Before slide change - zoom out current slide
    beforeChange: function(event, slick, currentSlide, nextSlide) {
      $('.slide').eq(currentSlide).addClass('zoom-out');
    },
    // After slide change - zoom in new slide and remove zoom-out from previous
    afterChange: function(event, slick, currentSlide) {
      $('.slide').removeClass('zoom-out');
      $('.slide').eq(currentSlide).addClass('zoom-in');
      setTimeout(function() {
        $('.slide').removeClass('zoom-in');
      }, 1000);
      
    }
  })
  $(".slider-container").removeClass("d-none");
  ;

  // Custom prev/next button handlers
  $('.slider-prev').on('click', function() {
    slider.slick('slickPrev');
  });

  $('.slider-next').on('click', function() {
    slider.slick('slickNext');
  });

  // Keyboard navigation
  $(document).on('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      slider.slick('slickPrev');
    } else if (e.key === 'ArrowRight') {
      slider.slick('slickNext');
    }
  });
}

// ========== Review Slider with Slick ==========
function initReviewSlider() {
  const reviewSlider = $('.review-slider');
  if (!reviewSlider.length) return;

  // Initialize Slick slider for reviews
  reviewSlider.slick({
    dots: true, // Slick 기본 dots 사용
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false, // 커스텀 화살표 사용
    cssEase: 'ease-in-out',
    appendDots: $('.review-slider-wrapper'), // dots를 슬라이더 wrapper 내부에 추가
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Custom prev/next button handlers
  $('.review-slider-prev').on('click', function() {
    reviewSlider.slick('slickPrev');
  });

  $('.review-slider-next').on('click', function() {
    reviewSlider.slick('slickNext');
  });
}

// ========== Initialize Tooltips ==========
document.addEventListener('DOMContentLoaded', function() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initialize sliders
  initImageSlider();
  initReviewSlider();
});

// ========== Export functions for global use ==========
window.validateForm = validateForm;
window.isValidEmail = isValidEmail;
window.isValidPhone = isValidPhone;
window.formatPhoneNumber = formatPhoneNumber;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.copyToClipboard = copyToClipboard;
