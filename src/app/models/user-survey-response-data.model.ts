export interface UserSurveyResponseData {
    id: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    jobCategory: string;
    typeSurvey: string;
    typeSurveyId: string;
    date: String;
    questions: SurveyQuestion[];
}

export interface SurveyQuestion {
    id: string;
    order: number;
    question: string;
    selectedOption: SelectedOption;
}

export interface SelectedOption {
    id: string;
    name: string;
    value: number;
}