/* ============================================
   VEDICFUELOON — HOME PAGE
   Hero, Categories, Featured, Testimonials
   ============================================ */

import { getAllProducts, CATEGORIES, TESTIMONIALS, getProductColor, getDailySpecialProduct } from '../data.js';
import { renderProductCard, renderStars, ICONS } from '../components.js';

export function renderHomePage() {
  const allProducts = getAllProducts();
  const dailySpecial = getDailySpecialProduct();

  // Combine Daily Special as the leading featured slide, followed by bestsellers
  const otherFeatured = allProducts.filter(p => p.badge === 'bestseller' && p.id !== dailySpecial.id);
  const heroSlideProducts = [
    { ...dailySpecial, isDailySpecial: true },
    ...otherFeatured
  ];

  return `
    <!-- Hero Section -->
    <section class="hero kolam-bg kolam-dark gradient-animate hero-animate">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">${ICONS.pot} வேதிக்ஃபூலூன் — பாரம்பரிய தமிழ் உணவு</div>
            <h1 class="hero-title">
              The Power of<br/>
              <span class="highlight">Ancient Tamil</span><br/>
              Nutrition
            </h1>
            <p class="hero-tamil tamil-text">"உணவே மருந்து · மருந்தே உணவு"</p>
            <p class="hero-desc">
              Authentic stone-ground Kanji varieties and traditional health foods, 
              passed down through generations. Crafted with care for pure nutrition 
              and unmatched flavor.
            </p>
            <div class="hero-actions">
              <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">
                ${ICONS.bowl} Shop Kanji (கஞ்சி வாங்க)
              </a>
            </div>
          </div>
          <div class="hero-slider-wrapper parallax-float" id="heroProductSlider">
            <div class="hero-slider-card">
              <div class="hero-slides-container">
                ${heroSlideProducts.map((p, idx) => `
                  <div class="hero-slide ${idx === 0 ? 'active' : ''} ${p.isDailySpecial ? 'hero-slide-special' : ''}" data-slide-index="${idx}">
                    <img src="${p.image}" alt="${p.name}" class="hero-slide-img" loading="${idx === 0 ? 'eager' : 'lazy'}" />
                    <div class="hero-slide-overlay"></div>
                    <div class="hero-slide-top-bar">
                      ${p.isDailySpecial ? `
                        <span class="hero-slide-badge hero-badge-special">
                          <span class="special-sparkle-dot"></span>
                          ${ICONS.sparkle} DAILY SPECIAL · இன்றைய சிறப்பு
                        </span>
                      ` : `
                        <span class="hero-slide-badge">${ICONS.fire} TOP SELLER</span>
                      `}
                      <span class="hero-slide-rating">★ ${p.rating || '4.9'}</span>
                    </div>
                    <div class="hero-slide-info">
                      <div class="hero-slide-title-row">
                        <div>
                          ${p.isDailySpecial ? `<div class="hero-slide-special-kicker">${ICONS.sparkle} TODAY'S SPECIAL</div>` : ''}
                          <h3 class="hero-slide-title">${p.name}</h3>
                          <div class="hero-slide-tamil">${p.tamilName}</div>
                        </div>
                        <div class="hero-slide-price-box">
                          <span class="hero-slide-price">₹${p.price}</span>
                          ${p.originalPrice ? `<span class="hero-slide-original-price">₹${p.originalPrice}</span>` : ''}
                        </div>
                      </div>
                      <div class="hero-slide-action-row">
                        <a href="#/product/${p.id}" class="hero-slide-btn ${p.isDailySpecial ? 'hero-slide-btn-special' : ''} btn-ripple">
                          ${p.isDailySpecial ? `${ICONS.sparkle} Order Daily Special` : `${ICONS.bowl} Order Now`}
                        </a>
                        <div class="hero-slider-dots">
                          ${heroSlideProducts.map((_, dotIdx) => `
                            <button class="hero-slider-dot ${dotIdx === idx ? 'active' : ''} ${heroSlideProducts[dotIdx].isDailySpecial ? 'dot-special' : ''}" data-dot-index="${dotIdx}" aria-label="Go to slide ${dotIdx + 1}"></button>
                          `).join('')}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <button class="hero-slider-nav-btn hero-slider-prev" id="heroSlidePrev" aria-label="Previous Slide">
                ${ICONS.chevronLeft}
              </button>
              <button class="hero-slider-nav-btn hero-slider-next" id="heroSlideNext" aria-label="Next Slide">
                ${ICONS.chevronRight}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Traditional Tamil Flower Garland Design along Bottom of Hero -->
      <div class="hero-flower-border" aria-hidden="true">
        <div class="hero-flower-center">
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-flower-center-svg" aria-hidden="true">
            <circle cx="22" cy="22" r="20" fill="#1B3A2D" stroke="#D4A017" stroke-width="1.5" />
            <!-- Sacred 8-petal Lotus flower -->
            <path d="M 22,5 C 19,12 19,16 22,22 C 25,16 25,12 22,5 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 22,39 C 19,32 19,28 22,22 C 25,28 25,32 22,39 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 5,22 C 12,19 16,19 22,22 C 16,25 12,25 5,22 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 39,22 C 32,19 28,19 22,22 C 28,25 32,25 39,22 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 10,10 C 15,15 17,17 22,22 C 17,21 13,17 10,10 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <path d="M 34,10 C 29,15 27,17 22,22 C 27,21 31,17 34,10 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <path d="M 10,34 C 15,29 17,27 22,22 C 17,23 13,27 10,34 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <path d="M 34,34 C 29,29 27,27 22,22 C 27,23 31,27 34,34 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <circle cx="22" cy="22" r="5" fill="#E84393" stroke="#FFFDF0" stroke-width="1" />
            <circle cx="22" cy="22" r="2.2" fill="#F3C644" />
          </svg>
        </div>
      </div>
    </section>


    <!-- Categories Section -->
    <section class="section section-cream kolam-bg section-scroll-blur" id="categoriesSection">
      <div class="container">
        <div class="section-header text-center reveal">
          <span class="section-badge">${ICONS.bowl} EXPLORE CATEGORIES</span>
          <h2>Our Traditional Menu</h2>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் பாரம்பரிய உணவு வகைகள்</p>
        </div>


        <!-- Rich Visual Category Cards -->
        <div class="grid-4 reveal-stagger">
          ${Object.values(CATEGORIES).map(cat => {
            const isDaily = cat.id === 'daily-spl';
            const catImage = isDaily ? (dailySpecial.image || cat.image) : cat.image;
            const catName = isDaily ? `Daily Special: ${dailySpecial.name}` : cat.name;
            const catTamil = isDaily ? dailySpecial.tamilName : cat.tamilName;
            const catDesc = isDaily ? `Today's Sunrise Curation: Freshly brewed ${dailySpecial.name} with authentic heirloom herbs. Limited morning batches!` : cat.tagline;

            return `
            <div class="category-card tilt-hover" onclick="location.hash='#/shop?category=${cat.id}'">
              <!-- Food Image with slow zoom -->
              <div class="cat-image-wrap">
                <img src="${catImage}" alt="${catName}" class="cat-image" loading="lazy" />
                <div class="cat-vignette"></div>
              </div>

              <!-- Top Bar -->
              <div class="cat-top-bar">
                <span class="cat-badge-pill">
                  ${cat.id === 'kanji' ? ICONS.pot : isDaily ? ICONS.sparkle : cat.id === 'traditional-sweets' ? ICONS.pot : ICONS.salad}
                  ${isDaily ? 'Today\'s Special' : cat.badge}
                </span>
                <span class="cat-count-pill">${cat.count} ITEMS</span>
              </div>

              <!-- Content Overlay -->
              <div class="cat-content">
                <div class="cat-tamil tamil-text">${catTamil}</div>
                <h3 class="cat-title">${catName}</h3>
                <p class="cat-desc">${catDesc}</p>

                ${cat.id === 'solid-eats' ? `
                  <!-- Dual Preview of Healthy Snacks: Sprouts Pulses & Boiled Egg -->
                  <div class="cat-dual-preview">
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/21';" title="View Sprouted Pulses">
                      <img src="./images/sprouts_pulses.jpg" alt="Sprouts Pulses" />
                      <div>
                        <div class="dual-thumb-name">Sprouts Pulses</div>
                        <div class="dual-thumb-tamil tamil-text">முளைகட்டிய பயறு</div>
                      </div>
                    </div>
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/22';" title="View Boiled Egg">
                      <img src="./images/egg.jpg" alt="Boiled Egg" />
                      <div>
                        <div class="dual-thumb-name">Boiled Egg</div>
                        <div class="dual-thumb-tamil tamil-text">அவித்த முட்டை</div>
                      </div>
                    </div>
                  </div>
                ` : cat.id === 'traditional-sweets' ? `
                  <!-- Preview of Traditional Sweets: Ulundhan Kali -->
                  <div class="cat-dual-preview">
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/24';" title="View Ulundhan Kali">
                      <img src="./images/ulundhan_kali.jpg" alt="Ulundhan Kali" />
                      <div>
                        <div class="dual-thumb-name">Ulundhan Kali (₹99)</div>
                        <div class="dual-thumb-tamil tamil-text">உளுந்தங்களி · ⭐ 5.0</div>
                      </div>
                    </div>
                  </div>
                ` : isDaily ? `
                  <!-- Live Preview of Today's Special Item -->
                  <div class="cat-dual-preview">
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/${dailySpecial.id}';" title="Order Today's Special">
                      <img src="${dailySpecial.image}" alt="${dailySpecial.name}" />
                      <div>
                        <div class="dual-thumb-name">${dailySpecial.name} (₹${dailySpecial.price})</div>
                        <div class="dual-thumb-tamil tamil-text">${dailySpecial.tamilName} · ⭐ ${dailySpecial.rating}</div>
                      </div>
                    </div>
                  </div>
                ` : `
                  <!-- Ingredient / Quality Chips -->
                  <div class="cat-chips">
                    ${(cat.chips || []).map(chip => `<span class="cat-chip">${ICONS.sparkle} ${chip}</span>`).join('')}
                  </div>
                `}

                <!-- Footer CTA -->
                <div class="cat-footer-btn">
                  <span>Explore ${cat.name}</span>
                  <span class="cat-btn-arrow">${ICONS.arrowRight}</span>
                </div>
              </div>
            </div>
          `;}).join('')}
        </div>


        <!-- Heritage Quality Ribbon Strip -->
        <div class="category-heritage-ribbon reveal">
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${ICONS.pot}</div>
            <div>
              <div class="heritage-ribbon-title">Clay Pot Slow Cooked</div>
              <div class="heritage-ribbon-desc">Retains 100% natural minerals and gives distinct earthen aroma (மண்பானை சமையல்).</div>
            </div>
          </div>
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${ICONS.mortar}</div>
            <div>
              <div class="heritage-ribbon-title">Stone Mortar Ground</div>
              <div class="heritage-ribbon-desc">Pulverized cold without heat degradation in granite mortars (கல் உரல் அரைப்பு).</div>
            </div>
          </div>
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${ICONS.wheat}</div>
            <div>
              <div class="heritage-ribbon-title">21 Ancient Grains</div>
              <div class="heritage-ribbon-desc">Unpolished Karupu Kauvni, Ragi, Kodo & Barnyard millets (பாரம்பரிய தானியங்கள்).</div>
            </div>
          </div>
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${ICONS.truck}</div>
            <div>
              <div class="heritage-ribbon-title">Fresh Sunrise Delivery</div>
              <div class="heritage-ribbon-desc">Simmered before dawn and delivered hot for peak morning immunity and vitality.</div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Tamil Heritage Section -->
    <section class="section section-dark kolam-bg kolam-dark section-scroll-blur">
      <div class="container">
        <div class="text-center section-animate" style="max-width:800px; margin:0 auto;">
          <div class="ornament-divider">
            <span class="ornament-icon" style="color: var(--gold-500);">${ICONS.pot}</span>
          </div>
          <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-6);">
            Rooted in Tamil <span style="color: var(--gold-500);">Tradition</span>
          </h2>
          <p class="tamil-text text-glow" style="font-size: var(--text-2xl); color: var(--gold-400); margin-bottom: var(--space-6); line-height: 1.6;">
            "உங்கள் உணவே உங்கள் மருந்து"
          </p>
          <p style="font-size: var(--text-lg); color: var(--cream-300); line-height: 1.8; margin-bottom: var(--space-8);">
            For centuries, Tamil culture has recognized that true health begins with what we eat. 
            Our ancestors created Kanji — not just as food, but as <em>medicine</em>. Each grain is carefully 
            selected, stone-ground, and slow-cooked following Siddha principles to maximize nutrition 
            and healing properties. At VedicFueloon, we bring this ancient wisdom to your modern kitchen.
          </p>
          <div class="ornament-divider">
            <span class="ornament-icon" style="color: var(--gold-500);">${ICONS.diamond}</span>
          </div>
        </div>
      </div>
    </section>


    <!-- Testimonials -->
    <section class="section section-cream section-scroll-blur">
      <div class="container">
        <div class="section-header text-center reveal">
          <span class="section-badge">${ICONS.messageCircle} CUSTOMER LOVE</span>
          <h2>What Our Family Says</h2>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் வாடிக்கையாளர்கள் சொல்வது</p>
        </div>
        <div class="grid-2 reveal-stagger" style="max-width:900px; margin:0 auto;">
          ${TESTIMONIALS.map(t => `
            <div class="testimonial-card hover-lift">
              <p class="test-text">${t.text}</p>
              <div class="test-author">
                <div class="test-avatar">${t.initial}</div>
                <div>
                  <div class="test-name">${t.name}</div>
                  <div class="test-location">${t.location}</div>
                  <div class="test-stars">${renderStars(t.rating)}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section-dark kolam-bg kolam-dark section-scroll-blur" style="padding: var(--space-16) 0;">
      <div class="container text-center section-animate">
        <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-4);">
          Ready to Taste <span style="color: var(--gold-500);">Tradition</span>?
        </h2>
        <p class="tamil-text text-glow" style="font-size: var(--text-xl); color: var(--gold-400); margin-bottom: var(--space-8);">
          பாரம்பரியத்தை சுவைக்க தயாரா?
        </p>
        <div style="display:flex; gap:var(--space-4); justify-content:center; flex-wrap:wrap; align-items:center;">
          <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${ICONS.bowl} Order Now</a>
          <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" class="btn btn-ghost btn-lg btn-ripple" style="display:inline-flex; align-items:center; gap:8px;">
            <span style="width:24px; height:24px; display:inline-block;">${ICONS.realInstagram}</span> Instagram DM
          </a>
        </div>
      </div>
    </section>

    <!-- Trust Badges (Positioned as the last screen below Ready to Taste Tradition) -->
    <section class="section section-cream kolam-bg section-scroll-blur" style="padding: var(--space-16) 0 var(--space-12); border-top: 1px solid rgba(212, 160, 23, 0.18);">
      <div class="container">
        <div class="grid-4 reveal-stagger" id="trustBadges">
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--primary-500);">${ICONS.leaf}</div>
            <div class="trust-value counter" data-target="100">100%</div>
            <div class="trust-label">Natural Ingredients</div>
            <div class="trust-tamil tamil-text">இயற்கை பொருட்கள்</div>
          </div>
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--gold-600);">${ICONS.pot}</div>
            <div class="trust-value">Zero</div>
            <div class="trust-label">Artificial Preservatives</div>
            <div class="trust-tamil tamil-text">செயற்கை நிறமிகள்</div>
          </div>
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--orange-500);">${ICONS.mortar}</div>
            <div class="trust-value">Stone Mortar</div>
            <div class="trust-label">Ground Fresh Daily</div>
            <div class="trust-tamil tamil-text">கல் உரலில் அரைத்தது</div>
          </div>
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--primary-400);">${ICONS.users}</div>
            <div class="trust-value counter" data-target="500">500+</div>
            <div class="trust-label">Happy Customers</div>
            <div class="trust-tamil tamil-text">மகிழ்ச்சியான வாடிக்கையாளர்கள்</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ── Setup Hero Slideshow (Auto-advancing with manual navigation) ──
export function initHomeHandlers() {
  const slider = document.getElementById('heroProductSlider');
  if (!slider) return;

  if (window._heroSliderInterval) {
    clearInterval(window._heroSliderInterval);
    window._heroSliderInterval = null;
  }

  const slides = slider.querySelectorAll('.hero-slide');
  if (!slides || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === currentIndex);
    });

    // Sync all dots
    slider.querySelectorAll('.hero-slider-dot').forEach(dot => {
      const dotIdx = parseInt(dot.getAttribute('data-dot-index'), 10);
      dot.classList.toggle('active', dotIdx === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    window._heroSliderInterval = setInterval(() => {
      if (!document.body.contains(slider)) {
        stopAutoPlay();
        return;
      }
      nextSlide();
    }, 3500);
  }

  function stopAutoPlay() {
    if (window._heroSliderInterval) {
      clearInterval(window._heroSliderInterval);
      window._heroSliderInterval = null;
    }
  }

  // Prev & Next buttons
  const prevBtn = slider.querySelector('#heroSlidePrev');
  const nextBtn = slider.querySelector('#heroSlideNext');

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoPlay();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoPlay();
    };
  }

  // Dot clicks
  slider.querySelectorAll('.hero-slider-dot').forEach(dot => {
    dot.onclick = (e) => {
      e.stopPropagation();
      const dotIdx = parseInt(dot.getAttribute('data-dot-index'), 10);
      if (!isNaN(dotIdx)) {
        showSlide(dotIdx);
        startAutoPlay();
      }
    };
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Touch swipe support for mobile
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Start auto play
  startAutoPlay();
}
