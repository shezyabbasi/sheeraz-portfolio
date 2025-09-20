// Initialize AOS Animations
AOS.init({
  once: true,
  duration: 800
});

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Handler - Send to Google Sheets
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    name: this.querySelector('input[type="text"]').value,
    email: this.querySelector('input[type="email"]').value,
    message: this.querySelector('textarea').value
  };

  fetch("https://script.google.com/macros/s/AKfycby1aj0ZuRVZ3CkshUZWptSQT9KyPtFxFYDqlb9d5r9jXRJtxmLpDDdTZ6aia0Cx8oToLw/exec", {
    method: "POST",
    mode: "no-cors", // 👈 important
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(() => {
    alert("✅ Thank you! Your message has been sent.");
    this.reset();
  })
  .catch(err => {
    alert("❌ Error: " + err);
  });
});

// -------- Skill Progress Bar Animation on Scroll --------

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - 100) && // 100px before element appears
    rect.bottom >= 0
  );
}

const skillSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress-bar');
let skillsAnimated = false; // to ensure animation happens only once

function animateSkillBars() {
  if (isInViewport(skillSection) && !skillsAnimated) {
    skillsAnimated = true;
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-target');
      bar.style.width = targetWidth + '%';
    });
  }
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);
