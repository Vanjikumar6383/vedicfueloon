/* ============================================
   VEDICFUELOON — ADMIN AUTH (SECURED)
   Hardened Login Page with Rate Limiting & Crypto Authentication
   ============================================ */

import { AdminAuth } from '../store.js';
import { ICONS, showToast } from '../components.js';

export function renderAdminLogin() {
  return `
    <div class="admin-login-page kolam-bg kolam-dark">
      <div class="admin-login-card">
        <div class="login-logo">
          <img src="./vedicfueloon-logo-clean.png" alt="VedicFueloon" style="max-height:64px; object-fit:contain;" />
          <h2>Admin Panel</h2>
          <p>VedicFueloon Management System</p>
        </div>
        
        <div id="loginError" class="login-error" style="display:none; margin-bottom:var(--space-4); background:rgba(231,76,60,0.15); border:1px solid rgba(231,76,60,0.4); color:#e74c3c; padding:10px 14px; border-radius:var(--radius-md); font-size:var(--text-xs);">
        </div>
        
        <div class="form-group">
          <label class="form-label" for="adminUsername">Administrator Username</label>
          <input type="text" class="form-input" id="adminUsername" placeholder="Enter username" autocomplete="username" />
        </div>
        
        <div class="form-group">
          <label class="form-label" for="adminPassword">Security Key / Password</label>
          <input type="password" class="form-input" id="adminPassword" placeholder="••••••••••••" autocomplete="current-password"
                 onkeydown="if(event.key==='Enter') window.adminLogin()" />
        </div>
        
        <button class="btn btn-primary btn-lg" id="btnAdminLogin" style="width:100%; margin-top:var(--space-4);" onclick="window.adminLogin()">
          ${ICONS.lock} Authenticate & Access Panel
        </button>
        
        <div style="text-align:center; margin-top:var(--space-6); font-size:var(--text-xs); color:var(--neutral-400);">
          <span>🔒 Protected with SHA-256 Auth & Brute-Force Shield</span>
        </div>
        
        <div style="text-align:center; margin-top:var(--space-4);">
          <a href="#/" style="font-size:var(--text-sm); color:var(--primary-500);">${ICONS.arrowLeft} Back to Store</a>
        </div>
      </div>
    </div>
  `;
}

export function initAuthHandlers() {
  window.adminLogin = async function() {
    const userInput = document.getElementById('adminUsername');
    const passInput = document.getElementById('adminPassword');
    const submitBtn = document.getElementById('btnAdminLogin');
    const errorEl = document.getElementById('loginError');

    const username = userInput?.value.trim();
    const password = passInput?.value;

    if (!username || !password) {
      if (errorEl) {
        errorEl.textContent = 'Please enter both username and password.';
        errorEl.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...`;
    }

    try {
      const result = await AdminAuth.login(username, password);

      if (result.success) {
        if (errorEl) errorEl.style.display = 'none';
        showToast('Access Granted', 'Welcome back, Administrator!', 'success');
        location.hash = '#/admin/dashboard';
      } else {
        if (errorEl) {
          errorEl.textContent = result.message || 'Authentication failed. Please verify credentials.';
          errorEl.style.display = 'block';
        }
        if (passInput) passInput.value = '';
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = 'A system error occurred during authentication.';
        errorEl.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `${ICONS.lock} Authenticate & Access Panel`;
      }
    }
  };
}
