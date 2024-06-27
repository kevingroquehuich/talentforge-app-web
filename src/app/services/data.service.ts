import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
//import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, orderBy, setDoc, addDoc, collection, getDocs, query } from 'firebase/firestore';
import { Observable, catchError, forkJoin, from, map, of, switchMap } from 'rxjs';

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

  private handleError(error: any): never {
    console.error('Error fetching data:', error);
    throw error;
  }

  private fetchDocument<T>(ref: any): Observable<T> {
    return from(getDoc(ref)).pipe(
      map(docSnapshot => {
        console.log('docSnapshot-->', docSnapshot); // Añadir log
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...(docSnapshot.data() as T) };
        } else {
          console.error('No document found -->'); // Añadir log
          throw new Error('Document not found');
        }
      }),
      catchError(this.handleError)
    );
  }

  private fetchCollection<T>(query: any): Observable<T[]> {
    return from(getDocs(query)).pipe(
      map(snapshot => {
        console.log('Snapshot size-->', snapshot.size); // Añadir log
        if (snapshot.size > 0) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as T) }));
        } else {
          console.error('No documents found-->'); // Añadir log
          throw new Error('No documents found');
        }
      }),
      catchError(error => {
        console.error('Error fetching collection-->', error); // Añadir log
        return this.handleError(error);
      })
    );
  }

  /** Authentication **/

  async signInWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user sign in', user);
        console.log('token', user.getIdToken());
        this.router.navigate(['/home'])

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
        const user: User = userCredential.user;
        console.log('user created', user);
        this.router.navigate(['/home'])


        /*if (user) {
          this.saveDataUserInFirestore(user);
        } */

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async saveDataUserInFirestore(user: User) {
    const userRef = await addDoc(collection(this.firestore, 'users/' + user.uid), {
      displayname: user.displayName,
      email: user.email,
      profileImage: "https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_640.png"

    })
    console.log("Document written with ID: ", userRef.id);
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

  /** SERVICES **/

  async getServices(): Promise<any[]> {
    const servicesRef = collection(this.firestore, 'services');
    const servicesSnapshot = await getDocs(query(servicesRef));
    const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return servicesList;
  }


  /*getSurveyById(id: string): Observable<any> {
    const surveyRef = doc(this.firestore, 'organizational-survey', id);
    return from(getDoc(surveyRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          throw new Error('Encuesta no encontrada');
        }
      }),
      catchError(error => {
        console.error('Error fetching survey:', error);
        throw error;
      })
    );
  }

  getQuestions(surveyId: string): Observable<any[]> {
    const questionsRef = collection(this.firestore, 'organizational-survey', surveyId, 'questions');
    const questionsQuery = query(questionsRef, orderBy('order'));
    return from(getDocs(questionsQuery)).pipe(
      map(questionSnapshot => {
        if (questionSnapshot.size > 0) {
          return questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          throw new Error('No hay preguntas para esta encuesta');
        }
      }),
      catchError(error => {
        console.error('Error fetching survey:', error);
        throw error;
      })
    );
  }

  getOptionsByQuestionId(surveyId: string, questionId: string): Observable<any[]> {
    const optionsRef = collection(this.firestore, `questions/${surveyId}/questions/${questionId}/options`);
    const optionsQuery = query(optionsRef, orderBy('order'));
    return from(getDocs(optionsQuery)).pipe(
      map(optionSnapshot => {
        if (optionSnapshot.size > 0) {
          return optionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          throw new Error('No hay opciones para esta pregunta');
        }
      }),
      catchError(error => {
        console.error('Error fetching survey:', error);
        throw error;
      })
    );
  } */


  /** QUESTIONS **/
  /*async getQuestions(): Promise<any[]> {
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
  }*/


}
