// Nostops Capital Website JavaScript

// Blog post data
const blogPosts = {
  'value-of-neutrality-modern-markets': {
    title: 'The Value of Neutrality in Modern Markets',
    date: 'September 10, 2025',
    content: `
      <div class="blog-meta">
        <div class="blog-date">September 10, 2025</div>
      </div>
      <h1>The Value of Neutrality in Modern Markets</h1>
      
      <p>In an era of heightened market volatility and narrative-driven trading, the concept of market neutrality has become increasingly valuable for institutional capital allocation. Rather than betting on directional movements, neutral strategies focus on capturing inefficiencies while maintaining hedged positions.</p>
      
      <h3>The Foundation of Neutral Strategies</h3>
      <p>Market-neutral approaches remove the burden of predicting market direction, instead focusing on relative value relationships and systematic opportunities. This approach allows for more consistent risk-adjusted returns, particularly in environments where traditional directional strategies may face increased uncertainty.</p>
      
      <h3>Execution Over Prediction</h3>
      <p>The strength of neutral strategies lies not in forecasting market movements, but in the disciplined execution of well-defined processes. By maintaining hedged positions and focusing on spread capture, these strategies can generate returns regardless of broader market conditions.</p>
      
      <h3>Risk Management Through Structure</h3>
      <p>Neutrality provides inherent risk management benefits. With matched long and short positions, exposure to market-wide movements is minimized, allowing portfolio managers to focus on the specific inefficiencies they're targeting rather than managing broad market risk.</p>
      
      <p>As markets continue to evolve and traditional correlations shift, the value of maintaining neutral positioning becomes increasingly apparent for sophisticated capital allocation strategies.</p>
    `
  },
  'execution-discipline-over-narratives': {
    title: 'Execution Discipline Over Market Narratives',
    date: 'September 5, 2025',
    content: `
      <div class="blog-meta">
        <div class="blog-date">September 5, 2025</div>
      </div>
      <h1>Execution Discipline Over Market Narratives</h1>
      
      <p>Market narratives are compelling. They provide context, explain price movements, and offer a framework for understanding complex financial environments. However, for systematic trading strategies, narratives can be more distraction than insight.</p>
      
      <h3>The Narrative Trap</h3>
      <p>Financial markets are constantly generating stories to explain price movements. While these narratives may be intellectually satisfying, they often lead to emotional decision-making and deviation from systematic processes. Successful capital allocation requires discipline to execute predefined strategies regardless of prevailing market stories.</p>
      
      <h3>Process Over Prediction</h3>
      <p>Systematic strategies rely on repeatable processes rather than subjective interpretations of market conditions. This approach removes emotional bias and ensures consistent application of proven methodologies. The focus shifts from trying to predict what markets will do to executing what the process dictates.</p>
      
      <h3>Data-Driven Decision Making</h3>
      <p>Rather than following narratives, systematic approaches rely on quantifiable data points and measurable criteria. This creates a foundation for objective decision-making that can be evaluated, refined, and scaled over time.</p>
      
      <h3>Consistency Through Discipline</h3>
      <p>The most successful systematic strategies maintain unwavering discipline in their execution. Market conditions will change, narratives will evolve, but the underlying process remains constant. This consistency is what allows for reliable performance measurement and continuous improvement.</p>
      
      <p>In capital markets, discipline trumps intuition, and systematic execution delivers more reliable outcomes than narrative-based decision making.</p>
    `
  },
  'compounding-through-velocity': {
    title: 'Compounding Through Velocity',
    date: 'August 28, 2025',
    content: `
      <div class="blog-meta">
        <div class="blog-date">August 28, 2025</div>
      </div>
      <h1>Compounding Through Velocity</h1>
      
      <p>Traditional investment approaches often focus on holding periods measured in months or years. However, systematic strategies can leverage rapid capital rotation to amplify returns through velocity-based compounding.</p>
      
      <h3>The Mathematics of Velocity</h3>
      <p>When capital can be deployed, realized, and redeployed quickly, the frequency of return generation becomes a crucial factor. Small, consistent returns captured at high frequency can compound to significant performance over time, often exceeding what might be achieved through longer-term directional positions.</p>
      
      <h3>Operational Efficiency</h3>
      <p>Velocity-based strategies require operational excellence. Systems must be able to identify opportunities, execute trades, and settle positions rapidly and efficiently. This operational capability becomes a competitive advantage in markets where speed matters.</p>
      
      <h3>Risk Through Repetition</h3>
      <p>High-velocity strategies benefit from the law of large numbers. By executing many small, similar trades rather than fewer large positions, the impact of any single trade is minimized while the overall strategy's expected return is realized through repetition.</p>
      
      <h3>Capital Efficiency</h3>
      <p>Rapid capital rotation means that the same dollars can generate returns multiple times within a given period. This capital efficiency allows for higher overall returns without proportionally increasing capital requirements or risk exposure.</p>
      
      <h3>Market Adaptation</h3>
      <p>High-velocity strategies can adapt quickly to changing market conditions. Rather than being locked into positions for extended periods, capital can be reallocated as opportunities shift, maintaining consistent exposure to the most attractive risk-adjusted returns.</p>
      
      <p>The future of systematic trading lies not just in identifying profitable opportunities, but in executing them with the speed and precision necessary to maximize capital velocity and compound returns efficiently.</p>
    `
  }
};

// Navigation functionality
function showPage(pageId) {
  console.log('Navigating to page:', pageId);
  
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  // Show selected page
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
    console.log('Page activated:', targetPage.id);
  } else {
    console.error('Page not found:', `${pageId}-page`);
  }
  
  // Update navigation active state
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  const activeLink = document.querySelector(`[data-page="${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Close mobile menu if open
  const navLinksContainer = document.getElementById('nav-links');
  if (navLinksContainer) {
    navLinksContainer.classList.remove('active');
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update URL without reloading page
  const url = pageId === 'home' ? '/' : `/${pageId}`;
  if (window.history && window.history.pushState) {
    window.history.pushState({ page: pageId }, '', url);
  }
}

// Blog post functionality
function showBlogPost(slug) {
  console.log('Showing blog post:', slug);
  
  const post = blogPosts[slug];
  if (!post) {
    console.error('Blog post not found:', slug);
    return;
  }
  
  // Hide blog index and show blog post page
  const blogPage = document.getElementById('blog-page');
  const blogPostPage = document.getElementById('blog-post-page');
  
  if (blogPage) blogPage.classList.remove('active');
  if (blogPostPage) blogPostPage.classList.add('active');
  
  // Update content
  const contentDiv = document.getElementById('blog-post-content');
  if (contentDiv) {
    contentDiv.innerHTML = post.content;
  }
  
  // Update URL
  if (window.history && window.history.pushState) {
    window.history.pushState({ page: 'blog-post', slug: slug }, '', `/blog/${slug}`);
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    const isActive = navLinks.classList.contains('active');
    
    if (isActive) {
      navLinks.classList.remove('active');
    } else {
      navLinks.classList.add('active');
    }
  }
}

// Contact form handling
function handleContactForm(event) {
  event.preventDefault();
  console.log('Contact form submitted');
  
  // Get form data
  const form = event.target;
  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const organization = form.querySelector('#organization').value;
  const message = form.querySelector('#message').value;
  
  const data = { name, email, organization, message };
  
  // Validate required fields
  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Simulate form submission
  console.log('Contact form data:', data);
  
  // Show success message
  showSuccessToast();
  
  // Reset form
  form.reset();
}

// Show success toast
function showSuccessToast() {
  const toast = document.getElementById('success-toast');
  if (toast) {
    toast.classList.remove('hidden');
    
    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
}

// Handle browser back/forward buttons
function handlePopState(event) {
  if (event.state && event.state.page) {
    if (event.state.page === 'blog-post' && event.state.slug) {
      showBlogPost(event.state.slug);
    } else {
      showPage(event.state.page);
    }
  } else {
    // Default to home page
    showPage('home');
  }
}

// Handle route changes based on URL
function initRouting() {
  const path = window.location.pathname;
  console.log('Initial path:', path);
  
  if (path === '/' || path === '' || path === '/index.html') {
    showPage('home');
  } else if (path === '/about') {
    showPage('about');
  } else if (path === '/services') {
    showPage('services');
  } else if (path === '/blog') {
    showPage('blog');
  } else if (path === '/contact') {
    showPage('contact');
  } else if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    if (blogPosts[slug]) {
      showBlogPost(slug);
    } else {
      showPage('blog'); // Fallback to blog index
    }
  } else {
    showPage('home'); // Default fallback
  }
}

// Add scroll effect to navigation
function handleNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Add hover effects to cards
function initCardEffects() {
  const cards = document.querySelectorAll('.pillar-card, .philosophy-card, .blog-card, .service-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Add loading animation
function initLoadingAnimation() {
  // Add fade-in class to main sections
  const sections = document.querySelectorAll('section, .page');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Set up all event listeners
function setupEventListeners() {
  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Navigation click handlers
  document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Handle navigation links
    if (target.classList.contains('nav-link') || target.classList.contains('brand-link')) {
      event.preventDefault();
      const page = target.getAttribute('data-page') || (target.textContent.includes('Nostops Capital') ? 'home' : null);
      if (page) {
        showPage(page);
      }
    }
    
    // Handle footer navigation
    if (target.closest('.footer-nav')) {
      event.preventDefault();
      const text = target.textContent.toLowerCase();
      if (text === 'home') showPage('home');
      else if (text === 'about') showPage('about');
      else if (text === 'services') showPage('services');
      else if (text === 'blog') showPage('blog');
      else if (text === 'contact') showPage('contact');
    }
    
    // Handle buttons with onclick attributes (backup)
    if (target.tagName === 'BUTTON') {
      const onclick = target.getAttribute('onclick');
      if (onclick) {
        event.preventDefault();
        if (onclick.includes("showPage('contact')")) {
          showPage('contact');
        } else if (onclick.includes("showPage('about')")) {
          showPage('about');
        }
      }
    }
    
    // Handle blog cards
    if (target.closest('.blog-card')) {
      const blogCard = target.closest('.blog-card');
      const onclick = blogCard.getAttribute('onclick');
      if (onclick) {
        const match = onclick.match(/showBlogPost\('([^']+)'\)/);
        if (match) {
          showBlogPost(match[1]);
        }
      }
    }
    
    // Handle mobile menu clicks outside
    const navLinks = document.getElementById('nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && !navLinks.contains(event.target) && !menuBtn?.contains(event.target)) {
      navLinks.classList.remove('active');
    }
  });
  
  // Mobile menu button
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(event) {
      event.preventDefault();
      toggleMobileMenu();
    });
  }
  
  // Back button in blog posts
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', function(event) {
      event.preventDefault();
      showPage('blog');
    });
  }
  
  // Browser back/forward buttons
  window.addEventListener('popstate', handlePopState);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing Nostops Capital website');
  
  // Set up routing
  initRouting();
  
  // Set up all event listeners
  setupEventListeners();
  
  // Initialize enhancements
  handleNavScroll();
  initCardEffects();
  initLoadingAnimation();
  
  // Set initial page state in history
  const currentPage = document.querySelector('.page.active')?.id.replace('-page', '') || 'home';
  if (window.history && window.history.replaceState) {
    window.history.replaceState({ page: currentPage }, '', window.location.pathname);
  }
  
  console.log('Nostops Capital website initialized successfully');
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
  // ESC key closes mobile menu
  if (event.key === 'Escape') {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.remove('active');
    }
  }
  
  // Enter key on cards
  if (event.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.classList.contains('blog-card')) {
      activeElement.click();
    }
  }
});

// Add focus management for accessibility
function manageFocus() {
  const focusableElements = document.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--primary-accent)';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });
}

// Initialize focus management when DOM is ready
document.addEventListener('DOMContentLoaded', manageFocus);

// Global functions for onclick handlers (backup compatibility)
window.showPage = showPage;
window.showBlogPost = showBlogPost;
window.toggleMobileMenu = toggleMobileMenu;