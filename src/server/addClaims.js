var admin = require("firebase-admin");

var serviceAccount = require("./my-first-project-3fbf8-firebase-adminsdk-cndpv-96d2835148.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-first-project-3fbf8.firebaseio.com",
});

const uid = "UOaSL8FopsO0bThndtWSiZCaBIx1";

return (
  admin.auth()
  .getUser(uid)
  .then((userRecord) => {
      // The claims can be accessed on the user record.
      console.log(userRecord.customClaims['admin']);
  })

  // admin
  //   .auth()
  //   .setCustomUserClaims(uid, { admin: true })
  //   .then(() => {
  //     // The new custom claims will propagate to the user's ID token the
  //     // next time a new one is issued.
  //     console.log(`Admin claim added to ${uid}`);
  //   })
);

// admin
//   .auth()
//   .setCustomUserClaims(uid, { admin: true })
//   .then(() => {
//     // The new custom claims will propagate to the user's ID token the
//     // next time a new one is issued.
//     console.log(`Admin claim added to ${uid}`)
//   });
