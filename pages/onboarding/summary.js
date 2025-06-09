import { useState } from 'react';

export default function Summary() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    targetWeight: '',
    activityLevel: '',
    goals: '',
    foodPreferences: '',
    experienceLevel: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ketowebapp-api.onrender.com/api/onboarding/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        alert('Onboarding data saved successfully!');
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Onboarding Summary</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 rounded shadow">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
