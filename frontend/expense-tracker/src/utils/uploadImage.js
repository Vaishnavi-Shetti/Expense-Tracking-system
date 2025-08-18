import {API_PATH} from './apiPaths';
import axiosInstance from './axiosinstance';

const uploadImage =async (imageFile) => {
    const formData = new FormData();
    //Append image file to form data

    formData.append('image',imageFile);
    try{
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData,{
           headers:{
            'Content-type':'multipart/form-data',//set f=header for file upload
           } ,
        });
        return response.data;//return response data
    }catch(error){
        console.error('Error uploading the image:',error);
        throw error;// Rethrow error for handling
    }
};

export default uploadImage;