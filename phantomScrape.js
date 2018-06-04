const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  executionTimeout: 2147483647,
});

const url = process.argv[2];
if (!url) {
  console.error('No Url Passed');
  process.exit(1);
}
// console.log(url);

const scrape = async (url) => {
  await new Promise((res, rej) => nightmare
      .goto(url)
      .viewport(1000, 1000)
      .then(res)
      .catch(e => {
        console.error(e);
        rej(e);
        }));

  scrollHeight = await new Promise((res, rej) => nightmare
      .evaluate(() => Math.max(document.documentElement.clientHeight, window.innerHeight || 0))
      .then(height => {
        return res(height);
        }));

  let imgs = []

    for (let i = 0; i < 100; i ++) {
      await new Promise((res, rej) => nightmare
        .scrollTo(i * scrollHeight, 0)
        .wait(200 * (2-Math.random()))
        .evaluate(() => {
          let doc = Array.from(document.querySelectorAll('img'));
          return doc.reduce((acc, n) => {
            if (n.srcset) return acc.concat(n.src, n.srcset);
            return acc.concat(n.src);
          }, []);
        })
        .then(srcs => {
          imgs = imgs.concat(srcs);
          res();
        }));
    }

  nightmare
    .end()
    .then(i => {
      imgs = [...new Set(imgs)].sort();
      console.log(imgs.join('\n'));
    })
    .catch(e => {
      console.error(e);
    });
};

scrape(url);
