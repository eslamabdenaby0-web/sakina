let count = 0;
const phrases = ["سُبْحَانَ اللَّهِ", "الْحَمْدُ لِلَّهِ", "اللَّهُ أَكْبَرُ", "لَا إِلَهَ إِلَّا اللَّهُ"];
let phraseIndex = 0;

function incrementTasbeeh() {
    count++;
    if(count > 33) {
        count = 1;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        const nameEl = document.getElementById('tasbeeh-name');
        if(nameEl) nameEl.textContent = phrases[phraseIndex];
    }
    const countEl = document.getElementById('tasbeeh-count');
    if(countEl) countEl.textContent = count;
}

function resetTasbeeh() {
    count = 0;
    phraseIndex = 0;
    const countEl = document.getElementById('tasbeeh-count');
    const nameEl = document.getElementById('tasbeeh-name');
    if(countEl) countEl.textContent = count;
    if(nameEl) nameEl.textContent = phrases[0];
}