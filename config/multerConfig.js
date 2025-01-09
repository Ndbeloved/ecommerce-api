import multer from "multer"


const storage = multer.memoryStorage()

//setting multer up for image upload
const upload = multer({storage: storage})

export { upload }