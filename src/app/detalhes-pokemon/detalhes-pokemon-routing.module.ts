import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesPokemonPage } from './detalhes-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPokemonPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalhesPokemonRoutingModule {}
