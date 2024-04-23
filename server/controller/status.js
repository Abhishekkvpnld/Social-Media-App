
import User from "../models/user.js";
import Status from "../models/status.js";
import { uploadFilesToCloudinary } from "../data/cloudinary.js";

export const userStatus = async (req, res) => {
    try {

        const userId = req.params.userId;
        const files = req.files || [] ;
        const body = req.body

        console.log("userId",userId);
        console.log( 'files',files);

        // if (files.length < 1)
        //     return res.status(400)
        //         .json({ message: "Please Upload Status" });


        // const [user, me] = await Promise.all([
        //     User.findById(userId),
        //     User.findById(userId, "name")
        // ]);

        // if (!user)
        //     return res.status(404)
        //         .json({ message: "User Not Found" });


        //Upload file here
        // const attachments = await uploadFilesToCloudinary(files);

        // const messageForDB = {
        //     statusImg: attachments,
        //     userid: userId,
        //     username: me,
        // };


        // const status = await Status.create(messageForDB);

        // res.status(200).json({
        //     success: true,
        //     status
        // });


    } catch (err) {
        console.error('Error updating user status:', err);
        // res.status(500)
        //     .json({ message: 'Internal server error' });
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