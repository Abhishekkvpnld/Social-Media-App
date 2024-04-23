import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema({

    statusImg: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    userid: {
        type: Types.ObjectId,
        required: true
    },
    username:{
        type:String,
        required:true
    }

},
    {
        timestamps: true
    }
);

const Status = mongoose.model("Message", schema);
export default Status;