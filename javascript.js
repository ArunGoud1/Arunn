/* --- CONSTANTS & SELECTORS --- */
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.Logo');
const sections = document.querySelectorAll('section');
const header = document.querySelector('header');
const barsBox = document.querySelector('.bars-box');
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4qijButyGj5k9X77oUaYQIw1sKi76E15N3WyFdH0eFhRH68RO7xiljbEDJ4LlLa8Y/exec';

/* --- 1. CORE ANIMATIONS --- */
const activePage = () => {
    barsBox.classList.remove('active');
    header.classList.remove('active');

    setTimeout(() => {
        barsBox.classList.add('active');
        header.classList.add('active');
    }, 100);
};

/* --- 2. VISITOR ENTRY LOGIC (THE GATEKEEPER) --- */
const visitorModal = document.getElementById('visitor-modal');
const visitorForm = document.getElementById('visitor-form');
const exploreBtn = document.getElementById('explore-btn');

const initSite = () => {
    // Show first section
    sections.forEach(section => section.classList.remove('active'));
    if (sections[0]) sections[0].classList.add('active');
    activePage();
};

if (!sessionStorage.getItem('visitorEntered')) {
    // Lock site if not entered
    if (visitorModal) {
        visitorModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
} else {
    // Already entered: hide modal and start animations
    if (visitorModal) visitorModal.style.display = 'none';
    initSite();
}

if (visitorForm) {
    visitorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('visitor-name').value;
        const email = document.getElementById('visitor-email').value;
        exploreBtn.textContent = "Entering...";

        const formData = new FormData();
        formData.append('fullname', name);
        formData.append('email', email);
        formData.append('subject', 'VISITOR_LOG');
        formData.append('message', 'User accessed the home page');

        fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
        .finally(() => {
            sessionStorage.setItem('visitorEntered', 'true');
            visitorModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            initSite(); // Start the portfolio animations
        });
    });
}

/* --- 3. NAVIGATION LOGIC --- */
navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            sections.forEach(section => section.classList.remove('active'));

            activePage();

            setTimeout(() => {
                if (sections[idx]) sections[idx].classList.add('active');
            }, 600);
        }
    });
});

// Logo Reset
logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();
        navLinks.forEach(nav => nav.classList.remove('active'));
        navLinks[0].classList.add('active');
        sections.forEach(section => section.classList.remove('active'));
        setTimeout(() => { sections[0].classList.add('active'); }, 600);
    }
});

/* --- 4. PORTFOLIO CAROUSEL --- */
const arrowRight = document.querySelector('.Portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.Portfolio-box .navigation .arrow-left');
let portfolioIndex = 0;
const PortfolioDetails = document.querySelectorAll('.Portfolio-detail');

const activePortfolio = () => {
    const imgSlide = document.querySelector('.Portfolio-carousel .img-slide');
    if (imgSlide) {
        imgSlide.style.transform = `translateX(-${portfolioIndex * 100}%)`;
        PortfolioDetails.forEach(detail => detail.classList.remove('active'));
        if (PortfolioDetails[portfolioIndex]) PortfolioDetails[portfolioIndex].classList.add('active');
        
        arrowLeft.classList.toggle('disabled', portfolioIndex === 0);
        arrowRight.classList.toggle('disabled', portfolioIndex === PortfolioDetails.length - 1);
    }
};

if (arrowRight) arrowRight.addEventListener('click', () => {
    if (portfolioIndex < PortfolioDetails.length - 1) { portfolioIndex++; activePortfolio(); }
});
if (arrowLeft) arrowLeft.addEventListener('click', () => {
    if (portfolioIndex > 0) { portfolioIndex--; activePortfolio(); }
});

/* --- 5. RESUME TABS --- */
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        resumeBtns.forEach(b => b.classList.remove('active'));
        resumeDetails.forEach(detail => detail.classList.remove('active'));
        btn.classList.add('active');
        if (resumeDetails[idx]) resumeDetails[idx].classList.add('active');
    });
});

/* --- 6. CONTACT FORM --- */
const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const contactBtn = contactForm.querySelector('.btn');
        contactBtn.textContent = 'Sending...';

        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm), mode: 'no-cors' })
        .then(() => {
            contactBtn.textContent = 'Message Sent! ✓';
            setTimeout(() => {
                contactForm.reset();
                contactBtn.textContent = 'Send Message';
                logoLink.click(); // Redirect home
            }, 2000);
        });
    });
}

/* --- 7. MISC (CERTIFICATES & MENU) --- */
// Certificate Modal
const modal = document.getElementById("cert-modal");
document.querySelectorAll(".cert-clickable").forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById("modal-img").src = card.getAttribute("data-cert");
        document.getElementById("modal-desc").textContent = card.getAttribute("data-msg");
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    });
});

document.querySelector(".close-modal").onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

// Menu Toggle
document.getElementById('menu-icon').onclick = () => {
    header.classList.toggle('active');
};

// Year update
const yearEl = document.getElementById("copyright-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Final Init
activePortfolio();


document.getElementById("visitor-form").addEventListener("submit", function(e) {
  e.preventDefault();

  var name = document.getElementById("visitor-name").value;
  var email = document.getElementById("visitor-email").value;

  fetch("https://script.google.com/macros/s/AKfycbx4qijButyGj5k9X77oUaYQIw1sKi76E15N3WyFdH0eFhRH68RO7xiljbEDJ4LlLa8Y/execs", {
    method: "POST",
    body: new URLSearchParams({
      fullname: name,
      email: email,
      subject: "VISITOR_LOG",
      message: "User accessed the home page"
    })
  });

  document.getElementById("visitor-modal").style.display = "none";
});