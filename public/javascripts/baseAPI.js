function BaseAPI() {
  this.URL = "https://62ac33ce9fa81d00a7abec9f.mockapi.io/api/v1/";

  this.get = function (endPoint) {
    return fetch(`${this.URL}/${endPoint}`);
  };
  this.post = function (endPoint, dataPost) {
    return fetch(`${this.URL}/${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
  };
  this.delete = function (endPoint) {
    return fetch(`${this.URL}/${endPoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  this.update = (endPoint, id, dataPost) => {
    return fetch(`${this.URL}/${endPoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
  };
}
