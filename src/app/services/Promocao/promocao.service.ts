import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Promocao } from 'src/app/models/Promocao';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {
  private apiUrl = 'https://localhost:7132/api/Promocao';

  constructor(private http: HttpClient) {}

  getPromocaoById(id: number): Observable<Promocao> {
    return this.http.get<Promocao>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getPromocoes(): Observable<Promocao[]> {
    return this.http.get<Promocao[]>(`${this.apiUrl}/Promos`).pipe(
      catchError(this.handleError)
    );
  }

  cadastrarPromocao(promocao: Promocao): Observable<Promocao> {
    return this.http.post<Promocao>(`${this.apiUrl}/Cadastrar`, promocao).pipe(
      catchError(this.handleError)
    );
  }

  deletarPromocao(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Deletar/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}