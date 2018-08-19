const autoCompleteList = [
  'Insurance policy',
  'marketing',
  'policy',
  'email',
  'fraud',
  'felony',
  'hearing',
  'lawyer'
];
function randomItem() {
  const randomIndex = Math.floor(Math.random() * autoCompleteList.length);
  return autoCompleteList[randomIndex];
}

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
