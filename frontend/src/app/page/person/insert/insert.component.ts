import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../../api/person.service';
import { HelperService } from '../../../helper/helper.service';

@Component({
	selector: 'person-insert',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './insert.component.html',
	styleUrl: './insert.component.scss'
})

export class PersonInsertComponent {
	frmInsertPerson: UntypedFormGroup;

	get firstNameFb(){ return this.frmInsertPerson.controls['firstName']; }
	get surNameFb(){ return this.frmInsertPerson.controls['surName']; }
	get dniFb(){ return this.frmInsertPerson.controls['dni']; }
	get genderFb(){ return this.frmInsertPerson.controls['gender']; }
	get birthDateFb(){ return this.frmInsertPerson.controls['birthDate']; }

	constructor(
		private helperService: HelperService,
		private formBuilder: FormBuilder,
		private personService: PersonService
	) {
		this.frmInsertPerson = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			surName: ['', [Validators.required]],
			dni: ['', [Validators.required, Validators.pattern(/^([0-9]{8})?$/)]],
			gender: ['', [Validators.required]],
			birthDate: ['', [Validators.required]]
		});
	}

	onClickBtnSubmit(): void {
		if(!this.frmInsertPerson.valid) {
			this.frmInsertPerson.markAllAsTouched();
			this.frmInsertPerson.markAsDirty();

			this.helperService.showErrorMessage(['Complete y corrija toda la información.']);

			return;
		}

		let formData: FormData = new FormData();

		formData.append('firstName', this.firstNameFb.value);
		formData.append('surName', this.surNameFb.value);
		formData.append('dni', this.dniFb.value);
		formData.append('gender', this.genderFb.value);
		formData.append('birthDate', this.birthDateFb.value);

		this.personService.insert(formData).subscribe({
			next: (response: any) => {
				switch(response.type) {
					case 'success':
						this.helperService.showSuccessMessage(response.listMessage[0]);

					break;

					case 'warning':
						this.helperService.showWarningMessage(response.listMessage);

					break;

					case 'error':
						this.helperService.showErrorMessage(response.listMessage);

					break;

					case 'exception':
						this.helperService.showExceptionMessage(response.listMessage);

					break;
				}

				if(response.type == 'success' || response.type == 'warning') {
					this.frmInsertPerson.reset();
				}
			},
			error: (error: any) => {
				this.helperService.showExceptionMessage([error]);
			}
		});
	}
}