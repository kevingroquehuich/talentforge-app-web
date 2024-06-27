import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./psychological/psychological.component'),
        children: [
            {
                path: 'form',
                loadComponent: () => import('./form-survey/form-survey.component')
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