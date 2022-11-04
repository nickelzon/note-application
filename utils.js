const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgGreen.bold(`Total notes: ${notes.length}`));
  notes.map((note) => {
    console.log(`Title: ${chalk.bgYellow.bold(note.title)}`);
    console.log(`Body: ${note.body}`);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const read = notes.find((note) => note.title === title);
  if (!read) {
    console.log(chalk.bgRed.bold(`There is no note with title: "${title}"`));
  } else {
    console.log(chalk.bgYellow.bold(`Title: ${read.title}`));
    console.log(read.body);
  }
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.find((note) => note.title === title);

  //little validation to filter some duplicates. This is a great tool.
  if (!duplicate) {
    notes.push({ title: title, body: body }); //the strings from argv that we passed as parameter gets push to our function loadNotes() which reads our file notes.json.
    saveNotes(notes);
    console.log(chalk.bgGreen.bold("Added some notes."));
  } else {
    console.log(chalk.bgRed.bold("Title already exist."));
  }
};

const deleteNotes = (title) => {
  const notes = loadNotes();
  const toRemain = notes.filter((note) => note.title !== title); //as we pass our argv as a parameter, we filter out the items in our array that is not equal to the title we passed as a parameter, to save it in our variable toRemain.

  if (toRemain.length === notes.length) {
    console.log(chalk.bgYellow.bold("No notes removed"));
  } else {
    saveNotes(toRemain);
    console.log(chalk.bgRed.bold("Note with title " + title + " deleted."));
  }
};

//callbacks
const loadNotes = () => {
  try {
    const data = fs.readFileSync("notes.json").toString(); //a method on how to read a file, and use it to store real-world data
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const json = JSON.stringify(notes);
  fs.writeFile("notes.json", json, (err) => {
    if (err) throw err;
  });
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  deleteNotes: deleteNotes,
  readNotes: readNotes,
};
