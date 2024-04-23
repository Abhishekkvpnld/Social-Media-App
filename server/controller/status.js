
import User from "../models/user.js";
import Status from "../models/status.js";


export const userStatus = async (req, res) => {
    try {

        const userId = req.params.userId;
        const fileName = req.file.filename;

        console.log("userId", userId);
        console.log("filename", fileName);

        if (!fileName)
            return res.status(400)
                .json({ message: "Please Upload Status" });


        const user = await User.findById(userId, "firstName"); // fetching user details

        if (!user)
            return res.status(404)
                .json({ message: "User Not Found" });

        const imageURL = `${req.protocol}://${req.get('host')}/statusFile/${req.file.filename}`;

        const messageForDB = {
            statusImg: fileName,
            userId: userId,
            username: user.firstName,
            imageURL
        };
        const existingStatus = await Status.findOneAndDelete({ userid: userId });

        console.log(existingStatus);

        // // if (existingStatus) {

        //     // Create and save the new status
        //     const newStatus = new Status({ userid: userId, messageForDB });
        //     await newStatus.save();

        // } else {

        //     const status = await Status.create(messageForDB);
        // };



        // res.status(200).json({
        //     success: true,
        //     status,
        //     message: "Status Added Successfully..."
        // });


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
        const status = await Status.findById(userId);

        if (!status) {
            return res.status(404).json({ message: "Status not found" });
        }

        // Send status data if found
        res.status(200).json({ status });
    } catch (err) {
        // Handle errors
        console.error('Error fetching user status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




// export const firendStatus = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const userData = await User.findById(userId)
//         const friendData = await Promise.all(userData.friends?.map(async (friend) => {
//             if (friend) {
//                 const fetchData = await User.findById(friend);
//                 return fetchData;
//             }
//         }));
//         res.status(200).json(friendData.filter(Boolean)); // Filter out any null or undefined values

//     } catch (err) {
//         console.error('Error fetching friend data:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }