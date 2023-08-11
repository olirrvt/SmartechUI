import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Produto } from 'src/app/models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7132/api/Produto';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> { 
    return this.http.get<Produto[]>(`${this.apiUrl}/Produtos`).pipe(
      catchError(this.handleError)
    );
  }

  getProdutoById(id: number): Observable<Produto> { 
    return this.http.get<Produto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  inserirProduto(produto: Produto): Observable<Produto> { 
    return this.http.post<Produto>(`${this.apiUrl}/Inserir`, produto).pipe(
      catchError(this.handleError)
    );
  }

  editarProduto(id: number, produto: Produto): Observable<Produto> { 
    return this.http.put<Produto>(`${this.apiUrl}/Editar/${id}`, produto).pipe(
      catchError(this.handleError)
    );
  }

  deletarProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Deletar/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}