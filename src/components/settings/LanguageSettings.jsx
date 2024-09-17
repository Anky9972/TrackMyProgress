function LanguageSettings() {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Language & Region</h3>
        <p>Set your preferred language and region.</p>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select className="w-full border rounded-md p-2">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    );
  }
  
  export default LanguageSettings;
  