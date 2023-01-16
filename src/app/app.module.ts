import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TryItOutPageComponent } from './try-it-out-page/try-it-out-page.component';
import { ApiListComponent } from './api-list/api-list.component';
import {MatCardModule} from '@angular/material/card';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
 import {MatDrawer, MatDrawerContainer, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import { NgxPaginationModule } from 'ngx-pagination';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ServicesbytagComponent } from './servicesbytag/servicesbytag.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from './navbar/navbar.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { NgxMinisidebarModule } from 'ngx-minisidebar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {MatTooltipModule} from '@angular/material/tooltip';






@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    StoreHomeComponent,
    LoginPageComponent,
    TryItOutPageComponent,
    ApiListComponent,
    ServiceDetailsComponent,
    SideNavComponent,
    ChangepasswordComponent,
    ServicesbytagComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    Ng2SearchPipeModule,
    FormsModule,
    FontAwesomeModule,
    
  
    // MatListModule,

    
    // MatSidenavModule,
    // MatSidenavContainer,
    // MatDrawer,
    // MatDrawerContainer,
    // MatSidenavContent,
    MatSidenavModule,
    NgxMinisidebarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTooltipModule,
    ToastrModule.forRoot(
      ),
      NgxPaginationModule
  ],
  providers: [ [DatePipe]],
  bootstrap: [AppComponent]
})
export class AppModule { }
