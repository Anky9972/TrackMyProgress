function AccountSettings() {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Account Settings</h3>
        <p>Manage your account details and preferences here.</p>
        <div className="mt-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    );
  }
  
  export default AccountSettings;
  