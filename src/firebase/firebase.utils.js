import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDf5CeO4SLkqEEYyuaOp8Kct2x5kb02-kc",
    authDomain: "expense-tracker-24ef6.firebaseapp.com",
    databaseURL: "https://expense-tracker-24ef6.firebaseio.com",
    projectId: "expense-tracker-24ef6",
    storageBucket: "expense-tracker-24ef6.appspot.com",
    messagingSenderId: "665977927381",
    appId: "1:665977927381:web:dcdf1366ac77f189a7945c",
    measurementId: "G-PG1CSMMF0Y"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        //Si la snapshot no existe, entonces queremos que se cree
        const { displayName, email, uid } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                nombre: displayName,
                correo: email,
                uid,
                seCreoEl: createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating the user', error)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
