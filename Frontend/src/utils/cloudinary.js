import axios from "axios";

const CLOUD_NAME = "dpuqonsmp";
const UPLOAD_PRSET = "darshan";

const uploadOnCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRSET);
  formData.append("folder", "lunare/productsimages");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;
