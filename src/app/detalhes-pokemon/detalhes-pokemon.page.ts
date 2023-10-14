import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: 'detalhes-pokemon.page.html',
  styleUrls: ['detalhes-pokemon.page.scss']
})
export class DetalhesPokemonPage {
  public informacoes = {
    name: '',
    urlFoto: '',
    peso: 0,
    altura: 0,
  };

  constructor(private httpClient: HttpClient, private router: ActivatedRoute, private route: Router) {
    this.router.queryParams
      .subscribe(params => {
        this.getPokemonData(params['id']);
      }
    );
  }

  getPokemonData(id: string) {
    this.getPokemon(id)
      .subscribe((response) => {
        this.informacoes.name = response.name;
        this.informacoes.urlFoto = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
        this.informacoes.altura = response.height;
        this.informacoes.peso = response.weight;
      });

  }

  getPokemon(id: string): Observable<any> {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  returnPokemons() {
    this.route.navigate(['']);
  }
}
