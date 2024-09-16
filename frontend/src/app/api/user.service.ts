import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(
		private httpClient: HttpClient
	) {}

	public login(formData: FormData): Observable<any> {
		return this.httpClient.post<any>('http://localhost:8080/user/login', formData).pipe(retry(3));
	}
}