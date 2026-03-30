function updatePreview() {
  // Step 1: Create the preview HTML content
  let previewHTML = "";

  // Step 2: Get basic form values
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const summary = document.querySelector('textarea[name="summary"]').value;
  const github = document.querySelector('textarea[name="github"]').value;
  const linkedin = document.querySelector('textarea[name="linkedin"]').value;

  previewHTML += `<h2>${name}</h2>`;
  previewHTML += `<p><strong>Email:</strong> ${email}</p>`;
  previewHTML += `<p><strong>Phone:</strong> ${phone}</p>`;

  previewHTML += `<p><strong>Summary:</strong> ${summary}</p>`;

  if (github.trim() !== "") {
    previewHTML += `<p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>`;
  }
  if (linkedin.trim() !== "") {
    previewHTML += `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>`;
  }

  // Step 3: Add Education
  const educations = document.querySelectorAll(".education-input");
  previewHTML += `<h3>Education</h3><ul>`;
  educations.forEach((input) => {
    if (input.value.trim() !== "") {
      previewHTML += `<li>${input.value}</li>`;
    }
  });
  previewHTML += `</ul>`;

  // Step 4: Add Experience
  const experiences = document.querySelectorAll(".experience-input");
  previewHTML += `<h3>Experience</h3><ul>`;
  experiences.forEach((input) => {
    if (input.value.trim() !== "") {
      previewHTML += `<li>${input.value}</li>`;
    }
  });
  previewHTML += `</ul>`;

  // Step 5: Add Skills
  const skills = document.getElementById("skills").value;
  previewHTML += `<h3>Skills</h3><p>${skills}</p>`;

  // Step 6: Add Achievements
  const achievements = document.querySelectorAll(".achievement-input");
  previewHTML += `<h3>Achievements</h3><ul>`;
  achievements.forEach((input) => {
    if (input.value.trim() !== "") {
      previewHTML += `<li>${input.value}</li>`;
    }
  });
  previewHTML += `</ul>`;

  // Step 7: Add Internships
  const internships = document.querySelectorAll(".internship-input");
  previewHTML += `<h3>Internships</h3><ul>`;
  internships.forEach((input) => {
    if (input.value.trim() !== "") {
      previewHTML += `<li>${input.value}</li>`;
    }
  });
  previewHTML += `</ul>`;

  // Step 8: Add Workshops
  const workshops = document.querySelectorAll(".workshop-input");
  previewHTML += `<h3>Workshops</h3><ul>`;
  workshops.forEach((input) => {
    if (input.value.trim() !== "") {
      previewHTML += `<li>${input.value}</li>`;
    }
  });
  previewHTML += `</ul>`;

  // Step 9: Show the result in the preview box
  document.getElementById("resume-preview").innerHTML = `
  <h1 id="resume-title">RESUME</h1>
  ${previewHTML}
`;

  // Step 10: Update progress bar
  updateProgressBar();
}

function addEducation() {
  const newEdu = document.createElement("div");
  newEdu.classList.add("edu-entry");
  newEdu.innerHTML = `<input type="text" class="education-input" placeholder="Education Details" oninput="updatePreview()" />`;

  document
    .getElementById("education-section")
    .insertBefore(newEdu, document.querySelector("#education-section button"));
}

function addExperience() {
  const newExp = document.createElement("div");
  newExp.classList.add("exp-entry");
  newExp.innerHTML = `<input type="text" class="experience-input" placeholder="Experience Details" oninput="updatePreview()" />`;
  document
    .getElementById("experience-section")
    .insertBefore(newExp, document.querySelector("#experience-section button"));
}

function clearForm() {
  document.getElementById("resume-form").reset();
  document.getElementById("preview-name").textContent = "";
  document.getElementById("preview-email").textContent = "";
  document.getElementById("preview-phone").textContent = "";
  document.getElementById("preview-summary").textContent = "";
  document.getElementById("preview-education").innerHTML = "";
  document.getElementById("preview-skills").innerHTML = "";
  document.getElementById("preview-experience").innerHTML = "";
  document
    .querySelectorAll(".achievement-input, .internship-input, .workshop-input")
    .forEach((input) => input.remove());
}
function downloadPDF() {
  const element = document.getElementById("resume-preview");
  html2pdf().from(element).save("resume.pdf");
}

function updateProgressBar() {
  const inputs = document.querySelectorAll(
    "#resume-form input, #resume-form textarea"
  );
  const total = inputs.length;
  let filled = 0;

  inputs.forEach((input) => {
    if (input.value.trim() !== "") filled++;
  });

  const percent = Math.round((filled / total) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
}

function addAchievement() {
  const section = document.getElementById("achievement-section");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "e.g. Won Hackathon 2024";
  input.className = "achievement-input";
  input.oninput = updatePreview;
  section.insertBefore(input, section.lastElementChild);
}

function addInternship() {
  const section = document.getElementById("internship-section");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "e.g. Interned at Google as Frontend Dev";
  input.className = "internship-input";
  input.oninput = updatePreview;
  section.insertBefore(input, section.lastElementChild);
}

function addWorkshop() {
  const section = document.getElementById("workshop-section");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "e.g. Attended Web3 Bootcamp";
  input.className = "workshop-input";
  input.oninput = updatePreview;
  section.insertBefore(input, section.lastElementChild);
}
