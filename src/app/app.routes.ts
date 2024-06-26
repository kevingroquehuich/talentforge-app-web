import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import FormSurveyComponent from './pages/surveys/form-survey/form-survey.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },

    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component'),
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/our-services/our-services.component')
        //canActivate: [authGuard]
    },
    {
        path: 'services/:id',
        loadComponent: () => import('./pages/our-services/service-detail/service-detail.component')
    },
    {
        path: 'surveys',
        loadChildren: () => import('./pages/surveys/surveys.module').then((m) => m.SurveysModule)
    },
    {
        path: 'surveys/:id',
        component: FormSurveyComponent
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component')
    },
    {
        path: 'courses',
        loadComponent: () => import('./pages/courses/courses.component')
    },
    {
        path: 'courses/:id',
        loadComponent: () => import('./pages/courses/course-detail/course-detail.component')
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
