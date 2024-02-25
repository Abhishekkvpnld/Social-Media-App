
import User from "../models/user.js";
import convertToBase64 from "../data/Convert.js"

export const userStatus = async (req, res) => {
    try {
        const userId = req.params.userId;
        const imageObj = req.body;

if(imageObj){
    // const base64 = await convertToBase64(image);
    let userData = await User.findByIdAndUpdate(userId, { status:imageObj.base64 }, { new: true });
    res.status(200).json(userData); // Send the updated user data in response
}else{
    let userData = await User.findById(userId);
    console.log('fsdfsfsf',userData);
    res.status(201).json(userData); // Send the updated user data in response
}
      
    } catch (err) {
        console.error('Error updating user status:', err);
        res.status(500).json({ message: 'Internal server error' }); // Send error response
    }
};



export const firendStatus = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = await User.findById(userId)
        const friendData = await Promise.all(userData.friends?.map(async (friend) => {
            if (friend) {
                const fetchData = await User.findById(friend);
                return fetchData;
            }
        }));
        res.status(200).json(friendData.filter(Boolean)); // Filter out any null or undefined values

    } catch (err) {
        console.error('Error fetching friend data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}