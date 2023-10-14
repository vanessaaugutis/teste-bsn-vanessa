import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: 'pokemons.page.html',
  styleUrls: ['pokemons.page.scss']
})
export class PokemonsPage {
  public pokemonsArray = [
    {
      name: '',
      url: '',
      urlFoto: ''
    }
  ];

  public contagemPokemon = 0;
  public pagination = 0;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getPokemonsData();
  }

  getPokemonsData() {
    this.getPokemons()
      .subscribe((response) => {
        this.pokemonsArray = response.results;
        this.pokemonsArray.forEach((pokemon) => {
          this.contagemPokemon+= 1;
          let number = '';
          number = this.contagemPokemon < 9 ? pokemon.url.charAt(pokemon.url.length - 2) : pokemon.url.charAt(pokemon.url.length - 3) + pokemon.url.charAt(pokemon.url.length - 2);
          pokemon.urlFoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${number}.svg`
        })
      });

  }

  getPokemons(): Observable<any> {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${this.pagination}`);
  }

  openDetalhes(url: string) {
    const id = this.contagemPokemon < 9 ? url.charAt(url.length - 2) : url.charAt(url.length - 3) + url.charAt(url.length - 2);
    this.router.navigate(
      ['pokemon'],
      { queryParams: { id: id } }
    );
  }

  changePagination(direcao: number) {
    if ((this.pagination === 0) && (direcao === 0)) {
      return;
    }

    if (direcao === 0) {
      this.pagination -= 1;
    } else {
      this.pagination += 1;
    }

    this.getPokemonsData();
  }
}
