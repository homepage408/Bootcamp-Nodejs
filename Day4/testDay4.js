const fs = require("fs");
const axios = require("axios");

// path "/" atau process.cwd()
const readDir = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, result) => {
      if (true) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

readDir()
  .then((res) => {
    console.log(res);
    console.log("=================================================");
  })
  .catch((err) => console.log(err));

const getData = () => {
  axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
    let dataPosts = res.data;
    // console.log(dataPosts.name);
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      let dataUsers = res.data;
      // console.log(dataPosts);
      let dataMerge = dataPosts.map((e, i) => {
        let temp = dataUsers.find((element) => element.id === e.userId);
        if (temp) {
          e.user = temp;
        }
        return e;
      });
      console.log(dataMerge);
      console.log("=================================================");
    });
  });
};

getData();

// const looping = () => {
//   return new Promise((resolve) => {
//     for (let i = 1; i <= 3; i++) {
//       (function (params) {
//         setTimeout(() => {
//           resolve(i);
//           // console.log(i);
//         }, 1000);
//       })(i);
//     }

//     // console.log("Done");
//   });
// };

// looping().then((res) => {
//   console.log(res);
//   console.log("Done");
// });

const looping = () => {
  return new Promise((resolve, reject) => {
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        // resolve(i)
        console.log(i);
      }, 1000);
    }
  });
};

const stringDone = () => {
  return new Promise((resolve, reject) => {
    console.log("Done");
  });
};

const caller = async () => {
  const result1 = await looping();
  const result2 = await stringDone();
  return result1, result2;
};

caller().then((res) => {
  console.log(res);
});

// (async () => {
//   await looping().then((res) => {
//     console.log(res);
//     console.log("Done");
//   });
// })();


const getDataSalary = () => {
  axios.get("https://mul14.github.io/data/employees.json").then((res) => {
    let dataSalary = res.data
    // console.log(data[1].salary)
    let salary = dataSalary.filter((e) => {
      return e.salary > 15000000
    })
    console.log(salary)
  })
}

getDataSalary()


const getDataCity = () => {
  axios.get("https://mul14.github.io/data/employees.json").then((res) => {
    let dataCity = res.data
    // console.log(dataCity[0].addresses[0].city)
    let city = dataCity.filter((e) => {
      return e.addresses[0].city === "DKI Jakarta"
    })
    console.log(city)
  })
}

getDataCity()

// const getBirthdayLimit = () => {
//   const d = new Date();
//   const year = d.getFullYear();
//   const month = 10
//   const day = d.getDate();
//   return new Date(2019, month - 1);
// };

// console.log(getBirthdayLimit())


const getDataBirthday = () => {
  axios.get("https://mul14.github.io/data/employees.json").then((res) => {
    let dataBirthday = res.data
    // console.log(dataBirthday[0].birthday)
    let birthday = dataBirthday.filter((e) => {
      return e.birthday.charAt(6) == '3'
    })
    console.log(birthday)
  })
}

getDataBirthday()

const getDataDepartement = () => {
  axios.get("https://mul14.github.io/data/employees.json").then((res) => {
    let dataDepartement = res.data
    // console.log(dataBirthday[0].birthday)
    let departement = dataDepartement.filter((e) => {
      return e.department.name == 'Research and development'
    })
    console.log(departement)
  })
}

getDataDepartement()


const getDataAbsences = () => {
  axios.get("https://mul14.github.io/data/employees.json").then((res) => {
    let dataAbsences = res.data
    // console.log(dataBirthday[0].birthday)
    let count = 0
    for (let i = 0; i < dataAbsences.length; i++) {
      for (let j = 0; j < dataAbsences[i].presence_list.length; j++) {
        if (dataAbsences[i].presence_list[j].substring(5, 7) == '10') {
          count += 1
        }
      }
      console.log(`${dataAbsences[i].first_name} ${dataAbsences[i].last_name}, Hadir Sebanyak = ${count}`)
    }
  })
}


  getDataAbsences()