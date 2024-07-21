import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { BaseComponent } from '../common/base.component';
import { ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { event } from 'jquery';
// import { BaseComponent } from '../common/base.component';
@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css'],
  providers:[DatePipe]
})
export class ProcedureComponent extends BaseComponent implements OnInit {
 
  // constructor() { }

  // ngOnInit(): void {
  // }
  items: MenuItem[] | undefined;
 
   
  selectedCountry: any;
  filteredCountries: any[];
  countries: any;

  medication_drug:any
  procedureinsert: FormGroup;
  displayModal: boolean=false;
  patientID: any;
  indication_data:any
  showModalDialog() {
    this.displayModal = true;
    this.isEdit=false
}

 
  medicationdata :any;

  representatives:any;
  medicationlength:any
  // statuses:any;
  constructor(public healthrecordsservices: HealthrecordsservicesService,public confirmationservice:ConfirmationService, public messageserveice:MessageService, private ngxLoader: NgxUiLoaderService,private datepipe: DatePipe) { 
    super()
  }
  cars = [
    {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
]

    sortOrder: number;
    sortField: string;
    hospital_ID:any
    branchID:any
  ngOnInit(): void {

    this.items = [
 {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          
     console.log(this.menuid)

     this.edit_procedure(this.menuid)
   
        }
    },
      {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: () => {
            this.delete_procedure(this.menuid)
           
        }
      }
  ];
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop(); 
    }, 2000);
  

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
  this.getMed_Instrations_data();
  this.procedureinsert= new FormGroup({
    procedure_name:new FormControl('',[Validators.required]),
    // procedure_type: new FormControl('',[Validators.required]),
    // Patient_instration:new FormControl('',[Validators.required]),
    procedure_indication:new FormControl('',[Validators.required]),
    start_date:new FormControl('',[Validators.required]),
    note:new FormControl(''),
  })


  this.proceduretypedata()

  }


 
  getmedicationdata(){
    this.ngxLoader.startLoader("loader-01"); 
    this.healthrecordsservices.getproceduredata(this.patientID).subscribe((data:any)=>{
      console.log(data);
      console.log(data.length);
      this.medicationdata=data
      this.medicationlength=data.length
      this.ngxLoader.stopLoader("loader-01"); 
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
//   this.procedureinsert = new FormGroup({
//     medicationdata: new FormControl(''),
 
//   });
//   console.log(this.procedureinsert);
// }

submit_procedure() {
  // var medication_value=this.procedureinsert.value.medication_insert.identifier
  console.log(this.procedureinsert.value,"ye values h")

// 

let dateformat = new Date(this.procedureinsert.value.start_date);
this.procedureinsert.value.start_date = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
console.log(this.procedureinsert.value.start_date,"new date")
// let dateformat1 = new Date(this.procedureinsert.value.from_date);
// this.procedureinsert.value.from_date = this.datepipe.transform(dateformat1, 'MM/dd/yyyy');





  if(this.procedureinsert.valid){
    this.healthrecordsservices.submit_procedure(this.procedureinsert.value, this.patientID,this.hospital_ID,this.branchID).subscribe((data: any) => {
      this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
      this.displayModal = false
      this.getmedicationdata();
     var mardication=data;
    this.medication_drug=mardication
    
    })
      }
  else{
    this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field'});
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
getMed_Instrations_data() {

  this.healthrecordsservices.getMedInstrationsdataShow(this.patientID).subscribe((data: any) => {
 
    console.log('test data',data);
    console.log(data.length);
    this.Instrationsshow=data
    // this.medicationlength=data.length
  })

}
proceduretype:any

  
proceduretypedata(){
this.healthrecordsservices.get_procedure_type().subscribe((res)=>{
console.log(res)
this.proceduretype=res
console.log(this.proceduretype,"procedure")

})
}

delete_procedure(id: any) {
  this.confirmationservice.confirm({
    message: 'Remove Form Dashboard And Show On history?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      console.warn(id,"this is id")
      console.log(id)
      this.healthrecordsservices.delete_Procedure(id).subscribe((data: any) => {
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
}
