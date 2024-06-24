import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public firestore: Firestore, private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("Current User", user)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  /** Authentication **/

  async signInWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user sign in', user);
        console.log('token', user.getIdToken());

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('user created', user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log('user signed in with google', user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  // Estado de autenticación
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user; // Devuelve true si hay un usuario en localStorage, false si es null o undefined
  }

  // Obtener el usuario actual
  get currentUser(): any | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null; // Devuelve el usuario parseado o null si no hay usuario
  }

  async logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('user'); // Elimina el usuario al cerrar sesión
      this.router.navigate(['/home'])
    }).catch((error) => {
      // An error happened.
    })
  }

  /** Services **/

  async getServices(): Promise<any[]> {
    const servicesRef = collection(this.firestore, 'services');
    const servicesSnapshot = await getDocs(query(servicesRef));
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return servicesList;
  }


  /** Questions **/
  async getQuestions(): Promise<any[]> {
    const questionSnapshot = await getDocs(query(collection(this.firestore, 'questions')));
    const questions = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return questions;
  }

  async getOptions(questionId: string): Promise<any[]> {
    const optionsCollection = collection(this.firestore, `questions/${questionId}/options`);
    const optionsSnapshot = await getDocs(optionsCollection);
    return optionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort();
  }

  async getQuestionsWithOptions(): Promise<any[]> {
    const questions = await this.getQuestions();
    return Promise.all(questions.map(async question => {
      if (question.id) {
        const options = await this.getOptions(question.id);
        return { ...question, options };
      } else {
        console.error('Question ID is undefined');
        return { ...question, options: [] };
      }
    }));
  }


}
