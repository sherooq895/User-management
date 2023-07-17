import axios from '../Axios/PrivateAxios'

export const createuser = (data) => axios.post("/createuser", data);

export const getusers = (data) => axios.get("/showuser");

export const deleteUser = (id) => axios.post("/deleteuser", { id });

export const editUser = (data) => axios.post("/editUser", data)

export const searchemail = (data) => axios.post("/searchemail", { data })

export const authentication = (data) => axios.get("/authentication")