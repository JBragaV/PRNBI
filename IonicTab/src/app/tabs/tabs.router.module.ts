import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
      path: 'tab4',
      children: [
        {
          path: '',
          loadChildren: '../tab4/tab4.module#Tab4PageModule'
        }
      ]
    },
      {
      path: 'about',
      children: [
        {
          path: '',
          loadChildren: '../about/about.module#AboutPageModule'
        }
      ]
    },
    {
      path: 'peso',
      children: [
        {
          path: '',
          loadChildren: '../peso/peso.module#PesoPageModule'
        }
      ]
    },
    {
      path: 'historico',
      children: [
        {
          path: '',
          loadChildren: '../historico/historico.module#HistoricoPageModule'
        }
      ]
    },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
