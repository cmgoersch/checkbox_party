document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("window-grid");
    const clearButton = document.getElementById("clear-all");
    const counter = document.getElementById("broken-counter");
    const soundToggle = document.getElementById("sound-toggle");
    const glassBreakSound = new Audio("sound/glass-break.mp3");

    let isSoundOn = true;
    let brokenCount = 0;

    // Toggle für Sound
    soundToggle.addEventListener("change", () => {
        isSoundOn = soundToggle.checked;
    });

    const waldoIndex = Math.floor(Math.random() * 1000);
    const savedState = JSON.parse(localStorage.getItem("smashZoneState")) || [];

    for (let i = 0; i < 1000; i++) {
        const windowDiv = document.createElement("div");
        windowDiv.classList.add("window");

        if (savedState[i] === "smashed") {
            windowDiv.classList.add("smashed");
            brokenCount++;
        }

        if (i === waldoIndex) {
            windowDiv.classList.add("waldo");
        }

        windowDiv.addEventListener("click", () => {
            handleWindowClick(i, windowDiv);
            handleWindowShake(windowDiv);
        });

        grid.appendChild(windowDiv);
    }

    counter.textContent = brokenCount;

    function handleWindowClick(index, windowDiv) {
        if (windowDiv.classList.contains("waldo")) return;

        if (!windowDiv.classList.contains("smashed")) {
            windowDiv.classList.add("smashed");
            brokenCount++;
            if (isSoundOn) {
                glassBreakSound.currentTime = 0;
                glassBreakSound.play().catch((err) => console.error(err));
            }
        } else {
            windowDiv.classList.remove("smashed");
            brokenCount--;
        }

        counter.textContent = brokenCount;
        saveState();
    }

    function handleWindowShake(windowDiv) {
        windowDiv.classList.add("shake");
        setTimeout(() => windowDiv.classList.remove("shake"), 300);
    }

    function saveState() {
        const state = Array.from(grid.children).map((child) =>
            child.classList.contains("smashed") ? "smashed" : ""
        );
        localStorage.setItem("smashZoneState", JSON.stringify(state));
    }

    clearButton.addEventListener("click", () => {
        Array.from(grid.children).forEach((child) => child.classList.remove("smashed"));
        brokenCount = 0;
        counter.textContent = brokenCount;
        saveState();
    });
});