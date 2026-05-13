// Numer indeksu: 77442

document.addEventListener("DOMContentLoaded", function () {
  var themeBtn = document.getElementById("themeBtn");
  var toggleBtn = document.getElementById("toggleProjectsBtn");
  var projectsSection = document.getElementById("projectsSection");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("red-theme");
    });
  }

  if (toggleBtn && projectsSection) {
    toggleBtn.addEventListener("click", function () {
      projectsSection.classList.toggle("hidden");
    });
  }
});
