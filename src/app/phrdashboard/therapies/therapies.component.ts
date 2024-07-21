import { Component, OnInit } from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-therapies',
  templateUrl: './therapies.component.html',
  styleUrls: ['./therapies.component.css']
})
export class TherapiesComponent extends BaseComponent implements OnInit {
  therapyTypeDetails: any;
  therapyListDetails: any;
  therapyRecords: any;
  therapyForm: FormGroup;
  therapyRecordsLength: number;
  displayModal: boolean = false;
  selectedTypeData: any;
  patientID: any;
  hospitalID: any;
  branchID: any;
  items: MenuItem[] | undefined;
  menuId: any;

  cars = [
    { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
  ]

  constructor(private healthRecordsServices: HealthrecordsservicesService, private fb: FormBuilder, private messageService: MessageService) {
    super();
  }

  ngOnInit() {
    this.getLocalStorageDetails();
    this.getTherapyType();
    this.getAllTherapyRecords();
    this.therapyForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      note: [''],
    });
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
  }

  getLocalStorageDetails() {
    var patient_Id = localStorage.getItem('guid');
    this.patientID = JSON.parse(patient_Id || '{}');
    var hospital_Id = localStorage.getItem('organization_id');
    this.hospitalID = JSON.parse(hospital_Id || '{}');
    var branch_Id = localStorage.getItem('hospital_Id');
    this.branchID = JSON.parse(branch_Id || '{}');
  }

  getTherapyType() {
    this.healthRecordsServices.getAllTherapyType().subscribe((res) => {
      this.therapyTypeDetails = res;
    })
  }

  getTherapyList(event: any) {
    this.selectedTypeData = event.value.name;
  }
  data(value) {
    this.menuId = value.id;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  formHideOnReset(event: any) {
    this.therapyForm.reset();
  }

  filterProcedure(event: any) {
    let data = {
      data: this.selectedTypeData,
      name: event.query
    }
    this.healthRecordsServices.getTherapyNameList(data).subscribe((res: any) => {
      this.therapyListDetails = res;
    })
  }

  getAllTherapyRecords() {
    const payload = {
      patientId: this.patientID,
      hospitalId: this.hospitalID,
      branchId: this.branchID
    }
    this.healthRecordsServices.getAllTherapyRecords(payload).subscribe((res) => {
      this.therapyRecords = res;
      this.therapyRecordsLength = this.therapyRecords.length;
    })
  }

  addTherapy() {
    if (!this.therapyForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Please Enter Valid Form Details' });
      return;
    }
    const payload = {
      type: this.therapyForm.value.type.id,
      name: this.therapyForm.value.name.id,
      startDate: this.therapyForm.value.startDate,
      endDate: this.therapyForm.value.endDate,
      time: this.therapyForm.value.time,
      note: this.therapyForm.value.note,
      patientId: this.patientID,
      hospitalId: this.hospitalID,
      branchId: this.branchID
    }
    this.healthRecordsServices.addTherapy(payload).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.therapyForm.reset();
        this.getAllTherapyRecords();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
      }
    })
  }

  deleteTherapy(id: any) {
    let therapyId = id;
    this.healthRecordsServices.deleteTherapyById(therapyId).subscribe((res) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Record Has Been Successfully Deleted' });
        this.getAllTherapyRecords();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Canceled Request', detail: 'Your Record Was Not Deleted' });
      }
    })
  }

}
