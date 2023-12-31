import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonsPage } from './pokemons.page';

import { PokemonsPageRoutingModule } from './pokemons-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PokemonsPageRoutingModule
  ],
  declarations: [PokemonsPage]
})
export class PokemonsPageModule {}
