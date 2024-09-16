import { Component, TemplateRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GeneralService } from './api/general.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HelperService } from './helper/helper.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	providers: [
		BsModalService
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent {
	constructor(
		public helperService: HelperService,
		private generalService: GeneralService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.generalService.indexGet().subscribe({
			next: (response: any) => {
				console.log(response);
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	changeView(route: string): void {
		this.router.navigateByUrl(route);
	}

	closeGlobalMessage(): void {
		document.getElementById('globalMessage')!.style.display = 'none';
	}

	logout(): void {
		localStorage.removeItem('idUser');
		localStorage.removeItem('userName');
		localStorage.removeItem('token');

		this.router.navigateByUrl('user/login');
	}
}