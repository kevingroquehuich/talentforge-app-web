import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { Observable, catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(public firestore: Firestore, private router: Router) { }

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

  getOrganizationalSurveys(): Observable<any[]> {
    const surveysRef = collection(this.firestore, 'organizational-survey');
    const surveysQuery = query(surveysRef, orderBy('order'));

    return this.fetchCollection(surveysQuery);
  }

  getPsychologicalSurveys(): Observable<any[]> {
    const surveysRef = collection(this.firestore, 'psychological-survey');
    const surveysQuery = query(surveysRef, orderBy('order'));
    return this.fetchCollection(surveysQuery);
  }

  getSurveyById(id: string): Observable<any> {
    const surveyRef = doc(this.firestore, 'organizational-survey', id);
    return this.fetchDocument(surveyRef);
  }

  getQuestions(surveyId: string): Observable<any> {
    const questionsRef = collection(this.firestore, `organizational-survey/${surveyId}/questions`);
    const questionsQuery = query(questionsRef, orderBy('order'));
    return this.fetchCollection(questionsQuery);
  }

  getQuestionOptions(surveyId: string, questionId: string): Observable<any> {
    const optionsRef = collection(this.firestore, `organizational-survey/${surveyId}/questions/${questionId}/options`);
    const optionsQuery = query(optionsRef, orderBy('value'));
    return this.fetchCollection(optionsQuery);
  }

  async saveSurveyResponse(surveyId: string, response: any): Promise<void> {
     await addDoc(collection(this.firestore, `organizational-survey/${surveyId}/responses`), {
      ...response
    });
  }
}
