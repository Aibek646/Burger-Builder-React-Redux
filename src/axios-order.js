import axios from "axios";

const instance = axios.create({
  baseURL: "https://practice-burger2020.firebaseio.com/",
});

export default instance;
