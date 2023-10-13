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

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getPokemonsData();
  }

  getPokemonsData() {
    this.getPokemons()
      .subscribe((response) => {
        this.pokemonsArray = response.results;
        this.pokemonsArray.forEach((pokemon) => {
          const number = pokemon.url.charAt(pokemon.url.length - 2);
          pokemon.urlFoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${number}.svg`
        })
      });

  }

  getPokemons(): Observable<any> {
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
  }

  openDetalhes(url: string) {
    const id = url.charAt(url.length - 2);
    this.router.navigate(
      ['pokemon'],
      { queryParams: { id: id } }
    );
  }
}
