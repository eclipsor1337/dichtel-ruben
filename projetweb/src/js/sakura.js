// Créer les arbres sakura
function createSakuraTrees() {
    const container = document.createElement('div');
    container.className = 'sakura-container';
    document.body.appendChild(container);

    // Arbre de gauche
    const leftTree = document.createElement('div');
    leftTree.className = 'sakura-tree left';
    leftTree.innerHTML = `
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 300 L100 150" stroke="#4a3728" stroke-width="8" fill="none"/>
            <path d="M100 150 Q50 100 50 50 Q100 0 150 50 Q150 100 100 150" fill="#ffb7c5" opacity="0.3"/>
            <path d="M100 150 Q70 120 70 80 Q100 50 130 80 Q130 120 100 150" fill="#ffb7c5" opacity="0.4"/>
            <path d="M100 150 Q90 140 90 110 Q100 90 110 110 Q110 140 100 150" fill="#ffb7c5" opacity="0.5"/>
        </svg>
    `;
    container.appendChild(leftTree);

    // Arbre de droite
    const rightTree = document.createElement('div');
    rightTree.className = 'sakura-tree right';
    rightTree.innerHTML = `
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 300 L100 150" stroke="#4a3728" stroke-width="8" fill="none"/>
            <path d="M100 150 Q50 100 50 50 Q100 0 150 50 Q150 100 100 150" fill="#ffb7c5" opacity="0.3"/>
            <path d="M100 150 Q70 120 70 80 Q100 50 130 80 Q130 120 100 150" fill="#ffb7c5" opacity="0.4"/>
            <path d="M100 150 Q90 140 90 110 Q100 90 110 110 Q110 140 100 150" fill="#ffb7c5" opacity="0.5"/>
        </svg>
    `;
    container.appendChild(rightTree);

    return container;
}

function createPetal(side) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    // Taille aléatoire
    const size = Math.random() * 8 + 6; // Entre 6px et 14px
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    // Position de départ
    const startX = side === 'left' 
        ? Math.random() * 50 + 20 // Entre 20px et 70px du bord gauche
        : window.innerWidth - (Math.random() * 50 + 20); // Entre 20px et 70px du bord droit
    petal.style.left = `${startX}px`;
    petal.style.top = '0';
    
    // Durée d'animation aléatoire
    const duration = Math.random() * 4 + 6; // Entre 6s et 10s
    petal.style.animationDuration = `${duration}s`;
    
    // Délai aléatoire
    petal.style.animationDelay = `${Math.random() * 2}s`;
    
    document.querySelector('.sakura-container').appendChild(petal);
    
    // Supprimer le pétale après l'animation
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

function createBlossom(side) {
    const blossom = document.createElement('div');
    blossom.className = 'sakura-blossom';
    
    // Position
    const x = side === 'left' 
        ? Math.random() * 100 + 50 // Entre 50px et 150px du bord gauche
        : window.innerWidth - (Math.random() * 100 + 50); // Entre 50px et 150px du bord droit
    const y = Math.random() * 150 + 50; // Entre 50px et 200px du haut
    
    blossom.style.left = `${x}px`;
    blossom.style.top = `${y}px`;
    
    // Durée d'animation
    const duration = Math.random() * 2 + 2; // Entre 2s et 4s
    blossom.style.animationDuration = `${duration}s`;
    
    document.querySelector('.sakura-container').appendChild(blossom);
    
    // Supprimer la fleur après un certain temps
    setTimeout(() => {
        blossom.remove();
    }, duration * 1000);
}

// Initialiser les arbres
const container = createSakuraTrees();

// Générer des pétales en continu
setInterval(() => {
    createPetal(Math.random() > 0.5 ? 'left' : 'right');
}, 300);

// Générer des fleurs en continu
setInterval(() => {
    createBlossom(Math.random() > 0.5 ? 'left' : 'right');
}, 500); 