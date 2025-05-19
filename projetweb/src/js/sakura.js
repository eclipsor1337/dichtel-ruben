// Créer le conteneur pour les pétales
function createSakuraContainer() {
    const container = document.createElement('div');
    container.className = 'fixed w-full h-full pointer-events-none z-50 top-0 left-0';
    document.body.appendChild(container);
    return container;
}

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'absolute bg-pink-300 rounded-full opacity-80 animate-fall';
    
    // Taille fixe
    petal.style.width = '10px';
    petal.style.height = '10px';
    
    // Position de départ aléatoire
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.top = '0';
    
    // Durée d'animation
    petal.style.animationDuration = '10s';
    
    document.querySelector('.fixed.w-full').appendChild(petal);
    
    // Supprimer le pétale après l'animation
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

function createBlossom(side) {
    const blossom = document.createElement('div');
    blossom.className = 'sakura-blossom';
    
    // Taille aléatoire
    const size = Math.random() * 6 + 4; // Entre 4px et 10px
    blossom.style.width = `${size}px`;
    blossom.style.height = `${size}px`;
    
    // Position
    const x = side === 'left' 
        ? Math.random() * window.innerWidth * 0.3 // 30% de la largeur depuis la gauche
        : window.innerWidth - (Math.random() * window.innerWidth * 0.3); // 30% de la largeur depuis la droite
    const y = Math.random() * window.innerHeight * 0.3; // 30% de la hauteur depuis le haut
    
    blossom.style.left = `${x}px`;
    blossom.style.top = `${y}px`;
    
    // Durée d'animation
    const duration = Math.random() * 3 + 3; // Entre 3s et 6s
    blossom.style.animationDuration = `${duration}s`;
    
    document.querySelector('.sakura-container').appendChild(blossom);
    
    // Supprimer la fleur après un certain temps
    setTimeout(() => {
        blossom.remove();
    }, duration * 1000);
}

// Initialiser le conteneur
const container = createSakuraContainer();

// Générer des pétales en continu
setInterval(() => {
    createPetal();
}, 300);

// Générer des fleurs en continu
setInterval(() => {
    createBlossom(Math.random() > 0.5 ? 'left' : 'right');
}, 400); // Toutes les 400ms au lieu de 500ms 