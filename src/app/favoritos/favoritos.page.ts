import { AppStorageService } from './../services/app-storage.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss']
})
export class FavoritosPage {
  public pokemonsArray = [
    {
      name: '',
      url: '',
      urlFoto: '',
      favorito: false
    }
  ];

  public favoritosArray = [
    {
      name: '',
      url: '',
      urlFoto: '',
      favorito: true
    }
  ];

  public contagemPokemon = 0;
  public pagination = 0;

  value:any = '';

  public favoritos = '';

  constructor(private httpClient: HttpClient, private router: Router, private appStorageService: AppStorageService) {
    this.favoritosData();
  }

  favoritosData() {
    this.favoritosGet()
      .subscribe(async (response) => {
        this.pokemonsArray = response.results;
        this.favoritos = await this.appStorageService.get('favoritos');
        this.pokemonsArray.forEach((pokemon) => {
          pokemon.favorito = this.favoritos && this.favoritos.includes("#" + pokemon.name) ? true : false;
          if (pokemon.favorito) {
            this.contagemPokemon+= 1;
            let number = '';
            number = this.contagemPokemon < 9 ? pokemon.url.charAt(pokemon.url.length - 2) : pokemon.url.charAt(pokemon.url.length - 3) + pokemon.url.charAt(pokemon.url.length - 2);
            pokemon.urlFoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${number}.svg`
            this.favoritosArray.push(pokemon);
          }
        })
      });
  }

  favoritosGet(): Observable<any> {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${this.pagination}`);
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

    this.favoritosData();
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
    this.favoritosData();
  }

  async getFavoritos() {
    this.favoritos = await this.appStorageService.get('favoritos');
  }
}
