import { getStorage, ref, deleteObject } from "firebase/storage";

const deleteImageFromStorage = (imagePath) => {
  console.log(imagePath);
  const storage = getStorage();
  const storageRef = ref(storage,  imagePath );
  deleteObject(storageRef)
    .then(() => {
      console.log("file deleted successdully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Error while deleting photo");
    });
};
export default deleteImageFromStorage;
