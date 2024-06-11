import axios from "axios";

export default axios.create({
    baseURL: "http://ec2-16-171-40-45.eu-north-1.compute.amazonaws.com:8080/",
    // headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}
});