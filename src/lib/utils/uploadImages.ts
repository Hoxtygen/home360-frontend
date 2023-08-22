import axios, { isAxiosError } from "axios";

export async function uploadImages(files: File[]) {
  if (!files) return;
  let myImages: string[] = [];
  const filesToUpload = await files.map((file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "home360preset");
    formData.append("tags", `home360_image, apartment_listing `);
    return axios
      .post("https://api.cloudinary.com/v1_1/dh3jxarvg/image/upload", formData)
      .then((response) => {
        const data = response.data;
        const fileURL = data.secure_url;
        return fileURL;
      });
  });
  axios
    .all(filesToUpload)
    .then((responses) => {
      responses.forEach((response) => myImages.push(response));
    })
    .catch((error) => {
      if (error instanceof Error) {
        return error.message;
      }
      if (isAxiosError(error)) {
        return error.message;
      }
    });
  return myImages;
}
