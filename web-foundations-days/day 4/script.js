const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

function updateCounts() {

  const text = noteText.value;

  const chars = text.length;

  const words = text.trim() === ""
    ? 0
    : text.trim().split(/\s+/).length;

  charCount.textContent = `${chars} / 200 characters`;

  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");

  if (chars > 200) {
    charCount.classList.add("over");
  } else if (chars > 180) {
    charCount.classList.add("warning");
  }
}

function clearEverything() {

  noteText.value = "";

  localStorage.removeItem("draft");

  updateCounts();
}

noteText.addEventListener("input", () => {

  updateCounts();

  localStorage.setItem("draft", noteText.value);

});

clearBtn.addEventListener("click", clearEverything);

noteText.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    clearEverything();

  }

});

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {

    themeToggle.textContent = "Light mode";

    localStorage.setItem("theme", "dark");

  } else {

    themeToggle.textContent = "Dark mode";

    localStorage.setItem("theme", "light");

  }

});

const savedDraft = localStorage.getItem("draft");

if (savedDraft) {

  noteText.value = savedDraft;

}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

  document.body.classList.add("dark");

  themeToggle.textContent = "Light mode";

}

updateCounts();