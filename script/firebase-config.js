const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(FIREBASE_CONFIG);

// Shared across pages via window, since these pages don't use a
// bundler/import system.
window.auth = firebase.auth();
window.db = firebase.firestore();

// Turns Firebase's error codes into plain-English messages.
window.friendlyFirebaseError = function (err) {
  const messages = {
    "auth/email-already-in-use":
      "That email is already registered — try logging in instead.",
    "auth/invalid-email": "That doesn't look like a valid email address.",
    "auth/weak-password": "Password is too weak — use at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests":
      "Too many attempts — please wait a moment and try again.",
    "auth/network-request-failed":
      "Network error — check your connection and try again.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/cancelled-popup-request": "Sign-in was cancelled.",
    "auth/account-exists-with-different-credential":
      "That email is already registered using a different sign-in method (e.g. email/password). Try logging in that way instead.",
  };
  return (
    messages[err.code] || `Something went wrong (${err.code || err.message}).`
  );
};
