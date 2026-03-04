// Fonction confetti simple
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

        // Animation chute
        const duration = 2000 + Math.random()*1000;
        confetti.animate([
            { transform: `translateY(0px) rotate(${Math.random()*360}deg)` },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random()*720}deg)` }
        ], { duration: duration, easing: 'ease-out', fill: 'forwards' });

        setTimeout(() => confetti.remove(), duration);
    }

    // Supprimer container après 3 sec
    setTimeout(() => confettiContainer.remove(), 3000);
}

// Modifier updateSemaineProgress pour effet neon + confetti
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

// Event listener reste le même
document.querySelectorAll('.jour-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
        const parentSemaine = cb.closest('.semaine');
        if (parentSemaine) {
            updateSemaineProgress(parentSemaine.id);
        }
    });
});
