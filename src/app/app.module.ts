import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule,
  MatSidenavModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {AuthGuardService} from '../services/auth-guard.service';
import { GamesComponent } from './home/games/games.component';
import { TeamsComponent } from './home/teams/teams.component';
import { PlayersComponent } from './home/players/players.component';
import { TeamDetailComponent } from './home/teams/team-detail/team-detail.component';
import { ProfileComponent } from './home/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    GamesComponent,
    TeamsComponent,
    PlayersComponent,
    TeamDetailComponent,
    ProfileComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
