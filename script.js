const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) { menuToggle.textContent = '☰'; menuToggle.setAttribute('aria-label', 'Open navigation'); }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Demo enquiry form: prepares a WhatsApp message. Replace SCHOOL_WHATSAPP with
// the school's official WhatsApp number in international format, digits only.
// Example for India: 919876543210. Do not include +, spaces, or hyphens.
const SCHOOL_WHATSAPP = '';
const enquiryForm = document.getElementById('enquiryForm');
const formStatus = document.getElementById('formStatus');

enquiryForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const parentName = String(data.get('parentName') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const className = String(data.get('className') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!parentName || !phone || !className) {
    formStatus.textContent = 'Please complete the required fields.';
    return;
  }

  const text = [
    'Admission Enquiry — Lalita Devi Modern School',
    `Parent/Guardian: ${parentName}`,
    `Phone: ${phone}`,
    `Class: ${className}`,
    message ? `Message: ${message}` : ''
  ].filter(Boolean).join('\n');

  if (SCHOOL_WHATSAPP) {
    window.open(`https://wa.me/${SCHOOL_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    formStatus.textContent = 'Your WhatsApp enquiry is ready. Please review and send it.';
  } else {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'school-admission-enquiry.txt';
    a.click();
    URL.revokeObjectURL(url);
    formStatus.textContent = 'Enquiry text downloaded. Add the school WhatsApp number in script.js to enable direct WhatsApp sending.';
  }
});
