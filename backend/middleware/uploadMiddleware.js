const multer = require("multer");

//configure storage
const storage =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

//File filter
const fileFilter = (req,file,cb) =>{
    const allowedTypes =['image/jpeg','image/png','image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(new Error('omly .jpeg, .jpg and .png formats aare allowed'), false);
    }
};

const upload = multer({storage, fileFilter});
module.exports = upload;