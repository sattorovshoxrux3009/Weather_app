// let TelegramBot = require('node-telegram-bot-api');
// let axios = require('axios');

// // Telegram bot tokeni
// let apiKey = '68eaa3bc316b4914b65173823242209';
// let token = '7723302452:AAHIytlMjiHAHj3JRfMlMr1X_RlGv4qcwwQ'
// let bot = new TelegramBot(token, { polling: true });

// // Foydalanuvchilarning tanlovlari
// let userChoices = {};

// // Viloyatlarni tanlash uchun reply keyboard
// let regions = {
//   uz: [
//     'Toshkent', 'Samarqand', 'Buxoro', 'Farg‘ona',
//     'Andijon', 'Namangan', 'Qashqadaryo', 'Surxondaryo',
//     'Jizzax', 'Sirdaryo', 'Navoiy', 'Xorazm'
//   ],
//   en: [
//     'Tashkent', 'Samarkand', 'Bukhara', 'Fergana',
//     'Andijan', 'Namangan', 'Kashkadarya', 'Surkhandarya',
//     'Jizzakh', 'Syrdarya', 'Navoi', 'Khorezm'
//   ],
//   ru: [
//     'Ташкент', 'Самарканд', 'Бухара', 'Фергана',
//     'Андижан', 'Наманган', 'Кашкадарья', 'Сурхандарья',
//     'Джизак', 'Сырдарья', 'Навои', 'Хорезм'
//   ]
// };

// // Tilga mos xabarlar
// let selectRegionMessage = {
//   uz: 'Viloyatingizni tanlang:',
//   en: 'Please select your region:',
//   ru: 'Пожалуйста, выберите ваш регион:'
// };

// // Til tanlash menyusi
// let languageOptions = {
//   reply_markup: {
//     keyboard: [
//       ['🇺🇿 O‘zbekcha','🇷🇺 Русский','🇬🇧 English']
//     ],
//     one_time_keyboard: true,
//     resize_keyboard: true
//   }
// };

// // Boshlang'ich: Bot kirganida til tanlash
// bot.onText(/\/start/, (msg) => {
//   let chatId = msg.chat.id;
//   console.log(msg)
//   bot.sendMessage(chatId, 'Iltimos, tilni tanlang:', languageOptions);
// });

// // Callback uchun listener: Til tanlash va viloyat menyusini ko'rsatish

// bot.on('message', (msg) => {
//   let chatId = msg.chat.id;
//   let data = msg.text;

//   // Foydalanuvchi tilni tanlaganda
//   if (data === '🇺🇿 O‘zbekcha' || data === '🇬🇧 English' || data === '🇷🇺 Русский') {
//     userChoices[chatId] = { language: data }; // Tanlangan tilni eslab qolish
    
//     // Tanlangan tilga mos xabarni olish
//     let selectedLanguage = data === '🇺🇿 O‘zbekcha' ? 'uz' : data === '🇬🇧 English' ? 'en' : 'ru';
//     let messageText = selectRegionMessage[selectedLanguage];

//     // Viloyatlarni tanlangan tilga mos ravishda ko'rsatish
//     let regionRows = [];
//     let selectedRegions = regions[selectedLanguage];

//     for (let i = 0; i < selectedRegions.length; i += 2) {
//     regionRows.push(selectedRegions.slice(i, i + 2));
//     }

//     let regionOptions = {
//     reply_markup: {
//         keyboard: regionRows,
//         one_time_keyboard: true
//     }
//     };
//     bot.sendMessage(chatId, messageText, regionOptions);
//   } else if (userChoices[chatId] && regions[userChoices[chatId].language === '🇺🇿 O‘zbekcha' ? 'uz' : userChoices[chatId].language === '🇬🇧 English' ? 'en' : 'ru'].includes(data)) {
//     // Foydalanuvchi viloyatni tanlaganda ob-havo ma'lumotlarini chiqarish
//     userChoices[chatId].region = data; // Viloyatni eslab qolish
//     let selectedLanguage = userChoices[chatId].language;

//     // API orqali ob-havo ma'lumotlarini olish
//     let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data}`;

//     axios.get(url)
//       .then(response => {
//         let weather = response.data;
//         let temperatureC = weather.current.temp_c;
//         let condition = weather.current.condition.text;
//         let windSpeed = weather.current.wind_kph;
//         let windDirection = weather.current.wind_dir;
//         let humidity = weather.current.humidity;
//         let pressure = weather.current.pressure_mb;
//         let feelsLike = weather.current.feelslike_c;
//         let lastUpdated = weather.current.last_updated;

//         // Ob-havo ma'lumotlarini tanlangan tilda ko'rsatish
//         let weatherInfo = '';
//         if (selectedLanguage === '🇺🇿 O‘zbekcha') {
//           weatherInfo = `
// Viloyat: ${data}
// Harorat: ${temperatureC}°C
// Hisoblangan harorat: ${feelsLike}°C
// Ob-havo: ${condition}
// Shamol tezligi: ${windSpeed} km/s, yo'nali: ${windDirection}
// Namlik: ${humidity}%
// Bosim: ${pressure} mb
// So'nggi yangilanish: ${lastUpdated}
//           `;
//         } else if (selectedLanguage === '🇬🇧 English') {
//           weatherInfo = `
// Region: ${data}
// Temperature: ${temperatureC}°C
// Feels like: ${feelsLike}°C
// Weather: ${condition}
// Wind speed: ${windSpeed} km/h, direction: ${windDirection}
// Humidity: ${humidity}%
// Pressure: ${pressure} mb
// Last updated: ${lastUpdated}
//           `;
//         } else if (selectedLanguage === '🇷🇺 Русский') {
//           weatherInfo = `
// Регион: ${data}
// Температура: ${temperatureC}°C
// Ощущается как: ${feelsLike}°C
// Погода: ${condition}
// Скорость ветра: ${windSpeed} км/ч, направление: ${windDirection}
// Влажность: ${humidity}%
// Давление: ${pressure} mb
// Последнее обновление: ${lastUpdated}
//           `;
//         }

//         // Foydalanuvchiga ob-havo ma'lumotlarini ko'rsatish
//         bot.sendMessage(chatId, weatherInfo);
//       })
//       .catch(error => {
//         console.log(error)
//         bot.sendMessage(chatId, 'Xatolik yuz berdi yoki viloyat topilmadi.');
//       });
//   }
// });













// let TelegramBot = require('node-telegram-bot-api');
// let axios = require('axios');

// // Telegram bot tokeni
// let apiKey = '68eaa3bc316b4914b65173823242209';
// let token = '7723302452:AAHIytlMjiHAHj3JRfMlMr1X_RlGv4qcwwQ';
// let bot = new TelegramBot(token, { polling: true });

// // Foydalanuvchilarning tanlovlari
// let userChoices = {};

// // Viloyatlarni tanlash uchun inline keyboard
// let regions = {
//   uz: [
//     'Toshkent', 'Samarqand', 'Buxoro', "Farg'ona",
//     'Andijon', 'Namangan', 'Qashqadaryo', 'Surxondaryo',
//     'Jizzax', 'Sirdaryo', 'Navoiy', 'Xorazm'
//   ],
//   en: [
//     'Tashkent', 'Samarkand', 'Bukhara', 'Fergana',
//     'Andijan', 'Namangan', 'Kashkadarya', 'Surkhandarya',
//     'Jizzakh', 'Syrdarya', 'Navoi', 'Khorezm'
//   ],
//   ru: [
//     'Ташкент', 'Самарканд', 'Бухара', 'Фергана',
//     'Андижан', 'Наманган', 'Кашкадарья', 'Сурхандарья',
//     'Джизак', 'Сырдарья', 'Навои', 'Хорезм'
//   ]
// };

// // Tilga mos xabarlar
// let selectRegionMessage = {
//   uz: 'Viloyatingizni tanlang:',
//   en: 'Please select your region:',
//   ru: 'Пожалуйста, выберите ваш регион:'
// };

// // Til tanlash menyusi
// let languageOptions = {
//   reply_markup: {
//     keyboard: [
//       ['🇺🇿 O‘zbekcha','🇷🇺 Русский','🇬🇧 English']
//     ],
//     one_time_keyboard: true,
//     resize_keyboard: true
//   }
// };

// // Boshlang'ich: Bot kirganida til tanlash
// bot.onText(/\/start/, (msg) => {
//   let chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Iltimos, tilni tanlang:', languageOptions);
// });

// // Callback uchun listener: Til tanlash va viloyat menyusini ko'rsatish
// bot.on('message', (msg) => {
//   let chatId = msg.chat.id;
//   let data = msg.text;

//   // Foydalanuvchi tilni tanlaganda
//   if (data === '🇺🇿 O‘zbekcha' || data === '🇬🇧 English' || data === '🇷🇺 Русский') {
//     userChoices[chatId] = { language: data }; // Tanlangan tilni eslab qolish
    
//     // Tanlangan tilga mos xabarni olish
//     let selectedLanguage = data === '🇺🇿 O‘zbekcha' ? 'uz' : data === '🇬🇧 English' ? 'en' : 'ru';
//     let messageText = selectRegionMessage[selectedLanguage];

//     // Viloyatlarni tanlangan tilga mos ravishda ko'rsatish
//     let selectedRegions = regions[selectedLanguage];

//     if (selectedRegions && messageText) {
//       let inlineKeyboard = selectedRegions.map(region => {
//         return [{ text: region, callback_data: region }];
//       });

//       let regionOptions = {
//         reply_markup: {
//           inline_keyboard: inlineKeyboard
//         }
//       };

//       bot.sendMessage(chatId, messageText, regionOptions);
//     } else {
//       bot.sendMessage(chatId, 'Xatolik: til bo\'yicha viloyatlar topilmadi.');
//     }

//   }
// });

// // Inline keyboard callback listener
// bot.on('callback_query', (callbackQuery) => {
//   const chatId = callbackQuery.message.chat.id;
//   const data = callbackQuery.data;

//   if (userChoices[chatId]) {
//     userChoices[chatId].region = data; // Viloyatni eslab qolish
//     let selectedLanguage = userChoices[chatId].language;
//     // API orqali ob-havo ma'lumotlarini olish
//     let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data}`;

//     axios.get(url)
//       .then(response => {
//         let weather = response.data;
//         let temperatureC = weather.current.temp_c;
//         let condition = weather.current.condition.text;
//         let windSpeed = weather.current.wind_kph;
//         let windDirection = weather.current.wind_dir;
//         let humidity = weather.current.humidity;
//         let pressure = weather.current.pressure_mb;
//         let feelsLike = weather.current.feelslike_c;
//         let lastUpdated = weather.current.last_updated;

//         // Ob-havo ma'lumotlarini tanlangan tilda ko'rsatish
//         let weatherInfo = '';
//         if (selectedLanguage === '🇺🇿 O‘zbekcha') {
//           weatherInfo = `
// Viloyat: ${data}
// Harorat: ${temperatureC}°C
// Hisoblangan harorat: ${feelsLike}°C
// Ob-havo: ${condition}
// Shamol tezligi: ${windSpeed} km/s, yo'nali: ${windDirection}
// Namlik: ${humidity}%
// Bosim: ${pressure} mb
// So'nggi yangilanish: ${lastUpdated}
//           `;
//         } else if (selectedLanguage === '🇬🇧 English') {
//           weatherInfo = `
// Region: ${data}
// Temperature: ${temperatureC}°C
// Feels like: ${feelsLike}°C
// Weather: ${condition}
// Wind speed: ${windSpeed} km/h, direction: ${windDirection}
// Humidity: ${humidity}%
// Pressure: ${pressure} mb
// Last updated: ${lastUpdated}
//           `;
//         } else if (selectedLanguage === '🇷🇺 Русский') {
//           weatherInfo = `
// Регион: ${data}
// Температура: ${temperatureC}°C
// Ощущается как: ${feelsLike}°C
// Погода: ${condition}
// Скорость ветра: ${windSpeed} км/ч, направление: ${windDirection}
// Влажность: ${humidity}%
// Давление: ${pressure} mb
// Последнее обновление: ${lastUpdated}
//           `;
//         }

//         // Foydalanuvchiga ob-havo ma'lumotlarini ko'rsatish
//         bot.sendMessage(chatId, weatherInfo)
//           .then(() => {
//             // Ob-havo ma'lumotlari chiqarilgandan so'ng viloyatlar menyusini qayta ko'rsatish
//             let selectedRegions = regions[selectedLanguage];
              
//             if (selectedRegions) {
//               let inlineKeyboard = selectedRegions.map(region => {
//                 return [{ text: region, callback_data: region }];
//               });

//               let regionOptions = {
//                 reply_markup: {
//                   inline_keyboard: inlineKeyboard
//                 }
//               };

//               bot.sendMessage(chatId, selectRegionMessage[selectedLanguage], regionOptions);
//             }
//           });
//       })
//       .catch(error => {
//         console.log(error);
//         bot.sendMessage(chatId, 'Xatolik yuz berdi yoki viloyat topilmadi.');
//       });
//   }
// });




let TelegramBot = require('node-telegram-bot-api');
let axios = require('axios');

// Telegram bot tokeni
let apiKey = '68eaa3bc316b4914b65173823242209';
let token = '7723302452:AAHIytlMjiHAHj3JRfMlMr1X_RlGv4qcwwQ';
let bot = new TelegramBot(token, { polling: true });

// Foydalanuvchilarning tanlovlari
let userChoices = {};

// Viloyatlarni tanlash uchun inline keyboard
let regions = {
  uz: {
    'Toshkent': 'Toshkent',
    'Samarqand': 'Samarqand',
    'Buxoro': 'Buxoro',
    'Farg‘ona': 'Fergana',
    'Andijon': 'Andijon',
    'Namangan': 'Namangan',
    'Qashqadaryo': 'Qashqadaryo',
    'Surxondaryo': 'Termez',
    'Jizzax': 'Jizzax',
    'Sirdaryo': 'Guliston',
    'Navoiy': 'Navoiy',
    'Xorazm': 'Urganch'
  },
  en: {
    'Tashkent': 'Tashkent',
    'Samarkand': 'Samarkand',
    'Bukhara': 'Bukhara',
    'Fergana': 'Fergana',
    'Andijan': 'Andijan',
    'Namangan': 'Namangan',
    'Kashkadarya': 'Kashkadarya',
    'Surkhandarya': 'Termez',
    'Jizzakh': 'Jizzakh',
    'Syrdarya': 'Syrdarya',
    'Navoi': 'Navoi',
    'Khorezm': 'Khorezm'
  },
  ru: {
    'Ташкент': 'Ташкент',
    'Самарканд': 'Самарканд',
    'Бухара': 'Бухара',
    'Фергана': 'Фергана',
    'Андижан': 'Андижан',
    'Наманган': 'Наманган',
    'Кашкадарья': 'Qashqadaryo',
    'Сурхандарья': 'Термез',
    'Джизак': 'Джизак',
    'Сырдарья': 'Гулистан',
    'Навои': 'Навои',
    'Хорезм': 'Ургенч'
  }
};

// Tilga mos xabarlar
let selectRegionMessage = {
  uz: 'Viloyatingizni tanlang:',
  en: 'Please select your region:',
  ru: 'Пожалуйста, выберите ваш регион:'
};

// Til tanlash menyusi
let languageOptions = {
  reply_markup: {
    keyboard: [
      ['🇺🇿 O‘zbekcha', '🇷🇺 Русский', '🇬🇧 English']
    ],
    one_time_keyboard: true,
    resize_keyboard: true
  }
};

// Boshlang'ich: Bot kirganida til tanlash
bot.onText(/\/start/, (msg) => {
  let chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Iltimos, tilni tanlang:', languageOptions);
});

// Callback uchun listener: Til tanlash va viloyat menyusini ko'rsatish
bot.on('message', (msg) => {
  let chatId = msg.chat.id;
  let data = msg.text;

  // Foydalanuvchi tilni tanlaganda
  if (data === '🇺🇿 O‘zbekcha' || data === '🇬🇧 English' || data === '🇷🇺 Русский') {
    userChoices[chatId] = { language: data }; // Tanlangan tilni eslab qolish
    
    // Tanlangan tilga mos xabarni olish
    let selectedLanguage = data === '🇺🇿 O‘zbekcha' ? 'uz' : data === '🇬🇧 English' ? 'en' : 'ru';
    let messageText = selectRegionMessage[selectedLanguage];

    // Viloyatlarni tanlangan tilga mos ravishda ko'rsatish
    let selectedRegions = regions[selectedLanguage];

    if (selectedRegions && messageText) {
      let inlineKeyboard = Object.keys(selectedRegions).map(region => {
        return [{ text: region, callback_data: selectedRegions[region] }];
      });

      let regionOptions = {
        reply_markup: {
          inline_keyboard: inlineKeyboard
        }
      };

      bot.sendMessage(chatId, messageText, regionOptions);
    } else {
      bot.sendMessage(chatId, 'Xatolik: til bo\'yicha viloyatlar topilmadi.');
    }
  }
});

// Inline keyboard callback listener
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (userChoices[chatId]) {
    userChoices[chatId].region = data; // Viloyatni eslab qolish
    let selectedLanguage = userChoices[chatId].language;

    // API orqali ob-havo ma'lumotlarini olish
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data}`;

    axios.get(url)
      .then(response => {
        let weather = response.data;
        let temperatureC = weather.current.temp_c;
        let condition = weather.current.condition.text;
        let windSpeed = weather.current.wind_kph;
        let windDirection = weather.current.wind_dir;
        let humidity = weather.current.humidity;
        let pressure = weather.current.pressure_mb;
        let feelsLike = weather.current.feelslike_c;
        let lastUpdated = weather.current.last_updated;

       // Ob-havo ma'lumotlarini tanlangan tilda ko'rsatish
        let weatherInfo = '';
        if (selectedLanguage === '🇺🇿 O‘zbekcha') {
          weatherInfo = `Viloyat: ${data}\nHarorat: ${temperatureC}°C\nHisoblangan harorat: ${feelsLike}°C\nOb-havo: ${condition}\nShamol tezligi: ${windSpeed} km/s, yo'nali: ${windDirection}\nNamlik: ${humidity}%\nBosim: ${pressure} mb\nSo'nggi yangilanish: ${lastUpdated}`;
        } else if (selectedLanguage === '🇬🇧 English') {
          weatherInfo = `Region: ${data}\nTemperature: ${temperatureC}°C\nFeels like: ${feelsLike}°C\nWeather: ${condition}\nWind speed: ${windSpeed} km/h, direction: ${windDirection}\nHumidity: ${humidity}%\nPressure: ${pressure} mb\nLast updated: ${lastUpdated}`;
        } else if (selectedLanguage === '🇷🇺 Русский') {
          weatherInfo = `Регион: ${data}\nТемпература: ${temperatureC}°C\nОщущается как: ${feelsLike}°C\nПогода: ${condition}\nСкорость ветра: ${windSpeed} км/ч, направление: ${windDirection}\nВлажность: ${humidity}%\nДавление: ${pressure} mb\nПоследнее обновление: ${lastUpdated}`;
        }

        // Foydalanuvchiga ob-havo ma'lumotlarini ko'rsatish
        bot.sendMessage(chatId, weatherInfo)
          .then(() => {
            // Ob-havo ma'lumotlari chiqarilgandan so'ng viloyatlar menyusini qayta ko'rsatish
            let selectedRegions = regions[selectedLanguage];  
            if (selectedRegions) {
              let inlineKeyboard = Object.keys(selectedRegions).map(region => {
              return [{ text: selectedRegions[region], callback_data: selectedRegions[region] }];
              });
              let regionOptions = {
                reply_markup: {
                  inline_keyboard: inlineKeyboard
                }
              };

              bot.sendMessage(chatId, selectRegionMessage[selectedLanguage], regionOptions);
              }
            }
          );
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(chatId, 'Xatolik yuz berdi yoki viloyat topilmadi.');
      });
  }
});