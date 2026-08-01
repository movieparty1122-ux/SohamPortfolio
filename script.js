/* ==========================
   INITIALIZATIONS
========================== */

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 900,
    once: false,
    offset: 100
});

// Initialize Typed.js
new Typed("#typing", {
    strings: [
        "Computer Engineering Student",
        "Full Stack Developer",
        "React Developer",
        "Node.js Developer"
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    loop: true
});

// Initialize VanillaTilt for profile card
VanillaTilt.init(document.querySelector(".profile-card"), {
    max: 10,
    speed: 500,
    glare: true,
    "max-glare": 0.25
});

/* ==========================
   LOADER & SCROLL TO TOP
========================== */
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1200);
});

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});
topBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ==========================
   NAVBAR & SCROLL PROGRESS
========================== */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        if (!document.body.classList.contains('light')) {
            navbar.style.background = "rgba(15,15,25,.92)";
            navbar.style.boxShadow = "0 15px 40px rgba(0,0,0,.25)";
        }
    } else {
        if (!document.body.classList.contains('light')) {
            navbar.style.background = "rgba(255,255,255,.06)";
            navbar.style.boxShadow = "none";
        }
    }
});

// Scroll Progress Bar
const progress = document.createElement("div");
progress.style.position = "fixed";
progress.style.left = "0";
progress.style.top = "0";
progress.style.height = "4px";
progress.style.width = "0%";
progress.style.zIndex = "99999";
progress.style.background = "linear-gradient(90deg, #6C63FF, #00D4FF)";
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const current = (window.scrollY / total) * 100;
    progress.style.width = current + "%";
});

/* ==========================
   NAVIGATION LOGIC
========================== */
// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
        // Close mobile menu if open
        document.querySelector(".nav-links").classList.remove("show");
    });
});

// Active Nav Link Updater
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

/* ==========================
   CURSOR & MOUSE GLOW
========================== */
const cursor = document.querySelector(".cursor");
const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// Hero Parallax Effect
const heroImage = document.querySelector(".profile-card");
document.addEventListener("mousemove", e => {
    let x = (window.innerWidth / 2 - e.pageX) / 45;
    let y = (window.innerHeight / 2 - e.pageY) / 45;
    heroImage.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

/* ==========================
   THEME TOGGLE
========================== */
const themeBtn = document.querySelector(".theme-btn");
themeBtn.onclick = () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
};

/* ==========================
   BUTTON RIPPLE EFFECT
========================== */
document.querySelectorAll(".primary-btn, .secondary-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
        const circle = document.createElement("span");
        circle.classList.add("ripple");
        const rect = this.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left + "px";
        circle.style.top = e.clientY - rect.top + "px";
        this.appendChild(circle);
        setTimeout(() => {
            circle.remove();
        }, 600);
    });
});

/* ==========================
   STATS COUNTER ANIMATION
========================== */
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / 50; // Controls speed

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 30);
        } else {
            counter.innerText = target + "+";
        }
    };

    // Trigger animation when scrolled into view using Intersection Observer
    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
            updateCount();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    
    observer.observe(counter);
});