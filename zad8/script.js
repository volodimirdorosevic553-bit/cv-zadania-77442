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

document.addEventListener("DOMContentLoaded", function () {
  var noteForm = document.getElementById("noteForm");
  var noteInput = document.getElementById("noteInput");
  var notesList = document.getElementById("notesList");

  if (!noteForm || !noteInput || !notesList) return;

  var notes = JSON.parse(localStorage.getItem("notes77442")) || [];

  function saveNotes() {
    localStorage.setItem("notes77442", JSON.stringify(notes));
  }

  function renderNotes() {
    notesList.innerHTML = "";

    if (notes.length === 0) {
      notesList.innerHTML = "<p>Brak zapisanych elementów.</p>";
      return;
    }

    notes.forEach(function (note, index) {
      var row = document.createElement("div");
      row.className = "note-row";

      var span = document.createElement("span");
      span.textContent = note;

      var button = document.createElement("button");
      button.type = "button";
      button.textContent = "Usuń";
      button.addEventListener("click", function () {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      });

      row.appendChild(span);
      row.appendChild(button);
      notesList.appendChild(row);
    });
  }

  noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var note = noteInput.value.trim();

    if (note.length < 3) {
      alert("Element musi mieć minimum 3 znaki.");
      return;
    }

    notes.push(note);
    saveNotes();
    renderNotes();
    noteForm.reset();
  });

  renderNotes();
});

document.addEventListener("DOMContentLoaded", function () {
  var backendForm = document.getElementById("backendForm");

  if (!backendForm) return;

  backendForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("backendName").value.trim();
    var message = document.getElementById("backendMessage").value.trim();
    var result = document.getElementById("backendResult");

    if (name.length < 2 || message.length < 5) {
      result.innerHTML = '<p class="error">Uzupełnij poprawnie dane.</p>';
      return;
    }

    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        indexNumber: "77442",
        name: name,
        message: message
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        result.innerHTML = '<p class="success">' + data.message + '</p>';
        backendForm.reset();
      })
      .catch(function () {
        result.innerHTML =
          '<p class="error">Backend działa tylko lokalnie. Uruchom: node server.js</p>';
      });
  });
});
