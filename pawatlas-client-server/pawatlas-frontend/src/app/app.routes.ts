import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MapComponent } from './components/map/map.component';
import { authGuard } from '../guards/auth.guard';
import { AnimalComponent } from './components/animal/animal.component';
import { MarkerListComponent } from './components/marker/marker-list/marker-list.component';

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
  // animals
  {
    path: 'animals',
    title: 'Animaux',
    component: AnimalComponent,
    canActivate: [authGuard],
  },
  // profile
  {
    path: 'profile',
    title: 'Profil',
    component: HomeComponent,
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
