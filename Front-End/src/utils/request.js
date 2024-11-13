const API_DOMAIN = "http://localhost:8080/api/v1/";
export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
}

export const post = async (path, data) => {
  const response = await fetch(API_DOMAIN + path,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const result = await response.json();
  return result;
}

export const del = async (path) => {
  fetch(API_DOMAIN + path,{
    method: "DELETE",
  })
}

export const del1 = async (path, data) => {
  fetch(API_DOMAIN + path,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const patch = async (path, data) => {
  fetch(API_DOMAIN + path,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const put = async (path, data) => {
  fetch(API_DOMAIN + path,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}