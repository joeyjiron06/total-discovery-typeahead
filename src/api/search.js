function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function delay(delay, data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

export function autocomplete(query) {
  return fetch(
    `http://localhost:8080/autocomplete?query=${encodeURIComponent(query)}`
  ).then(res => res.json());
  // .then(data => {
  //   const randomDelay = getRandomArbitrary(250, 3000);
  //   return delay(randomDelay, data);
  // });
}

export function search(query) {
  return fetch(
    `http://localhost:8080/search?query=${encodeURIComponent(query)}`
  ).then(res => res.json());
}
