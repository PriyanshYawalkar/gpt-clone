import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase";

export const uploadMediaClient = async (file: File) => {
  const storage = getStorage(app);
  const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  return await getDownloadURL(snapshot.ref);
};
