import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

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
        path: 'surveys',
        loadChildren: () => import('./pages/surveys/surveys.module').then((m) => m.SurveysModule)
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
        path: '**',
        redirectTo: 'home',
    }
];
