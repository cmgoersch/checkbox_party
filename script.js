const gridContainer = document.getElementById('grid-container');
const counter = document.getElementById('counter');
const clearButton = document.getElementById('clear-button');
let clickedCount = 0;

// Lade den gespeicherten Zustand der Checkboxen aus dem LocalStorage
const savedState = JSON.parse(localStorage.getItem('checkboxStates')) || [];

// Funktion zum Erstellen einer Checkbox
function createCheckbox(index) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    // Entferne Standarddarstellung der Checkbox
    checkbox.style.appearance = 'none'; // Set appearance: none to hide default checkbox
    checkbox.style.webkitAppearance = 'none';
    checkbox.style.mozAppearance = 'none';
    checkbox.style.border = 'none'; // Entferne Rahmen, falls vorhanden

    // Füge das Hintergrundbild hinzu (falls CSS nicht greift)
    checkbox.style.background = "url('img/window-icon.png') center center no-repeat";
    checkbox.style.backgroundSize = "contain";
    checkbox.style.width = '50px';
    checkbox.style.height = '50px';

    // Setze den benutzerdefinierten Cursor
    checkbox.style.cursor = "url('img/hammer-icon-2.png'), auto";

    // Wenn ein gespeicherter Zustand vorhanden ist, Checkbox ausblenden
    if (savedState[index]) {
        checkbox.checked = true;
        checkbox.style.transform = 'translateY(100px)';
        checkbox.style.opacity = '0';
        clickedCount++;
    }

    // Event Listener für Klicks
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            clickedCount++;
            // Übergang auslösen
            checkbox.style.transform = 'translateY(100px)';
            checkbox.style.opacity = '0';
        } else {
            clickedCount--;
            // Zurücksetzen des Übergangs
            checkbox.style.transform = 'none';
            checkbox.style.opacity = '1';
        }
        counter.textContent = `Eingeschlagene Fenster: ${clickedCount}`;
    
        // Speichere den aktuellen Zustand aller Checkboxen
        savedState[index] = checkbox.checked;
        localStorage.setItem('checkboxStates', JSON.stringify(savedState));
    });

    return checkbox;
}

// Erstelle die Checkboxen und wende den gespeicherten Zustand an
for (let i = 0; i < 1000; i++) {
    const checkbox = createCheckbox(i);
    gridContainer.appendChild(checkbox);
}

// Aktualisiere den Counter beim Laden der Seite
counter.textContent = `Eingeschlagene Fenster: ${clickedCount}`;

// Funktion für den Clear-All-Button
clearButton.addEventListener('click', () => {
    // Setze alle Checkboxen zurück
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = false;
        checkbox.style.transform = 'none';
        checkbox.style.opacity = '1';
        savedState[index] = false; // Setze den gespeicherten Zustand zurück
    });

    // Setze Counter und LocalStorage zurück
    clickedCount = 0;
    counter.textContent = `Eingeschlagene Fenster: ${clickedCount}`;
    localStorage.setItem('checkboxStates', JSON.stringify(savedState)); // Speichere den leeren Zustand
});