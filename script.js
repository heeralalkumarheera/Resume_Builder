let profileImageData = "";

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildLink(url) {
  if (!url) {
    return "";
  }
  return `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(url)}</a>`;
}

function listFromInputs(selector) {
  return Array.from(document.querySelectorAll(selector))
    .map((el) => el.value.trim())
    .filter(Boolean);
}

function formatDate(value) {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function createEducationEntry() {
  return `
    <div class="edu-entry inline-entry">
      <div class="field-col">
        <label>Degree</label>
        <input type="text" class="education-degree" placeholder="B.Tech in CSE" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Institute</label>
        <input type="text" class="education-institute" placeholder="ABC Institute" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Year</label>
        <input type="text" class="education-year" placeholder="2026" oninput="updatePreview()" />
      </div>
    </div>
  `;
}

function createExperienceEntry() {
  return `
    <div class="exp-entry inline-entry experience-entry-grid">
      <div class="field-col">
        <label>Role</label>
        <input type="text" class="experience-role" placeholder="Frontend Developer" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Company</label>
        <input type="text" class="experience-company" placeholder="XYZ Pvt Ltd" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Duration (Months)</label>
        <input type="number" min="0" class="experience-duration" placeholder="18" oninput="updatePreview()" />
      </div>
    </div>
  `;
}

function createInternshipEntry() {
  return `
    <div class="intern-entry inline-entry internship-entry-grid">
      <div class="field-col">
        <label>Role</label>
        <input type="text" class="intern-role" placeholder="Software Intern" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Company</label>
        <input type="text" class="intern-company" placeholder="Tech Labs" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Start Date</label>
        <input type="date" class="intern-start" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>End Date</label>
        <input type="date" class="intern-end" oninput="updatePreview()" />
      </div>
      <div class="field-col checkbox-col">
        <label>
          <input type="checkbox" class="intern-current" onchange="toggleInternCurrent(this)" />
          Current Work
        </label>
      </div>
    </div>
  `;
}

function createProjectEntry() {
  return `
    <div class="project-entry inline-entry project-entry-grid">
      <div class="field-col">
        <label>Project Name</label>
        <input type="text" class="project-name" placeholder="Resume Builder" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>GitHub Link</label>
        <input type="url" class="project-github" placeholder="https://github.com/username/repo" oninput="updatePreview()" />
      </div>
      <div class="field-col">
        <label>Deploy Link</label>
        <input type="url" class="project-deploy" placeholder="https://your-project.vercel.app" oninput="updatePreview()" />
      </div>
    </div>
  `;
}

function collectEducationEntries() {
  return Array.from(document.querySelectorAll(".edu-entry"))
    .map((entry) => ({
      degree: entry.querySelector(".education-degree")?.value.trim() || "",
      institute: entry.querySelector(".education-institute")?.value.trim() || "",
      year: entry.querySelector(".education-year")?.value.trim() || "",
    }))
    .filter((item) => item.degree || item.institute || item.year);
}

function collectExperienceEntries() {
  return Array.from(document.querySelectorAll(".exp-entry"))
    .map((entry) => ({
      role: entry.querySelector(".experience-role")?.value.trim() || "",
      company: entry.querySelector(".experience-company")?.value.trim() || "",
      durationMonths: entry.querySelector(".experience-duration")?.value.trim() || "",
    }))
    .filter((item) => item.role || item.company || item.durationMonths);
}

function collectInternshipEntries() {
  return Array.from(document.querySelectorAll(".intern-entry"))
    .map((entry) => ({
      role: entry.querySelector(".intern-role")?.value.trim() || "",
      company: entry.querySelector(".intern-company")?.value.trim() || "",
      startDate: entry.querySelector(".intern-start")?.value || "",
      endDate: entry.querySelector(".intern-end")?.value || "",
      isCurrent: entry.querySelector(".intern-current")?.checked || false,
    }))
    .filter(
      (item) => item.role || item.company || item.startDate || item.endDate || item.isCurrent
    );
}

function collectProjectEntries() {
  return Array.from(document.querySelectorAll(".project-entry"))
    .map((entry) => ({
      name: entry.querySelector(".project-name")?.value.trim() || "",
      github: entry.querySelector(".project-github")?.value.trim() || "",
      deploy: entry.querySelector(".project-deploy")?.value.trim() || "",
    }))
    .filter((item) => item.name || item.github || item.deploy);
}

function buildThinTableSection(title, headers, rows, tableClass = "") {
  if (!rows.length) return "";

  const headHTML = headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("");
  const bodyHTML = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell || "-"}</td>`).join("")}</tr>`)
    .join("");

  const tableClassStr = tableClass ? ` ${tableClass}` : "";
  return `
    <section class="resume-section">
      <h3>${escapeHTML(title)}</h3>
      <div class="thin-table-wrap">
        <table class="thin-table${tableClassStr}">
          <thead><tr>${headHTML}</tr></thead>
          <tbody>${bodyHTML}</tbody>
        </table>
      </div>
    </section>
  `;
}

function buildEducationSection(items) {
  const rows = items.map((item) => [
    escapeHTML(item.degree || "-"),
    escapeHTML(item.institute || "-"),
    escapeHTML(item.year || "-"),
  ]);
  return buildThinTableSection("Education", ["Degree", "Institute", "Year"], rows, "education-table");
}

function buildExperienceSection(items) {
  const rows = items.map((item) => [
    escapeHTML(item.role || "-"),
    escapeHTML(item.company || "-"),
    escapeHTML(item.durationMonths ? `${item.durationMonths} months` : "-"),
  ]);
  return buildThinTableSection(
    "Experience",
    ["Role", "Company", "Duration"],
    rows,
    "experience-table"
  );
}

function buildInternshipSection(items) {
  const rows = items.map((item) => [
    escapeHTML(item.role || "-"),
    escapeHTML(item.company || "-"),
    escapeHTML(formatDate(item.startDate) || "-"),
    escapeHTML(item.isCurrent ? "Present" : formatDate(item.endDate) || "-"),
  ]);
  return buildThinTableSection(
    "Internships",
    ["Role", "Company", "Start", "End"],
    rows,
    "internship-table"
  );
}

function toggleInternCurrent(checkbox) {
  const entry = checkbox.closest(".intern-entry");
  if (!entry) {
    updatePreview();
    return;
  }

  const endDateInput = entry.querySelector(".intern-end");
  if (!endDateInput) {
    updatePreview();
    return;
  }

  if (checkbox.checked) {
    endDateInput.value = "";
    endDateInput.disabled = true;
  } else {
    endDateInput.disabled = false;
  }

  updatePreview();
}

function buildProjectSection(items) {
  const rows = items.map((item) => [
    escapeHTML(item.name || "-"),
    item.github ? buildLink(item.github) : "-",
    item.deploy ? buildLink(item.deploy) : "-",
  ]);
  return buildThinTableSection("Projects", ["Project Name", "GitHub", "Deploy"], rows, "project-table");
}

function buildSimpleListSection(title, items) {
  if (!items.length) return "";
  return `
    <section class="resume-section">
      <h3>${escapeHTML(title)}</h3>
      <ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
    </section>
  `;
}

function calculateATS(data) {
  let score = 0;
  const suggestions = [];

  const checks = [
    { ok: !!data.name, points: 8, message: "Add your full name." },
    { ok: !!data.title, points: 8, message: "Add a professional title." },
    { ok: !!data.email, points: 8, message: "Add a valid email." },
    { ok: !!data.phone, points: 8, message: "Add a phone number." },
    { ok: !!data.summary, points: 12, message: "Add a short profile summary." },
    { ok: data.education.length > 0, points: 10, message: "Add education details." },
    { ok: data.experience.length > 0, points: 14, message: "Add work experience details." },
    { ok: data.skills.length >= 4, points: 12, message: "Add at least four skills." },
    {
      ok: data.internships.length > 0 || data.achievements.length > 0,
      points: 8,
      message: "Add internships or achievements.",
    },
    { ok: data.projects.length > 0, points: 8, message: "Add at least one project with links." },
    {
      ok: data.linkedin || data.github || data.portfolio,
      points: 6,
      message: "Add LinkedIn/GitHub/Portfolio links.",
    },
  ];

  checks.forEach((rule) => {
    if (rule.ok) score += rule.points;
    else suggestions.push(rule.message);
  });

  return { score: Math.min(100, score), suggestions };
}

function updateATSPanel(result) {
  const scoreNode = document.getElementById("ats-score");
  const noteNode = document.getElementById("ats-note");
  scoreNode.textContent = result.score;

  if (result.score >= 85) {
    noteNode.textContent = "Excellent ATS quality. Keep format simple and targeted.";
  } else if (result.score >= 65) {
    noteNode.textContent = "Good draft. Add impact-focused lines to rank better.";
  } else {
    noteNode.textContent = "Needs more details. Complete missing sections.";
  }
}

function updateReviewMailLinks(suggestions) {
  const links = [document.getElementById("footer-review-mail-link")].filter(Boolean);

  const baseBody = "Hi Heeralal,%0A%0AI have suggestions for this resume builder.%0A";
  const detail =
    suggestions.length > 0
      ? `%0AATS points to improve:%0A- ${encodeURIComponent(suggestions.join("%0A- "))}`
      : "%0AThanks.";
  const href =
    "mailto:heeralalkumarheera@gmail.com?subject=Resume%20Suggestions&body=" + baseBody + detail;

  links.forEach((link) => {
    link.href = href;
  });
}

function getDefaultAvatar() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220"><rect width="220" height="220" fill="#e5f0f2"/><circle cx="110" cy="85" r="42" fill="#a7c0c9"/><rect x="46" y="142" width="128" height="56" rx="28" fill="#a7c0c9"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function updatePreview() {
  const name = document.querySelector('input[name="name"]').value.trim();
  const title = document.querySelector('input[name="title"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const location = document.querySelector('input[name="location"]').value.trim();
  const summary = document.querySelector('textarea[name="summary"]').value.trim();
  const github = document.querySelector('input[name="github"]').value.trim();
  const linkedin = document.querySelector('input[name="linkedin"]').value.trim();
  const portfolio = document.querySelector('input[name="portfolio"]').value.trim();

  const education = collectEducationEntries();
  const experience = collectExperienceEntries();
  const internships = collectInternshipEntries();
  const projects = collectProjectEntries();
  const achievements = listFromInputs(".achievement-input");
  const workshops = listFromInputs(".workshop-input");
  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const contactItems = [email, phone, location].filter(Boolean);
  const links = [
    linkedin ? `<span>LinkedIn: ${buildLink(linkedin)}</span>` : "",
    github ? `<span>GitHub: ${buildLink(github)}</span>` : "",
    portfolio ? `<span>Portfolio: ${buildLink(portfolio)}</span>` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contactLine = contactItems.length
    ? `<div class="contact-line">${contactItems
        .map((v) => `<span>${escapeHTML(v)}</span>`)
        .join("<span>|</span>")}</div>`
    : "";

  const linksLine = links ? `<div class="contact-line">${links}</div>` : "";

  const skillChips = skills.length
    ? `<section class="resume-section"><h3>Skills</h3><div class="chip-row">${skills
        .map((skill) => `<span class="chip">${escapeHTML(skill)}</span>`)
        .join("")}</div></section>`
    : "";

  const summarySection = summary
    ? `<section class="resume-section"><h3>Professional Summary</h3><p>${escapeHTML(
        summary
      )}</p></section>`
    : "";

  const avatar = profileImageData || getDefaultAvatar();

  document.getElementById("resume-preview").innerHTML = `
    <header class="resume-header">
      <div class="identity-block">
        <h2>${escapeHTML(name || " ")}</h2>
        ${title ? `<p class="role">${escapeHTML(title)}</p>` : ""}
        ${contactLine}
        ${linksLine}
      </div>
      <div class="avatar-wrap"><img src="${avatar}" alt="Profile Photo" /></div>
    </header>

    ${summarySection}
    ${buildEducationSection(education)}
    ${buildExperienceSection(experience)}
    ${buildInternshipSection(internships)}
    ${buildProjectSection(projects)}
    ${skillChips}
    ${buildSimpleListSection("Achievements", achievements)}
    ${buildSimpleListSection("Workshops", workshops)}
  `;

  const atsResult = calculateATS({
    name,
    title,
    email,
    phone,
    summary,
    education,
    experience,
    internships,
    projects,
    skills,
    achievements,
    linkedin,
    github,
    portfolio,
  });

  updateATSPanel(atsResult);
  updateReviewMailLinks(atsResult.suggestions);
  updateProgressBar();
}

function addEducation() {
  const section = document.getElementById("education-section");
  const addButton = section.querySelector("button");
  addButton.insertAdjacentHTML("beforebegin", createEducationEntry());
}

function addExperience() {
  const section = document.getElementById("experience-section");
  const addButton = section.querySelector("button");
  addButton.insertAdjacentHTML("beforebegin", createExperienceEntry());
}

function addInternship() {
  const section = document.getElementById("internship-section");
  const addButton = section.querySelector("button");
  addButton.insertAdjacentHTML("beforebegin", createInternshipEntry());
}

function addProject() {
  const section = document.getElementById("project-section");
  const addButton = section.querySelector("button");
  addButton.insertAdjacentHTML("beforebegin", createProjectEntry());
}

function addAchievement() {
  const section = document.getElementById("achievement-section");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "e.g. Won Hackathon 2025";
  input.className = "achievement-input";
  input.oninput = updatePreview;
  section.insertBefore(input, section.lastElementChild);
}

function addWorkshop() {
  const section = document.getElementById("workshop-section");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "e.g. AI Prompt Engineering Workshop";
  input.className = "workshop-input";
  input.oninput = updatePreview;
  section.insertBefore(input, section.lastElementChild);
}

function handleImageUpload(event) {
  const [file] = event.target.files || [];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    profileImageData = reader.result;
    updatePreview();
  };
  reader.readAsDataURL(file);
}

function keepOnlyFirst(selector) {
  const rows = Array.from(document.querySelectorAll(selector));
  rows.forEach((row, index) => {
    if (index > 0) {
      row.remove();
      return;
    }

    row.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox") input.checked = false;
      else input.value = "";
    });
  });
}

function clearForm() {
  document.getElementById("resume-form").reset();
  profileImageData = "";

  document.querySelectorAll(".achievement-input, .workshop-input").forEach((input) => input.remove());
  keepOnlyFirst(".edu-entry");
  keepOnlyFirst(".exp-entry");
  keepOnlyFirst(".intern-entry");
  keepOnlyFirst(".project-entry");

  updatePreview();
}

async function downloadPDF() {
  const element = document.getElementById("resume-preview");

  const exportHost = document.createElement("div");
  exportHost.style.position = "fixed";
  exportHost.style.left = "-10000px";
  exportHost.style.top = "0";
  exportHost.style.width = "794px";
  exportHost.style.background = "#ffffff";
  exportHost.style.padding = "0";
  exportHost.style.margin = "0";
  exportHost.style.zIndex = "-1";

  const clone = element.cloneNode(true);
  clone.style.boxShadow = "none";
  clone.style.border = "none";
  clone.style.borderRadius = "0";
  clone.style.animation = "none";
  clone.style.background = "#ffffff";

  exportHost.appendChild(clone);
  document.body.appendChild(exportHost);

  const options = {
    margin: [6, 6, 6, 6],
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.94 },
    html2canvas: {
      scale: 2.8,
      useCORS: true,
      backgroundColor: "#ffffff",
      removeContainer: true,
      logging: false,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait", compress: true },
    pagebreak: { mode: ["css", "legacy"] },
    enableLinks: true,
  };

  try {
    await html2pdf().set(options).from(clone).save();
  } finally {
    exportHost.remove();
  }
}

async function downloadWord() {
  const name = document.querySelector('input[name="name"]').value.trim();
  const title = document.querySelector('input[name="title"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const location = document.querySelector('input[name="location"]').value.trim();
  const summary = document.querySelector('textarea[name="summary"]').value.trim();
  const github = document.querySelector('input[name="github"]').value.trim();
  const linkedin = document.querySelector('input[name="linkedin"]').value.trim();
  const portfolio = document.querySelector('input[name="portfolio"]').value.trim();

  const education = collectEducationEntries();
  const experience = collectExperienceEntries();
  const internships = collectInternshipEntries();
  const projects = collectProjectEntries();
  const achievements = listFromInputs(".achievement-input");
  const workshops = listFromInputs(".workshop-input");
  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  try {
    if (!window.docx) {
      console.error("docx library not loaded");
      alert("Word export library is loading. Please try again in a moment.");
      return;
    }

    const { Document, Packer, Paragraph, HeadingLevel } = window.docx;

    const sections = [];

    if (name) {
      sections.push(
        new Paragraph({
          text: name,
          bold: true,
          size: 32,
          spacing: { after: 100 },
        })
      );
    }

    if (title) {
      sections.push(
        new Paragraph({
          text: title,
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
    }

    const contactInfo = [email, phone, location].filter(Boolean).join(" | ");
    if (contactInfo) {
      sections.push(
        new Paragraph({
          text: contactInfo,
          size: 22,
          spacing: { after: 100 },
        })
      );
    }

    const links = [
      linkedin ? `LinkedIn: ${linkedin}` : "",
      github ? `GitHub: ${github}` : "",
      portfolio ? `Portfolio: ${portfolio}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
    
    if (links) {
      sections.push(
        new Paragraph({
          text: links,
          bold: true,
          size: 22,
          spacing: { after: 200 },
        })
      );
    }

    if (summary) {
      sections.push(
        new Paragraph({
          text: "Professional Summary",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      sections.push(
        new Paragraph({
          text: summary,
          size: 22,
          spacing: { after: 200 },
        })
      );
    }

    if (education.length > 0) {
      sections.push(
        new Paragraph({
          text: "Education",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      education.forEach((edu) => {
        sections.push(
          new Paragraph({
            text: `${edu.degree} - ${edu.institute} (${edu.year})`,
            size: 22,
            spacing: { after: 50 },
          })
        );
      });
      sections.push(new Paragraph({ text: "", spacing: { after: 100 } }));
    }

    if (experience.length > 0) {
      sections.push(
        new Paragraph({
          text: "Experience",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      experience.forEach((exp) => {
        sections.push(
          new Paragraph({
            text: `${exp.role} at ${exp.company}`,
            bold: true,
            size: 22,
            spacing: { after: 50 },
          })
        );
        if (exp.durationMonths) {
          sections.push(
            new Paragraph({
              text: `${exp.durationMonths} months`,
              size: 22,
              spacing: { after: 50 },
            })
          );
        }
      });
      sections.push(new Paragraph({ text: "", spacing: { after: 100 } }));
    }

    if (internships.length > 0) {
      sections.push(
        new Paragraph({
          text: "Internships",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      internships.forEach((intern) => {
        sections.push(
          new Paragraph({
            text: `${intern.role} at ${intern.company}`,
            bold: true,
            size: 22,
            spacing: { after: 50 },
          })
        );
        const startDate = formatDate(intern.startDate);
        const endDate = intern.isCurrent ? "Present" : formatDate(intern.endDate);
        if (startDate || endDate) {
          sections.push(
            new Paragraph({
              text: `${startDate} - ${endDate}`,
              size: 22,
              spacing: { after: 50 },
            })
          );
        }
      });
      sections.push(new Paragraph({ text: "", spacing: { after: 100 } }));
    }

    if (projects.length > 0) {
      sections.push(
        new Paragraph({
          text: "Projects",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      projects.forEach((project) => {
        sections.push(
          new Paragraph({
            text: project.name,
            bold: true,
            size: 22,
            spacing: { after: 50 },
          })
        );
        if (project.github || project.deploy) {
          const links = [];
          if (project.github) links.push(`GitHub: ${project.github}`);
          if (project.deploy) links.push(`Deploy: ${project.deploy}`);
          sections.push(
            new Paragraph({
              text: links.join(" | "),
              size: 22,
              spacing: { after: 50 },
            })
          );
        }
      });
      sections.push(new Paragraph({ text: "", spacing: { after: 100 } }));
    }

    if (skills.length > 0) {
      sections.push(
        new Paragraph({
          text: "Skills",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      sections.push(
        new Paragraph({
          text: skills.join(", "),
          size: 22,
          spacing: { after: 200 },
        })
      );
    }

    if (achievements.length > 0) {
      sections.push(
        new Paragraph({
          text: "Achievements",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      achievements.forEach((achievement) => {
        sections.push(
          new Paragraph({
            text: `• ${achievement}`,
            size: 22,
            spacing: { after: 50 },
          })
        );
      });
      sections.push(new Paragraph({ text: "", spacing: { after: 100 } }));
    }

    if (workshops.length > 0) {
      sections.push(
        new Paragraph({
          text: "Workshops",
          bold: true,
          size: 28,
          spacing: { after: 100 },
        })
      );
      workshops.forEach((workshop) => {
        sections.push(
          new Paragraph({
            text: `• ${workshop}`,
            size: 22,
            spacing: { after: 50 },
          })
        );
      });
    }

    const doc = new Document({
      sections: [
        {
          children: sections,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating Word document:", error);
    alert("Error generating Word document. Please check browser console.");
  }
}

function updateProgressBar() {
  const fields = Array.from(
    document.querySelectorAll(
      '#resume-form input[type="text"], #resume-form input[type="email"], #resume-form input[type="url"], #resume-form input[type="number"], #resume-form input[type="date"], #resume-form textarea'
    )
  );

  const total = fields.length;
  const filled = fields.filter((field) => field.value.trim().length > 0).length;
  const percent = total ? Math.round((filled / total) * 100) : 0;

  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById("progress-value").textContent = `${percent}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  updatePreview();
});
