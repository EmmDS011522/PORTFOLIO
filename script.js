/**
 * Emman DS - Modern Portfolio JavaScript
 * Handles dynamic typing, responsive nav, scrollspy, filter tabs,
 * animated progress bars, scroll-reveal animations, project modal, and contact form UI.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Dynamic Typing Effect for Hero Roles
  // ==========================================
  const dynamicRoleElement = document.getElementById('dynamic-role');
  const roles = [
    'Computer Engineering Student',
    'Audio Technician & Musician',
    'Mechatronics Technician',
    'Hardware & Electronics Specialist',
    'Consumer Tech Repair Pro'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      dynamicRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      dynamicRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeRole, typingSpeed);
  }

  if (dynamicRoleElement) {
    setTimeout(typeRole, 600);
  }

  // ==========================================
  // 2. Sticky Navbar & Scrollspy
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Navbar blur background on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    // Scrollspy: update active nav link
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 3. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 5. Skills Progress Bars & Category Filter
  // ==========================================
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const progressFills = document.querySelectorAll('.progress-fill');

  // Trigger progress bar animations when Skills section enters viewport
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFills.forEach(fill => {
            fill.classList.add('animated');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    progressObserver.observe(skillsSection);
  }

  // Skills Tabs Filtering
  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedTab = btn.getAttribute('data-tab');

      skillCategoryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (selectedTab === 'all' || category === selectedTab) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.classList.add('visible');
            card.querySelectorAll('.progress-fill').forEach(fill => fill.classList.add('animated'));
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. Projects Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const projectCat = card.getAttribute('data-project-cat');
        if (filterValue === 'all' || projectCat === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================
  // 7. Interactive Project Modal Data & Handlers
  // ==========================================
  const projectData = {
    'modal-robotic': {
      category: 'Mechatronics & Robotics',
      title: 'Autonomous 4-DOF Robotic Sorter',
      description: 'A 4-axis articulated robotic arm designed for automated sorting and pick-and-place tasks. Driven by an ESP32 micro-controller and high-torque metal-gear servos, the system integrates inverse kinematic algorithms calculated in real-time, accompanied by an ultrasonic distance sensor array and optical color recognition to separate electronic components into designated bins.',
      specs: [
        { label: 'Microcontroller', value: 'ESP32 Dual-Core 240MHz' },
        { label: 'Degrees of Freedom', value: '4-DOF with Precision Gripper' },
        { label: 'Kinematics', value: 'Custom Analytical Inverse Kinematics' },
        { label: 'Sensory Array', value: 'TCS34725 RGB Color & HC-SR04 Ultrasonic' },
        { label: 'Chassis Fabrication', value: 'PETG 3D Printed & CNC Aluminum Base' }
      ]
    },
    'modal-preamp': {
      category: 'Audio Engineering & Electronics',
      title: 'Low-Noise Discrete Preamp & Audio DSP',
      description: 'A studio-grade analog preamplifier crafted with ultra-low noise discrete transistor stages and Burr-Brown op-amps. Includes stepped gain attenuation, true 48V phantom power delivery, switchable high-pass filtering, and an integrated DSP module for precise acoustic room compensation and real-time phase alignment.',
      specs: [
        { label: 'Equivalent Input Noise', value: '-129.5 dBu (150Ω source, unweighted)' },
        { label: 'Total Harmonic Distortion', value: '< 0.0018% @ 1kHz, +4 dBu' },
        { label: 'Frequency Response', value: '10 Hz - 65 kHz (±0.2 dB)' },
        { label: 'I/O Topology', value: 'Gold-Plated Neutrik XLR Differential Balanced' },
        { label: 'Power Supply', value: 'Toroidal Transformer with Linear Regulated Rails' }
      ]
    },
    'modal-hardware': {
      category: 'Hardware & Diagnostics',
      title: 'Power Rail Diagnostic & Short Detection Rig',
      description: 'An advanced test bench tool designed to diagnose component-level failures on dense multi-layer consumer laptop and PC motherboards. Combines low-voltage regulated injection with sensitive milliohm kelvin four-wire sensing and FLIR thermal imaging to accurately detect breakdown in MLCC capacitors, MOSFETs, and power PMICs without causing thermal damage.',
      specs: [
        { label: 'Measurement Accuracy', value: 'Kelvin 4-Wire 0.1 mΩ Resolution' },
        { label: 'Voltage Injection', value: '0.6V - 3.3V Variable with Current Limiting' },
        { label: 'Diagnostics Software', value: 'OpenBoardView & Custom Schematic Mapping' },
        { label: 'Thermal Analysis', value: 'Long-Wave Infrared Microscopic Lens' },
        { label: 'Soldering Rework', value: 'Quick 861DW Hot Air & JBC C245 Soldering' }
      ]
    },
    'modal-riscv': {
      category: 'Computer Engineering',
      title: 'FPGA-Based RISC-V Soft Processor Core',
      description: 'A custom hardware implementation of a 32-bit RISC-V microprocessor architecture written from the ground up in Verilog HDL. Features a 5-stage classic instruction pipeline (Fetch, Decode, Execute, Memory, Write-back), hazard detection unit, data forwarding paths, and memory-mapped UART peripherals.',
      specs: [
        { label: 'Architecture', value: 'RV32I Base Integer Instruction Set' },
        { label: 'Pipeline Stages', value: '5-Stage Pipelined with Hazard Forwarding' },
        { label: 'Target Device', value: 'Intel / Altera Cyclone IV FPGA' },
        { label: 'Clock Speed', value: '50 MHz Synthesized Frequency' },
        { label: 'Validation', value: 'ModelSim Testbench & GCC Bare-metal C Tests' }
      ]
    },
    'modal-telemetry': {
      category: 'Mechatronics & IoT',
      title: 'Smart Workshop Telemetry & Climate Control',
      description: 'An automated environmental telemetry and safety management node for hardware repair benches. Constantly samples electrostatic potential, air particulates (soldering fumes), ambient temperature, and humidity. It automatically triggers brushless exhaust duct fans when VOC or fume levels exceed safety thresholds.',
      specs: [
        { label: 'Sensors', value: 'BME280 (Temp/Hum/Press) & PMS5003 (Particulate)' },
        { label: 'ESD Monitoring', value: 'High-Impedance Electrostatic Surface Probe' },
        { label: 'Display & Interface', value: '1.3" I2C OLED & Web Dashboard' },
        { label: 'Fan Actuation', value: 'PWM-Controlled High-CFM Centrifugal Blower' },
        { label: 'Network Protocol', value: 'MQTT over Wi-Fi & ESP-NOW Mesh' }
      ]
    },
    'modal-synth': {
      category: 'Music & Hardware',
      title: 'Custom MIDI Controller & Analog Synth Module',
      description: 'A hardware hybrid music synthesizer featuring dual analog voltage-controlled oscillators (VCOs) paired with a 24dB/octave resonant transistor ladder low-pass filter. An on-board STM32 microcontroller processes MIDI input, polyphonic aftertouch, and generates digital modulation envelopes and LFOs.',
      specs: [
        { label: 'Oscillators', value: 'Dual Discrete Analog Saw/Pulse VCOs' },
        { label: 'Filter Type', value: '4-Pole 24dB/Oct Moog-Style Transistor Ladder' },
        { label: 'Controller MCU', value: 'STM32F401 84MHz ARM Cortex-M4' },
        { label: 'Connectivity', value: 'Class-Compliant USB-MIDI & 5-Pin DIN MIDI' },
        { label: 'Enclosure', value: 'Laser-Cut Aluminum & Walnut Wood Side Panels' }
      ]
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const detailButtons = document.querySelectorAll('.project-details-btn');

  function openModal(modalKey) {
    const data = projectData[modalKey];
    if (!data || !projectModal || !modalBody) return;

    let specsHtml = data.specs.map(spec => `
      <div class="modal-spec-row">
        <span class="modal-spec-label">${spec.label}:</span>
        <span class="modal-spec-val">${spec.value}</span>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <span class="modal-header-badge">${data.category}</span>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-text">${data.description}</p>
      
      <h4 style="color: var(--text-white); font-size: 1.1rem; margin-bottom: 12px; font-weight: 700;">Technical Specifications</h4>
      <div class="modal-specs-list">
        ${specsHtml}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="#contact" class="btn btn-primary btn-sm modal-contact-trigger">Discuss This Build</a>
      </div>
    `;

    // Connect trigger inside modal to close modal and scroll to contact
    const contactTrigger = modalBody.querySelector('.modal-contact-trigger');
    if (contactTrigger) {
      contactTrigger.addEventListener('click', () => {
        closeModal();
      });
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ==========================================
  // 8. Contact Form UI Validation & Toast Alert
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formToast = document.getElementById('formToast');

  if (contactForm && submitBtn) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    function clearErrors() {
      nameError.textContent = '';
      emailError.textContent = '';
      subjectError.textContent = '';
      messageError.textContent = '';
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      let hasError = false;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please provide your full name.';
        hasError = true;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email format.';
        hasError = true;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectError.textContent = 'Please include a subject for your message.';
        hasError = true;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please write your message or project inquiry.';
        hasError = true;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Please write at least 10 characters.';
        hasError = true;
      }

      if (hasError) return;

      // UI Only: Simulate sending state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      btnText.textContent = 'Sending...';
      btnSpinner.style.display = 'inline-block';
      submitBtn.disabled = true;

      setTimeout(() => {
        btnText.textContent = 'Send Message';
        btnSpinner.style.display = 'none';
        submitBtn.disabled = false;

        // Show friendly success toast
        if (formToast) {
          formToast.classList.add('active');
          setTimeout(() => {
            formToast.classList.remove('active');
          }, 6000);
        }

        contactForm.reset();
      }, 900);
    });
  }

  // ==========================================
  // 9. Current Year in Footer
  // ==========================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
