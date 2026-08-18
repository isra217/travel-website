const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

let app;

if (getApps().length === 0) {
  if (process.env.FIREBASE_PROJECT_ID) {
    // ==========================================
    // VERCEL / PRODUCTION
    // ==========================================

    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
      }),
    });
  } else {
    // ==========================================
    // LOCAL DEVELOPMENT
    // ==========================================

    const serviceAccount = require("./serviceAccountKey.json");

    app = initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

const db = getFirestore(app);

module.exports = db;