import axios from "axios";

export default axios.create({
    baseURL: "http://ec2-13-51-121-61.eu-north-1.compute.amazonaws.com:8080/",
    // headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}
});