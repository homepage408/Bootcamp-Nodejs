const { EPROTONOSUPPORT } = require("constants");
const fs = require("fs");
const { resourceUsage } = require("process");

function dataJson(dir) {
  let rawdata = fs.readFileSync(
    dir,
    (err = {
      if(err) {
        console.log(`${err}`);
      },
    })
  );
  let data = JSON.parse(rawdata);
  return data;
}

function readJson(dir) {
  let rawdata = fs.readFileSync(
    dir,
    (err = {
      if(err) {
        console.log("gagal");
      },
    })
  );
  let data = JSON.parse(rawdata);
  data.map((e) => {
    if (e.status == true && e.delete == false) {
      const done = 'Done'
      // return `${e.id}. ${e.todo} (${done})`;
      console.log(`${e.id}. ${e.todo} (${done})`)
    } else if (e.delete != true){
      // return `${e.id}. ${e.todo} `;
      console.log(`${e.id}. ${e.todo} `)
    }
  });
}

function writeJson(dir, obj) {
  let rawdata = fs.readFileSync(
    dir,
    (err = {
      if(err) {
        console.log(`${err}`);
      },
    })
  );
  let data = JSON.parse(rawdata);
  let input = {
    id: data.length + 1,
    todo: obj,
    status: false,
    delete: false,
  };
  data.push(input);
  let dataa = JSON.stringify(data, null, 2);
  fs.writeFileSync("./todo.json", dataa, (err) => {
    if (err) {
      console.log("gagal");
    } else {
      console.log("Berhasil Menambahkan data");
    }
  });
}

function updateJson(dir, id, obj) {
  let data = dataJson(dir);
  let dataMap = data.map((e) => {
    if (e.id == id) {
      e.todo = obj;
      return e;
    } else {
      return e;
    }
  });
  // console.log(dataMap)
  let dataa = JSON.stringify(dataMap, null, 2);
  fs.writeFileSync("./todo.json", dataa, (err) => {
    if (err) {
      console.log("gagal");
    } else {
      console.log("Berhasil Menambahkan data");
    }
  });
}

function deleteJson(dir, id) {
  let data = dataJson(dir);
  let dataMap = data.map((e) => {
    if (e.id === id) {
      e.delete = true;
      return e;
    } else {
      return e;
    }
  });
  let dataa = JSON.stringify(dataMap, null, 2);
  fs.writeFileSync("./todo.json", dataa, (err) => {
    if (err) {
      console.log("gagal");
    } else {
      console.log("Berhasil Menambahkan data");
    }
  });
}

function clearJson(dir) {
  let data = dataJson(dir);
  // console.log(data);
  let dataKosong = data.splice(0, data.lenght);
  // console.log(dataKosong)
  let dataa = JSON.stringify(dataKosong, null, 2);
  fs.writeFileSync("./todo.json", dataa, (err) => {
    if (err) {
      console.log("gagal");
    } else {
      console.log("Berhasil Menambahkan data");
    }
  });
}

function completedJson(dir, id) {
  let data = dataJson(dir);
  let dataMap = data.map((e) => {
    if (e.id == id) {
      e.status = true;
      return e;
    } else {
        return e
    }
  });
  let dataa = JSON.stringify(dataMap, null, 2);
  fs.writeFileSync("./todo.json", dataa, (err) => {
    if (err) {
      console.log("gagal");
    } else {
      console.log("Berhasil Menambahkan data");
    }
  });
//   console.log(dataMap);
}

function unCompletedJson(dir, id) {
    let data = dataJson(dir);
    let dataMap = data.map((e) => {
      if (e.id == id) {
        e.status = false;
        return e;
      } else {
          return e
      }
    });
    let dataa = JSON.stringify(dataMap, null, 2);
    fs.writeFileSync("./todo.json", dataa, (err) => {
      if (err) {
        console.log("gagal");
      } else {
        console.log("Berhasil Menambahkan data");
      }
    });
  //   console.log(dataMap);
  }
  
module.exports = {
  readJson,
  writeJson,
  updateJson,
  deleteJson,
  clearJson,
  completedJson,
  unCompletedJson
};
