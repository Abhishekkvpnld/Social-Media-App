import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema({

    statusImg: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    imageURL:{
        type:String,
        required:true
    }

},
    {
        timestamps: true
    }
);

const Status = mongoose.model("status", schema);
export default Status;