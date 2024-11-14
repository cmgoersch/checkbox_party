const gridContainer = document.getElementById('grid-container');
const counter = document.getElementById('counter');
const clearButton = document.getElementById('clear-button');
let clickedCount = 0;

// Lade den gespeicherten Zustand der Checkboxen aus dem LocalStorage
const savedState = JSON.parse(localStorage.getItem('checkboxStates')) || [];

// Erstelle die Checkboxen und wende den gespeicherten Zustand an
for (let i = 0; i < 1000; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.dataset.index = i; // Speichert den Index als Attribut für die Identifikation

    // Wenn ein gespeicherter Zustand vorhanden ist, Checkbox entsprechend setzen
    if (savedState[i]) {
        checkbox.checked = true;
        clickedCount++;
    }

    // Event Listener für Klicks
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            clickedCount++;
        } else {
            clickedCount--;
        }
        counter.textContent = `Angeklickte Checkboxen: ${clickedCount}`;

        // Speichere den aktuellen Zustand aller Checkboxen
        savedState[i] = checkbox.checked;
        localStorage.setItem('checkboxStates', JSON.stringify(savedState));
    });

    gridContainer.appendChild(checkbox);
}

// Aktualisiere den Counter beim Laden der Seite
counter.textContent = `Angeklickte Checkboxen: ${clickedCount}`;

// Funktion für den Clear-All-Button
clearButton.addEventListener('click', () => {
    // Setze alle Checkboxen zurück
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    // Setze Counter und LocalStorage zurück
    clickedCount = 0;
    counter.textContent = `Angeklickte Checkboxen: ${clickedCount}`;
    localStorage.removeItem('checkboxStates'); // Lösche gespeicherten Zustand
});