import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import convertToBase64 from "./Convert.js";


export const deleteFileFromCloudinary = async (public_ids) => {
    // delete files from cloudinary

};

export const uploadFilesToCloudinary = async (files = []) => {
  
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          convertToBase64(file),
          {
            resource_type: "auto",
            public_id: uuid(),
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
      const formattedResults = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
      return formattedResults;
    } catch (err) {
      throw new Error("Error uploading files to cloudinary", err);
    };
  };