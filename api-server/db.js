let words;

exports.words = () => {
  if (!words) {
    const hashedWords = {};

    data.forEach(item => {
      cacheWords(item.title, hashedWords);
      cacheWords(item.filename, hashedWords);
      cacheWords(item.content, hashedWords);
      cacheWords(item.macAddress, hashedWords);
      cacheWords(item.computerName, hashedWords);
    });

    words = Object.keys(hashedWords);
  }

  return words;
};

exports.search = query => {
  query = query.toLowerCase();
  const result = [];

  data.forEach(item => {
    if (
      item.title.toLowerCase().includes(query) ||
      item.filename.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.macAddress.toLowerCase().includes(query) ||
      item.computerName.toLowerCase().includes(query)
    ) {
      result.push(item);
    }
  });

  return result;
};

function cacheWords(string, hash) {
  const words = string.toLowerCase().split(' ');
  words.forEach(word => {
    // remove punctuations
    word = word
      .replace('.', '')
      .replace('!', '')
      .replace('?', '')
      .replace(':', '')
      .replace('\n', '');

    if (word) {
      hash[word] = true;
    }
  });
}

const data = [
  {
    title: 'Secret File',
    filename: '/usr/local/docs/somethingsecret.txt',
    content: `
      This should be some super secret information. Not sure why you can see it!
    `,
    lastModifiedDate: 633081600000,
    creationDate: 633081600000,
    macAddress: '12:343:235:423',
    computerName: 'Chris Macbook'
  },
  {
    title: 'Pieces of Her',
    filename: '/usr/local/docs/proto.txt',
    content: `
  The slice method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
  `,
    lastModifiedDate: 879321600000,
    creationDate: 633081600000,
    macAddress: '432:303:285:493',
    computerName: 'Matt Macbook'
  },
  {
    title: 'Evening conversations',
    filename: '/usr/stuff/proto.txt',
    content: `
    Discover the best bookstore online—shop over six million books and 4.5 million eBooks. Enjoy free shipping on orders of $25 or more. ss.
  `,
    lastModifiedDate: 879321600000,
    creationDate: 633081600000,
    macAddress: '122:348:285:492',
    computerName: 'Karla PC'
  },
  {
    title: 'Elevator music',
    filename: '/usr/bin/script.js',
    content: `
    export function autocomplete(query) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const results = Array(10)
            .fill(null)
            .map(() => randomItem());
          resolve(results);
        }, 300);
      });
    }
    `,
    lastModifiedDate: 1135555200000,
    creationDate: 1265846400000,
    macAddress: '122:348:285:492',
    computerName: 'Karla PC'
  },
  {
    title: 'Random stuff',
    filename: '/usr/bin/virus.script',
    content: `
    They were picked randomly out of 5,836 possible dates between 1996-08-19 and 2018-12-31. Do you own an iOS or Android device? Check out our app! Follow us: Twitter Facebook  Google+ Terms and Conditions About Us`,
    lastModifiedDate: 1377043200000,
    creationDate: 1422489600000,
    macAddress: '124:358:788:395',
    computerName: 'Jen Macbook'
  }
];
