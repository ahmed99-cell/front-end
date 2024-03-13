import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nom, prenom, username, matricule, email, password) {
    return axios.post(API_URL + "signup", {
      nom,
      prenom,
      username,
      matricule,
      email,
      password,
      
    })
    .then(response => {
      console.log("Server response:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error during registration:", error);
      throw error;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
