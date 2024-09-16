import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PersonService {
	constructor(
		private httpClient: HttpClient
	) { }

	public insert(formData: FormData): Observable<any> {
		return this.httpClient.post('http://localhost:8080/person/insert', formData).pipe(retry(3));
	}

	public getAll(): Observable<any> {
		return this.httpClient.get<any>('http://localhost:8080/person/getall').pipe(retry(3));
	}

	public delete(idPerson: string): Observable<any> {
		return this.httpClient.delete<any>(`http://localhost:8080/person/delete/${idPerson}`).pipe(retry(3));
	}

	public update(formData: FormData): Observable<any> {
		return this.httpClient.post('http://localhost:8080/person/update', formData).pipe(retry(3));
	}
}