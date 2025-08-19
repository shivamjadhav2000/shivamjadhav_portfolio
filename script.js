// function createCertificates(certificates) {
//   const container = document.getElementById("certificate-section");
//   container.innerHTML = ""; // Clear existing content
  
//   certificates.forEach(cert => {
//       const certItem = document.createElement("div");
//       certItem.classList.add("certificate-item");
      
//       certItem.innerHTML = `
//           <img src="${cert.certificateLink}" alt="${cert.title}" class="certificate-img" />
//           <div class="certificate-content">
//               <h3 class="certificate-title">${cert.title}</h3>
//               <p class="certificate-info">${cert.info}</p>
//               <p class="certificate-skills"><strong>Skills:</strong> ${cert.skills.join(", ")}</p>
//               <p class="certificate-date"><strong>Date:</strong> ${cert.date}</p>
//               <a href="${cert.link}" target="_blank" class="certificate-link">View Certificate</a>
//           </div>
//       `;
      
//       container.appendChild(certItem);
//   });
// }


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
        const pdfUrl='./software Engineer.pdf'
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
  fetch("certifications.json") // Ensure this file is in the same directory or provide the correct path
  .then(response => response.json())
  .then(data => displayCertificates(data))
  .catch(error => console.error("Error fetching certificates:", error));
 
});


function displayCertificates(certificates) {
  const container = document.getElementById("certifications-container");
  container.innerHTML = ""; // Clear existing content before adding new certificates

  certificates.forEach(cert => {
      const certCard = document.createElement("div");
      certCard.classList.add("certificate-card");

      certCard.innerHTML = `
          <img src="${cert.certificateLink}" alt="${cert.title}" class="certificate-img">
          <div class="certificate-content">
          <h3 class="certificate-title">${cert.title}</h3>
          <div class="certificate-company">
          <img src="${cert.company}" alt="Company Logo">
          <span>${cert.category}</span>
          </div>
          <p class="certificate-info">
          ${cert.info.length > 40 ? cert.info.substring(0, 80) + '...' : cert.info}
          </p>
          <div class="certificate-skills">
          ${cert.skills.map(skill => `<span>${skill}</span>`).join('')}
          </div>
          <a href="${cert.link}" class="certificate-link" target="_blank">View Certificate</a>
          </div>
      `;

      container.appendChild(certCard);
  });
}
