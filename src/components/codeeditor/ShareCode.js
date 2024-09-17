import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Initialize storage and firestore instances
const storage = getStorage();
const db = getFirestore();

const uploadCode = async (code, language) => {
  const id = uuidv4(); // Generate a unique ID
  const extensionMap = {
    'JavaScript': 'js',
    'TypeScript': 'ts',
    'Python': 'py',
    'Java': 'java',
    'C': 'c',
    'C++': 'cpp',
    'C#': 'cs',
    'Ruby': 'rb',
    'Go': 'go',
    'Rust': 'rs',
  };
  const extension = extensionMap[language] || 'txt';
  const fileName = `${id}.${extension}`;
  const fileRef = ref(storage, `codes/${fileName}`);

  try {
    // Upload the file to Firebase Storage
    console.log('Uploading code to storage...');
    await uploadString(fileRef, code);

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(fileRef);
    console.log('File uploaded. Download URL:', downloadURL);

    // Save metadata to Firestore
    console.log('Saving metadata to Firestore...');
    await setDoc(doc(db, 'codes', id), {
      language,
      fileName,
      downloadURL,
    });

    console.log('Metadata saved successfully.');
    return id;
  } catch (error) {
    console.error('Error sharing code:', error);
    throw error;
  }
};

export default uploadCode;
