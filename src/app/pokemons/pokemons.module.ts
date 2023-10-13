import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonsPage } from './pokemons.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PokemonsPageRoutingModule } from './pokemons-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PokemonsPageRoutingModule
  ],
  declarations: [PokemonsPage]
})
export class PokemonsPageModule {}
