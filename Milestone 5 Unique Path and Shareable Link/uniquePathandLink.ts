// Function to generate a unique URL and copy it to the clipboard
function generateUniqueUrl(): void {
  const usernameInput = document.getElementById(
    "url__name"
  ) as HTMLInputElement | null;
  const username = usernameInput?.value.trim();

  if (!username) {
    alert("Please enter a username to generate a URL.");
    return;
  }

  // Generate the unique URL
  const uniqueUrl = `https://vercel/resume/${username}`;

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
function downloadResumeAsPDF(): void {
  const resumeElement = document.getElementById(
    "preview-sc"
  ) as HTMLElement | null;

  if (!resumeElement) {
    alert("No resume content found to download.");
    return;
  }

  // Import jsPDF and html2canvas libraries
  Promise.all([
    import("jspdf").then((module) => module.jsPDF),
    import("html2canvas"),
  ])
    .then(([jsPDF, html2canvas]) => {
      // Convert HTML to canvas
      html2canvas.default(resumeElement)
        .then((canvas: any) => {
          const pdf = new jsPDF("p", "pt", "a4");
          const imageData = canvas.toDataURL("image/png");

          // Get page dimensions and add image to the PDF
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          pdf.addImage(imageData, "PNG", 0, 0, pageWidth, pageHeight);

          // Save the PDF
          pdf.save("resume.pdf");
        })
        .catch((canvasErr:any) => {
          console.error("Error generating canvas from HTML:", canvasErr);
          alert("Failed to generate PDF due to canvas error.");
        });
    })
    .catch((importErr) => {
      console.error("Error loading PDF libraries:", importErr);
      alert("Failed to load PDF libraries. Please try again.");
    });
}


// Add event listeners to buttons after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("generate-url-btn")
    ?.addEventListener("click", generateUniqueUrl);
  document
    .getElementById("download-pdf-btn")
    ?.addEventListener("click", downloadResumeAsPDF);
});
