const html = document.documentElement;
const darkToggle = document.getElementById("themeToggle");
const monoToggle = document.getElementById("monochromeToggle");
const cakeModeToggle = document.getElementById("cakeMode");
const cakeToggle = document.getElementById("cakeToggle");
const settingsBtn = document.getElementById("settingsBtn");
const dropdown = document.getElementById("settingsDropdown");
const projectListBtn = document.getElementById("projectListBtn");
const cakeDiv = document.getElementById("cake");

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
