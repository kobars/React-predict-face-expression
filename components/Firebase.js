import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_databaseURL,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId,
};

console.log(firebaseConfig)
try {
    firebase.initializeApp(firebaseConfig)
}
catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
    }
}


const storage = firebase.storage()
// const storageRef = storage.ref();
// const tangRef = storageRef.child(`images/G05b118ed-4b70-4ae7-b6e8-8d51ed16d2dd1592673523308`);
// firebase.auth().signInAnonymously().then(function () {
//     tangRef.getDownloadURL().then(function (url) {
//         console.log(url)
//     }).catch(function (error) {
//         console.error(error);
//     });
// });

export { storage, firebase as default }