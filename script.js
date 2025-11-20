// Three.js 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0x667eea,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0x764ba2,
  wireframe: true,
  transparent: true,
  opacity: 0.2,
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;

  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.005;

  camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;

  renderer.render(scene, camera);
}

animate();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  };

  menuToggle.addEventListener("click", toggleMenu);

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
      document.body.classList.remove("no-scroll");
    })
  );
}

// Form submission -> open user's email client (mailto)
const contactForm = document.querySelector(".contact-form");
const CONTACT_EMAIL = "prasannakannan2709@gmail.com";

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").trim();
    const email = (formData.get("email") || "").trim();
    const message = (formData.get("message") || "").trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields before sending.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}

// Card 3D tilt effect
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 1s ease forwards";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".card, .skill-category, .project-item")
  .forEach((el) => {
    observer.observe(el);
  });
