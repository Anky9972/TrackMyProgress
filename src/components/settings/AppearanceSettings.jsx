function AppearanceSettings() {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Theme & Appearance</h3>
        <p>Customize the look and feel of the application.</p>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Choose Theme
          </label>
          <select className="w-full border rounded-md p-2">
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </div>
      </div>
    );
  }
  
  export default AppearanceSettings;
  