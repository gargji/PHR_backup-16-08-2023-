import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { DatePipe } from '@angular/common';
import { BaseComponent } from '../common/base.component';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
  providers:[DatePipe]
})
export class PharmacyComponent extends BaseComponent implements OnInit {
  items: MenuItem[] | undefined;
 
   
  selectedCountry: any;
  filteredCountries: any[];
  countries: any;

  medication_drug:any
  procedureinsert: FormGroup;
  displayModal: boolean=false;
  patientID: any;
  indication_data:any
  hospital_ID: any;
  branchID: any;
patientproblemdata: any[];
  results: any;
  distict1: any;
  postalcode1: any;
  city: any;
  showModalDialog() {
    this.displayModal = true;
    this.isEdit=false
}

 
  medicationdata :any;

  representatives:any;
  medicationlength:any
  constructor(public healthrecordsservices: HealthrecordsservicesService,public confirmationservice:ConfirmationService, public messageserveice:MessageService, private ngxLoader: NgxUiLoaderService,private datepipe: DatePipe) { 
    super()
  }
  cars = [
    {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
]
  ngOnInit(): void {
    // this.ngxLoader.start();
    // setTimeout(() => {
    //   this.ngxLoader.stop(); 
    // }, 2000);
  

    setTimeout(() => {
      
    }, 2000); 



  var patientid=localStorage.getItem('guid')
  console.log(patientid);
  this.patientID=JSON.parse(patientid || '{}')
  console.log(this.patientID);
  var hospital_id=localStorage.getItem('organization_id')
  console.log(hospital_id,"hospital id");
 this.hospital_ID=JSON.parse(hospital_id || '{}')
   console.log(this.hospital_ID)
   var branch_id=localStorage.getItem('hospital_id')
   this.branchID=JSON.parse(branch_id || '{}')
console.log(this.branchID)

  this.getmedicationdata();
  // this.get_procedure_data();
  // this.getMed_Instrations_data();
  this.procedureinsert = new FormGroup({
    Pharmacy_Name: new FormControl('', Validators.required),
    Pharmacy_Email: new FormControl('', Validators.required),
    Mobile: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required)
  });


  // this.proceduretypedata()

  }

  

 
  getmedicationdata(){
    this.ngxLoader.startLoader("loader-01"); 
    this.healthrecordsservices.getpharmacydata(this.patientID).subscribe((data:any)=>{
      console.log(data);
      console.log(data.length);
      this.medicationdata=data
      this.medicationlength=data.length
      this.ngxLoader.stopLoader("loader-01"); 
    })
  }


  onSortChange(event:any) {
    let value = event.value;

    // if (value.indexOf('!') === 0) {
    //     this.sortOrder = -1;
    //     this.sortField = value.substring(1, value.length);
    // }
    // else {
    //     this.sortOrder = 1;
    //     this.sortField = value;
    // }
}

// submit_madiactiondata(){
//   this.procedureinsert = new FormGroup({
//     medicationdata: new FormControl(''),
 
//   });
//   console.log(this.procedureinsert);
// }

submit_procedure() {
  // var medication_value=this.procedureinsert.value.medication_insert.identifier
  if(this.procedureinsert.valid){
    console.log(this.procedureinsert.value,"ye values h")

    this.healthrecordsservices.submitpharmacydata(this.patientID,this.hospital_ID,this.branchID,this.procedureinsert.value).subscribe((res)=>{
      console.log(res)
      if(res=="success"){
    this.procedureinsert.reset()
    this.displayModal=false
    this.getmedicationdata()
      }
    })
  }else{
    this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
  }






}

filterProcedure(event:any){
  console.log(event);
  console.log(event.query);
  this.healthrecordsservices.get_procedure_data(event.query).subscribe((data: any) => {
    console.log(data);
  this.medication_drug=data
  } )
}


filterindication(event:any){
  console.log(event);
  console.log(event.query);
  this.healthrecordsservices.get_indication_data(event.query).subscribe((data: any) => {
    console.log(data);
  this.indication_data=data
  } )
}

Medication(event:any){
  this.procedureinsert.reset();
}

Frequencyshow:any;
// get_procedure_data() {

//   this.healthrecordsservices.get_procedure_data(this.patientID).subscribe((data: any) => {
 
//     console.log('procedata data',data);
//     console.log(data.length);
//     this.Frequencyshow=data
//     // this.medicationlength=data.length
//   })

// }

Instrationsshow:any;

proceduretype:any

  


delete_procedure(id: any) {
  this.confirmationservice.confirm({
    message: 'Remove Form Dashboard And Show On history?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      console.warn(id,"this is id")
      console.log(id)
      this.healthrecordsservices.delete_Pharmacy(id).subscribe((data: any) => {
        this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Health Issues Data Has Been Deleted' });
        // this.displayBasic = false
        // this.getReasonOfVisit()
        this.menuid=''
        this.getmedicationdata();

      })
    },
    reject: (type: any) => {
      this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
    }
  });
}
patchdata:any;
isEdit:boolean=false;
editid:any
edit_procedure(id:any){

 this.showModalDialog()
 this.isEdit = true;
this.healthrecordsservices.edit_procedure(id).subscribe((data:any)=>{

this.patchdata = data[0];  
this.editid=data[0].id
console.log(this.patchdata)

 const procedure_date=this.datepipe.transform(this.patchdata.start_date, 'dd/MM/yyyy');
 
 
 console.log("this is the formated date",procedure_date);
 
  // this.procedureinsert.patchValue(this.patchdata);
  this.procedureinsert.patchValue({
     start_date:procedure_date,
     note:this.patchdata.note
  });
  var obj={id:this.patchdata?.procedur,name:this.patchdata.name}
  var obj1={id:this.patchdata?.IndicationForProcedure,term:this.patchdata.procedure_indication }
  
  this.procedureinsert.patchValue({procedure_name:obj});
  this.procedureinsert.patchValue({procedure_indication:obj1});

  // this.displayBasic = false
  // this.getReasonOfVisit()


  // this.getmedicationdata();
}) 
}

update_procedure(id:any){
console.log(id,this.procedureinsert.value,"this is update value")

let dateformat = new Date(this.procedureinsert.value.start_date);
this.procedureinsert.value.start_date = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
console.log(this.procedureinsert.value.start_date,"new date")

if(this.procedureinsert.valid){
  console.log(this.procedureinsert.value,"hhhhhhhhhhhhhhhh")
  this.healthrecordsservices.update_procedure(this.procedureinsert.value, id).subscribe((data: any) => {
    this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully updated' });
    this.displayModal = false
    this.menuid=''
    this.getmedicationdata();
   var mardication=data;
  this.medication_drug=mardication
  
  })
    }
else{
  this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field'});
}

}
menuid:any
data(value){
  console.log(value)
  this.menuid=value.id
}

findCountry(event) {
  // if (event.query.length >= 2) {
  console.log(event);

  //   this.timer = setTimeout(() => {
  this.healthrecordsservices.findCountry(event.query).subscribe((data: any) => {
    this.procedureinsert.patchValue({ mobilecodes: data.mobilecodes })
    this.results = data
    console.log(this.results);

  });
  //   }, 700);
  // }
} state1: any
getStatesdataSelectedCountry(event) {

  console.log(event);
  this.procedureinsert.patchValue({ mobilecodes: event.mobileCode })
  if (event.countrycode) {
    this.healthrecordsservices.getStatesAPI(event.countrycode).subscribe((data: any) => {
      this.state1 = data
      console.log(data);

    })
  }
  else {
    this.healthrecordsservices.getStatesAPI(event.country).subscribe((data: any) => {
      this.state1 = data
      console.log(data);

    })
  }
  //     this.getMobilecode(event)
  //     this.getTimeZoneCountrywise(event)
}
getStatesdataSelectedDistric(event) {
  console.log(event);

  this.healthrecordsservices.getDistrictDataAPI(event.value).subscribe((data: any) => {
    console.log(data);

    this.distict1 = data
  })

}

selectDistictData(event) {
  this.healthrecordsservices.getPincodesAccToDistrictAPI(event).subscribe((data: any) => {
    console.log(data);

    this.postalcode1 = data;
    this.city = data
    // console.log(this.postalcode1);

  });
}
postalcode: any
findPostalCode(event) {
  this.healthrecordsservices.findPostalCode(event.query).subscribe((data: any) => {
    this.postalcode = data

  })
}

}
