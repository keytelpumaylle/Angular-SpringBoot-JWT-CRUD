import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GeneralService {
	constructor(
		private httpClient: HttpClient
	) { }

	public indexGet(): Observable<any> {
		return this.httpClient.get('http://localhost:8080');
	}
}