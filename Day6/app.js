#!/usr/bin/env node

const { program } = require("@caporal/core");
const {
  readJson,
  writeJson,
  updateJson,
  deleteJson,
  clearJson,
  completedJson,
  unCompletedJson
} = require("./functions");
let readlineSync = require("readline-sync");
// const readJson = readJson
// const writeJson = writeJson

// program.action(({ logger }) => {
//   logger.info("Hello, world!")
// })

// soft delete / hard delete

program.command("list", "Menampikan data JSON").action(({ logger }) => {
  readJson("todo.json");
});

program
  .command("add", "Menambahkan list data Todo")
  .argument("<text>", "Text yang akan di masukan")
  .action(({ logger, args }) => {
    writeJson("todo.json", args.text);
    // console.log(args.text);
  });

program
  .command("update", "Untuk Melakukan update terhadap data")
  .argument("<id>", "Id untuk melakukan perubahan")
  .argument("<text>", "Data yang akan menggantikan")
  .action(({ logger, args }) => {
    updateJson("todo.json", args.id, args.text);
  });

program
  .command("delete", "Delete berdasarkan ID")
  .argument("<id>", "ID Delete")
  .action(({ logger, args }) => {
    deleteJson("todo.json", args.id);
  });

  program
  .command("done", "Delete berdasarkan ID")
  .argument("<id>", "ID Done")
  .action(({ logger, args }) => {
    completedJson("todo.json", args.id);
  });

  program
  .command("undone", "Delete berdasarkan ID")
  .argument("<id>", "ID undone")
  .action(({ logger, args }) => {
    unCompletedJson("todo.json", args.id);
  });

program.command("clear", "Delete berdasarkan ID").action(({ logger }) => {
  var inputan = readlineSync.question("Are you sure want to delete? [y/N : ");
  if (
    inputan == "y" ||
    inputan == "Y" ||
    inputan == "Yes" ||
    inputan == "yes"
  ) {
    // console.log("Inputan Yess");
    clearJson('todo.json')
    console.log('Data Berhasil di hapus')
  } else if (
    inputan == "n" ||
    inputan == "N" ||
    inputan == "No" ||
    inputan == "NO"
  ) {
    console.log("Oke data tidak di hapus");
  } else {
    console.log("Inputan tidak sesuai");
  }
});

program.run();
