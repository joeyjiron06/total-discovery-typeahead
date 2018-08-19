export default function cancellable(promise, callback) {
  let cancelled = false;

  promise
    .then(data => {
      if (!cancelled) {
        callback(null, data);
      }
    })
    .catch(error => {
      if (!cancelled) {
        callback(error, null);
      }
    });

  return () => {
    cancelled = true;
  };
}
