const API_ROOT = `http://localhost:3000`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  };
};

const getCategories = () => {
    return fetch(`${API_ROOT}/categories/`, { headers: headers() }).then(res => 
        res.json()
    )
}

const login = data => {
  return fetch(`${API_ROOT}/api/v1/auth`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signUp = data => {
  console.log(data)
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getCurrentUser = () => {
  // console.log("getting current user", headers);
  return fetch(`${API_ROOT}/api/v1/current_user`, {
    headers: headers()
  }).then(res => {
    // console.log(res)
    return res.json();
  });
};

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  user: {
    signUp
  },
 categories: {
    getCategories 
  }
};