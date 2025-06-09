import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function Summary() {
  const { t } = useTranslation('common');

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
    email: '', // DODATO email polje
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data → convert numbers to Int and clean strings
    const preparedData = {
      age: parseInt(formData.age) || 0,
      height: parseInt(formData.height) || 0,
      weight: parseInt(formData.weight) || 0,
      targetWeight: parseInt(formData.targetWeight) || 0,
      gender: formData.gender.trim() || 'Unknown',
      activityLevel: formData.activityLevel.trim() || 'Unknown',
      goals: formData.goals.trim() || 'Unknown',
      foodPreferences: formData.foodPreferences.trim() || 'Unknown',
      experienceLevel: formData.experienceLevel.trim() || 'Unknown',
      email: formData.email.trim() || 'Unknown', // DODATO email u preparedData
    };

    try {
      const response = await fetch('https://ketowebapp-api.onrender.com/api/onboarding/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedData),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        alert(t('onboarding_success'));
      } else {
        alert(`${t('onboarding_error')}: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('onboarding_error'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-6">{t('onboarding_title')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 rounded shadow">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 capitalize">{t(key)}</label>
            <input
              type={key === 'email' ? 'email' : 'text'} // ako je email → email input
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
          {t('submit_button')}
        </button>
      </form>
    </div>
  );
}
