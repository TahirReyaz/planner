// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("schedules.db");

// export const init = () => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "CREATE TABLE IF NOT EXISTS test(day TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, time TEXT NOT NULL, color TEXT NOT NULL)",
//         [],
//         () => {
//           resolve();
//         },
//         (_, err) => {
//           reject(err);
//         }
//       );
//     });
//   });

//   return promise;
// };

// export const insertSchedules = (title, imageUri, address, lat, lng) => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `INSERT INTO PLACES(title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?);`,
//         [title, imageUri, address, lat, lng],
//         (_, result) => {
//           resolve(result);
//         },
//         (_, err) => {
//           reject(err);
//         }
//       );
//     });
//   });

//   return promise;
// };

// export const fetchSchedules = () => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM test",
//         [],
//         (_, result) => {
//           resolve(result);
//         },
//         (_, err) => {
//           reject(err);
//         }
//       );
//     });
//   });

//   return promise;
// };
