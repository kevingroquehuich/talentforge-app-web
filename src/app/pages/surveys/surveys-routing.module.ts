import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'psychological',
                loadComponent: () => import('./psychological/psychological.component')
            },
            {
                path: 'organizational',
                loadComponent: () => import('./organizational/organizational.component')
            }
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveysRoutingModule {

}