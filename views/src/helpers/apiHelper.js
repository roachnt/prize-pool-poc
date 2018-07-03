export const getTokenFromLogin = data =>
  fetch("/api/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => json.token);

export const getTokenFromRegister = data =>
  fetch("/api/register", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => json.token);

export const getUserFromToken = token =>
  fetch("/api/me", {
    method: "GET",
    headers: { "x-access-token": token }
  }).then(res => res.json());
