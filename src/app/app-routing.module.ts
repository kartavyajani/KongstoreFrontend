import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiListComponent } from './api-list/api-list.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { AuthGuard } from './services/auth.guard';
import { ServicesbytagComponent } from './servicesbytag/servicesbytag.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { TryItOutPageComponent } from './try-it-out-page/try-it-out-page.component';

const routes: Routes = [
  
  {
    path: 'store-home', component: StoreHomeComponent,
  },
  {
    path: 'store-register', component: RegistrationPageComponent
  },
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'login', component: LoginPageComponent
  },

 
  {
    path: 'api-list', component: ApiListComponent,canActivate:[AuthGuard]
    
    
  },
  {
    path: 'service/:id', component: ServiceDetailsComponent,canActivate:[AuthGuard]
    
  },
  {
    path: 'tryitout/:id', component: TryItOutPageComponent,canActivate:[AuthGuard]
    
  },
  {
    path: 'change-password', component: ChangepasswordComponent
  },
  {
    path: 'getServices/:id', component: ServicesbytagComponent,canActivate:[AuthGuard]
    
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
