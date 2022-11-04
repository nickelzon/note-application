const { argv } = require("yargs");
const yargs = require("yargs");
// const fs = require("fs");
// const path = require("path");
const noteFunc = require("./utils");

// console.log(process.argv);

// console.log(yargs.argv);

//customize yargs
yargs.version("1.0.1");

//add command using yargs
yargs.command({
  command: "add",
  describe: "add notes",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    noteFunc.addNotes(argv.title, argv.body);
  },
});

//remove notes command using yargs
yargs.command({
  command: "delete",
  describe: "delete notes",
  builder: {
    title: {
      describe: "note title to delete",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    noteFunc.deleteNotes(argv.title);
  },
});

//list notes command using yargs
yargs.command({
  command: "list",
  describe: "list notes",
  handler: () => {
    noteFunc.getNotes();
  },
});

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "title of note you want to read",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    noteFunc.readNotes(argv.title);
  },
});

yargs.parse();
