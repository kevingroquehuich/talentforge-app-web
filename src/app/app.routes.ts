import { Routes } from '@angular/router';
import AboutComponent from './pages/about/about.component';
import OurServicesComponent from './pages/our-services/our-services.component';
import { authGuard } from './auth.guard';
import { PsychologicalComponent } from './pages/surveys/psychological/psychological.component';
import { OrganizationalComponent } from './pages/surveys/organizational/organizational.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CoursesComponent } from './pages/courses/courses.component';

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
        component: OurServicesComponent,
        canActivate: [authGuard]
        //loadComponent: () => import('./pages/our-services/our-services.component'),
    },
    {
        path: 'psychological',
        component: PsychologicalComponent
    }, 
    {
        path: 'organizational',
        component: OrganizationalComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
