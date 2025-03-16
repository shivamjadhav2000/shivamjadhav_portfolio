document.addEventListener('DOMContentLoaded', () => {

  // Slideshow logic
  let currslide = 0;
  const slides = document.querySelectorAll('.slide');
  const maxslides = slides.length;

  const slideanimation = () => {
    currslide = (currslide + 1) % maxslides;
    slides.forEach((s, i) => {
      s.style.display = `${i === currslide ? 'block' : 'none'}`;
    });
  };
  setInterval(slideanimation, 6000);

  // Year for copyright
  const yearofCopyright = document.querySelector('#yearofCopyright');
  const year = new Date().getFullYear();
  yearofCopyright.textContent = year;

  // Resume download logic
  const resumeDownload = document.querySelector('#resumeDownload');
  if (resumeDownload) { // Check if the element exists
    // Add a one-time event listener
    if (!resumeDownload.hasAttribute('data-listener')) {
      resumeDownload.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default behavior of the link or button, if any
        // const pdfUrl = './shivamjadhav-software-egineer-resume.pdf';
        const pdfUrl='./softwareEngineer-AI.pdf'
        const newTab = window.open(pdfUrl, '_blank');
        
        // Check if the new tab opened successfully
        if (!newTab) {
          alert('Pop-up blocked. Please allow pop-ups for this site.');
        }
      });

      // Mark that the event listener has been added
      resumeDownload.setAttribute('data-listener', 'true');
    }
  } else {
    console.error('Resume download button not found.');
  }
});
