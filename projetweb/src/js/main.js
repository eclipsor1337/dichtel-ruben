// Variables globales
let userResponses = [];
let currentQuestionIndex = 0;


document.addEventListener('DOMContentLoaded', function() {
    // Boutons du menu latéral
    const calculatriceBtn = document.getElementById('calculatrice-btn');
    const contactBtn = document.getElementById('contact-btn');
    const bruteForceBtn = document.getElementById('brute-force-btn');

    if (calculatriceBtn) {
        calculatriceBtn.addEventListener('click', function() {
            document.getElementById('calculatrice-modal').classList.add('modal-open');
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            document.getElementById('contact-modal').classList.add('modal-open');
        });
    }

    if (bruteForceBtn) {
        bruteForceBtn.addEventListener('click', function() {
            // Simuler des réponses correctes et rediriger
            bruteForceAccess();
        });
    }

    // Initialiser le questionnaire
    initializeQuestionnaire();
});

// Fonctions pour la calculatrice
function addToCalc(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function clearCalc() {
    const display = document.getElementById('calc-display');
    display.value = '';
}

function calculate() {
    const display = document.getElementById('calc-display');
    try {
        // Utiliser Function au lieu de eval pour plus de sécurité
        display.value = Function('"use strict";return (' + display.value + ')')();
    } catch (error) {
        display.value = 'Erreur';
        setTimeout(clearCalc, 1000);
    }
}

// Fonctions pour le questionnaire
function initializeQuestionnaire() {
    const container = document.getElementById('questionnaire-container');
    if (!container) return;

    // Afficher la première question
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
    if (index >= questionnaire.length) {
        evaluateResponses();
        return;
    }

    const container = document.getElementById('questionnaire-container');
    container.innerHTML = ''; // Effacer le contenu précédent

    const questionData = questionnaire[index];
    
    // Créer la carte de question
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    
    // Ajouter le titre de la question
    const questionTitle = document.createElement('h3');
    questionTitle.className = 'text-lg font-bold mb-4';
    questionTitle.textContent = `Question ${index + 1}: ${questionData.qlabel}`;
    questionCard.appendChild(questionTitle);
    
    // Ajouter les réponses
    const answersContainer = document.createElement('div');
    answersContainer.className = 'flex flex-col gap-2';
    
    questionData.reponses.forEach((reponse, rIndex) => {
        const btnAnswer = document.createElement('button');
        btnAnswer.className = 'answer-btn btn btn-outline';
        btnAnswer.textContent = reponse.rlabel;
        btnAnswer.dataset.rid = reponse.rid;
        btnAnswer.addEventListener('click', function() {
            // Enregistrer la réponse
            userResponses[index] = { 
                qid: questionData.qid, 
                rid: reponse.rid 
            };
            
            // Passer à la question suivante
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        });
        
        answersContainer.appendChild(btnAnswer);
    });
    
    questionCard.appendChild(answersContainer);
    container.appendChild(questionCard);
}

function evaluateResponses() {
    const resultMessage = document.getElementById('result-message');
    resultMessage.classList.remove('hidden');
    
    // Vérifier si toutes les réponses sont correctes
    const allCorrect = userResponses.every((response, index) => {
        const question = questionnaire[index];
        const correctAnswer = question.reponses.find(r => r.correct === true);
        return correctAnswer && response.rid === correctAnswer.rid;
    });
    
    if (allCorrect) {
        resultMessage.innerHTML = `
            <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Bravo ! Toutes vos réponses sont correctes. Vous allez être redirigé vers le formulaire de contact.</span>
            </div>
        `;
        // Redirection vers la page de contact après 2 secondes
        setTimeout(function() {
            redirectToContactPage();
        }, 2000);
    } else {
        resultMessage.innerHTML = `
            <div class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Certaines de vos réponses sont incorrectes. Veuillez réessayer.</span>
            </div>
        `;
        // Réinitialiser le questionnaire après 2 secondes
        setTimeout(function() {
            userResponses = [];
            currentQuestionIndex = 0;
            resultMessage.classList.add('hidden');
            displayQuestion(currentQuestionIndex);
        }, 2000);
    }
}

// Fonction pour simuler un accès par force brute
function bruteForceAccess() {
    // Créer une interface visuelle pour montrer le brute force en action
    const container = document.getElementById('questionnaire-container');
    container.innerHTML = `
        <div class="card bg-base-100 shadow-lg p-4">
            <h3 class="text-xl font-bold mb-4">Brute Force en cours...</h3>
            <div class="overflow-auto max-h-64 mb-4 p-2 bg-gray-100 rounded-lg text-xs font-mono" id="brute-force-log">
                <p>Initialisation du processus de brute force...</p>
            </div>
            <div class="flex items-center mb-4">
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                    <div class="bg-blue-600 h-2.5 rounded-full" id="brute-force-progress" style="width: 0%"></div>
                </div>
                <span id="progress-percentage">0%</span>
            </div>
            <div class="flex justify-between">
                <p>Tentative: <span id="attempt-counter">0</span></p>
                <p>Combinaison: <span id="current-combo">-</span></p>
            </div>
        </div>
    `;

    const logElement = document.getElementById('brute-force-log');
    const progressBar = document.getElementById('brute-force-progress');
    const progressPercent = document.getElementById('progress-percentage');
    const attemptCounter = document.getElementById('attempt-counter');
    const currentCombo = document.getElementById('current-combo');

    // Désactiver le bouton brute force pour éviter les clics multiples
    document.getElementById('brute-force-btn').disabled = true;
    
    // Générer toutes les combinaisons possibles
    const allCombinations = [];
    
    // Fonction pour générer toutes les combinaisons possibles de façon récursive
    function generateCombinations(questionIndex, currentCombination = []) {
        if (questionIndex >= questionnaire.length) {
            allCombinations.push([...currentCombination]);
            return;
        }
        
        const question = questionnaire[questionIndex];
        for (let i = 0; i < question.reponses.length; i++) {
            const response = question.reponses[i];
            currentCombination[questionIndex] = { qid: question.qid, rid: response.rid };
            generateCombinations(questionIndex + 1, currentCombination);
        }
    }
    
    // Générer les combinaisons
    generateCombinations(0);
    
    addToLog(logElement, `Générées ${allCombinations.length} combinaisons possibles.`);
    
    // Fonction pour vérifier si une combinaison est correcte
    function isCorrectCombination(combination) {
        return combination.every((response, index) => {
            const question = questionnaire[index];
            const correctAnswer = question.reponses.find(r => r.correct === true);
            return correctAnswer && response.rid === correctAnswer.rid;
        });
    }
    
    // Fonction pour ajouter un message au log avec auto-scroll
    function addToLog(logElement, message) {
        const line = document.createElement('p');
        line.textContent = message;
        logElement.appendChild(line);
        logElement.scrollTop = logElement.scrollHeight;
    }
    
    // Simuler le processus de brute force avec des délais pour visualisation
    let attemptCount = 0;
    let foundCorrect = false;
    
    function tryNextCombination(index) {
        if (index >= allCombinations.length || foundCorrect) {
            return;
        }
        
        const combination = allCombinations[index];
        attemptCount++;
        
        // Mettre à jour les compteurs et la barre de progression
        const progressPercentage = Math.floor((index / allCombinations.length) * 100);
        progressBar.style.width = `${progressPercentage}%`;
        progressPercent.textContent = `${progressPercentage}%`;
        attemptCounter.textContent = attemptCount;
        
        // Afficher la combinaison actuelle
        const comboDisplay = combination.map(item => `A${item.qid}_${item.rid}`).join('');
        currentCombo.textContent = comboDisplay;
        
        // Ajouter au log de façon plus clairsemée pour ne pas surcharger l'interface
        if (index % 5 === 0 || index === allCombinations.length - 1) {
            addToLog(logElement, `Essai ${attemptCount}: Tentative avec ${comboDisplay}`);
        }
        
        // Vérifier si c'est la bonne combinaison
        const isCorrect = isCorrectCombination(combination);
        
        if (isCorrect) {
            foundCorrect = true;
            progressBar.style.width = '100%';
            progressPercent.textContent = '100%';
            addToLog(logElement, `✅ SUCCÈS! Combinaison correcte trouvée: ${comboDisplay}`);
            addToLog(logElement, `Redirection vers la page de contact dans 3 secondes...`);
            
            // Définir les réponses utilisateur et rediriger
            userResponses = combination;
            setTimeout(() => {
                redirectToContactPage();
            }, 3000);
        } else {
            // Essayer la combinaison suivante après un court délai
            setTimeout(() => {
                tryNextCombination(index + 1);
            }, 50); // Ajuster la vitesse ici (en ms)
        }
    }
    
    // Commencer le processus de brute force
    setTimeout(() => {
        addToLog(logElement, "Démarrage du processus de brute force...");
        tryNextCombination(0);
    }, 1000);
}

// Fonction pour rediriger vers la page de contact
function redirectToContactPage() {
    // Créer un nom de page basé sur les réponses correctes
    const pageNameParts = userResponses.map(response => `A${response.qid}_${response.rid}`);
    const pageName = pageNameParts.join('') + '.html';
    
    // Redirection
    window.location.href = pageName;
}

// Fonction pour vérifier si la page de contact existe déjà
function checkContactPageExists() {
    const pageNameParts = userResponses.map(response => `A${response.qid}_${response.rid}`);
    const pageName = pageNameParts.join('') + '.html';
    
    fetch(pageName)
        .then(response => {
            if (response.ok) {
                return redirectToContactPage();
            }
            // Si la page n'existe pas, afficher un message
            const resultMessage = document.getElementById('result-message');
            resultMessage.classList.remove('hidden');
            resultMessage.innerHTML = `
                <div class="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Suite à vos réponses, vous ne souhaitez pas être contacté.</span>
                </div>
            `;
        })
        .catch(() => {
            // En cas d'erreur (la page n'existe pas)
            const resultMessage = document.getElementById('result-message');
            resultMessage.classList.remove('hidden');
            resultMessage.innerHTML = `
                <div class="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Suite à vos réponses, vous ne souhaitez pas être contacté.</span>
                </div>
            `;
        });
}