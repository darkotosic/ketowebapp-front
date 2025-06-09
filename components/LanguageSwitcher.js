import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex justify-end space-x-2 mb-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-green-500 text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('sr')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'sr' ? 'bg-green-500 text-white' : 'bg-gray-200'
        }`}
      >
        SR
      </button>
    </div>
  );
}
