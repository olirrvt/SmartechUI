import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItensCarrinho } from 'src/app/models/ItensCarrinhos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'https://localhost:7132/api/Carrinho';

  constructor(private http: HttpClient) {}

  criarCarrinho(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/CriarCarrinho`, {}).pipe(
      catchError(this.handleError)
    );
  }

  adicionarItem(carrinhoId: number, item: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/AdicionarItem/${carrinhoId}`, item).pipe(
      catchError(this.handleError)
    );
  }

  removerItem(carrinhoId: number, itemId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${carrinhoId}/removerItem/${itemId}`).pipe(
      catchError(this.handleError)
    );
  }

  verItensCarrinho(carrinhoId: number): Observable<ItensCarrinho[]> { // Use o tipo correto aqui
    return this.http.get<ItensCarrinho[]>(`${this.apiUrl}/${carrinhoId}/verItensCarrinho`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}