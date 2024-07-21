import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css'],
})
export class DietComponent extends BaseComponent implements OnInit {
  dietTypeDetails: any;
  dietRecords: any;
  dietRecordsLength: number;
  addDietForm: FormGroup;
  intakeDetails: any;
  medication_drug: any;
  displayModal: boolean = false;
  patientID: any;
  hospitalID: any;
  branchID: any;
  items: MenuItem[] | undefined;
  menuId: any;

  constructor(
    private healthRecordsServices: HealthrecordsservicesService,
    private fb: FormBuilder, private messageService: MessageService
  ) {
    super();
  }

  cars = [{ brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' }];

  ngOnInit() {
    this.getLocalStorageDetails();
    this.getAllDietType();
    this.addDietForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      intake: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      note: ['',]
    });
    this.intakeDetails = [
      { name: 'Include', id: 'Include' },
      { name: 'Rotate', id: 'Rotate' },
      { name: 'Eliminate', id: 'Eliminate' },
    ];
    
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
      }
    ];
    this.getAllDietRecords();
  }

  getLocalStorageDetails() {
    var patient_Id = localStorage.getItem('guid');
    this.patientID = JSON.parse(patient_Id || '{}');
    var hospital_Id = localStorage.getItem('organization_id');
    this.hospitalID = JSON.parse(hospital_Id || '{}');
    var branch_Id = localStorage.getItem('hospital_Id');
    this.branchID = JSON.parse(branch_Id || '{}');
  }

  getAllDietType() {
    this.healthRecordsServices.getAllDietType().subscribe((res) => {
      this.dietTypeDetails = res;
    });
  }

 

  getAllDietRecords() {
    const payload = {
      patientId: this.patientID,
      hospitalId: this.hospitalID,
      branchId: this.branchID
    }
    this.healthRecordsServices.getAllDietRecords(payload).subscribe((res) => {
      this.dietRecords = res;
      this.dietRecordsLength = this.dietRecords.length;
    })
  }


  addDiet() {
    if (!this.addDietForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Please Enter Valid Form Details' });
      return;
    }
    const payload = {
      name: this.addDietForm.value.name.id,
      type: this.addDietForm.value.type.id,
      intake: this.addDietForm.value.intake.id,
      startDate: this.addDietForm.value.startDate,
      endDate: this.addDietForm.value.endDate,
      note: this.addDietForm.value.note,
      patientId: this.patientID,
      hospitalId: this.hospitalID,
      branchId: this.branchID
    }
    this.healthRecordsServices.addDiet(payload).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.addDietForm.reset();
        this.getAllDietRecords();
        this.displayModal=false

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
      }
    })
  }

  deleteDiet(id: any) {
    let dietId = id;
    if (!dietId) {
      this.messageService.add({ severity: 'error', summary: 'Canceled Request', detail: 'Record Id Not Found' });
      return;
    }
    this.healthRecordsServices.deleteDietById(dietId).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Record Has Been Successfully Deleted' });
        this.getAllDietRecords();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Canceled Request', detail: 'Your Record Was Not Deleted' });
      }
    })
  }

  showModalDialog() {
    this.displayModal = true;
  }

  formHideOnReset(event: any) {
    this.addDietForm.reset();
  }

  filterProcedure(event: any) {
    this.healthRecordsServices
      .get_procedure_data(event.query)
      .subscribe((data: any) => {
        this.medication_drug = data;
      });
  }
  menuid:any
  data(value){
    console.log(value)
    this.menuid=value.id
  }
}
