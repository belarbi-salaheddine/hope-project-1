// Scroll doux pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// Header réactif au scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// Filtrage des projets portfolio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Active le bouton sélectionné
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filtre les projets
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = 1, 50);
            } else {
                item.style.opacity = 0;
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});
// Animation des éléments lors du défilement
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .team-member, .portfolio-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Pour animer les éléments visibles au chargement
// Gestion du formulaire de contact
const contactForm = document.getElementById('projectForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation basique
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (!name || !email) {
            alert('Veuillez remplir les champs obligatoires.');
            return;
        }
        
        // Simulation d'envoi (remplacer par AJAX/Fetch en production)
        alert('Merci pour votre message! Nous vous contacterons sous 24h.');
        contactForm.reset();
        document.getElementById('fileName').textContent = 'Aucun fichier sélectionné';
    });
    
    // Affichage du nom du fichier uploadé
    const fileInput = document.getElementById('plans');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'Aucun fichier sélectionné';
            document.getElementById('fileName').textContent = fileName;
        });
    }
}
// Animation des chiffres clés
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const target = +item.querySelector('.stat-number').textContent.replace('+', '');
        const suffix = item.querySelector('.stat-number').textContent.includes('+') ? '+' : '';
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const statNumber = item.querySelector('.stat-number');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            statNumber.textContent = Math.floor(current) + suffix;
        }, 16);
    });
}

// Déclencher quand la section est visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.why-choose-us');
if (statsSection) observer.observe(statsSection);

// Lightbox enrichie avec galerie et navigation
document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const item = this.closest('.portfolio-item');
        const title = item.dataset.title || item.querySelector('h3').textContent;
        const location = item.dataset.location || 'Inconnu';
        const surface = item.dataset.surface || '-';
        const year = item.dataset.year || '-';
        const style = item.dataset.style || 'Non défini';
        const materials = item.dataset.materials || 'Non spécifiés';
        const description = item.dataset.description || item.querySelector('p')?.textContent || '';
        const imageList = (item.dataset.images || '').split(',');

        let currentIndex = 0;

        const updateSlide = () => {
            const img = lightbox.querySelector('.lightbox-carousel img');
            img.src = imageList[currentIndex].trim();
        };

        const lightbox = document.createElement('div');
        lightbox.className = 'portfolio-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <h2>${title}</h2>
                <p><strong>Lieu :</strong> ${location}</p>
                <p><strong>Année :</strong> ${year} | <strong>Surface :</strong> ${surface}</p>
                <p><strong>Style :</strong> ${style}</p>
                <p><strong>Matériaux :</strong> ${materials}</p>
                <p>${description}</p>
                <div class="lightbox-carousel">
                    <button class="carousel-prev">&lt;</button>
                    <img src="${imageList[0].trim()}" alt="${title}">
                    <button class="carousel-next">&gt;</button>
                </div>
                <a href="${this.getAttribute('href')}" class="btn" target="_blank">Voir la page du projet</a>
            </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.close-lightbox').addEventListener('click', () => lightbox.remove());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.remove();
        });

        lightbox.querySelector('.carousel-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
            updateSlide();
        });

        lightbox.querySelector('.carousel-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageList.length;
            updateSlide();
        });
    });
});


// Menu mobile (à ajouter si vous incluez un burger menu dans le CSS)
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('header .container').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
    menuToggle.innerHTML = document.querySelector('nav').classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});
// Lazy loading pour les images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
// Gestion des cookies
if (!localStorage.getItem('cookieConsent')) {
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.</p>
        <button class="btn btn-small accept-cookies">Accepter</button>
    `;
    document.body.appendChild(cookieBanner);
    
    document.querySelector('.accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.style.display = 'none';
    });
}