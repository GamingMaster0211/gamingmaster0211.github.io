const html = document.documentElement;
const darkToggle = document.getElementById("themeToggle");
const monoToggle = document.getElementById("monochromeToggle");
const cakeModeToggle = document.getElementById("cakeMode");
const cakeToggle = document.getElementById("cakeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const dropdown = document.getElementById("settingsDropdown");
const projectListBtn = document.getElementById("projectListBtn");
const cakeDiv = document.getElementById("cake");
const confettiContainer = document.getElementById("confetti-container");

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = getCookie("theme") || "light";
    html.setAttribute("data-theme", savedTheme);

    const cakeCookie = getCookie("cake");
    if (cakeCookie === "on") {
        cakeDiv.style.display = "block";
        cakeToggle?.classList.add("active");
    } else {
        cakeDiv.style.display = "none";
    }

    requestAnimationFrame(() => {
        document.body.classList.add("fade-in");
    });
});

if (settingsBtn && dropdown) {
    settingsBtn.addEventListener("click", () => {
        dropdown.classList.toggle("active");
        settingsBtn.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".settings-wrapper")) {
            dropdown.classList.remove("active");
            settingsBtn.classList.remove("active");
        }
    });
}

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        setCookie("theme", next, 365);
    });
}

if (monoToggle) {
    monoToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "monochrome" ? "light" : "monochrome";
        html.setAttribute("data-theme", next);
        setCookie("theme", next, 365);
    });
}

if (cakeModeToggle) {
    cakeModeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "cake" ? "light" : "cake";
        html.setAttribute("data-theme", next);
        setCookie("theme", next, 365);
    });
}

if (cakeToggle) {
    cakeToggle.addEventListener("click", () => {
        const isOn = cakeDiv.style.display === "block";
        if (isOn) {
            cakeDiv.style.display = "none";
            setCookie("cake", "off", 365);
            cakeToggle.classList.remove("active");
        } else {
            cakeDiv.style.display = "block";
            setCookie("cake", "on", 365);
            cakeToggle.classList.add("active");
        }
    });
}

document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");
    if (url && !url.startsWith("http") && !url.startsWith("#")) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");
            setTimeout(() => window.location.href = url, 400);
        });
    }
});

if (projectListBtn) {
    projectListBtn.addEventListener("click", () => {
        document.querySelector("#projectList").scrollIntoView({ behavior: "smooth" });
    });
}

function launchConfetti() {
    const colors = [
        "#ff4d6d",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#8338ec",
        "#ffffff"
    ];

    const pieces = 300;
    const gravity = 0.05;
    const drag = 0.01;

    const leftOriginX = 0;
    const rightOriginX = window.innerWidth;
    const originY = window.innerHeight * 0.55;

    for (let i = 0; i < pieces; i++) {
        const confetti = document.createElement("div");
        
        confetti.classList.add("confetti");
        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confettiContainer.appendChild(confetti);

        const fromLeft = Math.random() < 0.5;

        let x = fromLeft ? leftOriginX : rightOriginX;
        let y = originY;

        const spreadAngle = (Math.random() - 0.5) * 90;
        const upwardForce = 10 + Math.random() * 4;
        const angleRad = (spreadAngle * Math.PI) / 180;

        let velocityX = Math.cos(angleRad) * upwardForce;
        let velocityY = -Math.abs(Math.sin(angleRad) * upwardForce);

        if (!fromLeft) velocityX *= -1;

        let rotation = Math.random() * 360;
        let rotationSpeed = (Math.random() - 0.5) * 25;

        function update() {
            velocityY += gravity;
            velocityX *= 1 - drag;

            x += velocityX;
            y += velocityY;

            rotation += rotationSpeed;

            confetti.style.transform =
                `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

            if (y < window.innerHeight + 60) {
                requestAnimationFrame(update);
            } else {
                confetti.remove();
            }
        }

        requestAnimationFrame(update);
    }
}

let confettiCooldown = false;
const confettiDelay = 1000;

if (cakeDiv) {
    cakeDiv.style.cursor = "pointer";

    cakeDiv.addEventListener("click", () => {
        if (confettiCooldown) return;

        confettiCooldown = true;
        launchConfetti();

        setTimeout(() => {
            confettiCooldown = false;
        }, confettiDelay);
    });

    var konamiCode = '38,38,40,40,37,39,37,39,66,65';
    var keyPresses = [];

    document.addEventListener('keydown', function(e) {
        keyPresses.push(e.keyCode);
        
        if (keyPresses.slice(-10).join(',') === konamiCode) {
            window.open('https://gamingmaster0211.github.io/scrapped_projects.html', '_blank');
        }
        
        if (!konamiCode.startsWith(keyPresses.join(','))) {
            keyPresses = [];
        }
    });   
}
