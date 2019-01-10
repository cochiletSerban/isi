import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './map/map.component';
import { AngularEsriModule } from 'angular-esri-components';
import { ReportIncidentComponent } from './report-incident/report-incident.component';
import { AdminIncidentsComponent } from './admin-incidents/admin-incidents.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { GraphsComponent } from './graphs/graphs.component';
// For MDB Angular Free
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthInterceptor } from './auth/token-interceptor';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
    NavBarComponent,
    MapComponent,
    ReportIncidentComponent,
    AdminIncidentsComponent,
    IncidentsComponent,
    GraphsComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AngularEsriModule,
    ChartsModule,
    WavesModule
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
