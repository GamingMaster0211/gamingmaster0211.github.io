const html = document.documentElement;
const darkToggle = document.getElementById("themeToggle");
const monoToggle = document.getElementById("monochromeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const dropdown = document.getElementById("settingsDropdown");
const moreInfoBtn = document.getElementById("moreInfo");
const projectListBtn = document.getElementById("projectListBtn");
const cakeToggle = document.getElementById("cakeToggle");
const cakeDiv = document.getElementById("cake");

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + value + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = getCookie("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    const cakeCookie = getCookie("cake");
    if (cakeCookie === "on") {
        cakeDiv.style.display = "block";
        if (cakeToggle) cakeToggle.classList.add("active");
    } else {
        cakeDiv.style.display = "none";
    }
});

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

if (settingsBtn && dropdown) {
    settingsBtn.addEventListener("click", () => {
        dropdown.classList.toggle("active");
        settingsBtn.classList.toggle("active");
    });
}

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");

        if (current === "dark") {
            html.setAttribute("data-theme", "light");
            setCookie("theme", "light", 365);
        } else {
            html.setAttribute("data-theme", "dark");
            setCookie("theme", "dark", 365);
        }
    });
}

if (monoToggle) {
    monoToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");

        if (current === "monochrome") {
            html.setAttribute("data-theme", "light");
            setCookie("theme", "light", 365);
        } else {
            html.setAttribute("data-theme", "monochrome");
            setCookie("theme", "monochrome", 365);
        }
    });
}

if (moreInfoBtn) {
    moreInfoBtn.addEventListener("click", () => {
        window.location.href = "more_information.html";
    });
}

if (projectListBtn) {
    projectListBtn.addEventListener("click", () => {
        window.location.href = "#projectList";
    });
}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".settings-wrapper") && dropdown && settingsBtn) {
        dropdown.classList.remove("active");
        settingsBtn.classList.remove("active");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");

    if (url && !url.startsWith("http") && !url.startsWith("#")) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = url;
            }, 400);
        });
    }
});

function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

console.log("%cHey developer.", "font-size:16px; color:#ff7eb3;");
console.log("%cSince you're here... enjoy the cake.", "color:#ff7eb3;");
