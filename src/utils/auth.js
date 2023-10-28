import axios from "axios";

const auth = axios.create({
    baseURL: "http://instagram-express-app.vercel.app/api/auth"
})

export default auth