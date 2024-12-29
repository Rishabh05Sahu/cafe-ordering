const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    try{
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email })
   
    if(!admin){
        return res.status(404).json({
            success: false,
            message: 'Admin not found'
        })
    }
   
    if (admin.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid password'
        });
    }

    //generating token for admin
    const token = jwt.sign({
        id: admin._id,
        role: 'admin'
    },'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({
        success: true,
        message: 'login succesful',
        token
    })
}catch(error){
console.error(error);
res.status(500).json({
    success: false,
    message: "Internal server error"
})
}

}