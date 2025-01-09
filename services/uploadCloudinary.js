import { v2 as cloudinary } from "cloudinary"
import { createReadStream } from "streamifier"


function uploadToCloudinary(fileBuffer){
    return new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {resource_type: "auto", folder: "lovegood"}, //handles images,videos etc...
            (error, result)=>{
                if(error) reject(error)
                else resolve(result.secure_url)
            }
        )

        createReadStream(fileBuffer).pipe(uploadStream)
    })
}

export { uploadToCloudinary }