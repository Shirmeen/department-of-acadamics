// Loader functionality
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Navbar scroll logic
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'bg-white/80', 'backdrop-blur-md', 'shadow-sm');
        navbar.classList.remove('py-4', 'bg-transparent');
    } else {
        navbar.classList.add('py-4', 'bg-transparent');
        navbar.classList.remove('py-2', 'bg-white/80', 'backdrop-blur-md', 'shadow-sm');
    }
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });
}

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
    observer.observe(el);
});

// Gallery filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
            btn.classList.add('active', 'bg-blue-600', 'text-white');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// Curriculum Tabs
const tabs = document.querySelectorAll('.curriculum-tab');
const contents = document.querySelectorAll('.curriculum-content');

if (tabs.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove Active from all tabs
            tabs.forEach(t => {
                t.classList.remove('bg-blue-50', 'border-blue-600');
                t.classList.add('border-transparent');
                t.querySelector('span').classList.remove('text-blue-900');
                t.querySelector('span').classList.add('text-slate-500');
                t.querySelector('i').classList.remove('text-blue-600', 'opacity-100');
                t.querySelector('i').classList.add('text-slate-400', 'opacity-0');
            });

            // Activate Clicked Tab
            tab.classList.remove('border-transparent');
            tab.classList.add('bg-blue-50', 'border-blue-600');
            tab.querySelector('span').classList.remove('text-slate-500');
            tab.querySelector('span').classList.add('text-blue-900');
            tab.querySelector('i').classList.remove('text-slate-400', 'opacity-0');
            tab.querySelector('i').classList.add('text-blue-600', 'opacity-100');

            // Show Content
            const targetId = tab.getAttribute('data-target');
            contents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('opacity-0', 'translate-x-10', 'pointer-events-none');
                    content.classList.add('opacity-100', 'translate-x-0', 'z-10');
                } else {
                    content.classList.remove('opacity-100', 'translate-x-0', 'z-10');
                    content.classList.add('opacity-0', 'translate-x-10', 'pointer-events-none');
                }
            });
        });
    });
}

// Canvas Constellation Animation
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(30, 58, 138, 0.7)'; // Darker Blue dots
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numParticles = Math.min(window.innerWidth / 10, 80);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(30, 58, 138, ${0.4 * (1 - dist / 150)})`; // Darker Blue lines
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}
