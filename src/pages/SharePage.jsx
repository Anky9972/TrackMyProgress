import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const SharePage = ({ match }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const fetchCode = async () => {
      const db = getFirestore(); // Initialize Firestore
      const storage = getStorage(); // Initialize Storage
      const id = match.params.id;

      try {
        // Fetch the document from Firestore
        const docRef = doc(db, 'codes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLanguage(data.language);

          // Fetch the file from Storage using the fileName
          const fileRef = ref(storage, `codes/${data.fileName}`);
          const downloadURL = await getDownloadURL(fileRef);

          // Fetch the file content
          const response = await fetch(downloadURL);
          const codeText = await response.text();

          setCode(codeText);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching code:', error);
      }
    };

    fetchCode();
  }, [match.params.id]);

  return (
    <div className="mt-20 px-20 py-10">
      <h1 className="text-2xl font-bold mb-4">Shared Code</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{language}</h2>
        <pre className="mt-2 p-2 bg-gray-200 rounded-lg overflow-x-auto whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );
};

SharePage.propTypes = {
  match: PropTypes.object,
};

export default SharePage;
