import { initializeApp } from "firebase-admin";
import admin from "firebase-admin";

if(!admin.app.length) {
  initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY)),
  })
}

export default admin;