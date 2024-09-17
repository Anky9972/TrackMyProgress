import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSheet, updateSheet, deleteSheet } from '../store/sheetsSlice';
import * as XLSX from 'xlsx';
import { FileUploadDemo } from './FileUpload';
import { db } from '../services/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const CodingSheet = () => {
  const [newSheet, setNewSheet] = useState('');
  const [editingSheetId, setEditingSheetId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [fileName, setFileName] = useState('');
  const sheets = useSelector((state) => state.sheets);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sheets'));
        const sheetsFromFirebase = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        sheetsFromFirebase.forEach(sheet => dispatch(addSheet(sheet)));
      } catch (error) {
        console.error("Error fetching sheets from Firebase: ", error);
      }
    };

    fetchSheets();
  }, [dispatch]);

  const handleAddSheet = async () => {
    const sheetTitle = newSheet.trim() !== '' ? newSheet : fileName;
    if (sheetTitle) {
      const sheetData = { title: sheetTitle, questions };
      try {
        const docRef = await addDoc(collection(db, 'sheets'), sheetData);
        dispatch(addSheet({ id: docRef.id, ...sheetData }));
        setNewSheet('');
        setQuestions([]);
        setFileName('');
        console.log("Sheet added to Firebase with ID: ", docRef.id);
      } catch (e) {
        console.error('Error adding document to Firebase: ', e);
      }
    } else {
      console.log("Sheet title is required.");
    }
  };

  const handleUpdateSheet = async (id) => {
    if (editingTitle.trim() !== '') {
      try {
        const sheetRef = doc(db, 'sheets', id);
        await updateDoc(sheetRef, { title: editingTitle, questions });
        dispatch(updateSheet({ id, title: editingTitle, questions }));
        setEditingSheetId(null);
        setEditingTitle('');
        console.log("Sheet updated in Firebase with ID: ", id);
      } catch (e) {
        console.error('Error updating document in Firebase: ', e);
      }
    }
  };

  const handleDeleteSheet = async (id) => {
    try {
      await deleteDoc(doc(db, 'sheets', id));
      dispatch(deleteSheet(id));
      console.log("Sheet deleted from Firebase with ID: ", id);
    } catch (e) {
      console.error('Error deleting document from Firebase: ', e);
    }
  };

  const startEditing = (sheet) => {
    setEditingSheetId(sheet.id);
    setEditingTitle(sheet.title);
    setQuestions(sheet.questions);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name.split('.').slice(0, -1).join('.'));
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const parsedQuestions = [];

      for (let rowNum = 2; rowNum <= worksheet['!ref'].split(':')[1].match(/\d+/)[0]; rowNum++) {
        const questionCell = worksheet[`B${rowNum}`];
        const questionText = questionCell ? questionCell.v : null;
        const questionUrl = questionCell && questionCell.l ? questionCell.l.Target : null;

        if (questionText && questionUrl) {
          parsedQuestions.push({ question: questionText, url: questionUrl });
        }
      }

      setQuestions(parsedQuestions);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className='mt-20'>
      <input
        type="text"
        value={newSheet}
        onChange={(e) => setNewSheet(e.target.value)}
        placeholder="New Coding Sheet (optional)"
      />
      <button onClick={handleAddSheet}>Add Sheet</button>

      <FileUploadDemo onChange={handleFileUpload}/>

      <ul>
        {sheets.map((sheet) => (
          <li key={sheet.id}>
            {editingSheetId === sheet.id ? (
              <div>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateSheet(sheet.id)}>Update</button>
                <button onClick={() => setEditingSheetId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{sheet.title}</span>
                <button onClick={() => startEditing(sheet)}>Edit</button>
                <button onClick={() => handleDeleteSheet(sheet.id)}>Delete</button>
                <ul>
                  {sheet.questions.map((q, index) => (
                    <li key={index}>
                      <a href={q.url} target="_blank" rel="noopener noreferrer">
                        {q.question}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>Parsed Questions</h2>
      <ul className='bg-yellow-200'>
        {questions.map((q, index) => (
          <li key={index} className={`p-5 hover:shadow-md hover:scale-[1.01] hover:rounded-md duration-300 transition-all relative flex justify-start items-center gap-10 ${index%2==0 ? "bg-gray-50" : "bg-white"} `}>
            <span>{index}</span>
            <a href={q.url} target="_blank" rel="noopener noreferrer">
              {q.question}
            </a>

            <div className='flex gap-10 absolute right-5'>
              <button>Attempted</button>
              <button>Reject</button>
              <button>Star</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodingSheet;
