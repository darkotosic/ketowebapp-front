import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function OnboardingFlow() {
  const { t } = useTranslation('common');
  const [step, setStep] = useState(1);

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

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
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
        // TODO: redirect to checkout
      } else {
        alert(t('onboarding_error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('onboarding_error'));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Kog ste pola? / What gender are you?
      </h2>

      {/* Izbor pola */}
      <div className="flex space-x-6">
        <button
          onClick={() => {
            handleChange('gender', 'Male');
            setStep(step + 1);
          }}
          className="flex flex-col items-center rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src="/images/male.jpg"
            alt="Muško"
            className="w-44 h-auto"
          />
          <span className="bg-[#eed198] text-white border border-[#266112] px-4 py-1 font-semibold">
            Male
          </span>
        </button>

        <button
          onClick={() => {
            handleChange('gender', 'Female');
            setStep(step + 1);
          }}
          className="flex flex-col items-center rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src="/images/female.jpg"
            alt="Žensko"
            className="w-44 h-auto"
          />
          <span className="bg-[#eed198] text-white border border-[#266112] px-4 py-1 font-semibold">
            Female
          </span>
        </button>
      </div>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 2:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koliko imate godina? / What is your age?
      </h2>

      {/* Input polje */}
      <input
        type="number"
        value={formData.age}
        onChange={(e) => handleChange('age', e.target.value)}
        className="border border-[#266112] text-center text-lg px-4 py-2 rounded w-40 bg-white text-[#266112] mb-6"
      />

      {/* Dugme za Next */}
      <button
        onClick={() => setStep(step + 1)}
        className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
      >
        Nastavi / Next
      </button>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
            case 3:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koliko ste visoki? / What is your height? (cm)
      </h2>

      {/* Input polje */}
      <input
        type="number"
        value={formData.height}
        onChange={(e) => handleChange('height', e.target.value)}
        className="border border-[#266112] text-center text-lg px-4 py-2 rounded w-40 bg-white text-[#266112] mb-6"
      />

      {/* Dugme za Next */}
      <button
        onClick={() => setStep(step + 1)}
        className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
      >
        Nastavi / Next
      </button>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 4:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koliko imate kilograma? / What is your weight? (kg)
      </h2>

      {/* Input polje */}
      <input
        type="number"
        value={formData.weight}
        onChange={(e) => handleChange('weight', e.target.value)}
        className="border border-[#266112] text-center text-lg px-4 py-2 rounded w-40 bg-white text-[#266112] mb-6"
      />

      {/* Dugme za Next */}
      <button
        onClick={() => setStep(step + 1)}
        className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
      >
        Nastavi / Next
      </button>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 5:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Kolika je vaša ciljana težina? / What is your target weight? (kg)
      </h2>

      {/* Input polje */}
      <input
        type="number"
        value={formData.targetWeight}
        onChange={(e) => handleChange('targetWeight', e.target.value)}
        className="border border-[#266112] text-center text-lg px-4 py-2 rounded w-40 bg-white text-[#266112] mb-6"
      />

      {/* Dugme za Next */}
      <button
        onClick={() => setStep(step + 1)}
        className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
      >
        Nastavi / Next
      </button>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 6:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koliki je Vaš nivo aktivnosti? / What is your activity level?
      </h2>

      {/* Dugmad */}
      <div className="flex flex-col space-y-4 mb-6">
        <button
          onClick={() => { handleChange('activityLevel', 'low'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Low
        </button>
        <button
          onClick={() => { handleChange('activityLevel', 'medium'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Medium
        </button>
        <button
          onClick={() => { handleChange('activityLevel', 'high'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          High
        </button>
      </div>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 7:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koji je Vaš cilj? / What is your goal?
      </h2>

      {/* Dugmad */}
      <div className="flex flex-col space-y-4 mb-6">
        <button
          onClick={() => { handleChange('goals', 'lose_weight'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Smršati / Lose Weight
        </button>
        <button
          onClick={() => { handleChange('goals', 'maintain'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Održavati / Maintain
        </button>
        <button
          onClick={() => { handleChange('goals', 'gain_muscle'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Nabaciti masu / Gain Muscle
        </button>
      </div>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 8:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koje su vaše prehrambene navike? / What are your food preferences?
      </h2>

      {/* Dugmad */}
      <div className="flex flex-col space-y-4 mb-6">
        <button
          onClick={() => { handleChange('foodPreferences', 'meat'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Jedem meso / Meat
        </button>
        <button
          onClick={() => { handleChange('foodPreferences', 'vegetarian'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Vegeterijanac / Vegetarian
        </button>
        <button
          onClick={() => { handleChange('foodPreferences', 'vegan'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Vegan / Vegan
        </button>
      </div>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 9:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Koji je vaš nivo iskustva sa Keto? / What is your experience level with Keto?
      </h2>

      {/* Dugmad */}
      <div className="flex flex-col space-y-4 mb-6">
        <button
          onClick={() => { handleChange('experienceLevel', 'beginner'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Početnik / Beginner
        </button>
        <button
          onClick={() => { handleChange('experienceLevel', 'intermediate'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Srednje / Intermediate
        </button>
        <button
          onClick={() => { handleChange('experienceLevel', 'advanced'); setStep(step + 1); }}
          className="bg-[#eed198] text-[#266112] border border-[#266112] px-6 py-2 font-semibold rounded"
        >
          Napredno / Advanced
        </button>
      </div>

      {/* Garancija ispod */}
      <p className="text-sm text-white border border-[#266112] px-4 py-2 mt-8 rounded max-w-md">
        Garantujemo do 7kg gubitka u prvih 7 dana – ili vam vraćamo novac.
      </p>
    </div>
  );
      case 10:
  return (
    <div className="flex flex-col items-center text-center min-h-screen p-6" style={{ backgroundColor: '#eed198' }}>
      {/* Motivacioni tekst */}
      <h1 className="text-white border border-[#266112] text-2xl font-bold mb-4 px-4 py-2 rounded">
        Rezultati koji menjaju život uz <span className="text-[#266112]">Keto Lifechanger</span>
      </h1>

      {/* Pitanje */}
      <h2 className="text-white border border-[#266112] text-xl font-semibold mb-6 px-4 py-1 rounded">
        Unesite vašu e-mail adresu / Enter your email address
      </h2>

      {/* Email input */}
      <input
        type="email"
        placeholder="you@example.com"
        value={formData.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
        required
        className="border border-[#266112] text-[#266112] text-lg px-4 py-2 rounded w-80 mb-4"
      />

      {/* Privacy text */}
      <p className="text-[#266112] text-sm mb-4 max-w-md">
        Vašu privatnost shvatamo veoma ozbiljno! Svi vaši podaci su bezbedni kod nas.
      </p>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="bg-[#266112] text-white font-semibold px-8 py-3 rounded mb-4"
      >
        Nastavi
      </button>

      {/* Terms text */}
      <p className="text-[#266112] text-xs max-w-md px-4">
        Klikom na „Nastavi“ ispod potvrđujete da ste pročitali, razumeli i prihvatili{' '}
        <a href="#" className="underline">Uslovi korišćenja</a> i{' '}
        <a href="#" className="underline">Politika privatnosti</a> i saglasni ste da primate buduće e-poruke od nas o našem programu mršavljenja.
      </p>
    </div>
  );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {renderStep()}
      <div className="flex justify-between w-full max-w-md mt-8">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="p-2 bg-gray-300 rounded">{t('back')}</button>
        )}
        {step < 10 && (
          <button onClick={() => setStep(step + 1)} className="p-2 bg-blue-500 text-white rounded">{t('next')}</button>
        )}
      </div>
    </div>
  );
}
