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

document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("formResult").innerHTML = "";

    var valid = true;

    if (name.length < 2) {
      document.getElementById("nameError").textContent = "Imię musi mieć minimum 2 znaki.";
      valid = false;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      document.getElementById("emailError").textContent = "Podaj poprawny adres email.";
      valid = false;
    }

    if (message.length < 10) {
      document.getElementById("messageError").textContent = "Wiadomość musi mieć minimum 10 znaków.";
      valid = false;
    }

    if (valid) {
      document.getElementById("formResult").innerHTML =
        '<p class="success">Formularz jest poprawny.</p>';
      contactForm.reset();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var jsonProjects = document.getElementById("jsonProjects");

  if (!jsonProjects) return;

  fetch("data.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Nie można pobrać pliku data.json");
      }
      return response.json();
    })
    .then(function (data) {
      jsonProjects.innerHTML = "";

      data.projects.forEach(function (project) {
        var article = document.createElement("article");
        article.className = "card";

        var title = document.createElement("h3");
        title.textContent = project.title;

        var description = document.createElement("p");
        description.textContent = project.description;

        article.appendChild(title);
        article.appendChild(description);
        jsonProjects.appendChild(article);
      });
    })
    .catch(function (error) {
      jsonProjects.innerHTML = '<p class="error">' + error.message + '</p>';
    });
});
