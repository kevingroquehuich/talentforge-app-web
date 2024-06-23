import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public firestore: Firestore) { }

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
