import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPage,
    children: [
      {
        path: 'friends',
        loadChildren: () => import('./friends/friends.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'chats-page',
        loadChildren: () => import('./chats-page/chat-list.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/landing/friends',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/landing/friends',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
