import { Routes } from '@angular/router';
import AboutComponent from './pages/about/about.component';
import OurServicesComponent from './pages/our-services/our-services.component';

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
        component: AboutComponent
        //loadComponent: () => import('./pages/about/about.component'),
    },
    {
        path: 'services',
        component: OurServicesComponent
        //loadComponent: () => import('./pages/our-services/our-services.component'),
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
