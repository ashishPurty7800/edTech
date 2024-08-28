const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
    try{
        const {gender, dateOfBirth, about, contactNumber} = req.body;
        const profile = new Profile({
            gender, dateOfBirth, about, contactNumber,
        });

        const savedProfile = await profile.save();

        res.json({
            profile: savedProfile,
        });

    }
    catch(error){
        return res.status(400).json({
            error: "Error while creating Profile",
        })
    }
};