function NotificationSettings() {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Notifications</h3>
        <p>Manage how you receive notifications.</p>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Notifications
          </label>
          <input
            type="checkbox"
            className="mt-1"
          /> Receive Email Notifications
        </div>
      </div>
    );
  }
  
  export default NotificationSettings;
  