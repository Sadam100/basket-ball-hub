import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {AuthGuardService as AuthGuard} from '../services/auth-guard.service';
import {GamesComponent} from './home/games/games.component';
import {TeamsComponent} from './home/teams/teams.component';
import {PlayersComponent} from './home/players/players.component';
import {TeamDetailComponent} from './home/teams/team-detail/team-detail.component';
import {ProfileComponent} from './home/profile/profile.component';

const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'signin', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [{path: 'profile', component: ProfileComponent}]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [{path: 'games', component: GamesComponent}]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [{path: 'teams', component: TeamsComponent}]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [{path: 'teams/:id', component: TeamDetailComponent}]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [{path: 'players', component: PlayersComponent}]
  },
  {
    path: '', redirectTo: '/signin', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
