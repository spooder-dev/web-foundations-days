// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// 1. Search notes by word
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter((note) =>
    note.text.toLowerCase().includes(searchWord)
  );
}


// 2. Find longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}


// 3. Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}


// 4. Create summary
function getSummary() {
  const counts = countByCategory();

  const total = notes.length;

  const word = total === 1 ? "note" : "notes";

  return `${total} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}


// 5. Check duplicates
function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === cleanedText
  );
}


// 6. Add a new note
function addNote(text, category) {

  const cleanedText = text.trim();

  const validCategories = [
    "personal",
    "work",
    "study"
  ];


  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("❌ Note rejected: text must be 1-200 characters.");
    return false;
  }


  if (isDuplicate(cleanedText)) {
    console.log("❌ Note rejected: duplicate note.");
    return false;
  }


  if (!validCategories.includes(category)) {
    console.log("❌ Note rejected: invalid category.");
    return false;
  }


  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category
  };


  notes.push(newNote);

  console.log(`✅ Added note: "${cleanedText}"`);

  return true;
}



// =======================
// TESTING
// =======================


// searchNotes

console.log(
  searchNotes("day"),
  // Expected: [{ id:2, text:"Finish the Day 3 assignment", category:"study"}]
);

console.log(
  searchNotes("pizza"),
  // Expected: []
);



// longestNote

console.log(
  longestNote(),
  // Expected: { id:3, text:"Email the project report to Grace", category:"work"}
);



// countByCategory

console.log(
  countByCategory(),
  // Expected: { personal:2, study:2, work:1 }
);



// getSummary

console.log(
  getSummary(),
  // Expected: "5 notes: 2 personal, 1 work, 2 study."
);



// isDuplicate

console.log(
  isDuplicate(" call mum "),
  // Expected: true
);

console.log(
  isDuplicate("Go shopping"),
  // Expected: false
);



// addNote

console.log(
  addNote("Learn JavaScript objects", "study"),
  // Expected: true
);

console.log(
  addNote("Call mum", "personal"),
  // Expected: false because duplicate
);

console.log(
  addNote("", "work"),
  // Expected: false because empty text
);


console.log(notes);