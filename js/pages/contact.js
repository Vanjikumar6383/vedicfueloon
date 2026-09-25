/* ============================================
   VEDICFUELOON — COMMUNICATION SCREEN
   Exclusively WhatsApp & Instagram Options Only
   With Real Official Brand Logos
   ============================================ */

import { showToast, ICONS } from '../components.js';

export function renderContactPage() {
  return `
    <!-- Communication Screen Hero -->
    <section class="about-hero kolam-bg kolam-dark" style="padding: var(--space-16) 0 var(--space-12);">
      <div class="container text-center reveal">
        <span class="section-badge" style="background: rgba(212, 160, 23, 0.15); color: var(--gold-400); border: 1px solid rgba(212, 160, 23, 0.3); margin-bottom: var(--space-4);">
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <span style="width:16px; height:16px; display:inline-block;">${ICONS.realWhatsapp}</span>
            <span style="width:16px; height:16px; display:inline-block;">${ICONS.realInstagram}</span>
            OFFICIAL DIRECT COMMUNICATION
          </span>
        </span>
        <h1 style="font-size: var(--text-4xl); color: var(--cream-50); margin-bottom: var(--space-3); font-family: var(--font-display);">
          Direct <span style="color: var(--gold-500);">Communication</span>
        </h1>
        <p class="tamil-text text-glow" style="font-size: var(--text-2xl); color: var(--gold-400); margin-bottom: var(--space-4);">
          வாட்ஸ்அப் மற்றும் இன்ஸ்டாகிராம் நேரடி தொடர்பு மட்டுமே
        </p>
        <p style="font-size: var(--text-base); color: var(--cream-300); max-width: 680px; margin: 0 auto; line-height: 1.7;">
          For lightning-fast replies, custom dietary kanji orders, and fresh dawn harvest updates, connect with us exclusively through our two official channels.
        </p>
      </div>
    </section>

    <!-- Communication Screen Main Content -->
    <section class="section section-cream section-scroll-blur" style="padding: var(--space-12) 0 var(--space-20);">
      <div class="container">
        
        <!-- Exclusive Channels Banner Strip -->
        <div class="comm-exclusive-banner reveal">
          <div class="comm-banner-left">
            <span class="comm-banner-pill">${ICONS.sparkle} DIRECT 1-ON-1 CONNECT</span>
            <h3 class="comm-banner-title">Exclusive Communication Policy</h3>
            <p class="comm-banner-desc">
              We do not use slow automated email ticketing. We serve every patron directly through 
              <strong>WhatsApp</strong> and <strong>Instagram</strong> for authentic personal care.
            </p>
          </div>
          <div class="comm-banner-badges">
            <div class="comm-mini-badge wa-mini">
              <span class="badge-brand-icon">${ICONS.realWhatsapp}</span>
              <div>
                <strong>WhatsApp Support</strong>
                <small>Instant Response</small>
              </div>
            </div>
            <div class="comm-mini-badge ig-mini">
              <span class="badge-brand-icon">${ICONS.realInstagram}</span>
              <div>
                <strong>Instagram DM</strong>
                <small>Stories & Updates</small>
              </div>
            </div>
          </div>
        </div>

        <!-- The 2 Official Communication Cards (WhatsApp & Instagram Only) -->
        <div class="comm-cards-grid reveal-stagger">
          
          <!-- Official WhatsApp Communication Card -->
          <div class="comm-channel-card comm-card-wa hover-lift">
            <div class="comm-card-header">
              <div class="comm-brand-symbol wa-symbol-wrap">
                ${ICONS.realWhatsapp}
              </div>
              <div class="comm-channel-status wa-status">
                <span class="live-pulse-dot"></span>
                <span>Online · Instant Replies</span>
              </div>
            </div>

            <div class="comm-card-body">
              <div class="comm-card-kicker">OFFICIAL SUPPORT & INQUIRIES DESK</div>
              <h2 class="comm-channel-title">WhatsApp Support & Care</h2>
              <div class="comm-tamil-sub tamil-text">வாட்ஸ்அப் நேரடி உதவி & வழிகாட்டல்</div>
              
              <div class="comm-handle-box wa-handle-box">
                <span class="handle-icon">${ICONS.phone}</span>
                <span class="handle-text">+91 98765 43210</span>
                <button class="handle-copy-btn btn-ripple" onclick="window.copyToClipboard('+919876543210', 'WhatsApp number copied!')" title="Copy Number">
                  ${ICONS.clipboard} Copy
                </button>
              </div>

              <p class="comm-channel-desc">
                Chat directly with our care team for dietary questions, Siddha preparation details, 
                delivery timings, or custom wellness guidance.
              </p>

              <div class="comm-perks-list">
                <div class="comm-perk-item">
                  <span class="perk-check">${ICONS.check}</span>
                  <span>Direct consultation on traditional recipe ingredients & benefits</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check">${ICONS.check}</span>
                  <span>Custom dietary guidance according to your Siddha body constitution</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check">${ICONS.check}</span>
                  <span>Sunrise morning delivery coordination (6:00 AM - 9:30 AM)</span>
                </div>
              </div>

              <!-- Primary Action Button -->
              <a href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20inquiry%20regarding%20VedicFueloon" 
                 target="_blank" rel="noopener noreferrer" class="comm-primary-btn wa-primary-btn btn-ripple">
                <span class="btn-brand-icon">${ICONS.realWhatsapp}</span>
                <span>Chat with Support on WhatsApp (+91 98765 43210)</span>
                <span class="btn-arrow">${ICONS.arrowRight}</span>
              </a>

              <!-- Quick Message Prompt Chips -->
              <div class="comm-prompts-section">
                <div class="prompts-label">Quick Support Inquiries (Tap to chat):</div>
                <div class="prompts-chips">
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20learn%20more%20about%20your%20traditional%20Kanji%20ingredients." 
                     target="_blank" rel="noopener noreferrer" class="prompt-chip">
                    ${ICONS.bowl} Kanji Ingredients & Nutrition
                  </a>
                  <a href="https://wa.me/919876543210?text=Hi!%20What%20are%20your%20sunrise%20delivery%20timings%20and%20service%20areas%3F" 
                     target="_blank" rel="noopener noreferrer" class="prompt-chip">
                    ${ICONS.truck} Delivery Area & Timings
                  </a>
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20inquire%20about%20bulk%20catering%20for%20a%20family%20event." 
                     target="_blank" rel="noopener noreferrer" class="prompt-chip">
                    ${ICONS.wheat} Bulk Event Catering
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Official Instagram Communication Card -->
          <div class="comm-channel-card comm-card-ig hover-lift">
            <div class="comm-card-header">
              <div class="comm-brand-symbol ig-symbol-wrap">
                ${ICONS.realInstagram}
              </div>
              <div class="comm-channel-status ig-status">
                <span class="live-pulse-dot ig-dot"></span>
                <span>Active Daily · Stories Every Dawn</span>
              </div>
            </div>

            <div class="comm-card-body">
              <div class="comm-card-kicker">OFFICIAL COMMUNITY & DIRECT MESSAGE</div>
              <h2 class="comm-channel-title">Instagram DM & Daily Stories</h2>
              <div class="comm-tamil-sub tamil-text">இன்ஸ்டாகிராம் நேரடி செய்தி & தினசரி கதைகள்</div>
              
              <div class="comm-handle-box ig-handle-box">
                <span class="handle-icon">${ICONS.sparkle}</span>
                <span class="handle-text">@vedicfueloon</span>
                <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener noreferrer" class="handle-copy-btn btn-ripple" title="Visit Profile">
                  ${ICONS.arrowRight} Visit
                </a>
              </div>

              <p class="comm-channel-desc">
                Follow our daily sunrise preparation rituals, watch grandmother's stone-mortar grinding reels, 
                and send us a Direct Message (DM) for queries, reviews, and community stories.
              </p>

              <div class="comm-perks-list">
                <div class="comm-perk-item">
                  <span class="perk-check ig-check">${ICONS.check}</span>
                  <span>Send a Direct Message (DM) anytime for fast replies & menu recommendations</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check ig-check">${ICONS.check}</span>
                  <span>Watch dawn stone-grinding, clay-pot simmering & authentic ingredients</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check ig-check">${ICONS.check}</span>
                  <span>Join 10,000+ passionate traditional food lovers across Tamil Nadu</span>
                </div>
              </div>

              <!-- Primary Action Button -->
              <a href="https://instagram.com/vedicfueloon" 
                 target="_blank" rel="noopener noreferrer" class="comm-primary-btn ig-primary-btn btn-ripple">
                <span class="btn-brand-icon">${ICONS.realInstagram}</span>
                <span>Send Instagram DM (@vedicfueloon)</span>
                <span class="btn-arrow">${ICONS.arrowRight}</span>
              </a>

              <!-- Quick Message Prompt Chips -->
              <div class="comm-prompts-section">
                <div class="prompts-label">Explore Instagram Highlights (Tap to view):</div>
                <div class="prompts-chips">
                  <a href="https://instagram.com/vedicfueloon" 
                     target="_blank" rel="noopener noreferrer" class="prompt-chip ig-chip">
                    ${ICONS.pot} Watch Stone Grinding Reels
                  </a>
                  <a href="https://instagram.com/vedicfueloon" 
                     target="_blank" rel="noopener noreferrer" class="prompt-chip ig-chip">
                    ${ICONS.sparkle} Check Daily Special Batch
                  </a>
                  <a href="https://instagram.com/vedicfueloon" 
                     target="_blank" rel="noopener noreferrer" class="prompt-chip ig-chip">
                    ${ICONS.heart} Read Customer Testimonials
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Direct Message to WhatsApp Composer -->
        <div class="comm-composer-card reveal" style="margin-top: var(--space-12);">
          <div class="composer-header">
            <div class="composer-header-title">
              <span class="section-badge" style="background: rgba(37, 211, 102, 0.15); color: #128C7E; border: 1px solid rgba(37, 211, 102, 0.3);">
                <span style="width:14px; height:14px; display:inline-block; vertical-align:middle;">${ICONS.realWhatsapp}</span>
                INSTANT WHATSAPP SUPPORT LAUNCHER
              </span>
              <h3>Compose Your Message to WhatsApp Support</h3>
              <p class="tamil-text" style="color: var(--gold-700); font-size: var(--text-sm); margin-top: var(--space-1);">
                உங்கள் கேள்விகள் அல்லது கருத்துக்களை நேரடியாக வாட்ஸ்அப்பில் அனுப்பவும்
              </p>
            </div>
            <div class="composer-badge-icon">
              ${ICONS.realWhatsapp}
            </div>
          </div>

          <div class="composer-grid">
            <div class="form-group">
              <label class="form-label">Your Name (உங்கள் பெயர்)</label>
              <input type="text" class="form-input" id="waComposerName" placeholder="e.g. Priya Shankar" />
            </div>

            <div class="form-group">
              <label class="form-label">Select Inquiry Topic (தலைப்பு)</label>
              <select class="form-input" id="waComposerTopic" style="cursor: pointer;">
                <option value="Dietary Guidance">Dietary & Herbal Nutrition Guidance (ஊட்டச்சத்து விவரம்)</option>
                <option value="Delivery Area Timings">Sunrise Delivery Timings & Coverage (டெலிவரி நேரம்)</option>
                <option value="Bulk Catering Inquiry">Bulk Event / Gathering Catering Inquiry (நிகழ்வு விவரம்)</option>
                <option value="Ingredients Information">Kanji Recipe & Ingredients Query (மூலப்பொருள் விவரம்)</option>
                <option value="General Inquiry">General Question & Feedback (பொதுவான விவரம்)</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: var(--space-4);">
            <label class="form-label">Your Message or Inquiry Details (செய்தி விவரம்)</label>
            <textarea class="form-textarea" id="waComposerMessage" rows="3" placeholder="Write your questions, dietary preferences, or feedback..."></textarea>
          </div>

          <button class="btn btn-lg btn-ripple comm-send-btn" onclick="window.sendToWhatsAppComposer()">
            <span style="width:24px; height:24px; display:inline-block;">${ICONS.realWhatsapp}</span>
            <span>Send to WhatsApp Support (+91 98765 43210)</span>
            ${ICONS.arrowRight}
          </button>
        </div>

      </div>
    </section>
  `;
}

export function initContactHandlers() {
  window.copyToClipboard = function(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied!', successMsg || 'Copied to clipboard', 'success');
      }).catch(() => {
        showToast('Copied!', text, 'info');
      });
    } else {
      showToast('Contact Number', text, 'info');
    }
  };

  window.sendToWhatsAppComposer = function() {
    const name = document.getElementById('waComposerName')?.value.trim() || 'Valued Patron';
    const topic = document.getElementById('waComposerTopic')?.value || 'General Inquiry';
    const message = document.getElementById('waComposerMessage')?.value.trim();

    let fullText = `Vanakkam VedicFueloon Support!\n\n*Name:* ${name}\n*Topic:* ${topic}`;
    if (message) {
      fullText += `\n*Message:* ${message}`;
    } else {
      fullText += `\n*Message:* I have a question regarding VedicFueloon traditional health foods.`;
    }

    const encoded = encodeURIComponent(fullText);
    const waUrl = `https://wa.me/919876543210?text=${encoded}`;
    
    showToast('Opening WhatsApp', 'Connecting directly to our WhatsApp support...', 'success');
    window.open(waUrl, '_blank');
  };
}
