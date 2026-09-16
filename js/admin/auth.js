/* ============================================
   VEDICFUELOON — ADMIN AUTH
   Login Page
   ============================================ */

import { AdminAuth } from '../store.js';
import { ICONS } from '../components.js';

export function renderAdminLogin() {
  return `
    <div class="admin-login-page kolam-bg kolam-dark">
      <div class="admin-login-card">
        <div class="login-logo">
          <img src="./vedicfueloon-logo-clean.png" alt="VedicFueloon" style="max-height:64px; object-fit:contain;" />
          <h2>Admin Panel</h2>
          <p>VedicFueloon Management System</p>
        </div>
        
        <div id="loginError" class="login-error">
          Invalid username or password. Try admin / admin123
        </div>
        
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" id="adminUsername" placeholder="Enter username" value="admin" />
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="adminPassword" placeholder="Enter password" 
                 onkeydown="if(event.key==='Enter') window.adminLogin()" />
        </div>
        
        <button class="btn btn-primary btn-lg" style="width:100%; margin-top:var(--space-4);" onclick="window.adminLogin()">
          ${ICONS.lock} Login to Admin Panel
        </button>
        
        <p style="text-align:center; margin-top:var(--space-6); font-size:var(--text-xs); color:var(--neutral-400);">
          Demo credentials: admin / admin123
        </p>
        
        <div style="text-align:center; margin-top:var(--space-4);">
          <a href="#/" style="font-size:var(--text-sm); color:var(--primary-500);">${ICONS.arrowLeft} Back to Store</a>
        </div>
      </div>
    </div>
  `;
}

export function initAuthHandlers() {
  window.adminLogin = function() {
    const username = document.getElementById('adminUsername')?.value.trim();
    const password = document.getElementById('adminPassword')?.value;
    const errorEl = document.getElementById('loginError');

    if (AdminAuth.login(username, password)) {
      location.hash = '#/admin/dashboard';
    } else {
      if (errorEl) errorEl.classList.add('show');
    }
  };
}
