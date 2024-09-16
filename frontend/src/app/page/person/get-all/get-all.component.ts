import { Component, TemplateRef } from '@angular/core';
import { PersonService } from '../../../api/person.service';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { HelperService } from '../../../helper/helper.service';

@Component({
	selector: 'person-get-all',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './get-all.component.html',
	styleUrl: './get-all.component.scss'
})

export class PersonGetAllComponent {
	frmEditPerson: UntypedFormGroup;

	listPerson: any[] = [];
	indexToModify: number = -1;

	get idPersonFb(){ return this.frmEditPerson.controls['idPerson']; }
	get firstNameFb(){ return this.frmEditPerson.controls['firstName']; }
	get surNameFb(){ return this.frmEditPerson.controls['surName']; }
	get dniFb(){ return this.frmEditPerson.controls['dni']; }
	get genderFb(){ return this.frmEditPerson.controls['gender']; }
	get birthDateFb(){ return this.frmEditPerson.controls['birthDate']; }

	constructor(
		private helperService: HelperService,
		private formBuilder: FormBuilder,
		private personService: PersonService,
		private modalService: BsModalService
	) {
		this.frmEditPerson = this.formBuilder.group({
			idPerson: [null, []],
			firstName: [null, []],
			surName: [null, []],
			dni: [null, []],
			gender: [null, []],
			birthDate: [null, []]
		});
	}

	ngOnInit() {
		this.personService.getAll().subscribe({
			next: (response: any) => {
				this.listPerson = response.dto.listPerson;
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	delete(idPerson: string, index: number): void {
		this.personService.delete(idPerson).subscribe({
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
					this.listPerson.splice(index, 1);
				}
			},
			error: (error: any) => {
				this.helperService.showExceptionMessage([error]);
			}
		});
	}

	showModal(modalEditPerson: TemplateRef<any>, index: any): void {
		this.indexToModify = index;

		this.idPersonFb.setValue(this.listPerson[index].idPerson);
		this.firstNameFb.setValue(this.listPerson[index].firstName);
		this.surNameFb.setValue(this.listPerson[index].surName);
		this.dniFb.setValue(this.listPerson[index].dni);
		this.genderFb.setValue(this.listPerson[index].gender.toString());
		this.birthDateFb.setValue(this.listPerson[index].birthDate.toString().substring(0, 10));

		this.modalService.show(modalEditPerson);
	}

	closeModal(): void {
		this.modalService.hide();
	}

	onClickSaveChanges(): void {
		let formData: FormData = new FormData();

		formData.append('idPerson', this.idPersonFb.value);
		formData.append('firstName', this.firstNameFb.value);
		formData.append('surName', this.surNameFb.value);
		formData.append('dni', this.dniFb.value);
		formData.append('gender', this.genderFb.value);
		formData.append('birthDate', this.birthDateFb.value);

		this.personService.update(formData).subscribe({
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
					this.listPerson[this.indexToModify].firstName = this.firstNameFb.value;
					this.listPerson[this.indexToModify].surName = this.surNameFb.value;
					this.listPerson[this.indexToModify].dni = this.dniFb.value;
					this.listPerson[this.indexToModify].gender = this.genderFb.value == 'true';
					this.listPerson[this.indexToModify].birthDate = this.birthDateFb.value;

					this.modalService.hide();
				}
			},
			error: (error: any) => {
				this.helperService.showExceptionMessage([error]);
			}
		});
	}
}