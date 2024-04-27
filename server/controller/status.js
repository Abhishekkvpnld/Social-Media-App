
import User from "../models/user.js";
import Status from "../models/status.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";



export const userStatus = async (req, res) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    try {

        const userId = req.params.userId;
        const fileName = req.file.filename;


        if (!fileName)
            return res.status(400)
                .json({ message: "Please Select Image" });


        const user = await User.findById(userId, "firstName"); // fetching user details

        if (!user)
            return res.status(404)
                .json({ message: "User Not Found" });


        const prevStatus = await Status.findOne({ userId });

        // If previous status exists, delete its image file
        if (prevStatus) {
            const prevFileName = prevStatus.statusImg;
            const prevImagePath = `${__dirname}/public/status/${prevFileName}`;

            // Check if the file exists before attempting to delete
            if (fs.existsSync(prevImagePath)) {
                fs.unlinkSync(prevImagePath);
            }

            // Find and delete the previous status document for the same userId
            await Status.findOneAndDelete({ userId });
        };


        const imageURL = `${req.protocol}://${req.get('host')}/status/${req.file.filename}`;

        const messageForDB = {
            statusImg: fileName,
            userId: userId,
            username: user.firstName,
            imageURL
        };

        const status = await Status.create(messageForDB);

        res.status(200).json({
            success: true,
            status,
            message: "Status Added Successfully..."
        });


    } catch (err) {
        console.error('Error updating user status:', err);
        res.status(500)
            .json({ message: 'Internal server error' });
    };
};

export const getUserStatus = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Use findById to find status by user ID
        const status = await Status.find({ userId }).sort({ createdAt: -1 }).limit(1);

        if (!status) {
            return res.status(404).json({ message: "Add Status" });
        }

        // Send status data if found
        res.status(200).json(status[0]);
    } catch (err) {
        // Handle errors
        console.error('Error fetching user status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteStatus = async (req, res) => {
    const userId = req.params.userId;

    try {
        await Status.findOneAndDelete({ userId });
        // Send status data if found
        res.status(200).json({ message: "Status Deleted..." });
    } catch (err) {
        // Handle errors
        console.error('Error fetching user status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const firendStatus = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = await User.findById(userId)
        const fetchFriendData = await Promise.all(userData?.friends?.map(async (friend) => {
            if (friend) {
                const fetchData = await Status.find({userId:friend});
                return fetchData;
            }
        }));
        const friendStatusData = fetchFriendData.reduce((acc, curr) => acc.concat(curr), []).filter(Boolean);

        res.status(200)
        .json(friendStatusData); // Filter out any null or undefined values

    } catch (err) {
        console.error('Error fetching friend data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};