import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
//import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, orderBy, setDoc, addDoc, collection, getDocs, query } from 'firebase/firestore';
import { Observable, catchError, forkJoin, from, map, of, switchMap, throwError } from 'rxjs';
import { UserSurveyResponseData } from '../models/user-survey-response-data.model';
import { ServiceData } from '../models/service-data.model';
import { CourseData, ModuleData, SectionModuleData } from '../models/course-data.model';

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

  private handleError(error: any): Observable<never> {
    console.error('Error fetching data:', error);
    return throwError('Error fetching data from Firestore');
  }

  public fetchDocument<T>(ref: any): Observable<T> {
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

  public fetchCollection<T>(query: any): Observable<T[]> {
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

  getServices(): Observable<any[]> {
    const servicesRef = collection(this.firestore, 'services');
    return this.fetchCollection(servicesRef);
  }

  getServiceById(id: string): Observable<ServiceData> {
    const serviceRef = doc(this.firestore, 'services', id);
    return this.fetchDocument(serviceRef);
  }

  /* COURSES */
  getCourses(): Observable<CourseData[]> {
    const courseRef = collection(this.firestore, 'courses');
    const courseQuery = query(courseRef, orderBy('order'));
    return this.fetchCollection(courseQuery);
  }

  getCourseWithModulesAndSections(id: string): Observable<CourseData> {
    const courseRef = doc(this.firestore, 'courses', id);

    return this.fetchDocument<CourseData>(courseRef).pipe(
      switchMap(course => {
        const moduleRef = collection(this.firestore, `courses/${id}/modules`);
        const modulesQuery = query(moduleRef, orderBy('order'));

        return this.fetchCollection<ModuleData>(modulesQuery).pipe(
          switchMap(modules => {
            const moduleObservables = modules.map(module => {
              const sectionRef = collection(this.firestore, `courses/${id}/modules/${module.id}/sections`);
              const sectionsQuery = query(sectionRef, orderBy('order'));

              return this.fetchCollection<SectionModuleData>(sectionsQuery).pipe(
                map(sections => {
                  module.sections = sections;
                  return module;
                }),
                catchError(error => {
                  console.error(`Error fetching sections for module ${module.id}:`, error);
                  return throwError(`Error fetching sections for module ${module.id} from Firestore`);
                })
              );
            });

            return forkJoin(moduleObservables).pipe(
              map(modulesWithSections => {
                course.modules = modulesWithSections;
                return course;
              }),
              catchError(error => {
                console.error('Error joining module observables:', error);
                return throwError('Error joining module observables');
              })
            );
          }),
          catchError(error => {
            console.error('Error fetching modules:', error);
            return throwError('Error fetching modules from Firestore');
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching course:', error);
        return throwError('Error fetching course from Firestore');
      })
    );
  }

  /* DASHBOARD */

  getResponsesSurvey(surveyId: string): Observable<UserSurveyResponseData[]> {
    const responseRef = collection(this.firestore, `organizational-survey/${surveyId}/responses`);
    const responsesQuery = query(responseRef);
    return this.fetchCollection<UserSurveyResponseData>(responsesQuery);
  }

}
