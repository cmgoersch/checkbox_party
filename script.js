document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("window-grid");
    const clearButton = document.getElementById("clear-all");
    const counter = document.getElementById("broken-counter");
    const soundToggle = document.getElementById("sound-toggle");
    const glassBreakSound = new Audio("sounds/glass-break.mp3");

    let isSoundOn = true;
    let brokenCount = 0;

    // Preload Audio
    glassBreakSound.load();

    // Toggle für Sound aktivieren/deaktivieren
    soundToggle.addEventListener("change", () => {
        isSoundOn = soundToggle.checked;
        console.log("Sound ist " + (isSoundOn ? "an" : "aus")); // Debugging
    });

    // Zufällige Position für Waldo
    const waldoIndex = Math.floor(Math.random() * 1000);
    const savedState = JSON.parse(localStorage.getItem("smashZoneState")) || [];

    // Fenster erstellen
    for (let i = 0; i < 1000; i++) {
        const windowDiv = document.createElement("div");
        windowDiv.classList.add("window");

        // Zustand aus dem Speicher laden
        if (savedState[i] === "smashed") {
            windowDiv.classList.add("smashed");
            brokenCount++;
        }

        // Waldo an zufälliger Stelle platzieren
        if (i === waldoIndex) {
            windowDiv.classList.add("waldo");
        }

        // Klick-Event für Fenster
        windowDiv.addEventListener("click", () => {
            if (windowDiv.classList.contains("smashed")) {
                // Bereits eingeschlagen: keine Aktion
                return;
            }
            handleWindowClick(i, windowDiv);
            handleWindowShake(windowDiv);
        });

        grid.appendChild(windowDiv);
    }

    // Zähler initialisieren
    counter.textContent = brokenCount;

    function handleWindowClick(index, windowDiv) {
        if (windowDiv.classList.contains("waldo")) return;

        // Fenster einschlagen
        if (!windowDiv.classList.contains("smashed")) {
            windowDiv.classList.add("smashed");
            brokenCount++;
            if (isSoundOn) {
                playSound(); // Sound abspielen
            }
        }

        // Zähler aktualisieren
        counter.textContent = brokenCount;
        saveState();
    }

    function handleWindowShake(windowDiv) {
        windowDiv.classList.add("shake");
        setTimeout(() => windowDiv.classList.remove("shake"), 300); // Animation entfernen
    }

    function saveState() {
        const state = Array.from(grid.children).map((child) =>
            child.classList.contains("smashed") ? "smashed" : ""
        );
        localStorage.setItem("smashZoneState", JSON.stringify(state));
    }

    function playSound() {
        try {
            glassBreakSound.currentTime = 0; // Zurück zum Anfang
            glassBreakSound.play().catch((err) => {
                console.error("Audio konnte nicht abgespielt werden:", err);
            });
        } catch (err) {
            console.error("Fehler beim Abspielen des Sounds:", err);
        }
    }

    // "Clear All"-Button
    clearButton.addEventListener("click", () => {
        Array.from(grid.children).forEach((child) => child.classList.remove("smashed"));
        brokenCount = 0;
        counter.textContent = brokenCount;
        saveState();
    });
});