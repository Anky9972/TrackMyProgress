import React, { useState } from 'react';

const BasicInfo = () => {
  const [firstName, setFirstName] = useState('asus');
  const [lastName, setLastName] = useState('f15');
  const [email, setEmail] = useState('asus.regular.use@gmail.com');
  const [country, setCountry] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      email,
      country,
      college,
      degree,
      branch,
      graduationYear,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Basic Info</h2>
      <p>You can manage your details here.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block">Codolio Id:</label>
          <input type="text" value="vivek02" className="border p-2 rounded w-full" readOnly />
        </div>
        <div>
          <label className="block">First Name *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">College</label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Enter college name"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Degree</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Enter your college degree"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Enter your branch"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Year of Graduation</label>
          <input
            type="text"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            placeholder="Enter your graduation year"
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
      </form>
    </div>
  );
};

export default BasicInfo;
