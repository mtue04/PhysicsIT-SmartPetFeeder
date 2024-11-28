const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-name>.firebaseio.com", // URL của Realtime Database
});

const db = admin.firestore(); // Sử dụng Cloud Firestore
// Hoặc:
// const db = admin.database(); // Sử dụng Realtime Database

module.exports = db;