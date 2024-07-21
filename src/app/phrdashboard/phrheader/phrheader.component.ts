import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommanserviceService } from 'src/app/commanservice.service';
import { PatientAppointmentService } from '../HealthRecordsServices/patient-appointment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-phrheader',
  templateUrl: './phrheader.component.html',
  styleUrls: ['./phrheader.component.css']
})
export class PHRheaderComponent implements OnInit {
  username: any;
  usernames: any;
  singlecarreataer: any
  guid: any
  guid1: any
  accountinfo: any
  changepassword: any
  displayModal: boolean = false
  hospital_id: string;
  Branch_ID: any;
  Branch_id: string;
folderdata: any[];
  Hospitalclinicname: any;
  Hospitalclinicnamelength: any;
activeTab: any;
  
  constructor(private commanService: CommanserviceService, public messageservice: MessageService,public patientappointmentservices: PatientAppointmentService,) { }

  ngOnInit(): void {
    // this.setting()
    this.username = localStorage.getItem('user_name')
    this.usernames = JSON.parse(this.username);
    // this.guid = localStorage.getItem('guid')
    // this.guid1 = JSON.parse(this.guid);
    // 28/09/2-23
    this.hospital_id = localStorage.getItem('hospital_id')
    this.hospital_id = JSON.parse(this.hospital_id);
    this.Branch_id = localStorage.getItem('organization_id')
    this.Branch_ID = JSON.parse(this.Branch_id);
    // 28/09/2-23



    var patientid = localStorage.getItem('guid')
    // console.log(patientid);
    this.guid1 = JSON.parse(patientid || '{}')
    const x = this.usernames;
    this.singlecarreataer = x.substring(0, 1);

    this.accountinfo = new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      mname: new FormControl(''),
      phone: new FormControl(''),
      Country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      email: new FormControl(''),

    })


    this.changepassword = new FormGroup({
      cuurentpass: new FormControl(""),
      newpass: new FormControl(""),
      confirmnewpass: new FormControl('')
    })

    // this.getmail()
   this.createform()
   this.getHospitalClinicName()
   this.getsharerecorddata()
  //  this.getHospitalClinicName()
  }
  // }
  show = false;
  hover() {
    this.show = true;
    console.log('hover');

  }
  //  show:boolean 
  show1: boolean = false
  userdata: any
  setting() {
    this.activeTab = 'home';
    this.show1 = true; //

    console.log(this.guid1)
    this.commanService.getuserdata(this.guid1).subscribe((res) => {
      console.log(res)

      this.userdata = res[0]
      console.log(this.userdata?.Country)

      this.accountinfo.patchValue({

        fname: this.userdata.firstName,
        lname: this.userdata.lastName,
        mname: this.userdata.middleName,
        phone: this.userdata.mobilePhone,
        Country: this.userdata?.Country,
        state: this.userdata.state,
        city: this.userdata.city,
        //  email:this.userdata.emailId1,



      }
      )

    })
    this.getcountry()
  }

  emailedit() {
    const url = `${environment.accounturl}${this.guid1}`;

    // Open the URL in a new tab
    window.open(url, "_blank");
  }
  countrydata: any
  getcountry() {
    this.commanService.getcountry().subscribe((res) => {
      console.log(res)
      this.countrydata = res
    })
  }

  filtercountry(event: any) {
    console.log(event);
    console.log(event.query);
    this.commanService.getcountry1(event.query).subscribe((data: any) => {
      console.log(data, "this is medication  filter data");
      this.countrydata = data
    })
  }
  statedata: any
  getstate(event: any) {

    // autocompleteInput.classList.add('custom-class-2');
    console.log(event.countrycode)
    this.commanService.getstate(event.countrycode).subscribe((data) => {
      console.log(data)
      this.statedata = data
    })

    // console.log(event.query)
  }
  citydata: any
  getcity(event: any) {
    console.log(event.value.countrycode)
    this.commanService.getcity(event.value.countrycode, event.value.states_name).subscribe((data) => {
      console.log(data)
      this.citydata = data
    })

    // console.log(event.query)
  }



  chnagepass() {
    console.log(this.changepassword.value)
    if (this.changepassword.value.newpass == this.changepassword.value.confirmnewpass) {


      this.commanService.chnagepass(this.guid1, this.changepassword.value).subscribe((res) => {
        console.log(res)
        if (res == 200) {
          this.messageservice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Changed Your Password ' });
          this.show1 = false
          this.changepassword.reset()
        }
        else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Current password not match' });
        }
      })

    }
    else {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'new password and confirm password not matched ' });
    }
  }

  checked: any
  sharerecord() {
    this.displayModal = true
  }
  sharerecordfrom: FormGroup;
  createform(){
    this.sharerecordfrom = new FormGroup({
      orgamization_name:new FormControl(''),
      hospitalname:new FormControl('',Validators.required),
      Medication: new FormControl(false),
      Allergies: new FormControl(false),
      Labs: new FormControl(false),
      Problem_List: new FormControl(false),
      Procedures: new FormControl(false),
      Diet: new FormControl(false),
      Immunizations: new FormControl(false),
      Therapies: new FormControl(false),
      Documents: new FormControl(false),
      Family_History: new FormControl(false)
    });
  }  
  onSubmit(event){
    // Your form submission logic goes here
    console.log('Form submitted:', this.sharerecordfrom.value);

const updateddata=this.transformFormData( this.sharerecordfrom.value)
console.log(updateddata)
if(this.sharerecordfrom.valid){
    this.commanService.sharerecorddata(this.guid1,this.hospital_id,this.Branch_ID, updateddata).subscribe((data)=>{
      console.log(data)
 if(data='success'){
  this.messageservice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Changed ' });
  this.getsharerecorddata()
  this.displayModal=false
 }
    })
  }else{
    this.messageservice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field'});
  }
  }
  transformFormData(formData: any): any {
    
    const transformedData = {};
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        // Check if the key is 'hospitalname'
        if (key === 'hospitalname') {
          transformedData[key] = formData[key]; // Leave unchanged
          console.log( transformedData[key],"unchange")
        } else {
          transformedData[key] = formData[key] ? 1 : 0; // Convert boolean values to 0 and 1
        }
      }
    }
    return transformedData;
  }
  sharerecorddata:any
  recordeddata:any
  getsharerecorddata() {
    this.commanService.getsharerecorddata(this.guid1).subscribe((data) => {
      this.sharerecorddata = data;
      if(this.sharerecorddata.length >0){
        console.log(this.sharerecorddata, "share record");
    
        this.recordeddata = this.sharerecorddata[0];
        const rahArray = []; // Array to accumulate filtered hospital names
    
        if (this.sharerecorddata) {
          this.sharerecorddata.forEach(element => {
            var ss = element.branch_id;
            console.log(ss);
    
            var rah = this.Hospitalclinicname.filter(id => id.hospitalid === ss);
            console.log(rah, "filter data");
    
            rahArray.push(...rah); // Accumulate filtered hospital names
            this.sharerecordfrom.patchValue({
     
              Medication: this.recordeddata.Medication === 1 ? true : false,
              Allergies: this.recordeddata.Allergies === 1 ? true : false,
              Labs: this.recordeddata.Labs === 1 ? true : false,
              Problem_List: this.recordeddata.Problem === 1 ? true : false,
              Procedures: this.recordeddata.procedurePHR === 1 ? true : false,
              Diet: this.recordeddata.Diet === 1 ? true : false,
              Immunizations: this.recordeddata.Immunizations === 1 ? true : false,
              Therapies: this.recordeddata.Therapy === 1 ? true : false,
              Documents: this.recordeddata.Documents === 1 ? true : false,
              Family_History: this.recordeddata.Family_history === 1 ? true : false
            });
          });
    
          this.sharerecordfrom.patchValue({
            hospitalname: rahArray, // Patch with accumulated array of hospital names,
            // orgamization_name:rahArray[0].orgamization_name,
          });
    
       
        }
      }else{
        // this.getHospitalClinicName()
        var rah = this.Hospitalclinicname.filter(id => id?.hospitalid === this?.hospital_id);
        console.log(rah, "filter data");
 
        this.sharerecordfrom.patchValue({

            hospitalname: rah ,// Patch with accumulated array of hospital names
            // orgamization_name:rah[0].orgamization_name
        })
      }
     
    });
  }
  
  getHospitalClinicName() {
    console.log(this.Branch_ID);

    // this.ngxLoader.startLoader("loader-01");
    this.patientappointmentservices.getClinicNameservicess(this.Branch_ID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.Hospitalclinicname = data
      this.Hospitalclinicnamelength = data.length

      // this.recordeddata =  this.sharerecorddata[0];
console.log(this.Hospitalclinicname[0].organization_name,"sssssssssssssssssssssssss")
      this.sharerecordfrom.patchValue({
 
        orgamization_name:this.Hospitalclinicname[0].organization_name,
        
      })


      // this.ngxLoader.stopLoader("loader-01");
    })
  }
  // onHospitalChange(event: any): void {
  //   var rah = this.Hospitalclinicname.filter(id => id.hospitalid === this.hospital_id);
  //   console.log(rah, "filter data");
  //   this.sharerecordfrom.patchValue({

  //       hospitalname: rah // Patch with accumulated array of hospital names

  //   })
  //   const selectedOptions = event.value;
  //   const permanentlySelectedOption = 1; // ID of the permanently selected option

  //   // If the permanently selected option is being toggled, prevent the change
  //   if (selectedOptions.includes(permanentlySelectedOption) && selectedOptions.length > 1) {
  //     this.sharerecordfrom.controls['hospitalname'].setValue([permanentlySelectedOption]);
  //   }
  // }
  activetab(event: string): void {
    
    console.log(event, "event");
    const tabs = document.querySelectorAll('.nav');
    tabs.forEach((tab) => {
        tab.classList.remove('active-tab');
    });
    
    const clickedTab = document.querySelector(`.${event}`);
    if (clickedTab) {
        clickedTab.classList.add('active-tab');
    }
}

  
  }


  