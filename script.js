


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
  fetch('certifications.json')
      .then(response => response.json())
      .then(certifications => {
          const container = document.getElementById('certifications-container');
          certifications.forEach(cert => {
              const card = document.createElement('div');
              card.className = 'certification-card';

              const words = cert.info.split(' ');
              const truncatedInfo = words.slice(0, 30).join(' ');

              card.innerHTML = `
                  <div class="certification-card-inner">
                      <div class="certification-card-front">
                          <span class="title">${cert.title}</span>
                          <img src="${cert.certificateLink}" alt="${cert.title} Certificate">
                          <div class="skills">${cert.skills.map(skill => `<span>${skill}</span>`).join('')}</div>
                          <div class="buttons">
                              <button class="view-cert">Visit</button>
                              <button class="flip-card">View More</button>
                          </div>
                      </div>
                      <div class="certification-card-back">
                          <h3><a href="${cert.link}" target="_blank">${cert.title}</a></h3>
                          <img src="${cert.company}" alt="${cert.company} Logo" class="company-logo">
                          <p class="category">Category: ${cert.category}</p>
                          <p class="date">Date: ${cert.date}</p>
                          <p>${truncatedInfo}${words.length > 30 ? '...' : ''}</p>
                          <div class="skills">${cert.skills.map(skill => `<span>${skill}</span>`).join('')}</div>
                      </div>
                  </div>
              `;
              container.appendChild(card);

              const innerCard = card.querySelector('.certification-card-inner');
              const viewCertButton = card.querySelector('.view-cert');
              const flipCardButton = card.querySelector('.flip-card');

              viewCertButton.addEventListener('click', function() {
                  window.location.href = cert.link;
              });

              flipCardButton.addEventListener('click', function() {
                  innerCard.style.transform = innerCard.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
              });
          });
      })
      .catch(error => console.error('Error fetching certifications:', error));
});
