/* ==========================================================================
   BAISIKOOL INTERACTIVE ENGINE (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. NAVBAR STICKY BACKDROP & MOBILE MENU
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

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileMenuBtn.innerHTML = isExpanded 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. DETAILED SERVICES DICTIONARY & MODAL ENGINE
     ------------------------------------------------------------------------ */
  const serviceModal = document.getElementById('serviceModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  const serviceData = {
    social: {
      title: "Manejo de Redes Sociales",
      icon: "fa-hashtag",
      image: "assets/social-media.png",
      tagline: "No es sólo moverle al Face, es utilizar una estrategia de marketing digital que convierta likes en prospectos y ventas reales.",
      description: "La gestión de redes sociales no es simplemente publicar por publicar. Creamos estrategias a la medida de tu público objetivo, planeando contenidos de alto impacto visual y escrito que proyecten la autoridad de tu marca.",
      team: [
        "Coordinador de proyecto (Contacto directo contigo todo el tiempo)",
        "Community Manager (Programador de contenido y enlace con tu comunidad)",
        "Copywriter (Escribe los textos enfocados a tus clientes potenciales)",
        "Diseñador Gráfico (Encargado del arte y proyección visual de tu marca)"
      ],
      experience: "Tenemos más de 10 años de experiencia llevando las redes sociales de empresas en diversos giros.",
      waMessage: "Hola Baisikool! Me gustaría recibir información detallada sobre el Manejo de Redes Sociales para mi empresa."
    },
    ads: {
      title: "Campañas Pagadas (Ads)",
      icon: "fa-bullseye",
      image: "assets/paid-ads.png",
      tagline: "Estrategias de pauta publicitaria de alto rendimiento en Meta Ads y Google Ads.",
      description: "Creamos, ejecutamos y optimizamos campañas de anuncios de pago directo a tus clientes ideales. Con más de 20 años de trayectoria, nos aseguramos de que cada peso invertido maximice el retorno de tu presupuesto.",
      team: [
        "Coordinador de proyecto",
        "Especialista en Meta Ads & Google Ads",
        "Diseñador de Creativos Publicitarios",
        "Copywriter enfocado en Conversión"
      ],
      experience: "Optimización continua y dashboards de seguimiento para medir prospectos recibidos.",
      waMessage: "Hola Baisikool! Quiero cotizar Campañas Pagadas (Meta Ads / Google Ads) con mi coordinador."
    },
    web: {
      title: "Páginas Web & E-Commerce",
      icon: "fa-laptop-code",
      image: "assets/web-design.png",
      tagline: "Páginas web, tiendas en línea y proyectos especiales diseñados a la medida de tu negocio.",
      description: "Desarrollamos sitios web modernos, ultrarrápidos y 100% responsivos. Nos aseguramos de que tu empresa tenga una vitrina digital impecable que genere confianza inmediata en tus prospectos.",
      team: [
        "Coordinador de proyecto",
        "Desarrollador Web Frontend & UX/UI",
        "Especialista en SEO & Velocidad",
        "Arquitecto de Contenido"
      ],
      experience: "Proyectos institucionales, tiendas en línea con pasarelas de pago y desarrollos a medida.",
      waMessage: "Hola Baisikool! Me interesa desarrollar o mejorar la Página Web de mi negocio."
    },
    branding: {
      title: "Diseño Gráfico & Branding",
      icon: "fa-palette",
      image: "assets/branding.png",
      tagline: "Una imagen habla más que mil palabras. Le damos a tu negocio la relevancia para sobresalir.",
      description: "El diseño en tus redes sociales, página web, logotipo e identidad corporativa le dará a tu negocio la relevancia necesaria para sobresalir de la competencia. Asignamos al diseñador que mejor se adapte a tus necesidades gráficas.",
      team: [
        "Coordinador de proyecto",
        "Diseñador Gráfico Senior asignado",
        "Especialista en Identidad de Marca"
      ],
      experience: "Creación de logotipos, manuales de marca, empaques y piezas publicitarias digitales/impresas.",
      waMessage: "Hola Baisikool! Quisiera cotizar servicios de Diseño Gráfico e Identidad Corporativa."
    },
    promo: {
      title: "Artículos Promocionales",
      icon: "fa-box-open",
      image: "assets/promocionales.png",
      tagline: "Merchandising corporativo y promocionales de alta calidad con tu marca impresa.",
      description: "Posiciona tu marca en la vida cotidiana de tus clientes y colaboradores con artículos promocionales de alto impacto. Contamos con un extenso catálogo de productos corporativos y sistemas de grabado/impresión de precisión.",
      team: [
        "Coordinador de proyecto",
        "Asesor de Catálogo de Promocionales",
        "Equipo de Producción e Impresión"
      ],
      experience: "Envíos corporativos a todo México con estándares de calidad garantizados.",
      waMessage: "Hola Baisikool! Deseo cotizar Artículos Promocionales para mi marca."
    },
    courses: {
      title: "Cursos de Marketing Digital",
      icon: "fa-chalkboard-user",
      image: "assets/cursos.png",
      tagline: "Capacitación práctica para potenciar las habilidades digitales de tu equipo o negocio.",
      description: "Impartimos cursos intensivos y talleres de marketing digital adaptados a las necesidades reales de tu empresa. Aprende a gestionar tus campañas, medir métricas y estructurar estrategias efectivas.",
      team: [
        "Instructores con +20 años de experiencia",
        "Coordinador Académico"
      ],
      experience: "Modalidades prácticas para empresas, emprendedores y equipos de ventas.",
      waMessage: "Hola Baisikool! Me interesan los Cursos de Marketing Digital para mi equipo."
    }
  };

  function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-header-box">
        <div class="modal-header-icon"><i class="fa-solid ${data.icon}"></i></div>
        <div>
          <h3 class="modal-title">${data.title}</h3>
          <span class="badge-pill orange" style="margin-bottom:0;">BAISIKOOL Solución</span>
        </div>
      </div>
      <img src="${data.image}" alt="${data.title}" style="width:100%; border-radius:16px; margin-bottom:20px; max-height:260px; object-fit:cover;">
      <p style="font-size:1.1rem; font-weight:700; color:var(--primary-blue); margin-bottom:12px;">${data.tagline}</p>
      <p style="color:var(--text-muted); margin-bottom:20px;">${data.description}</p>
      
      ${data.team ? `
        <div class="modal-team-list">
          <h4><i class="fa-solid fa-users"></i> Equipo Asignado a tu Cuenta:</h4>
          <ul>
            ${data.team.map(item => `<li><i class="fa-solid fa-check"></i> <span>${item}</span></li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:24px;"><strong>Experiencia BAISIKOOL:</strong> ${data.experience}</p>

      <a href="https://api.whatsapp.com/send?phone=528123465276&text=${encodeURIComponent(data.waMessage)}" target="_blank" class="btn btn-primary btn-block btn-xl">
        <i class="fa-brands fa-whatsapp"></i>
        <span>Hablar con mi Coordinador sobre este Servicio</span>
      </a>
    `;

    serviceModal.classList.add('active');
  }

  document.querySelectorAll('.open-service-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      serviceModal.classList.remove('active');
    });
  }

  if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        serviceModal.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. CALCULATOR ENGINE
     ------------------------------------------------------------------------ */
  const budgetSlider = document.getElementById('budgetSlider');
  const budgetValue = document.getElementById('budgetValue');
  const typeBtns = document.querySelectorAll('.type-btn');
  
  const resReach = document.getElementById('resReach');
  const resLeads = document.getElementById('resLeads');
  const recommendedChannels = document.getElementById('recommendedChannels');
  const calcCtaBtn = document.getElementById('calcCtaBtn');

  let activeType = 'b2c';

  const typePresets = {
    b2c: {
      reachMultiplier: [10, 18],
      leadMultiplier: [0.008, 0.016],
      channels: ['Meta Ads (Insta/FB)', 'Redes Sociales', 'Estrategia de Contenido']
    },
    b2b: {
      reachMultiplier: [6, 10],
      leadMultiplier: [0.004, 0.009],
      channels: ['Google Search Ads', 'Campañas Pagadas', 'Formularios de Prospectos']
    },
    ecommerce: {
      reachMultiplier: [12, 22],
      leadMultiplier: [0.012, 0.025],
      channels: ['Página Web E-commerce', 'Meta Catalog Ads', 'Retargeting']
    },
    local: {
      reachMultiplier: [15, 25],
      leadMultiplier: [0.010, 0.020],
      channels: ['Google Maps / Local', 'Diseño Gráfico', 'Promocionales']
    }
  };

  function updateCalculator() {
    if (!budgetSlider) return;
    const budget = parseInt(budgetSlider.value);
    budgetValue.textContent = `$${budget.toLocaleString('es-MX')} MXN`;

    const preset = typePresets[activeType];

    const minReach = Math.round(budget * preset.reachMultiplier[0]);
    const maxReach = Math.round(budget * preset.reachMultiplier[1]);

    const minLeads = Math.round(budget * preset.leadMultiplier[0]);
    const maxLeads = Math.round(budget * preset.leadMultiplier[1]);

    resReach.textContent = `${minReach.toLocaleString('es-MX')} - ${maxReach.toLocaleString('es-MX')}`;
    resLeads.textContent = `${minLeads.toLocaleString('es-MX')} - ${maxLeads.toLocaleString('es-MX')}`;

    recommendedChannels.innerHTML = preset.channels
      .map(ch => `<span class="chan-tag">${ch}</span>`)
      .join('');

    const msg = encodeURIComponent(`Hola Baisikool! Hice una estimación en su calculadora con presupuesto mensual de $${budget.toLocaleString('es-MX')} MXN. Deseo agendar una cita con mi coordinador.`);
    calcCtaBtn.href = `https://api.whatsapp.com/send?phone=528123465276&text=${msg}`;
  }

  if (budgetSlider) {
    budgetSlider.addEventListener('input', updateCalculator);

    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeType = btn.getAttribute('data-type');
        updateCalculator();
      });
    });

    updateCalculator();
  }

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

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const company = document.getElementById('company').value.trim() || 'No especificada';
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim() || 'Deseo contactar a mi coordinador de proyecto.';

      const text = `*CONTACTO DESDE SITIO WEB BAISIKOOL*\n\n` +
                   `👤 *Nombre:* ${name}\n` +
                   `📱 *Teléfono:* ${phone}\n` +
                   `🏢 *Empresa:* ${company}\n` +
                   `🎯 *Solución:* ${service}\n` +
                   `💬 *Mensaje:* ${message}`;

      const waUrl = `https://api.whatsapp.com/send?phone=528123465276&text=${encodeURIComponent(text)}`;
      
      window.open(waUrl, '_blank');
    });
  }

});
