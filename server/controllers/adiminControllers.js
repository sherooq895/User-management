const adminLog = require("../models/adminlogin");
const usercreation=require("../models/userSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const {
  genjwtToken
} = require("../helpers/jwtauthentication");


module.exports.login = async (req, res, next) => {
  try {
    adminLog.findOne({ email: req.body.email }).then(async(response) =>{
      if (response) {
        bcrypt.compare(req.body.password, response.password).then(async(result) => {
            if (!result) {
                passwordStatus = false;
                res.status(401).json({ message: "Invalid  password" });
            } else {
                passwordStatus = true;
             const accesstoken= await genjwtToken(response.email)
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


module.exports.authenticationJwt=async(req,res,next)=>{
  try{
    res.status(200).json({ status: true })
  }catch(err){
    console.log(err);
  }

}

module.exports.createuser=async(req,res,next)=>{
  try{
    const { name, email, phone, gender } = req.body
    if (name && email && phone && gender ) {
        const existEmail = await usercreation.findOne({ email: email })
        if (existEmail) {
            res.status(200).json({ msg: 'Email is already exist', err: true })
        } else {
            const userform = new usercreation({
                name,
                email,
                phone,
                gender,
            })
            userform.save()
            res.status(200).json({ err: false })
        }
    } else {
      res.json({ msg: 'Please fill the required fields', err: true })
  }
  }catch(err){
    console.log(err);
  }

}

module.exports.showusers=async(req,res,next)=>{
 try{
        let Userlist = await usercreation.find()
        res.status(200).json(Userlist)
    } catch (error) {
        res.json({error:true})
    }

}

module.exports.deleteuser=async(req,res,next)=>{
  try{
    let EmployeeList = await usercreation.deleteOne({_id: req.body.id})
    res.status(200).json(EmployeeList)
  }catch(error){
    res.json({error:true})
  }
}

module.exports.edituser=async(req,res,next)=>{
  try{
    const { name, email, phone, gender, _id } = req.body
    if (name && email && phone && gender ) {
        const currentUser= await usercreation.findOne({ _id: _id })
        if (currentUser.email != email ) {
            const existEmail = await usercreation.findOne({ email: email })
            if(existEmail){
                res.json({ msg: 'Email is already exist', err: true })
            }else{
              usercreation.findOneAndUpdate({_id:_id},{
                    $set:{
                        name,
                        email,
                        phone,
                        gender,
                    }
                }).then((response)=>{
                    res.json({edit:true})
                })

            }
        } else {
          usercreation.findOneAndUpdate({_id:_id},{
                $set:{
                    name,
                    phone,
                    gender,
                    email
                }
            }).then((response)=>{
                res.json({edit:true})
            })
        }

    } else {
        res.json({ msg: 'Please fill the required fields', err: true })
    }

  }catch(error){
    res.json({error:true})
  }
}

module.exports.searchuser = async (req, res) => {
  try {
      const data = await usercreation.find({ email: new RegExp(req?.body?.data, "i") })
      if (data.length !== 0) {
          res.json(data)
      } else {
          res.json([])
      }
  } catch (error) {
      console.log(error);
  }
}


