import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalhesPokemonPage } from './detalhes-pokemon.page';
import { DetalhesPokemonRoutingModule } from './detalhes-pokemon-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DetalhesPokemonRoutingModule
  ],
  declarations: [DetalhesPokemonPage]
})
export class DetalhesPokemonPageModule {}
