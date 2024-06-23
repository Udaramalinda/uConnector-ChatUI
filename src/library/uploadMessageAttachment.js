import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export const uploadMessageAttachment = async (file, fileType) => {
  const date = new Date();

  let storageRef;
  if (fileType === 'image/jpeg' || fileType === 'image/png') {
    storageRef = ref(storage, `attachment/images/${date + file.name}`);
  } else if (fileType === 'video/mp4') {
    storageRef = ref(storage, `attachment/videos/${date + file.name}`);
  } else if (fileType === 'application/pdf') {
    storageRef = ref(storage, `attachment/pdfs/${date + file.name}`);
  } else {
    storageRef = ref(storage, `attachment/files/${date + file.name}`);
  }

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        reject('Something went wrong!' + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
