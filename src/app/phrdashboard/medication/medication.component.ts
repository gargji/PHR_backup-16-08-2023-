import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { BaseComponent } from '../common/base.component';
import { ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
  providers: [DatePipe]
})
export class MedicationComponent extends BaseComponent implements OnInit {
  
  selectedCountry: any;
  filteredCountries: any[];
  countries: any;

  medication_drug:any
  medicationinsert: FormGroup;
  displayModal: boolean=false;
  patientID: any;
  patientproblemdata: any;
  summarymedicationdata: any;
  hospital_id: string;
  Branch_ID: any;
  Branch_id: string;
  showModalDialog() {
    this.displayModal = true;
}

 
  medicationdata :any;

  representatives:any;
  medicationlength:any
  // statuses:any;
  constructor(public healthrecordsservices: HealthrecordsservicesService,public confirmationservice:ConfirmationService, public messageserveice:MessageService, private ngxLoader: NgxUiLoaderService ,private router:Router, private datepipe: DatePipe) { 
    super()
  }
  cars = [
    {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
]
items: MenuItem[] | undefined;
    sortOrder: number;
    sortField: string;

  ngOnInit(): void {
    this.items = [
      // {
      //        label: 'Edit',
      //        icon: 'pi pi-fw pi-pencil',
      //        command: () => {

      //     console.log(this.menuid,"THIS IS MENUID")


      //     this.edit_medication(this.menuid)

      //        }
      //    },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',

        command: () => {
          //  this.delete_procedure(this.menuid)
          console.log(this.menuid)
          this.medication_delete(this.menuid)

        }
      }
      ,
      {
        label: 'Notification',
        icon: 'fa fa-bell',
        //    command: () => {
        //      this.delete_procedure(this.menuid)

        //  }
      }
    ];



    // 28/09/2-23
    this.hospital_id = localStorage.getItem('hospital_id')
    this.hospital_id = JSON.parse(this.hospital_id);
    this.Branch_id = localStorage.getItem('organization_id')
    this.Branch_ID = JSON.parse(this.Branch_id);
    // 28/09/2-23



    var patientid = localStorage.getItem('guid')
    // console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    this.ngxLoader.start();
 



  var patientid=localStorage.getItem('guid')
  console.log(patientid);
  this.patientID=JSON.parse(patientid || '{}')
  console.log(this.patientID);

   
  this.getpatientproblem()
  this.getmedicationdata();
  this.getMed_Frequency_data();
  this.getMed_Instrations_data();
  this.getMed_dose_quantity()

    // this.getmedicationdata();
    this.medicationinsert = new FormGroup({
      medication_insert: new FormControl('', [Validators.required]),
      Frequency_name: new FormControl('', [Validators.required]),
      dose: new FormControl(null),
      dose_unit: new FormControl(""),
      Patient_instration: new FormControl('', [Validators.required]),
      Patient_reason: new FormControl(""),
      start_date: new FormControl('', [Validators.required]),
      End_date: new FormControl('', [Validators.required]),
      note: new FormControl('')
    })


  }
  isLoading: boolean ;

  getmedicationdata() {
    // console.log(this.patientID);
    this.ngxLoader.startLoader('loader-01');
    this.isLoading = true
    this.healthrecordsservices.getmedicationDate(this.patientID).subscribe((data: any) => {
      console.log('test data', data);
      console.log(data.length);
      this.summarymedicationdata = data
      this.medicationlength = data.length
      this.ngxLoader.stopLoader("loader-01");
      this.isLoading = false
    })
  }


  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

// submit_madiactiondata(){
//   this.medicationinsert = new FormGroup({
//     medicationdata: new FormControl(''),
 
//   });
//   console.log(this.medicationinsert);
// }

submit_madiaction() {
  console.log(this.summarymedicationdata, "push hone se phle")
  if (this.medicationFormAndGrid(this.medicationinsert)) {

    let dateformat = new Date(this.medicationinsert.value.start_date);
    this.medicationinsert.value.start_date = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
    console.log(this.medicationinsert.value.start_date, "new date")

    let dateformat1 = new Date(this.medicationinsert.value.End_date);
    this.medicationinsert.value.End_date = this.datepipe.transform(dateformat1, 'yyyy-MM-dd');
    console.log(this.medicationinsert.value.End_date, "new date")
    console.log(this.medicationinsert.value);

    this.healthrecordsservices.submit_madiaction(this.medicationinsert.value, this.patientID, this.hospital_id, this.Branch_ID).subscribe((data: any) => {


      //  for show current data
      var medicationdata = this.medicationinsert.value.medication_insert.name;
      var Frequencydata = this.medicationinsert.value.Frequency_name.name;
      var Patientinstration = this.medicationinsert.value.Patient_instration.name;
      var startnew_date = this.medicationinsert.value.start_date;
      var Dose = this.medicationinsert.value.dose;
      var Resion = this.medicationinsert.value.Patient_reason
      var doseUnit = this.medicationinsert.value.dose_unit;
      var note = this.medicationinsert.value.note

      var startdatemed = new Date(startnew_date);
      var medidatemed = startdatemed.toISOString().split('T')[0];

      var endnew_date = this.medicationinsert.value.End_date;
      var enddatemed = new Date(endnew_date);
      var medicaEnd = enddatemed.toISOString().split('T')[0];

      var id1 = data.result.insertId
      // console.log(data);
      // var Instructionsforpatient
      var obj = {
        ClinicalDrugName: medicationdata,
        FrequencyName: Frequencydata,
        Instructionsforpatient: Patientinstration,
        StartingDat: medidatemed,
        EndDate: medicaEnd,
        id: id1,
        Dose: Dose,
        IndicationName: Resion.problem_name,
        doseUnit: doseUnit.name,
        notes: note,
        transaction_by: 'patient'

      }
      // StartingDat
      this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
      this.displayModal = false
      console.log(this.summarymedicationdata, "push hone se phle")
      this.summarymedicationdata.push(obj)
      // this.getmedicationdata()
      console.log(this.summarymedicationdata, "afterpush");
      // for(let i=0; i< this.summarymedicationdata.length; i++){
      //   this.unitDoesData = this.summarymedicationdata[i].doseUnit;


      // }

      var mardication = data;
      this.medication_drug = mardication

    })
  }
  else {
    this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
  }
}


filterCountry(event:any){
  console.log(event);
  console.log(event.query);
  this.healthrecordsservices.master_drug(event.query).subscribe((data: any) => {
    console.log(data);
  this.medication_drug=data
  } )
}

Medication(event:any){
  this.medicationinsert.reset();
}

Frequencyshow:any;
getMed_Frequency_data() {

  this.healthrecordsservices.getMedFrequencydataShow(this.patientID).subscribe((data: any) => {
 
    console.log('test data',data);
    console.log(data.length);
    this.Frequencyshow=data
    // this.medicationlength=data.length
  })

}

Instrationsshow:any;
getMed_Instrations_data() {

  this.healthrecordsservices.getMedInstrationsdataShow(this.patientID).subscribe((data: any) => {
 
    console.log('test data',data);
    console.log(data.length);
    this.Instrationsshow=data
    // this.medicationlength=data.length
  })

}
filterMedication(event: any) {
  console.log(event);
  console.log(event.query);
  this.healthrecordsservices.master_drug(event.query).subscribe((data: any) => {
    console.log(data, "this is medication  filter data");
    this.medication_drug = data
  })
}
dose_quantity: any
getMed_dose_quantity() {

  this.healthrecordsservices.getMeddosequantity(this.patientID).subscribe((data: any) => {

    console.log('test data', data);
    console.log(data.length);
    this.dose_quantity = data
    // this.medicationlength=data.length
  })

}

getpatientproblem() {
  this.ngxLoader.startLoader("loader-01");
  this.healthrecordsservices.getpatientproblem(this.patientID).subscribe((data: any) => {
    // console.log(data);
    // console.log(data.length);
    this.patientproblemdata = data
    this.medicationlength = data.length
    this.ngxLoader.stopLoader("loader-01");
  })
}
menuid:any
data(value){
  console.log(value)
  this.menuid=value.id
}


medication_delete(id: any) {
  this.confirmationservice.confirm({
    message: 'Remove Form Dashboard And Show On history?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {

      // for delete static
      console.log(id)

      const foundItem = this.summarymedicationdata.filter(item => item.id === id);
      console.log(foundItem)
      if (foundItem[0].transaction_by == "patient") {

        this.healthrecordsservices.delete_medication(id).subscribe((data: any) => {


          console.log(this.summarymedicationdata, "delete medication")
          const index = this.summarymedicationdata.findIndex(object => {
            return object.id === id;
          });


          console.log(index);
          // this.healthrecordsservices.delete_Allergy(id).subscribe((data: any) => {
          //   console.log(data,"this is remove allergy data");





          // for the static delete
          console.log(
            this.summarymedicationdata.splice(index, 1), "ho rha h")
          console.log(this.summarymedicationdata, "splice hone ke baad");

          // for the static delete


          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Medication  Data Has Been Deleted' });
          this.displayModal = false
          this.menuid = ""
          // this.getpatientproblem()

        })
      }
      else {
        this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You did not Delete Data Option' });
      }

      // return


    },
    reject: (type: any) => {
      this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
    }
  });


}
}

