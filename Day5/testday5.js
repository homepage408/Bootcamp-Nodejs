// Soal Nomor 1
class Fetcher {
  Get = (url) => {
    return new Promise((resolve, reject) => {
      const result = axios.get(url);
      // console.log(result);
      resolve(result);
    });
  };

  Delete = (url) => {
    return new Promise((resolve, reject) => {
      const result = axios.delete(url);
      resolve(result);
    });
  };

  Post = (url, data) => {
    return new Promise((resolve, reject) => {
      const result = axios.post(url, data, {
        headers: {
          "content-type": "application/json",
          name: "Teguh Setiawan",
        },
      });
      resolve(result);
    });
  };

  Put = (url, data) => {
    return new Promise((resolve, reject) => {
      const result = axios.put(url, data, {
        headers: {
          "content-type": "application/json",
          name: "Teguh Setiawan",
        },
      });
      resolve(result);
    });
  };

  Patch = (url, data) => {
    return new Promise((resolve, reject) => {
      const result = axios.patch(url, data, {
        headers: {
          "content-type": "application/json",
          name: "Teguh Setiawan",
        },
      });
      resolve(result);
    });
  };
}

const Fetcher1 = new Fetcher();

const jsonData = {
  id: 30,
  name: "Someone",
};

const caller = async (data) => {
  const getJsonResponse = await Fetcher1.Get("https://httpbin.org/get");
  const deleteJsonResponse = await Fetcher1.Delete(
    "https://httpbin.org/delete"
  );
  const postJsonResponse = await Fetcher1.Post(
    "https://httpbin.org/post",
    data
  );
  const putJsonResponse = await Fetcher1.Put("https://httpbin.org/put", data);
  const patchJsonResponse = await Fetcher1.Patch(
    "https://httpbin.org/patch",
    data
  );

  return (
    getJsonResponse,
    deleteJsonResponse,
    postJsonResponse,
    putJsonResponse,
    patchJsonResponse
  );
};

caller(jsonData).then((res) => console.log(res.data));
// =========================================================================================
// Soal Nomor 2
const combine = async () => {
  const urlPosts = `https://jsonplaceholder.typicode.com/posts`;
  const urlUsers = `https://jsonplaceholder.typicode.com/users`;
  const posts = (await axios.get(urlPosts)).data;
  const users = (await axios.get(urlUsers)).data;
  const result = posts.map((post) => {
    post.user = users.find((user) => user.id === post.userId);
    return post;
  });
  // console.log(result)
  return result;
};

combine().then((res) => console.log(res));

// =========================================================================================

const puppeteer = require('puppeteer')

scrapeBerita = async (url)=>{
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('//*[@id="general-container"]/div[3]/div[1]/div[4]/div[3]/div[2]/h3/a')
    const title = await el.getProperty('textContent')
    const titleStr = await title.jsonValue()

    console.log({titleStr})

    browser.close()

}

scrapeBerita(`https://www.kompas.com/`)
// Nomor 3 Scraping belum bisa diselesaikan
// Nomor 4 themoviedb dengan API belum dikerjakan
// =========================================================================================

const getPostTitle = async ()=>{
    const urlPostTitle = `https://jsonplaceholder.typicode.com/posts`
    const postTitle = (await axios.get(urlPostTitle)).data
    const result = postTitle.map((title)=>{
        // console.log(title.title)
        // const res = `title:${title.title}`
        return `title : ${title.title}`
    })
    return result
}

getPostTitle().then((res)=> console.log(res))

// =========================================================================================


const getDataCategory = async ()=>{
    const urlCategory = `https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json`
    const dataCategory = (await axios.get(urlCategory)).data
    // console.log(category)
    const result = dataCategory.filter((category)=>{
        // console.log(category.category)
        return category.category == 'fruits'
    })
    return result
}
getDataCategory().then((res)=>{
    console.log(res)
})

