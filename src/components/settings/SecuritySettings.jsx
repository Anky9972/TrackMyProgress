function SecuritySettings() {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Security & Privacy</h3>
        <p>Manage your security and privacy settings.</p>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Two-Factor Authentication
          </label>
          <input
            type="checkbox"
            className="mt-1"
          /> Enable 2FA
        </div>
      </div>
    );
  }
  
  export default SecuritySettings;
  