import firebaseconfig from "../FirebaseConfig";
import firebase from "firebase";

export const authMethods = {
  // firebase helper methods go here...
  signup: (email: any, password: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  },
  signin: (email: any, password: any) => {},
  signout: (email: any, password: any) => {},
};
