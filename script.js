document.addEventListener("DOMContentLoaded", () => {
  // Global variables
  let testimonials = [];
  let projects = [];
  let skills = [];
  let blogs = [];
  let certifications = [];
  let experienceData = [];

  // --- Read data from JSON file ---
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      testimonials = data.testimonials || [];
      projects = data.projects || [];
      skills = data.skills || [];
      blogs = data.blogs || [];
      certifications = data.certifications || [];
      experienceData = data.experiences || [];

      renderQuote(0);
      renderProjects();
      renderSkills();
      renderBlogs();
      renderCertifications();
      renderExperience();
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // --- Set current year ---
  const yearEl = document.getElementById("yearofCopyright");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Mobile menu toggle ---
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => mobileMenu.classList.add("hidden")));
  }

  // --- Copy email to clipboard ---
  const copyEmailButton = document.getElementById("copy-email-button");
  const emailMessage = document.getElementById("email-copied-message");
  if (copyEmailButton && emailMessage) {
    const emailAddress = "jadhavshivam0228@gmail.com";
    copyEmailButton.addEventListener("click", () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        emailMessage.classList.remove("hidden");
        setTimeout(() => emailMessage.classList.add("hidden"), 2000);
      });
    });
  }

const renderProjects = () => {
  const container = document.getElementById("projects-container");
  if (!container) return;
  container.innerHTML = projects.map((project) => `
    <div class="flip-card w-full sm:w-96 h-[28rem] mx-auto mb-8">
      <div class="flip-card-inner rounded-2xl shadow-xl transition-transform duration-500">

        <!-- Front -->
        <div class="flip-card-front flex flex-col rounded-2xl overflow-hidden shadow-md border bg-white">
          <div class="relative h-48 w-full">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <h3 class="absolute bottom-3 left-4 text-xl font-bold text-white drop-shadow-md">
              ${project.title}
            </h3>
          </div>
          <div class="p-5 flex flex-col justify-between flex-grow">
            <p class="text-sm text-gray-600 mb-3">
              ${project.description.substring(0, 150)}${project.description.length > 150 ? "..." : ""}
            </p>
            <div class="flex flex-wrap gap-2 mt-auto">
              ${project.technologies.slice(0, 10).map(tech => `
                <span class="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 text-xs px-2 py-1 rounded-full shadow-sm">
                  ${tech}
                </span>
              `).join("")}
            </div>
            <p class="mt-3 text-xs text-gray-400 italic text-center">Flip for details</p>
          </div>
        </div>

        <!-- Back -->
       <!-- Back -->
<div class="flip-card-back flex flex-col p-5 rounded-2xl shadow-md border 
            bg-gradient-to-br from-gray-50 via-white to-gray-100 
            backdrop-blur-sm relative">
  
  <!-- Accent bar -->
  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-t-2xl"></div>
  
  <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
    <span class="text-blue-500">📌</span> About Project
  </h4>
  
  <div class="overflow-y-auto pr-2 custom-scrollbar text-sm text-gray-600 flex-grow">
    <p class="mb-4 leading-relaxed">${project.description}</p>
    
    <h5 class="font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-1">⚙ Tech Stack</h5>
    <div class="flex flex-wrap gap-2 mb-4">
      ${project.technologies.map(tech => `
        <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full shadow-sm border">
          ${tech}
        </span>
      `).join("")}
    </div>
  </div>

  <a href="${project.links.learnMore}" target="_blank" 
     class="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline">
    🔗 View Live Site
  </a>
</div>


      </div>
    </div>
  `).join("");
};



  const renderExperience = () => {
    const container = document.getElementById("experience-container");
    if (!container) return;
    container.innerHTML = experienceData.map((job, index) => `
      <div class="relative flex flex-col sm:flex-row items-start mb-12">
        <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-10"></div>
        <div class="absolute left-1/2 top-0 transform -translate-x-1/2 h-full border-l-2 border-gray-300 z-0"></div>
        <div class="sm:w-1/2 ${index % 2 === 1 ? "sm:order-2 sm:pl-8" : "sm:order-1 sm:pr-8"}">
          <div class="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition transform">
            <h3 class="text-lg font-bold text-gray-800">${job.role}</h3>
            <p class="text-sm text-gray-600">${job.company} | ${job.startDate} - ${job.endDate}</p>
            <ul class="mt-2 list-disc list-inside text-gray-600 text-sm">
              ${job.summary.slice(0, 2).map(d => `<li>${d}</li>`).join("")}
            </ul>
            <div class="mt-2 flex flex-wrap gap-2">
              ${job.technologies.map(tech => `<span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">${tech}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="sm:w-1/2 ${index % 2 === 1 ? "sm:order-1 sm:pr-8" : "sm:order-2 sm:pl-8"}"></div>
      </div>
    `).join("");
  };

  const renderSkills = () => {
    const container = document.getElementById("skills-container");
    if (!container) return;
    container.innerHTML = skills.map(category => `
      <div class="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">${category.category}</h3>
        <div class="space-y-4">
          ${category.skills.map(skill => `
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">${skill.name}</span>
                <span class="text-xs font-semibold text-blue-600">${skill.level}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" style="width: ${skill.level}%;"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  };

 const renderCertifications = () => {
  const container = document.getElementById("certifications-container");
  if (!container) return;
  container.innerHTML = certifications.map(cert => `
    <div class="flip-card w-full sm:w-80 h-64 mx-auto mb-8">
      <div class="flip-card-inner rounded-xl shadow-lg">

        <!-- Front -->
        <div class="flip-card-front flex flex-col items-center justify-center p-3 rounded-xl shadow-md border">
          <img src="${cert.company}" alt="${cert.organization}" class="w-16 h-16 mb-2 object-cover rounded">
          <h3 class="text-sm font-bold text-gray-800">${cert.title}</h3>
          <p class="text-xs text-gray-500">Issued: ${cert.date}</p>
          <p class="mt-2 text-xs text-gray-500">Hover to see details</p>
        </div>

        <!-- Back -->
<div class="flip-card-back flex flex-col justify-center items-center rounded-xl shadow-md border text-center">
          <p class="text-xs text-gray-600 mb-2">${cert.info}</p>
          <a href="${cert.link}" target="_blank" class="text-blue-600 text-sm hover:underline">View Certificate</a>
        </div>

      </div>
    </div>
  `).join("");
};

  const renderBlogs = () => {
    const container = document.getElementById("blogs-container");
    if (!container) return;
    container.innerHTML = blogs.map(blog => `
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
    `).join("");
  };


  // --- Quotes Carousel ---
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
    currentQuoteIndex = (currentQuoteIndex - 1 + testimonials.length) % testimonials.length;
    renderQuote(currentQuoteIndex);
  };
  if (nextButton) nextButton.addEventListener("click", showNextQuote);
  if (prevButton) prevButton.addEventListener("click", showPrevQuote);
  renderQuote(currentQuoteIndex);
  setInterval(showNextQuote, 5000);

  // --- Resume Download ---
  const resumeDownload = document.querySelector("#resumeDownload");
  if (resumeDownload && !resumeDownload.hasAttribute("data-listener")) {
    resumeDownload.addEventListener("click", (e) => {
      e.preventDefault();
      const pdfUrl = "./Resume.pdf";
      const newTab = window.open(pdfUrl, "_blank");
      if (!newTab) alert("Pop-up blocked. Please allow pop-ups for this site.");
    });
    resumeDownload.setAttribute("data-listener", "true");
  }
});
 window.onload = function() {
            // THREE.js scene setup for the dynamic background
            let scene, camera, renderer, particles, geometry, material, mouse, raycaster, hoverParticles;
            const PARTICLE_COUNT = 5000; // Reduced for subtlety
            const PARTICLE_SIZE = 0.02; // Reduced for a finer look

            // Initialize the scene
            function init() {
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.z = 5;

                renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-js-background'), antialias: true, alpha: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                // Create particles
                geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(PARTICLE_COUNT * 3);
                const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
                
                for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
                    positions[i] = (Math.random() - 0.5) * 15;
                    originalPositions[i] = positions[i];
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));

                // Material for the particles
                material = new THREE.PointsMaterial({
                    color: 0x2c5282, // More subtle dark blue
                    size: PARTICLE_SIZE,
                    transparent: true,
                    opacity: 0.4 // Reduced opacity
                });

                // Particle system
                hoverParticles = new THREE.Points(geometry, material);
                scene.add(hoverParticles);

                // Mouse and Raycaster setup for interactivity
                mouse = new THREE.Vector2();
                raycaster = new THREE.Raycaster();
                
                document.addEventListener('mousemove', onMouseMove, false);
            }

            // Handle mouse movement
            function onMouseMove(event) {
                // The issue was here in a previous version. The code now correctly uses 'mouse.x' and 'mouse.y'
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);

                // Update particle positions based on mouse proximity
                const positions = geometry.attributes.position.array;
                const originalPositions = geometry.attributes.originalPosition.array;
                
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const i3 = i * 3;
                    const vx = positions[i3] - mouse.x * 2;
                    const vy = positions[i3 + 1] - mouse.y * 2;
                    const vz = positions[i3 + 2];
                    const distance = Math.sqrt(vx*vx + vy*vy + vz*vz);
                    
                    if (distance < 1.5) {
                        const repulsion = (1.5 - distance) / 1.5;
                        positions[i3] += vx * repulsion * 0.005; // Reduced repulsion force
                        positions[i3 + 1] += vy * repulsion * 0.005;
                    } else {
                        // Gently move back to original position
                        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.01;
                        positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.01;
                    }

                    positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.01;
                }
                geometry.attributes.position.needsUpdate = true;
                
                // Rotate the particle system
                hoverParticles.rotation.y += 0.0002;
                hoverParticles.rotation.x += 0.0001;
                
                renderer.render(scene, camera);
            }

            // Handle window resize
            window.addEventListener('resize', onWindowResize, false);
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            // Start the animation on window load
            init();
            animate();
        };
    