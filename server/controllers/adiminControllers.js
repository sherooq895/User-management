const adminLog = require("../models/adminlogin");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const {
  genjwtToken
} = require("../helpers/jwtauthentication");

module.exports.login = async (req, res, next) => {
  try {console.log('eeeeee');
    adminLog.findOne({ email: req.body.email }).then(async(response) =>{
      console.log(response,"response");
      if (response) {
        console.log(response,"response");
        bcrypt.compare(req.body.password, response.password).then(async(result) => {
            if (!result) {
              console.log('thetttt');
                passwordStatus = false;
                res.status(401).json({ message: "Invalid  password" });
            } else {
              console.log('sheriiiii');
                passwordStatus = true;
                console.log(response,"emaillll");
                console.log(result,"emaillllccccc");
             const accesstoken= await genjwtToken(response.email)
                console.log(accesstoken,"accesstokeennnnnn");
                res.status(200).json({ auth: true, adminToken: accesstoken, passwordStatus ,message :"successfully login" })
            }
        })}else{
          res.status(401).json({ message: "Invalid email and password" });
        }
        // const passwordhash= await bcrypt.hash(req.body.password, 10)
        // const info = {
        //   email: req.body.email,
        //   password:passwordhash,
        // };
        // adminLog.create(info).then(()=>{
        //   console.log('kkskssskskskks');
        // })
    })
  } catch (error) {
    res.status(500).json(error.message);
  }
};
