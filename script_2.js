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
