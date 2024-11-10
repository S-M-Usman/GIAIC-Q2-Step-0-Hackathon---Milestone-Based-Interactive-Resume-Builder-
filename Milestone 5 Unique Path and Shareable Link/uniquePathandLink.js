// Function to generate a unique URL and copy it to the clipboard
function generateUniqueUrl() {
    const usernameInput = document.getElementById("url__name");
    const username = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value.trim();
    if (!username) {
        alert("Please enter a username to generate a URL.");
        return;
    }
    // Generate the unique URL
    const uniqueUrl = `https://giaic-q2-next-js-m5.vercel.app/${username}`;
    // Try to copy the URL to the clipboard
    navigator.clipboard
        .writeText(uniqueUrl)
        .then(() => {
        alert("URL copied to clipboard: " + uniqueUrl);
    })
        .catch((err) => {
        console.warn("Clipboard API not available. Using fallback method.");
        // Fallback method to copy text by temporarily selecting it
        const tempInput = document.createElement("input");
        tempInput.value = uniqueUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("URL copied to clipboard: " + uniqueUrl);
    });
}
// Function to download the resume section as PDF
function downloadResumeAsPDF() {
    const printCV = () => {
        window.print();
    };
    printCV();
}
// Add event listeners to buttons after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    (_a = document
        .getElementById("generate-url-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateUniqueUrl);
    (_b = document
        .getElementById("download-pdf-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", downloadResumeAsPDF);
});
