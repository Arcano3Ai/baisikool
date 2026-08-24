/* ==========================================================================
   BAISIKOOL INTERACTIVE ENGINE (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. THEME TOGGLE (DARK / LIGHT MODE)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlTag = document.documentElement;

  // Saved preference or default to dark
  const savedTheme = localStorage.getItem('baisikool_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    localStorage.setItem('baisikool_theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  /* ------------------------------------------------------------------------
     2. NAVBAR STICKY BACKDROP & MOBILE MENU
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    mobileMenuBtn.innerHTML = isExpanded 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* ------------------------------------------------------------------------
     3. INTERACTIVE ROI & GROWTH CALCULATOR
     ------------------------------------------------------------------------ */
  const budgetSlider = document.getElementById('budgetSlider');
  const budgetValue = document.getElementById('budgetValue');
  const typeBtns = document.querySelectorAll('.type-btn');
  
  const resReach = document.getElementById('resReach');
  const resLeads = document.getElementById('resLeads');
  const resROAS = document.getElementById('resROAS');
  const recommendedChannels = document.getElementById('recommendedChannels');
  const calcCtaBtn = document.getElementById('calcCtaBtn');

  let activeType = 'b2c';

  const typePresets = {
    b2c: {
      reachMultiplier: [10, 18],
      leadMultiplier: [0.008, 0.016],
      roasRange: '3.5X - 5.5X',
      channels: ['Meta Ads (Insta/FB)', 'TikTok Ads', 'Google Shopping']
    },
    b2b: {
      reachMultiplier: [6, 10],
      leadMultiplier: [0.004, 0.009],
      roasRange: '4.0X - 7.0X',
      channels: ['Google Search Ads', 'LinkedIn Ads', 'Email Automation']
    },
    ecommerce: {
      reachMultiplier: [12, 22],
      leadMultiplier: [0.012, 0.025],
      roasRange: '3.8X - 6.2X',
      channels: ['Google Performance Max', 'Meta Catalog Ads', 'Retargeting']
    },
    local: {
      reachMultiplier: [15, 25],
      leadMultiplier: [0.010, 0.020],
      roasRange: '3.0X - 4.8X',
      channels: ['Google Maps / Local Ads', 'Meta Ads Geofenced', 'WhatsApp Ads']
    }
  };

  function updateCalculator() {
    const budget = parseInt(budgetSlider.value);
    budgetValue.textContent = `$${budget.toLocaleString('es-MX')} MXN`;

    const preset = typePresets[activeType];

    const minReach = Math.round(budget * preset.reachMultiplier[0]);
    const maxReach = Math.round(budget * preset.reachMultiplier[1]);

    const minLeads = Math.round(budget * preset.leadMultiplier[0]);
    const maxLeads = Math.round(budget * preset.leadMultiplier[1]);

    resReach.textContent = `${minReach.toLocaleString('es-MX')} - ${maxReach.toLocaleString('es-MX')}`;
    resLeads.textContent = `${minLeads.toLocaleString('es-MX')} - ${maxLeads.toLocaleString('es-MX')}`;
    resROAS.textContent = preset.roasRange;

    // Channels
    recommendedChannels.innerHTML = preset.channels
      .map(ch => `<span class="chan-tag">${ch}</span>`)
      .join('');

    // Update CTA link with prefilled WhatsApp message
    const msg = encodeURIComponent(`Hola Baisikool! Hice una simulación en su calculadora de ROI con un presupuesto mensual de $${budget.toLocaleString('es-MX')} MXN para mi negocio (${activeType.toUpperCase()}). Me gustaría recibir una propuesta detallada.`);
    calcCtaBtn.href = `https://api.whatsapp.com/send?phone=528123465276&text=${msg}`;
  }

  budgetSlider.addEventListener('input', updateCalculator);

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.getAttribute('data-type');
      updateCalculator();
    });
  });

  // Initial calculation
  updateCalculator();

  /* ------------------------------------------------------------------------
     4. PORTFOLIO CATEGORY FILTER
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. AUDIT FORM SUBMISSION TO WHATSAPP
     ------------------------------------------------------------------------ */
  const auditForm = document.getElementById('auditForm');

  auditForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim() || 'No especificada';
    const service = document.getElementById('service').value;
    const website = document.getElementById('website').value.trim() || 'Sin sitio especificado';
    const message = document.getElementById('message').value.trim() || 'Deseo acelerar la presencia de mi negocio.';

    const text = `*SOLICITUD DE AUDITORÍA DIGITAL (baisikool.mx)*\n\n` +
                 `👤 *Nombre:* ${name}\n` +
                 `📱 *Teléfono:* ${phone}\n` +
                 `🏢 *Empresa:* ${company}\n` +
                 `🎯 *Servicio de Interés:* ${service}\n` +
                 `🌐 *Sitio/Redes:* ${website}\n` +
                 `💬 *Mensaje:* ${message}`;

    const waUrl = `https://api.whatsapp.com/send?phone=528123465276&text=${encodeURIComponent(text)}`;
    
    window.open(waUrl, '_blank');
  });

});
