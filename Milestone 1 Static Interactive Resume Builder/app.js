// Select all elements with the class "section-title"
const sectionTitle = document.querySelectorAll(".section-title");
// Loop through each "section-title" element and add a click event listener
sectionTitle.forEach((title) => {
    title.addEventListener("click", () => {
        var _a;
        // Find the .section-content within the same section container
        const sectionContent = (_a = title.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".section-content");
        // Toggle the display style between 'none' and 'block'
        if (sectionContent) {
            sectionContent.style.display =
                sectionContent.style.display === "block" ? "none" : "block";
        }
    });
});
