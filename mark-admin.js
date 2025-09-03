// mark-admin.js
import admin from "firebase-admin";
import fs from "fs";

// Load service account key
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "NDcdnEljereRbe2HeAmZL7AZbIL2"; // your admin UID

(async () => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log("✅ Admin claim set for UID:", uid);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error setting admin claim:", err);
    process.exit(1);
  }
})();
