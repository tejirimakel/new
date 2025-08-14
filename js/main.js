
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const navLinks = document.querySelectorAll(".mobile-links a");
const navbar = document.querySelector(".navbar");
const scrollToTopButton = document.getElementById("scrollToTop");
const year = new Date().getFullYear();


menuToggle.addEventListener("click", () => mobileMenu.classList.add("active"));
closeMenu.addEventListener("click", () => mobileMenu.classList.remove("active"));
navLinks.forEach(link => link.addEventListener("click", () => mobileMenu.classList.remove("active")));

const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", e => {
    e.preventDefault();
    window.scrollBy({ top: 140, behavior: "smooth" });
  });
}


window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

 
  if (scrollY > 20) {
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    navbar.style.boxShadow = "var(--shadow)";
    navbar.style.transition = "background-color 0.8s ease, box-shadow 0.8s ease";
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
  }

 
  if (scrollToTopButton) {
    scrollToTopButton.style.display = scrollY > 500 ? "block" : "none";
  }
});


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
if (scrollToTopButton) scrollToTopButton.addEventListener("click", scrollToTop);


const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.innerHTML = `&copy; ${year} TMI Studio. All rights reserved.`;


emailjs.init("DLt8ki8PN2elTsOER");


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();


    emailjs.sendForm(
        "service_qkbmoks",
        "template_pfmzit2",
        "contactForm"
    )
    .then(() => {
        alert("Message sent successfully!");
        contactForm.reset();
    })
    .catch((err) => {
        console.error("EmailJS error:", err);
        alert("Failed to send message. Please try again later.");
    });
});



if (document.getElementById("map")) {
  mapboxgl.accessToken = '';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-114.0885397, 51.0640894],
    zoom: 14
  });
  new mapboxgl.Marker().setLngLat([-114.0885397, 51.0640894]).addTo(map);
}


const newsGrid = document.getElementById("newsGrid");
if (newsGrid) {
  const NEWS_API_KEY = "87a7d2f82f814e3082d4a38e0e543189";
  fetch(`https://newsapi.org/v2/everything?q=technology&apiKey=${NEWS_API_KEY}&pageSize=6`)
    .then(res => res.json())
    .then(data => {
      data.articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="news image">
          <h4>${article.title}</h4>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsGrid.appendChild(card);
      });
    })
    .catch(err => console.error(err));
}
