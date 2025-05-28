import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentification/login/login.component';
import { RegisterComponent } from './components/authentification/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { MapComponent } from './components/map/map.component';
import { NominatimDetailsComponent } from './components/nominatim-details/nominatim-details.component';
import { MarkerListComponent } from './components/marker-list/marker-list.component';

// https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc
export const routes: Routes = [
  // ***** ROUTES *****

  // login
  { path: 'login', title: 'Login', component: LoginComponent },
  // register
  { path: 'register', title: 'Register', component: RegisterComponent },
  // home
  {
    path: 'home',
    title: 'Accueil',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  // list
  {
    path: 'list',
    title: 'Liste',
    component: MarkerListComponent,
    canActivate: [authGuard],
  },
  // map
  {
    path: 'map',
    title: 'Carte',
    component: MapComponent,
    canActivate: [authGuard],
  },
  // nominatim
  {
    path: 'nominatim',
    title: 'Nominatim',
    component: NominatimDetailsComponent,
    canActivate: [authGuard],
  },
  // everything else
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // 404
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404',
    pathMatch: 'full',
  },
];
