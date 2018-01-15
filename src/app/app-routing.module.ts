import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: '',
            redirectTo: 'register',
            pathMatch: 'full'
        }
    ])],
    exports: [RouterModule]
})
export class AppRoutingModule { } 