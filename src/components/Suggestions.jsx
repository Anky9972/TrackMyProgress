
const Suggestions = () => {
  const suggestions = [
    { id: 1, title: 'Implement a Linked List', description: 'Practice implementing a singly and doubly linked list.', link: '#' },
    { id: 2, title: 'Binary Search Tree', description: 'Solve challenges related to binary search trees.', link: '#' },
    { id: 3, title: 'Read: Design Patterns in JavaScript', description: 'An article on common design patterns used in JavaScript.', link: '#' },
    // Add more suggestions as needed
  ];

  return (
    <div>
      <ul className="space-y-4">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">{suggestion.title}</h3>
            <p className="text-gray-600">{suggestion.description}</p>
            <a href={suggestion.link} className="text-blue-500 hover:underline">Learn More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
