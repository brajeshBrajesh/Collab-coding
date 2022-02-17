const admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json"),
  databaseURL: "https://<project-id>.firebaseio.com/"
})

return admin
  .auth()
  .setCustomUserClaims("1SRLoQyxyAhd2S6nzSObp1z3g0i1", { admin: true })
  .then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
    console.log(`Admin claim added to ${uid}`)
  });