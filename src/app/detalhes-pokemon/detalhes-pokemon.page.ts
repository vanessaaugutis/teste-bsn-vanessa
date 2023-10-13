import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: 'detalhes-pokemon.page.html',
  styleUrls: []
})
export class DetalhesPokemonPage {
  public informacoes = [];

  constructor(private httpClient: HttpClient, private router: ActivatedRoute) {
    this.router.queryParams
      .subscribe(params => {
        this.getPokemonData(params['id']);
      }
    );
  }

  getPokemonData(id: string) {
    this.getPokemon(id)
      .subscribe((response) => {
        console.log(response)
      });

  }

  getPokemon(id: string): Observable<any> {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }
}
