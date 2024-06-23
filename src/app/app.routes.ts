import { Routes } from '@angular/router';

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
        path: '**',
        redirectTo: 'home',
    }
];
