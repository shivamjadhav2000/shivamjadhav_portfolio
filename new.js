document.addEventListener("DOMContentLoaded", () => {
  // Global variables
  let testimonials = [];
  let projects = [];
  let skills = [];
  let blogs = [];
  let certifications = [];
  let experienceData = [];

  // Read data from JSON file
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      // Assign data to global variables
      testimonials = data.testimonials || [];
      projects = data.projects || [];
      skills = data.skills || [];
      blogs = data.blogs || [];
      certifications = data.certifications || [];
      experienceData = data.experiences || [];

      // Call render functions
      renderQuote(0);
      renderProjects();
      renderSkills();
      renderBlogs();
      renderCertifications();
      renderExperience();
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // =================================================================
  // === JAVASCRIPT LOGIC: DO NOT EDIT BELOW THIS LINE UNLESS YOU  ===
  // === ARE AN ADVANCED USER. MODIFYING THIS CODE CAN BREAK THE   ===
  // === DYNAMIC RENDERING OF YOUR PORTFOLIO.                      ===
  // =================================================================

  // Set current year for copyright
  const yearEl = document.getElementById("yearofCopyright");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Copy email to clipboard
  const copyEmailButton = document.getElementById("copy-email-button");
  const emailMessage = document.getElementById("email-copied-message");
  if (copyEmailButton && emailMessage) {
    const emailAddress = "jadhavshivam0228@gmail.com";
    copyEmailButton.addEventListener("click", () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        emailMessage.classList.remove("hidden");
        setTimeout(() => {
          emailMessage.classList.add("hidden");
        }, 2000);
      });
    });
  }

  // --- Dynamic Rendering Functions ---
  const renderProjects = () => {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = projects
      .map(
        (project) => `
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src="${project.image}" alt="${project.title}" class="w-full h-[300px] ">
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
              <p class="text-gray-600 mb-4">${project.description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies
                  .map(
                    (tech) =>
                      `<span class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">${tech}</span>`
                  )
                  .join("")}
              </div>
              <a href="${project.links.learnMore}" target="_blank" class="text-blue-600 font-semibold hover:underline">View Live Site &rarr;</a>
            </div>
          </div>
        `
      )
      .join("");
  };

  const renderExperience = () => {
    const container = document.getElementById("experience-container");
    if (!container) return;
    container.innerHTML = experienceData
      .map(
        (job, index) => `
        <div class="relative flex flex-col sm:flex-row items-start mb-12">
          <!-- Timeline Circle + Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-10"></div>
          <div class="absolute left-1/2 top-0 transform -translate-x-1/2 h-full border-l-2 border-gray-300 z-0"></div>

          <!-- Job Card -->
          <div class="sm:w-1/2 ${
            index % 2 === 1 ? "sm:order-2 sm:pl-8" : "sm:order-1 sm:pr-8"
          }">
            <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition transform">
              <h3 class="text-lg font-bold text-gray-800">${job.role}</h3>
              <p class="text-sm text-gray-600">${job.company} | ${job.startDate} - ${job.endDate}</p>
              <ul class="mt-2 list-disc list-inside text-gray-600 text-sm">
                ${job.summary
                  .slice(0, 2)
                  .map((duty) => `<li>${duty}</li>`)
                  .join("")}
              </ul>
              <div class="mt-2 flex flex-wrap gap-2">
                ${job.technologies
                  .map(
                    (tech) =>
                      `<span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">${tech}</span>`
                  )
                  .join("")}
              </div>
            </div>
          </div>
          <div class="sm:w-1/2 ${
            index % 2 === 1 ? "sm:order-1 sm:pr-8" : "sm:order-2 sm:pl-8"
          }"></div>
        </div>
      `
      )
      .join("");
  };

  const renderSkills = () => {
    const container = document.getElementById("skills-container");
    if (!container) return;
    container.innerHTML = skills
      .map(
        (category) => `
          <div class="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105">
            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">${category.category}</h3>
            <div class="space-y-4">
              ${category.skills
                .map(
                  (skill) => `
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">${skill.name}</span>
                      <span class="text-xs font-semibold text-blue-600">${skill.level}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" style="width: ${skill.level}%;"></div>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        `
      )
      .join("");
  };

  const renderCertifications = () => {
    const container = document.getElementById("certifications-container");
    if (!container) return;
    container.innerHTML = certifications
      .map(
        (cert) => `
          <div class="bg-gray-50 rounded-xl shadow-lg p-6 flex items-center space-x-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src="${cert.certificateLink}" alt="${cert.organization} Logo" class="w-40 h-auto rounded-lg object-cover">
            <div>
              <img src="${cert.company}" alt="${cert.company} Badge" class="w-12 rounded-lg object-cover">
              <p class="text-sm text-gray-600">${cert.category}</p>
              <p class="text-xs text-gray-500">${cert.info.substr(0, 100)}${cert.info.length > 100 ? "..." : ""}</p>
              <span class="text-xs text-gray-500">Issued: ${cert.date}</span>
              <hr/>
              <span><a href="${cert.link}" target="_blank" class="text-sm text-blue-600 hover:underline">View Certificate</a></span>
            </div>
          </div>
        `
      )
      .join("");
  };

  const renderBlogs = () => {
    const container = document.getElementById("blogs-container");
    if (!container) return;
    container.innerHTML = blogs
      .map(
        (blog) => `
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2">${blog.title}</h3>
              <p class="text-gray-600 mb-4">${blog.description.substring(0, 100)}${blog.description.length > 100 ? "..." : ""}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Published: ${blog.date}</span>
                <a href="${blog.link}" target="_blank" class="text-blue-600 font-semibold hover:underline">Read More &rarr;</a>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  };

  // Quotes Carousel Logic
  const quoteContainer = document.getElementById("quote-container");
  const prevButton = document.getElementById("prev-quote");
  const nextButton = document.getElementById("next-quote");
  let currentQuoteIndex = 0;

  const renderQuote = (index) => {
    if (!quoteContainer || testimonials.length === 0) return;
    const quote = testimonials[index];
    quoteContainer.innerHTML = `
      <div class="quote-fade-in space-y-4">
        <blockquote class="text-lg sm:text-xl font-medium text-gray-800 italic">"${quote.message}"</blockquote>
        <div class="flex flex-col items-center">
          <cite class="text-sm font-bold text-blue-600 not-italic">${quote.name}</cite>
          <cite class="text-sm font-bold text-blue-600 not-italic">${quote.role}</cite>
          <a href="${quote.link}" target="_blank" class="text-sm text-gray-500 hover:underline">View Profile</a>
        </div>
      </div>
    `;
  };

  const showNextQuote = () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % testimonials.length;
    renderQuote(currentQuoteIndex);
  };

  const showPrevQuote = () => {
    currentQuoteIndex =
      (currentQuoteIndex - 1 + testimonials.length) % testimonials.length;
    renderQuote(currentQuoteIndex);
  };

  if (nextButton) nextButton.addEventListener("click", showNextQuote);
  if (prevButton) prevButton.addEventListener("click", showPrevQuote);

  renderQuote(currentQuoteIndex);
  setInterval(showNextQuote, 5000);

  // Resume Download
  const resumeDownload = document.querySelector("#resumeDownload");
  if (resumeDownload && !resumeDownload.hasAttribute("data-listener")) {
    resumeDownload.addEventListener("click", (e) => {
      e.preventDefault();
      const pdfUrl = "./MyResume.pdf";
      const newTab = window.open(pdfUrl, "_blank");
      if (!newTab) {
        alert("Pop-up blocked. Please allow pop-ups for this site.");
      }
    });
    resumeDownload.setAttribute("data-listener", "true");
  }
});
