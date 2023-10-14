import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pokemons',
        loadChildren: () => import('../pokemons/pokemons.module').then(m => m.PokemonsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/pokemons',
        pathMatch: 'full'
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then(m => m.FavoritosPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pokemons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
