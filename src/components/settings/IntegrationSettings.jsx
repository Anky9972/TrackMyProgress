function IntegrationSettings() {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Integration Settings</h3>
        <p>Configure third-party integrations and APIs.</p>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Enter your API key"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2">
            Save
          </button>
        </div>
      </div>
    );
  }
  
  export default IntegrationSettings;
  