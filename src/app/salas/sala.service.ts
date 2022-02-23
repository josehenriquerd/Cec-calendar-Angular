import { Sala } from './../models/Sala';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAllJSDocTags } from 'typescript';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  baseUrl = `${environment.BaseUrl} + /v1/locais`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.baseUrl}/${id}`);
  }
}
