import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Line Chart Demo',
      switchToThai: 'Switch to Thai',
      switchToEnglish: 'Switch to English',
      switchToDark: 'Switch to Dark Theme',
      switchToLight: 'Switch to Light Theme'
    }
  },
  th: {
    translation: {
      title: 'ตัวอย่างกราฟเส้น',
      switchToThai: 'เปลี่ยนเป็นภาษาไทย',
      switchToEnglish: 'เปลี่ยนเป็นภาษาอังกฤษ',
      switchToDark: 'เปลี่ยนเป็นธีมมืด',
      switchToLight: 'เปลี่ยนเป็นธีมสว่าง'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
