import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebase'; // Ensure Firestore is initialized correctly
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from "firebase/firestore";
import AddQuestion from './AddQuestion';
import { HiPlus } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { BiCheckbox } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
const MyWorkspace = () => {
  const [questions, setQuestions] = useState([]); // Initialize with an empty array
  const [addQuestion, setAddQuestion] = useState(true);
  const [newQuestionUrl, setNewQuestionUrl] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'All',
    status: 'All',
    topics: 'All',
    companies: 'All',
    tags: 'All',
    sortBy: 'Latest',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch questions from Firestore on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, 'myWorkspace'), where('isDeleted', '==', false));
        const snapshot = await getDocs(q);
        const fetchedQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Get the current user ID
  const getUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null; // Return user ID if logged in
  };

  // Function to add a new question to Firestore
  const addQuestionToDB = async (newQuestion) => {
    const userId = getUserId(); // Fetch user ID
    if (!userId) {
      alert("You must be logged in to add a question."); // Alert user if not logged in
      return;
    }

    const questionData = {
      ...newQuestion,
      userId, // Set userId
      date: new Date().toISOString(), // Current timestamp
      lastUpdated: new Date().toISOString(), // Current timestamp for last updated
      isDeleted: false, // Default value
    };

    try {
      const docRef = await addDoc(collection(db, "myWorkspace"), questionData);
      alert("Task added successfully!");
      return docRef.id; // Return the document ID
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Function to extract the question title from LeetCode URL
  const extractQuestionTitle = (url) => {
    // Check if the URL contains "problems/"
    const problemsIndex = url.indexOf('problems/');
    if (problemsIndex === -1) {
      return 'Invalid URL'; // Return a default title for invalid URLs
    }

    // Extract the slug part of the URL
    const questionSlug = url.substring(problemsIndex + 9); // Get content after "problems/"
    
    // Remove trailing slashes if any
    const title = questionSlug.replace(/\/$/, '');

    // Convert to a readable title (replace hyphens with spaces and capitalize words)
    const formattedTitle = title
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedTitle; // Return the formatted title
  };

  // Handle adding a new question by URL
  const addQuestionByUrl = async () => {
    if (newQuestionUrl.trim()) {
      const questionTitle = extractQuestionTitle(newQuestionUrl); // Extract the title from URL

      // Check if the title extraction was successful
      if (questionTitle === 'Invalid URL') {
        alert("Please provide a valid LeetCode problem URL.");
        return;
      }

      const newQuestion = {
        title: questionTitle, // Use extracted title
        url: newQuestionUrl,
        difficulty: '', // Set as needed
        status: 'Unsolved', // Default value
        companies: '', // Set as needed
        tags: '', // Set as needed
        topics: '', // Set as needed
        isFavorite: false, // Default value
      };

      // Add to Firestore
      const questionId = await addQuestionToDB(newQuestion);

      if (questionId) {
        // Update local state with the new question
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          { ...newQuestion, id: questionId, date: new Date().toISOString(), lastUpdated: new Date().toISOString() }, // Add timestamps
        ]);
        setNewQuestionUrl(''); // Clear input after adding
        setSearchTerm(''); // Clear search term after adding
      }
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle sorting
  const sortQuestions = (questions) => {
    switch (filters.sortBy) {
      case 'Latest':
        return [...questions].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'Oldest':
        return [...questions].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'Favourites':
        return [...questions].filter((q) => q.isFavorite);
      default:
        return questions;
    }
  };

  // Handle delete question
  const deleteQuestion = async (id) => {
    await updateDoc(doc(db, 'myWorkspace', id), { isDeleted: true });
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  };

  // Handle toggle favorite
  const toggleFavorite = async (id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        const updatedQuestion = { ...question, isFavorite: !question.isFavorite };
        updateDoc(doc(db, 'myWorkspace', id), { isFavorite: updatedQuestion.isFavorite });
        return updatedQuestion;
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Handle toggle solved/unsolved
  const toggleSolvedStatus = async (id) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        const updatedQuestion = { ...question, status: question.status === 'Solved' ? 'Unsolved' : 'Solved' };
        updateDoc(doc(db, 'myWorkspace', id), { status: updatedQuestion.status });
        return updatedQuestion;
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Filter and sort questions based on the user's inputs
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filters.difficulty === 'All' || question.difficulty === filters.difficulty;
    const matchesStatus = filters.status === 'All' || question.status === filters.status;
    const matchesTopics = filters.topics === 'All' || question.topics.includes(filters.topics);
    const matchesCompanies = filters.companies === 'All' || question.companies.includes(filters.companies);
    const matchesTags = filters.tags === 'All' || question.tags.includes(filters.tags);

    return matchesSearch && matchesDifficulty && matchesStatus && matchesTopics && matchesCompanies && matchesTags;
  });

  const sortedQuestions = sortQuestions(filteredQuestions);

  return (
    <div className="my-workspace p-4">

      {/* Add New Question by URL */}
      <div className="w-full flex justify-center gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-1/2"
          placeholder="Paste question URL here..."
          value={newQuestionUrl}
          onChange={(e) => setNewQuestionUrl(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addQuestionByUrl}>
          Add Question
        </button>
      </div>
      {
        addQuestion && (
          <AddQuestion setAddQuestion={setAddQuestion} addQuestion={addQuestion}/>
        )
      }
      {/* Add question icon on bottom right */}
      <div className='fixed bottom-10 flex justify-center items-center right-10 w-16 h-16 rounded-full bg-orange-500'>
        <button onClick={()=>{setAddQuestion(!addQuestion)}}>
          <HiPlus className='text-5xl text-white'/>
        </button>
      </div>

      {/* Filters */}
      <div className="w-full border-b py-5 flex gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-1/4"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select name="difficulty" className="border p-2 rounded" onChange={handleFilterChange}>
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select name="status" className="border p-2 rounded" onChange={handleFilterChange}>
          <option value="All">All Status</option>
          <option value="Solved">Solved</option>
          <option value="Unsolved">Unsolved</option>
        </select>

        <select name="companies" className="border p-2 rounded" onChange={handleFilterChange}>
          <option value="All">All Companies</option>
          {/* Add more company options as needed */}
        </select>

        <select name="tags" className="border p-2 rounded" onChange={handleFilterChange}>
          <option value="All">All Tags</option>
          {/* Add more tag options as needed */}
        </select>

        <select name="sortBy" className="border p-2 rounded" onChange={handleFilterChange}>
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
          <option value="Favourites">Favourites</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 gap-4">
        {sortedQuestions.length > 0 ? (
          sortedQuestions.map((question) => (
            <div key={question.id} className="border p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{question.title}</h3>
                <a href={question.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {question.url}
                </a>
                <p>{`Difficulty: ${question.difficulty || 'Unknown'} | Status: ${question.status}`}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => toggleFavorite(question.id)}>
                  {question.isFavorite ? (<FaStar className='text-2xl'/>) : (<CiStar className='text-2xl'/>)}
                </button>
                <button onClick={() => toggleSolvedStatus(question.id)}>
                  {question.status === 'Solved' ? (<BiSolidCheckboxChecked className='text-2xl'/>) : (<BiCheckbox className='text-2xl'/>)}
                </button>
                <button onClick={() => deleteQuestion(question.id)}><MdDelete className='text-2xl text-red-500'/></button>
              </div>
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default MyWorkspace;
