// ===== JS final pour site gaming interactif =====

// ----- Gestion barre de progression semaine -----
function updateSemaineProgress(semaineId) {
    const semaine = document.getElementById(semaineId);
    const checkboxes = semaine.querySelectorAll('.jour-checkbox');
    const progressBar = semaine.querySelector('.progress-bar');
    if (!progressBar) return;

    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / total) * 100);

    progressBar.style.width = percent + '%';
    progressBar.textContent = percent + '%';

    // Effet néon + confetti si 100%
    if (percent === 100 && !progressBar.classList.contains('complete')) {
        progressBar.classList.add('complete');
        spawnConfetti();
        setTimeout(() => progressBar.classList.remove('complete'), 1200);
    }

    updateGlobalProgress();
}

// ----- Calcul de la progression globale -----
function updateGlobalProgress() {
    const semaines = document.querySelectorAll('.semaine');
    const phases = document.querySelectorAll('.phase-checkbox');

    let totalCheckboxes = 0;
    let totalChecked = 0;

    semaines.forEach(semaine => {
        const checkboxes = semaine.querySelectorAll('.jour-checkbox');
        totalCheckboxes += checkboxes.length;
        totalChecked += Array.from(checkboxes).filter(cb => cb.checked).length;
    });

    phases.forEach(phaseCb => {
        totalCheckboxes += 1;
        if (phaseCb.checked) totalChecked += 1;
    });

    const globalPercent = totalCheckboxes ? Math.round((totalChecked / totalCheckboxes) * 100) : 0;
    const globalBar = document.getElementById('progress-global');
    if (globalBar) {
        globalBar.style.width = globalPercent + '%';
        globalBar.textContent = globalPercent + '%';
    }
}

// ----- Confetti simple -----
function spawnConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '6px';
        confetti.style.height = '6px';
        confetti.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
        confetti.style.top = '0px';
        confetti.style.left = Math.random()*window.innerWidth + 'px';
        confetti.style.opacity = 0.8;
        confetti.style.transform = `rotate(${Math.random()*360}deg)`;
        confettiContainer.appendChild(confetti);

        const duration = 2000 + Math.random()*1000;
        confetti.animate([
            { transform: `translateY(0px) rotate(${Math.random()*360}deg)` },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random()*720}deg)` }
        ], { duration: duration, easing: 'ease-out', fill: 'forwards' });

        setTimeout(() => confetti.remove(), duration);
    }

    setTimeout(() => confettiContainer.remove(), 3000);
}

// ----- Initialisation : ajouter les barres si manquantes -----
document.querySelectorAll('.semaine').forEach(semaine => {
    if (!semaine.querySelector('.progress-bar')) {
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressDiv.appendChild(progressBar);
        semaine.insertBefore(progressDiv, semaine.firstChild);
    }
});

// Ajouter barre globale si manquante
if (!document.getElementById('progress-global')) {
    const globalContainer = document.createElement('div');
    globalContainer.className = 'progress-container';
    const globalBar = document.createElement('div');
    globalBar.className = 'progress-bar';
    globalBar.id = 'progress-global';
    globalBar.textContent = '0%';
    globalContainer.appendChild(globalBar);
    document.body.insertBefore(globalContainer, document.body.firstChild);
}

// ----- Event listeners pour jours -----
document.querySelectorAll('.jour-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
        const parentSemaine = cb.closest('.semaine');
        if (parentSemaine) updateSemaineProgress(parentSemaine.id);
    });
});

// ----- Event listeners pour phases -----
document.querySelectorAll('.phase-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
        updateGlobalProgress();

        // Glow + confetti si phase terminée
        if (cb.checked) spawnConfetti();
    });
});

// ----- Initial update -----
updateGlobalProgress();
document.querySelectorAll('.semaine').forEach(s => updateSemaineProgress(s.id));
