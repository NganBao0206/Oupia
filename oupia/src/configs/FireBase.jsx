<<<<<<< HEAD



=======
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import 
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCIW7pM3yhbOywrot9_JELsfU5ZrlAziGQ",
//   authDomain: "oupia-aed75.firebaseapp.com",
//   projectId: "oupia-aed75",
//   storageBucket: "oupia-aed75.appspot.com",
//   messagingSenderId: "358294480804",
//   appId: "1:358294480804:web:da0ac9017b03ba0c18c331"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// const createFirebaseAuth = async (res) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, account.email, account.password);

//     if (userCredential && auth.currentUser) {
//       try {
//         await updateProfile(auth.currentUser, {
//           displayName: user.lastName + " " + user.firstName,
//           photoURL: "https://res.cloudinary.com/dxjkpbzmo/image/upload/v1691907285/zp0am1x1g5puovvwfvzv.png"
//         });

//         await setDoc(doc(db, "users", auth.currentUser.uid), {
//           uid: auth.currentUser.uid,
//           user_id: res.user.id,
//           displayName: auth.currentUser.displayName,
//           photoURL: "https://res.cloudinary.com/dxjkpbzmo/image/upload/v1691907285/zp0am1x1g5puovvwfvzv.png",
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   } catch (ex) {
//     // console.log(ex);
//   }
// };

// const authFirebase = async () => {
//   try {
//       await signInWithEmailAndPassword(auth, load("firebase-email"), load("firebase-password"));
//   } catch (ex) {
//   }
// }
>>>>>>> 8071447b0f3bf38a42c1728eb60b37f06876762c
