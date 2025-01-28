const Tabel = require('../models/Tabel');
const QRCode = require('qrcode');

exports.generateTabelLinks = async (req, res) => {
    const { numberOfTables } = req.body;

    if (!numberOfTables || numberOfTables <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Number of tables should be greater than 0',
        });
    }

    try {
        const baseUrl = "http://localhost:5174/seat-no";
        const generatedTabels = [];

        // Find the maximum seat number already present in the database
        const lastTabel = await Tabel.findOne().sort({ seatNo: -1 }); // Sort in descending order and get the first entry
        const startSeatNo = lastTabel ? lastTabel.seatNo + 1 : 1; // If no seats exist, start from 1

        for (let i = 0; i < numberOfTables; i++) {
            const seatNo = startSeatNo + i; // Increment seat number
            const qrLink = `${baseUrl}/${seatNo}`;

            const qrCode = await QRCode.toDataURL(qrLink);

            const newTabel = new Tabel({
                seatNo,
                qrLink,
            });
            await newTabel.save();

            generatedTabels.push({ seatNo, qrLink, qrCode });
        }

        return res.status(201).json({
            success: true,
            message: 'Seat numbers and QR links generated successfully',
            tables: generatedTabels,
        });
    } catch (error) {
        console.error("Error generating table links:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

