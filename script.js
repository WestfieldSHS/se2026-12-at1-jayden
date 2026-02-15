document.addEventListener("DOMContentLoaded", () => {
  // Highlight current page in nav
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((a) => {
    if (a.getAttribute("href") === current) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
    }
    });

  // Search (only affects Home cards)
    const input = document.getElementById("searchInput");
    const btn = document.getElementById("searchBtn");
    const cards = Array.from(document.querySelectorAll("[data-card]"));
    const noResults = document.getElementById("noResults");

    if (!input || !btn) return;

    const filterCards = () => {
    if (!cards.length) return;
    const q = input.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
        const text = (card.getAttribute("data-search") || "").toLowerCase();
        const show = q === "" || text.includes(q);
        card.style.display = show ? "" : "none";
        if (show) visible++;
    });

    if (noResults) noResults.hidden = !(q !== "" && visible === 0);
    };

    input.addEventListener("input", filterCards);
    btn.addEventListener("click", (e) => {
    e.preventDefault();
    filterCards();
    });
});
