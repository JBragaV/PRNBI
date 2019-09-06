import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'form', loadChildren: './form/form.module#FormPageModule' },
  { path: 'peso', loadChildren: './peso/peso.module#PesoPageModule' },  { path: 'historico', loadChildren: './historico/historico.module#HistoricoPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
