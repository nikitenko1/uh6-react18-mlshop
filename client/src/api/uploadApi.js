import axios from "axios";

// https://cloudinary.com/documentation/upload_images#example_1_upload_multiple_files_using_a_form_unsigned
// The upload API method enables you to upload files with a direct call to Cloudinary
// by sending an HTTPS POST request to the following Cloudinary URL:
// https:api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload
export const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

export const uploadMultiFile = async (fileList) => {
  try {
    const results = await Promise.all(
      fileList.map(async (item) => {
        const imageUrl = await uploadOneFile(item);
        return imageUrl;
      })
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error.response);
  }
};

export const uploadOneFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // https://console.cloudinary.com/settings "ua-you"
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);

  try {
    const res = await axios.post(cloudinaryUrl, formData);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
