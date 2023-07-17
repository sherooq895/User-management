import axios from '../Axios/PublicAxios'

export const LoginData = (data) => axios.post("/login", data);