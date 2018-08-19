class AsyncModel {
  constructor(promise, callback) {
    this.isCancelled = false;
    promise
      .then(data => {
        if (!this.isCancelled) {
          callback(null, data);
        }
      })
      .catch(error => {
        if (!this.isCancelled) {
          callback(error, null);
        }
      });
  }

  destroy() {
    this.isCancelled = true;
  }
}

export default AsyncModel;
