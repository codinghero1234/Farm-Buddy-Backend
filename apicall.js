import axios from "axios";
const url = "https://farm-buddy-backend.onrender.com/api/v1/auth/test";

const apiCall = async() => {
    axios.get(url)
    .then(() => {
        console.log("API called");
        setTimeout(apiCall, 1000*60*10);
    })
    .catch((error) => {
        console.log(error.message);
        setTimeout(apiCall, 1000*60*10);
    });
}

export default apiCall;