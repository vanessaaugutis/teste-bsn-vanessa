import { AppStorageService } from './../services/app-storage.service';
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
      id: 0,
      name: '',
      url: '',
      urlFoto: '',
      favorito: false
    }
  ];

  public contagemPokemon = 0;
  public pagination = 0;

  value:any = '';

  public favoritos = '';

  constructor(private httpClient: HttpClient, private router: Router, private appStorageService: AppStorageService) {
    this.getPokemonsData();
  }

  getPokemonsData() {
    this.getPokemons()
      .subscribe(async (response) => {
        this.pokemonsArray = response.results;
        this.favoritos = await this.appStorageService.get('favoritos');
        this.pokemonsArray.forEach((pokemon) => {
          this.contagemPokemon+= 1;
          let number = '';
          number = this.contagemPokemon <= 9 ? pokemon.url.charAt(pokemon.url.length - 2) : pokemon.url.charAt(pokemon.url.length - 3) + pokemon.url.charAt(pokemon.url.length - 2);
          pokemon.urlFoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${number}.svg`
          pokemon.favorito = this.favoritos && this.favoritos.includes("#" + pokemon.name) ? true : false;
          pokemon.id = this.contagemPokemon;
        })
      });

  }

  getPokemons(): Observable<any> {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${this.pagination}`);
  }

  openDetalhes(contador: number) {
    const id = contador + '';
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

  async addOrRemoveFavoritos(nome: string) {
    const favoritos = await this.appStorageService.get('favoritos');
    const estaFavorito = favoritos ? favoritos.includes("#" + nome) : null;
    let favoritosAtualizado = '';

    if (favoritos) {
      if (estaFavorito) {
        favoritosAtualizado = favoritos.replace("#" + nome, '');
      } else {
        favoritosAtualizado = favoritos + "#" + nome;
      }
    } else { favoritosAtualizado = "#" + nome };

    await this.appStorageService.set('favoritos', favoritosAtualizado)
    this.getPokemonsData();
  }

  async getFavoritos() {
    this.favoritos = await this.appStorageService.get('favoritos');
  }
}
