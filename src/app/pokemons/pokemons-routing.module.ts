import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsPage } from './pokemons.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsPageRoutingModule {}
