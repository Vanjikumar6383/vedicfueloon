/* ============================================
   VEDICFUELOON — ABOUT PAGE
   ============================================ */

import { ICONS } from '../components.js';

export function renderAboutPage() {
  return `
    <!-- About Hero -->
    <section class="about-hero kolam-bg kolam-dark">
      <div class="container reveal">
        <span class="section-badge" style="margin-bottom:var(--space-4);">${ICONS.pot} OUR STORY</span>
        <h1 style="font-size: var(--text-5xl); color: var(--cream-50); margin-bottom: var(--space-4);">
          The <span style="color: var(--gold-500);">VedicFueloon</span> Story
        </h1>
        <p class="tamil-text" style="font-size: var(--text-2xl); color: var(--gold-400); margin-bottom: var(--space-4);">
          வேதிக்ஃபூலூன் கதை — பாரம்பரியத்தின் சக்தி
        </p>
        <p style="font-size: var(--text-lg); color: var(--cream-300); max-width: 700px; margin: 0 auto; line-height: 1.8;">
          From the fertile lands of Tamil Nadu, we bring ancient recipes to your modern table. 
          Every grain is a story, every spoon a tradition.
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section class="section">
      <div class="container">
        <div class="about-story reveal">
          <div class="about-story-image" style="background: linear-gradient(135deg, #2D5E3F, #1B3A2D); display:flex; align-items:center; justify-content:center; color: var(--gold-400); opacity:0.6;">
            ${ICONS.pot}
          </div>
          <div>
            <span class="section-badge">${ICONS.leaf} OUR ORIGIN</span>
            <h2 style="margin-bottom: var(--space-6);">Born from Tamil Heritage</h2>
            <p style="color: var(--neutral-600); line-height: 1.8; margin-bottom: var(--space-4);">
              VedicFueloon was born from a simple belief — that the ancient food wisdom of Tamil Nadu 
              holds the key to modern wellness. Our founder grew up watching grandmothers prepare 
              stone-ground Kanji using recipes passed down through generations.
            </p>
            <p style="color: var(--neutral-600); line-height: 1.8; margin-bottom: var(--space-4);">
              Each morning, the rhythmic sound of the stone mortar (கல் உரல்) would fill the kitchen, 
              grinding fresh grains, herbs, and spices into the most nourishing porridge you've ever tasted. 
              This wasn't just food — it was medicine, ritual, and love combined.
            </p>
            <p style="color: var(--neutral-600); line-height: 1.8; margin-bottom: var(--space-6);">
              Today, we've preserved these ancient Siddha nutrition principles while making them 
              accessible to busy modern families. Every VedicFueloon product is a bridge between 
              our glorious past and your healthy future.
            </p>
            <p class="tamil-text" style="font-size: var(--text-lg); color: var(--gold-700); font-style: italic;">
              "பாட்டியின் கைமணம் — ஒவ்வொரு கவளத்திலும் சக்தி"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section section-cream kolam-bg">
      <div class="container">
        <div class="section-header text-center reveal">
          <span class="section-badge">${ICONS.sparkle} WHAT WE STAND FOR</span>
          <h2>Our Values</h2>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் மதிப்புகள்</p>
        </div>
        
        <div class="values-grid reveal-stagger">
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--primary-500);">${ICONS.wheat}</div>
            <h4>100% Natural</h4>
            <p>Every ingredient is sourced directly from Tamil Nadu's organic farms. No chemicals, no shortcuts — just pure, natural goodness.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--gold-600);">${ICONS.pot}</div>
            <h4>Ancient Recipes</h4>
            <p>Our recipes follow authentic Siddha nutrition principles, perfected over centuries by Tamil ancestors for optimal health.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--orange-500);">${ICONS.mortar}</div>
            <h4>Stone Ground</h4>
            <p>We use traditional stone mortars to grind our ingredients, preserving nutrients and creating the authentic texture and flavor.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--primary-400);">${ICONS.handshake}</div>
            <h4>Support Local Farmers</h4>
            <p>We work directly with local Tamil Nadu farmers, ensuring fair prices and supporting the agricultural community.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--info);">${ICONS.flask}</div>
            <h4>Zero Preservatives</h4>
            <p>Our foods are prepared fresh with zero artificial preservatives, colors, or flavors. What you see is what you get.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--success);">${ICONS.eco}</div>
            <h4>Eco-Friendly</h4>
            <p>Sustainable packaging and eco-conscious practices. We care for the earth as much as we care for your health.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission CTA -->
    <section class="section section-dark kolam-bg kolam-dark">
      <div class="container text-center section-animate">
        <div class="ornament-divider">
          <span class="ornament-icon" style="color: var(--gold-500);">${ICONS.pot}</span>
        </div>
        <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-6);">
          Our Mission: <span style="color: var(--gold-500);">Power in Every Bite</span>
        </h2>
        <p style="font-size: var(--text-lg); color: var(--cream-300); max-width: 700px; margin: 0 auto var(--space-8); line-height: 1.8;">
          To revive and share the incredible nutritional wisdom of Tamil cuisine with the world. 
          We believe that when you eat the way our ancestors intended, your body thrives.
        </p>
        <p class="tamil-text text-glow" style="font-size: var(--text-xl); color: var(--gold-400); margin-bottom: var(--space-8);">
          ஒவ்வொரு கவளத்திலும் சக்தி — Power in Every Bite
        </p>
        <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${ICONS.bowl} Experience the Tradition</a>
      </div>
    </section>
  `;
}
