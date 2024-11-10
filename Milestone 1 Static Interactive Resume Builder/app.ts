// Select all elements with the class "section-title"
const sectionTitle = document.querySelectorAll<HTMLElement>(".section-title");

// Loop through each "section-title" element and add a click event listener
sectionTitle.forEach((title) => {
  title.addEventListener("click", () => {
    // Find the .section-content within the same section container
    const sectionContent =
      title.parentElement?.querySelector<HTMLElement>(".section-content");

    // Toggle the display style between 'none' and 'block'
    if (sectionContent) {
      sectionContent.style.display =
        sectionContent.style.display === "block" ? "none" : "block";
    }
  });
});
