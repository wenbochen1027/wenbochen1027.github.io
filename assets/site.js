(() => {
  const languageButton = document.getElementById('language-select');
  const languageMenu = document.getElementById('language-menu');
  const languageItems = [...languageMenu.querySelectorAll('[data-language]')];
  const themeToggle = document.getElementById('theme-toggle');
  const menu = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sectionNav = document.getElementById('section-nav');
  const researchToggle = document.getElementById('toggle-research');
  const researchDetails = [...document.querySelectorAll('#research .project-details')];
  const teachingToggle = document.getElementById('toggle-teaching');
  const teachingDetails = [...document.querySelectorAll('#teaching .teaching-disclosure')];
  const slideDeck = document.getElementById('tpu-slide-deck');
  const slideImage = document.getElementById('tpu-slide-image');
  const slideLink = document.getElementById('tpu-slide-link');
  const slidePrev = document.getElementById('tpu-slide-prev');
  const slideNext = document.getElementById('tpu-slide-next');
  const slideCounter = document.getElementById('tpu-slide-page');
  const slideCount = 15;
  let slidePage = 1;
  let language = 'zh';
  try { language = localStorage.getItem('wenbo-site-language') === 'en' ? 'en' : 'zh'; } catch (_) {}
  function formatInstitutionNames() {
    const pattern = /International Monetary Fund|Institute of International Finance|World Bank|Johns Hopkins University|Johns Hopkins SAIS|China Foreign Affairs University|London School of Economics|Carey Business School|IMF|IIF|SAIS/g;
    document.querySelectorAll('.bio-text [data-en]').forEach(element => {
      const source = element.textContent;
      const fragment = document.createDocumentFragment();
      let previous = 0;
      for (const match of source.matchAll(pattern)) {
        fragment.append(document.createTextNode(source.slice(previous, match.index)));
        const name = document.createElement('span');
        name.className = 'institution-name';
        name.textContent = match[0];
        fragment.append(name);
        previous = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(source.slice(previous)));
      element.replaceChildren(fragment);
    });
  }
  function formatEnglishText(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.parentElement.closest('script, style, noscript, svg, select, option, .english-text, .slide-format, .material-format, .email-link')) return NodeFilter.FILTER_REJECT;
        return /\p{Script=Latin}/u.test(node.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      const pattern = /\p{Script=Latin}+(?:['’]\p{Script=Latin}+)*/gu;
      let previous = 0;
      for (const match of node.data.matchAll(pattern)) {
        fragment.append(document.createTextNode(node.data.slice(previous, match.index)));
        const text = document.createElement('span');
        text.className = 'english-text';
        text.textContent = match[0];
        fragment.append(text);
        previous = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(node.data.slice(previous)));
      node.replaceWith(fragment);
    });
  }
  function updateResearchToggle() {
    const allOpen = researchDetails.every(detail => detail.open);
    researchToggle.dataset.zh = allOpen ? '收起全部' : '展开全部';
    researchToggle.dataset.en = allOpen ? 'Collapse all' : 'Expand all';
    researchToggle.textContent = researchToggle.dataset[language];
    researchToggle.setAttribute('aria-expanded', String(allOpen));
    formatEnglishText(researchToggle);
  }
  function updateTeachingToggle() {
    const allOpen = teachingDetails.every(detail => detail.open);
    teachingToggle.dataset.zh = allOpen ? '收起全部' : '展开全部';
    teachingToggle.dataset.en = allOpen ? 'Collapse all' : 'Expand all';
    teachingToggle.textContent = teachingToggle.dataset[language];
    teachingToggle.setAttribute('aria-expanded', String(allOpen));
    formatEnglishText(teachingToggle);
  }
  function updateSlideLabels() {
    const pageLabel = language === 'en' ? `Slide ${slidePage} of ${slideCount}` : `第 ${slidePage} 页，共 ${slideCount} 页`;
    const openLabel = language === 'en' ? `Open slide ${slidePage} in PDF` : `在 PDF 中打开第 ${slidePage} 页`;
    slideImage.alt = `Trade Policy Uncertainty and the Chilean Peso — ${pageLabel}`;
    slideCounter.textContent = `${slidePage} / ${slideCount}`;
    slideCounter.setAttribute('aria-label', pageLabel);
    slideLink.setAttribute('aria-label', openLabel);
    slideLink.setAttribute('title', openLabel);
  }
  function showSlide(page) {
    slidePage = Math.max(1, Math.min(slideCount, page));
    slideImage.src = `assets/tpu-slides/page-${String(slidePage).padStart(2, '0')}.jpg`;
    slideLink.href = `assets/wenbo-chen-tpu-theory-slides.pdf#page=${slidePage}`;
    slidePrev.disabled = slidePage === 1;
    slideNext.disabled = slidePage === slideCount;
    updateSlideLabels();
    if (slidePage < slideCount) {
      const nextImage = new Image();
      nextImage.src = `assets/tpu-slides/page-${String(slidePage + 1).padStart(2, '0')}.jpg`;
    }
  }
  function setLanguage(value) {
    language = value;
    document.documentElement.lang = value === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => { el.textContent = el.dataset[value]; });
    formatInstitutionNames();
    document.querySelectorAll('[data-label-zh][data-label-en]').forEach(el => {
      const label = value === 'en' ? el.dataset.labelEn : el.dataset.labelZh;
      el.setAttribute('aria-label', label);
      el.setAttribute('title', label);
    });
    languageItems.forEach(item => item.setAttribute('aria-checked', String(item.dataset.language === value)));
    menu.setAttribute('aria-label', value === 'en' ? 'Toggle navigation' : '展开或收起导航');
    document.getElementById('copy-feedback').textContent = '';
    updateResearchToggle();
    updateTeachingToggle();
    updateSlideLabels();
    formatEnglishText();
    try { localStorage.setItem('wenbo-site-language', value); } catch (_) {}
  }
  setLanguage(language);
  teachingToggle.hidden = false;
  teachingToggle.addEventListener('click', () => {
    const expand = !teachingDetails.every(detail => detail.open);
    teachingDetails.forEach(detail => { detail.open = expand; });
    updateTeachingToggle();
    scheduleSectionUpdate();
  });
  teachingDetails.forEach(detail => detail.addEventListener('toggle', updateTeachingToggle));
  researchToggle.hidden = false;
  document.getElementById('tpu-slide-controls').hidden = false;
  researchToggle.addEventListener('click', () => {
    const expand = !researchDetails.every(detail => detail.open);
    researchDetails.forEach(detail => { detail.open = expand; });
    updateResearchToggle();
    scheduleSectionUpdate();
  });
  researchDetails.forEach(detail => detail.addEventListener('toggle', updateResearchToggle));
  slidePrev.addEventListener('click', () => showSlide(slidePage - 1));
  slideNext.addEventListener('click', () => showSlide(slidePage + 1));
  slideDeck.addEventListener('keydown', event => {
    const pages = { ArrowLeft: slidePage - 1, ArrowRight: slidePage + 1, Home: 1, End: slideCount };
    if (Object.prototype.hasOwnProperty.call(pages, event.key)) {
      event.preventDefault();
      showSlide(pages[event.key]);
    }
  });
  showSlide(1);

  function closeLanguageMenu() {
    languageMenu.hidden = true;
    languageButton.setAttribute('aria-expanded', 'false');
  }
  function openLanguageMenu() {
    languageMenu.hidden = false;
    languageButton.setAttribute('aria-expanded', 'true');
  }
  languageButton.addEventListener('click', () => {
    if (languageMenu.hidden) openLanguageMenu(); else closeLanguageMenu();
  });
  languageItems.forEach(item => item.addEventListener('click', () => {
    setLanguage(item.dataset.language);
    closeLanguageMenu();
    languageButton.focus();
    scheduleSectionUpdate();
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.language-picker')) closeLanguageMenu();
  });
  document.querySelector('.language-picker').addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLanguageMenu(); languageButton.focus(); event.preventDefault();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault(); openLanguageMenu();
      const current = languageItems.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? languageItems.length - 1 : event.key === 'ArrowDown' ? (current + 1) % languageItems.length : current < 0 ? languageItems.length - 1 : (current - 1 + languageItems.length) % languageItems.length;
      languageItems[next].focus();
    } else if (event.key === 'Tab') closeLanguageMenu();
  });
  function setTheme(value) {
    const theme = value === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    themeToggle.checked = theme === 'dark';
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#12161c' : '#f5f6f8';
    try { localStorage.setItem('wenbo-site-theme', theme); } catch (_) {}
  }
  setTheme(document.documentElement.dataset.theme);
  themeToggle.addEventListener('change', () => setTheme(themeToggle.checked ? 'dark' : 'light'));
  function closeMenu() {
    sidebar.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
  }
  menu.addEventListener('click', () => {
    const open = sidebar.classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  sectionNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const navLinks = [...sectionNav.querySelectorAll('.nav-link')];
  const sections = navLinks.map(link => document.getElementById(link.hash.slice(1)));
  function updateCurrentSection() {
    const threshold = Math.min(200, Math.max(90, window.innerHeight * .24));
    let current = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) current = sections[sections.length - 1];
    navLinks.forEach(link => {
      const active = link.hash === '#' + current.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let scheduled = false;
  function scheduleSectionUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; updateCurrentSection(); });
  }
  window.addEventListener('scroll', scheduleSectionUpdate, { passive: true });
  window.addEventListener('resize', scheduleSectionUpdate);
  window.addEventListener('load', scheduleSectionUpdate);
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', scheduleSectionUpdate));
  updateCurrentSection();
  document.getElementById('copy-email').addEventListener('click', async () => {
    const feedback = document.getElementById('copy-feedback');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText('jarvan1027@gmail.com');
      } else {
        const field = document.createElement('textarea');
        field.value = 'jarvan1027@gmail.com';
        field.style.cssText = 'position:fixed;left:-9999px;top:0';
        field.setAttribute('readonly', '');
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      feedback.textContent = language === 'en' ? 'Copied' : '已复制';
    } catch (_) {
      feedback.textContent = language === 'en' ? 'Select the email above to copy.' : '请选中上方邮箱复制。';
    }
    formatEnglishText(feedback);
  });
})();
