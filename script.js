/**
 * Portfolio Cybersécurité - Demba Fofana
 * Fichier JavaScript principal avec commentaires détaillés
 */

// Initialisation quand le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Demba Fofana initialisé');
    
    // ===== GESTION DU MENU MOBILE =====
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            // Basculer l'état du menu
            navLinks.classList.toggle('active');
            // Changer l'icône du bouton
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // ===== GESTION DU THÈME (CLAIR/SOMBRE) =====
    const themeBtn = document.getElementById('themeBtn');
    // Récupérer le thème sauvegardé ou utiliser 'dark' par défaut
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Appliquer le thème sauvegardé au chargement
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            // Changer le thème
            document.documentElement.setAttribute('data-theme', newTheme);
            // Sauvegarder dans le localStorage
            localStorage.setItem('theme', newTheme);
            // Mettre à jour l'icône
            updateThemeIcon(newTheme);
            
            // Animation du bouton
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
    
    /**
     * Met à jour l'icône du bouton thème
     * @param {string} theme - 'dark' ou 'light'
     */
    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        // Changer l'icône en fonction du thème
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // ===== EFFET TYPEWRITER =====
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        // Textes à afficher en séquence
        const texts = [
            'Étudiant en BUT3 réseaux télécoms',
            'Spécialisé en cybersécurité',
            'Passionné par la sécurité réseau',
            'Développeur d\'outils de sécurité'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        /**
         * Fonction récursive pour l'effet typewriter
         */
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Effacer un caractère
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Ajouter un caractère
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Gestion des transitions entre textes
            if (!isDeleting && charIndex === currentText.length) {
                // Fin de l'écriture, pause puis effacement
                isEnd = true;
                isDeleting = true;
                setTimeout(typeEffect, 1500);
            } else if (isDeleting && charIndex === 0) {
                // Fin de l'effacement, passer au texte suivant
                isDeleting = false;
                isEnd = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeEffect, 500);
            } else {
                // Vitesse d'écriture/effacement
                const speed = isDeleting ? 50 : 100;
                setTimeout(typeEffect, isEnd ? speed : speed);
            }
        }
        
        // Démarrer l'effet après un délai
        setTimeout(typeEffect, 1000);
    }
    
    // ===== INITIALISATION DES ÉLÉMENTS RGPD =====
    initRGPDElements();
    
    // ===== GESTION DU FORMULAIRE DE CONTACT AVEC RGPD =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêcher l'envoi traditionnel
            
            // Vérifier le consentement RGPD
            const rgpdConsent = document.getElementById('rgpdConsent');
            if (!rgpdConsent.checked) {
                alert('Veuillez accepter la politique de confidentialité avant d\'envoyer votre message.');
                rgpdConsent.focus();
                return;
            }
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                rgpdConsent: true,
                timestamp: new Date().toISOString() // Horodatage
            };
            
            // Simulation d'envoi avec mention RGPD
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Afficher l'indicateur de chargement
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi sécurisé...';
            submitBtn.disabled = true;
            
            // Simuler un délai d'envoi (simulation)
            setTimeout(() => {
                // Enregistrer dans le localStorage (simulation de stockage)
                const contacts = JSON.parse(localStorage.getItem('portfolioContacts') || '[]');
                contacts.push(formData);
                localStorage.setItem('portfolioContacts', JSON.stringify(contacts));
                
                // Message de confirmation avec mention RGPD
                alert(`Merci ${formData.name} ! Votre message a été envoyé sécurisé.\n\n` +
                      `Conformément au RGPD, vos données seront conservées 1 an.\n` +
                      `Vous pouvez demander leur suppression à tout moment.`);
                
                // Réinitialiser le formulaire
                contactForm.reset();
                document.getElementById('rgpdConsent').checked = false;
                
                // Restaurer le bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ===== ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL =====
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5 // Déclencher quand 50% de l'élément est visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                
                // Réinitialiser et animer la barre
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s ease-out';
                    skillBar.style.width = width;
                }, 300);
                
                // Arrêter d'observer après l'animation
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    // Observer chaque barre de compétence
    skillBars.forEach(bar => observer.observe(bar));
    
    // ===== BOUTON "RETOUR EN HAUT" =====
    const backTop = document.querySelector('.back-top');
    if (backTop) {
        window.addEventListener('scroll', () => {
            // Afficher/masquer le bouton en fonction du scroll
            if (window.scrollY > 500) {
                backTop.style.opacity = '1';
                backTop.style.visibility = 'visible';
            } else {
                backTop.style.opacity = '0';
                backTop.style.visibility = 'hidden';
            }
        });
        
        backTop.addEventListener('click', (e) => {
            e.preventDefault();
            // Défilement doux vers le haut
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== ANIMATION DES STATISTIQUES =====
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        stat.textContent = '0'; // Initialiser à 0
        
        const statObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(stat, 0, finalValue, 2000);
                statObserver.unobserve(stat);
            }
        }, { threshold: 0.5 });
        
        statObserver.observe(stat);
    });
    
    /**
     * Anime un compteur de manière fluide
     * @param {HTMLElement} element - Élément à animer
     * @param {number} start - Valeur de départ
     * @param {number} end - Valeur finale
     * @param {number} duration - Durée en ms
     */
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '+';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // ===== EFFET DE SURVOL POUR LES CARTES PROJETS =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== NAVIGATION ACTIVE AU SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    /**
     * Met en surbrillance le lien de navigation correspondant à la section visible
     */
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Marge
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ===== ANIMATION D'APPARITION AU SCROLL =====
    const fadeElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .experience-item');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1, // Déclencher quand 10% est visible
        rootMargin: '0px 0px -50px 0px' // Décallage pour déclencher plus tôt
    });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
    
    // ===== MESSAGE CONSOLE RGPD (TRANSPARENCE) =====
    console.log('%c🔐 RGPD Information', 'color: #00ff88; font-weight: bold; font-size: 14px;');
    console.log('Les données du formulaire sont stockées localement dans votre navigateur.');
    console.log('Aucune donnée n\'est envoyée à un serveur externe.');
    console.log('Pour supprimer vos données : localStorage.removeItem("portfolioContacts")');
    
    // ===== INITIALISATION FINALE =====
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s, color 0.3s';
    }, 100);
});

// ===== GESTION RGPD =====
/**
 * Initialise les fonctionnalités RGPD (modal, liens, etc.)
 */
function initRGPDElements() {
    const modal = document.getElementById('rgpd-modal');
    const closeModal = document.querySelector('.close-modal');
    const rgpdLinks = document.querySelectorAll('.rgpd-link');
    
    if (!modal) return;
    
    // Ouvrir le modal en cliquant sur les liens RGPD
    rgpdLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        });
    });
    
    // Fermer le modal avec le bouton ×
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Fermer le modal en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le modal avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== GESTION DU RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    // Ajouter une classe pendant le redimensionnement
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
});

// ===== FONCTIONS UTILITAIRES GLOBALES =====
/**
 * Formate une date au format français
 * @param {Date} date - Date à formater
 * @returns {string} Date formatée
 */
window.formatFrenchDate = function(date) {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Vérifie si un élément est dans la zone visible
 * @param {HTMLElement} element - Élément à vérifier
 * @returns {boolean} True si visible
 */
window.isElementInViewport = function(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// ===== EXPORT POUR DÉBOGAGE =====
window.portfolioDebug = {
    getStoredContacts: function() {
        return JSON.parse(localStorage.getItem('portfolioContacts') || '[]');
    },
    clearStoredContacts: function() {
        localStorage.removeItem('portfolioContacts');
        console.log('📭 Contacts RGPD effacés');
    },
    getCurrentTheme: function() {
        return localStorage.getItem('theme') || 'dark';
    }
};
