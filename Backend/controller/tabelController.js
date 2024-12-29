const Tabel = require('../models/Tabel');
const QRCode = require('qrcode');

exports.generateTabelLinks = async(req,res)=>{
    const {numberOfTables} = req.body;
    
    if(!numberOfTables || numberOfTables<=0){
        return res.status(400).json({
            success: false,
            message: 'Number of tabel should be greater than 0'
        });
    }

    try {
        const baseUrl = "http://yourwebsite.com/order";
        const generatedTabels = [];

        for(let i = 1; i<=numberOfTables; i++){
            const qrLink = `${baseUrl}?seatNo=${i}`;
           
            const qrCode = await QRCode.toDataURL(qrLink); 

            const newTabel = new Tabel({
                seatNo: i,
                qrLink
            })
            await newTabel.save();
            generatedTabels.push({seatNo: i , qrLink, qrCode});
        }
        return res.status(201).json({
            success: true,
            message: ' Seat no. and qrLink generated successfully',
            tables:generatedTabels
        })
    } catch (error)  {
        console.error("Error generating table links:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}