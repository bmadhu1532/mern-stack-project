import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Layout } from './layout/layout';
import { Teams } from './teams/teams';
import { Players } from './players/players';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'layout', component: Layout,
        canActivate: [authGuard],

        children: [
            { path: 'teams', component: Teams },
            { path: 'players', component: Players }
        ]
    },
];
