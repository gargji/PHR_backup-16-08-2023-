import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from "jquery";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../common/base.component';
import { PatientAppointmentService } from '../HealthRecordsServices/patient-appointment.service';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { LogColor } from 'auth-guard/dist/lib/util';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  providers:[DatePipe]
})
export class BookAppointmentComponent extends BaseComponent implements OnInit {
  totaltimevalue_obj: { [key: string]: string[] } = {};
  // totaltimevalue_obj: {}  = {};

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  // 
  date: Date[] | undefined;
  value2: any

  // 
  date3: Date;
  show = false
  addreasonofvisitModal: boolean;
  hospitallocationModal: boolean;
  ProviderdataModal: boolean;
  patientproblemdata: any;
  ReasonOfVisitdata: any;
  HospitalLocationdata: any;
  providernamedata: any;
  Hospitalclinicname: any
  providerdata: any;
  Providers: any;
  ReasonOfVisitlength: any;
  HospitalLocationlength: any;
  providerdatalength: any;
  Hospitalclinicnamelength: any;
  patientID: any;
  hospitalID: any;
  displayBasic: boolean = false;
  reasonofvisitinsert: FormGroup;
  Hospitallocationinsert: FormGroup;
  providerdatainsert: FormGroup;
  Appointment_slotinsert: FormGroup;
  currentreasonofvisit: any;
  Hospitaladdress: any;
  phr_slotbooking: any;
  hospitalData: any;
  guid: any
  organization_id: any;
  hospital_id: any;
  Appointmentslotbookingdata: any;
  Reasion_Of_visit: any = ''
  finalData: any;
  newhospitalid: any = 0;
  newhospitalid2: any = 0
  availableSlots: any;
  final_timedata: any[] = []
  PatientName: any;
  PatientNames: any;
  // getslot:any
  // for slot id
  slotid: any = ""

  minDate: Date | undefined;

  isButtonDisabled = true;
  isdisable: any = false
  // current date on slot time 

  isshow: any

  currentDate: Date = new Date();
  isCurrentDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date.getFullYear() === this.currentDate.getFullYear() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getDate() === this.currentDate.getDate();
  }



  constructor(private datepipe: DatePipe,private sanitizer: DomSanitizer, private ngxLoader: NgxUiLoaderService, public confirmationservice: ConfirmationService, public patientappointmentservices: PatientAppointmentService, public healthrecordsservices: HealthrecordsservicesService, public messageserveice: MessageService, public router: Router) {
    super()
  }

  timeslot: any[] = []
  @ViewChild('location', { static: false }) tabs: ElementRef;
  @ViewChild('reason', { static: false }) reason: ElementRef;
  @ViewChild('providers', { static: false }) providers: ElementRef;
  @ViewChild('Times', { static: false }) Times: ElementRef;
  @ViewChild('VerifyAndSchedule', { static: false }) VerifyAndSchedule: ElementRef;




  appoinment_typename: any = "In-person"
  appointmentMode: any = 1;
  setAppointmentMode(mode: any) {
    this.appointmentMode = mode.id;
    console.log(mode)
    this.appoinment_typename = mode.appointment_type

    // this.finalData.Appointment_Type=this.appointmentMode
  }


  ngOnInit(): void {


    this.finalData = {
      inputreasionofvisitValue: '',
      inputhospitalnameValue: '',
      inputprovidernameValue: '',
      Slot_time: '',
      Slot_End_time: '',
      Slot_days: '',
      Slot_date: '',
      patientid: '',
      patient_name: '',
      provideerId: '',
      hospitalID: '',
      Data_Time_Type: 'S',
      Appointment_Type: this.appointmentMode,
      Visit_Type: '1',
      Duration: '10',
      // Reasion_Of_visit:'',



    }
    this.minDate = new Date();

    this.guid = localStorage.getItem('guid')
    this.guid = JSON.parse(this.guid);




    this.organization_id = localStorage.getItem('organization_id')
    this.organization_id = JSON.parse(this.organization_id);


    this.hospital_id = localStorage.getItem('hospital_id')
    this.hospital_id = JSON.parse(this.hospital_id);




    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    console.log(this.patientID);
    this.PatientName = localStorage.getItem('user_name')
    this.PatientNames = JSON.parse(this.PatientName);


    // for active and unactive 
    $('.wizard li').click(function () {
      $(this).prevAll().removeClass('active').addClass('completed');
      $(this).removeClass('completed').addClass('active');
      $(this).nextAll().removeClass('completed active');
    });


    // $('.startover').click(function (){
    //   console.log("123")
    //   $('.wizard li').prevAll().removeClass('active');

    //   $('.wizard li').click()
    // }

    // )


    this.getReasonOfVisit();
    // this.gethospitallocation();
    this.getHospitalClinicName();
    this.Appoinmenttype();


    // this.getProvidersAccToHospital()

    this.reasonofvisitinsert = new FormGroup({
      reasonofvisit_insert: new FormControl('', [Validators.required]),
      inputvalue_data: new FormControl("")
    })

    this.providerdatainsert = new FormGroup({
      provider_name_insert: new FormControl('', [Validators.required]),
      inputprovidervalue_data: new FormControl('')

    })
    this.Hospitallocationinsert = new FormGroup({
      Hospital_name_insert: new FormControl('', [Validators.required]),
      location_addressname: new FormControl(''),
      inputhospitalvalue_data: new FormControl('')
    })

    this.Appointment_slotinsert = new FormGroup({
      slot_time_insert: new FormControl('')

    })

  }





  ReasonForVisitdiolog(event: any) {
    this.reasonofvisitinsert.reset();
  }

  // timeSlotOfTime(log) {
  //   var details = {
  //     patientId: this.patientID,
  //     provideId: '',
  //     hospitalId: this.hospitalID,
  //     startTime: '',
  //     endTime: '',
  //     day: '',
  //     date: '',
  //     status: '',
  //     slotTransactionTime: ''
  //   }
  //   console.log(log.target.value, "Value oF Date");

  // }

  Providerdatadiolog(event: any) {
    this.providerdatainsert.reset();
  }

  HospitalLocationDiolog(event: any) {
    // this.Hospitalclinicname=''
    this.Hospitallocationinsert.reset();
  }

  getProvidersAccToHospital() {
    console.log(this.patientID);
    this.ngxLoader.startLoader("loader-01");
    this.patientappointmentservices.getAllProvidersOfhospitalServices(this.patientID, this.newhospitalid).subscribe((data: any) => {
      console.log(data);
      this.providerdata = data


      this.providerdatalength = data.length
      this.ngxLoader.stopLoader("loader-01");
    })
  }



  getReasonOfVisit() {

    this.ngxLoader.startLoader("loader-01");
    this.patientappointmentservices.getReasonOfVisiservicess(this.patientID).subscribe((data: any) => {

      console.log(data);
      console.log(data.length);
      this.ReasonOfVisitdata = data;
      this.ReasonOfVisitlength = data.length;
      this.ngxLoader.stopLoader("loader-01");
    })
  }

  gethospitallocation() {
    this.ngxLoader.startLoader("loader-01");
    this.patientappointmentservices.gethospitallocationservicess(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.HospitalLocationdata = data
      this.HospitalLocationlength = data.length
      this.ngxLoader.stopLoader("loader-01");
    })
  }

  get_provider_name() {
    this.ngxLoader.startLoader("loader-01");
    console.log(this.newhospitalid);
    this.patientappointmentservices.getprovidernameservicess(this.newhospitalid).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.providernamedata = data
      this.HospitalLocationlength = data.length
      this.ngxLoader.stopLoader("loader-01");
    })
  }

  // hospital hospital location search 
  getHospitalClinicName() {
    console.log(this.organization_id);

    this.ngxLoader.startLoader("loader-01");
    this.patientappointmentservices.getClinicNameservicess(this.organization_id).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.Hospitalclinicname = data
      this.Hospitalclinicnamelength = data.length
      this.ngxLoader.stopLoader("loader-01");
    })
  }







  delete_patientprobl(id: any) {
    this.confirmationservice.confirm({
      message: 'Remove Form Dashboard And Show On history?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.patientappointmentservices.delete_PatientproblBookappoinment(id).subscribe((data: any) => {
          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Health Issues Data Has Been Deleted' });
          this.displayBasic = false
          // this.currentreasonofvisit=""

          // this.ReasonOfVisitdata=""
          this.getReasonOfVisit()

        })
      },
      reject: (type: any) => {
        this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
      }
    });
  }

  delete_provider(id: any) {
    this.confirmationservice.confirm({
      message: 'Remove Form Dashboard And Show On history?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(id, "provider id")
        this.patientappointmentservices.delete_provider(id).subscribe((data: any) => {
          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Health Issues Data Has Been Deleted' });

          this.get_provider_name()

          this.getProvidersAccToHospital()

        })
      },
      reject: (type: any) => {
        this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have Canceled The Delete Data Option' });
      }
    });
  }



  delete_hospital(id: any) {
    this.confirmationservice.confirm({
      message: 'Remove Form Dashboard And Show On history?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(id, "iddddddddddddd")
        this.patientappointmentservices.delete_hospital(id).subscribe((data: any) => {
          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Hospital  Data Has Been Deleted' });
          this.displayBasic = false
          this.getReasonOfVisit()
          this.gethospitallocation();

        })
      },
      reject: (type: any) => {
        this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
      }
    });
  }
  // current health record health end


  addreasonofvisitDialog() {
    this.addreasonofvisitModal = true;
  }

  appointmenthospitalloactionDialog() {
    if (this.Reasion_Of_visit) {


      this.Hospitallocationinsert.reset()
      this.hospitallocationModal = true;
      this.getHospitalClinicName()
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'please select reason for visit' });
    }
  }


  ProviderdataDialog() {
    // if (
    //   this.newhospitalid
    //   // this.ResionOfVisitID
    // ) {
    this.ProviderdataModal = true;
    // }
    // else {
    //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'please select hospital location' });
    // }
  }

  // submit_healthissue() {
  // }

  // submit_resionoffvisit() {
  //   this.reasonofvisitinsert = new FormGroup({
  //     reasonofvisit_insert: new FormControl(''),

  //   });
  //   console.log(this.reasonofvisitinsert);
  // }

  inputreasionofvisitValue: string = '';
  fabratebutton: boolean = false
  ResionOfVisitID: any
  addmyfevrate(event: any) {
    console.log(event.target.checked, "thusisidi")

    // console.log(event.target.id)
    this.fabratebutton = event.target.checked
    this.ResionOfVisitID = event.target.id


    if (event.target.checked) {

    } else {
      this.inputreasionofvisitValue = '';
    }
  }

  close: any
  empty: any = '0'
  inputvaue: any
  submit_reasonofvisit() {
    // for removing data
    this.empty1 = "0"
    this.totaltimevalue_obj = {};
    this.Appointmentslotbookingdata = ""
    //  console.log(this.reasonofvisitinsert.value.reasonofvisit_insert.id
    //     , "reason for visit multi")
    if (this.reasonofvisitinsert.valid) {

      // isButtonDisabled:true;


      this.reasonofvisitinsert.value
      this.empty = this.reasonofvisitinsert.get('reasonofvisit_insert')[0]?.value.name;
      console.log(this.empty)

      // if(this.empty!="0"){
      //   this.isButtonDisabled=false
      // }
      // button disables

      // this.isButtonDisabled = false;


      var currentdate = new Date();
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
      
      console.log(datetime);


      // console.log(this.reasonofvisitinsert.value, "when user submit buulll");
      if (this.fabratebutton == true) {
        const foundItem = this.ReasonOfVisitdata.filter(item => item.chief_complan_ID == this.reasonofvisitinsert.value.reasonofvisit_insert.id);
        // console.log(foundItem,"filter ke baad ka data")
        if (foundItem.length > 0) {
          this.messageserveice.add({ severity: 'warn', summary: 'Success!', detail: 'Your Data Has Been Already exists' });
          this.addreasonofvisitModal = false
          this.getReasonOfVisit()
          var phraddreasonofvisit = data
          this.currentreasonofvisit = phraddreasonofvisit
        } else {
          this.inputreasionofvisitValue = this.reasonofvisitinsert.get('reasonofvisit_insert')?.value.name;
          // if (this.reasonofvisitinsert.value.inputvalue_data !== null && this.reasonofvisitinsert.value.inputvalue_data !== undefined) {
          this.patientappointmentservices.submit_reasonofvisitservice(this.reasonofvisitinsert.value, this.patientID, datetime).subscribe((data: any) => {
            if (data == 'Sucess') {
              this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
              this.addreasonofvisitModal = false
              this.getReasonOfVisit()
              var phraddreasonofvisit = data
              this.currentreasonofvisit = phraddreasonofvisit
            }
          })
          // }
          // else {
          //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
          // }
        }
      }
      else {
        this.inputreasionofvisitValue = this.reasonofvisitinsert.get('reasonofvisit_insert')?.value.name;
        console.log(this.inputreasionofvisitValue)
        // ( this.inputreasionofvisitValue)
        console.log(this.ResionOfVisitID, 'dsbdhsbdhsdsbh');
        // if (this.reasonofvisitinsert.value.inputvalue_data !== null && this.reasonofvisitinsert.value.inputvalue_data !== undefined) {
        // this.patientappointmentservices.submit_reasonofvisitservice(this.reasonofvisitinsert.value, this.patientID, datetime).subscribe((data: any) => {
        //   // if (data == 'Sucess') {
        //     this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.addreasonofvisitModal = false
        this.getReasonOfVisit()
        //     var phraddreasonofvisit = data
        //     console.log(phraddreasonofvisit)
        // this.currentreasonofvisit = phraddreasonofvisit
        // this.isButtonDisabled = false;
        // }
        // })
        this.tabs.nativeElement.childNodes[0].click();
        // }
        // else {
        //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field   not select' });
        // }


        var data = this.reasonofvisitinsert.value.reasonofvisit_insert;
        // console.log(data, "Selection Data");


      }

    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field ' });

    }
  }


  filterreasonofvisit(event: any) {
    console.log(event);
    console.log(this.reasonofvisitinsert.controls['reasonofvisit_insert']);

    // this.healthrecordsservices.getpatientproblem(this.patientID).subscribe((data:any)=>{
    this.patientappointmentservices.filterreasonofvisitservices(event.query).subscribe((data: any) => {

      this.Reasion_Of_visit = data[0].id;
      console.log(this.Reasion_Of_visit);


      this.currentreasonofvisit = data
    })

  }

  inputhospitalnameValue: string = '';
  fabratehospitalbutton: boolean = false
  addhospitalnamefevrate(event: any) {
    console.log(event);
    this.fabratehospitalbutton = event.target.checked
    if (event.target.checked) {

    } else {
      this.inputhospitalnameValue = '';
    }
  }


  inputhospitalvaue: any;
  provideraddress: any
  empty1: any = 0
  submit_phrhospitaldata() {
    console.log(this.Hospitallocationinsert.value, "hostpital form value")
    //  FOR TIME REMOIING and verfify shedule data 
    this.totaltimevalue_obj = {};
    this.Appointmentslotbookingdata = ""
    this.provider = "0"
    this.inputprovidernameValue = ""
    this.ProviderID = ""
    this.Slot_time = this.Slot_days = this.Slot_date = ""
    this.timeslotvarifie = "0"
    this.slotid = ""
    this.finalData = ""
    // 
    if (this.Hospitallocationinsert.valid) {
      // 
      this.empty1 = this.Hospitallocationinsert.get('Hospital_name_insert')?.value.clinicName;
      var currentdate = new Date();
      var datetime =
      currentdate.getDate() + "/" +
      (currentdate.getMonth() + 1) + "/" +
      currentdate.getFullYear() + " " +
      currentdate.getHours() + ":" +
      currentdate.getMinutes() + ":" +
      currentdate.getSeconds();
    
    console.log(datetime);
      if (this.fabratehospitalbutton == true) {

        const foundItem = this.HospitalLocationdata.filter(item => item.hospital_id == this.Hospitallocationinsert.value.Hospital_name_insert.guid
        );
        console.log(foundItem, "founded")

        if (foundItem.length > 0) {
          this.messageserveice.add({ severity: 'warn', summary: 'Success!', detail: 'Your Data Has Been Already exists ' });
          this.hospitallocationModal = false
          this.gethospitallocation();
          this.get_provider_name()
          this.totaltimevalue_obj = {};
        } 
        else{

          this.inputhospitalnameValue = this.Hospitallocationinsert.get('Hospital_name_insert')?.value.clinicName;
          if (this.Hospitallocationinsert.value.inputhospitalvalue_data !== null && this.Hospitallocationinsert.value.inputhospitalvalue_data !== undefined) {
            this.patientappointmentservices.submit_HospitalAddressservice(this.Hospitallocationinsert.value, this.patientID, datetime, this.seletedHospitalId).subscribe((data: any) => {
              if (data == 'Sucess') {
                this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
                this.hospitallocationModal = false
                this.gethospitallocation();
                this.get_provider_name()
                this.totaltimevalue_obj = {};


                // var phrHospitaladdress = data;
                // console.log(phrHospitaladdress);
                // this.currentreasonofvisit = phrHospitaladdress
              }
            })
          }
          else {
            this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
          }
        }

      }
      else {
        this.inputhospitalnameValue = this.Hospitallocationinsert.get('Hospital_name_insert')?.value.clinicName;
        console.log(this.Hospitallocationinsert.value)
        // if (this.Hospitallocationinsert.value.inputhospitalvalue_data !== null && this.Hospitallocationinsert.value.inputhospitalvalue_data !== undefined) {
        // this.patientappointmentservices.submit_HospitalAddressservice(this.Hospitallocationinsert.value, this.patientID, datetime, this.seletedHospitalId).subscribe((data: any) => {
        // if (data == 'Sucess') {
        // this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.hospitallocationModal = false
        this.gethospitallocation();
        this.get_provider_name()
        this.totaltimevalue_obj = {};
        this.provider = "0"
        // this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
        // console.log(data,"this is gethospitl fn data")

        // var phrHospitaladdress = data;
        // console.log(phrHospitaladdress);
        // this.currentreasonofvisit = phrHospitaladdress
        // }
        // })


        this.providers.nativeElement.childNodes[0].click();
        // }
        // else {
        //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
        // }





      }
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }

  }



  inputprovidernameValue: any
  providersaveid: any
  addproviderfevrate(event: any) {
    this.providersaveid = event.target.checked
  }


  inputprvidervaue: any
  submit_provider() {
    // for removing data
    this.Slot_time = this.Slot_days = this.Slot_date = ""
    this.timeslotvarifie = "0"
    this.slotid = ""
    this.finalData = ""
    // 
    if (this.providerdatainsert.valid) {



      console.log("ye hit")
      // this.ProviderID = this.Provider_id;
      // this.totaltimevalue_obj={}
      this.provider = this.providerdatainsert.value.provider_name_insert.firstname
      this.inputprovidernameValue = this.providerdatainsert.value.provider_name_insert.firstname
      console.log(this.inputprovidernameValue);
      console.log(this.providerdatainsert.value, "this is provider insert form")
      var currentdate = new Date();
      var datetime =
      currentdate.getDate() + "/" +
      (currentdate.getMonth() + 1) + "/" +
      currentdate.getFullYear() + " " +
      currentdate.getHours() + ":" +
      currentdate.getMinutes() + ":" +
      currentdate.getSeconds();
    
    console.log(datetime);

      console.log(this.seletedHospitalproviderId);
      console.log(this.Provider_id, "provider id option pe")
      console.log(this.providerdatainsert.value);
      if (this.providersaveid == true) {

      const foundItem =this.providerdata.filter(item => item.provider_ID === this.providerdatainsert.value.provider_name_insert.guid);
console.log(foundItem,"founditem")

if(foundItem.length >0){
  this.messageserveice.add({ severity: 'warn', summary: 'Success!', detail: 'Your Data Has Been Already exists' });
  this.ProviderdataModal = false
  this.get_provider_name()
  this.getProvidersAccToHospital()
  // var phrproviderdata = data
  // console.log(phrproviderdata);
  // this.Hospitaladdress = phrproviderdata
  console.log('1')
  this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
  // setInterval(() => {
  //   this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
  // }, 1000);

  this.ProviderID = this.Provider_id;
}else{
  if (this.providerdatainsert.value.provider_name_insert !== null && this.providerdatainsert.value.provider_name_insert != "") {
    this.patientappointmentservices.submit_ProviderNameservice(this.providerdatainsert.value, this.patientID, datetime, this.seletedHospitalproviderId, this.Provider_id).subscribe((data: any) => {
      if (data) {
        this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.ProviderdataModal = false
        this.get_provider_name()

        // doubtfull
        //  this. providerdata=data
        this.getProvidersAccToHospital()
        var phrproviderdata = data
        console.log(phrproviderdata);
        this.Hospitaladdress = phrproviderdata
        this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
        console.log('2')
        // setInterval(() => {
        //   this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
        // }, 1000);
      
        this.ProviderID = this.Provider_id;
      }
    })
  }
  else {
    this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
  }
}

      

      }
      else {

        if (this.providerdatainsert.value.provider_name_insert !== null && this.providerdatainsert.value.provider_name_insert !== undefined) {
          // this.patientappointmentservices.submit_ProviderNameservice(this.providerdatainsert.value, this.patientID, datetime, this.seletedHospitalproviderId, this.Provider_id).subscribe((data: any) => {
          // if (data == 'Sucess') {
          // this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
          this.ProviderdataModal = false
          this.get_provider_name()
          this.getProvidersAccToHospital()
          // var phrproviderdata = data
          // console.log(phrproviderdata);
          // this.Hospitaladdress = phrproviderdata
       

          this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
          // setInterval(() => {
          //   this.getslot(this.patientID, this.seletedHospitalproviderId, this.Provider_id)
          //   this.Appointmentslotbookingdata = ''
          //   this.slotdatamaster = ''
          //   // this.Appointmentslotbookingdatalength=data.length
          //   this.slotdata = ' '
          //   // this.slot(this.slotdata)
          //   this.totaltimevalue_obj = {};
         
          // }, 10000);
        
          this.ProviderID = this.Provider_id;
          // setTimeout(() => {

          // }, 200);
          this.Times.nativeElement.childNodes[0].click();
          setTimeout(() => {
            this.Times.nativeElement.childNodes[0].click();
          }, 100);


          // }
          // else {
          //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
          // }
          // })
        }


        // this.Times.nativeElement.childNodes[0].click();
      }
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }

  }


  adressvalue: any
  seletedHospitalId: any
  location_data(event) {

    console.log('location_data', event.value.addressLine1)

    this.adressvalue = event.value.addressLine1
    this.Hospitallocationinsert.patchValue({
      location_addressname: event.value.addressLine1
    })
    console.log('this.adressvalue ', this.adressvalue)
    console.log(event.value);
    this.newhospitalid = event.value.branch_id
    this.seletedHospitalId = event.value.branch_id
    console.log(this.newhospitalid);
    this.get_provider_name();
    this.getProvidersAccToHospital()
  }


  seletedHospitalproviderId: any
  Provider_id: any
  provider_data(event) {
    // this.adressvalue = event.value.firstname
    console.log(event.value);
    this.newhospitalid = event.value.branchId
    this.Provider_id = event.value.guid
    this.seletedHospitalproviderId = event.value.branchId
    console.log(this.newhospitalid, this.seletedHospitalproviderId);
    this.getHospitalClinicName();
  }


  reasonofvisit(event, value) {


    // for removing data
    // this.empty1="0"
    // this.totaltimevalue_obj = {};
    // this.Appointmentslotbookingdata=""
    // this.provider="0"
    // this.providerdata=""
    // this.HospitalLocationdata=""

    this.gethospitallocation()
    // 
    // const getEle = document.getElementById('ReasonForVisit-tab');

    // getEle.classList.add(".active");
    // getEle.classList.remove("");
    // this.isButtonDisabled=false
    console.log(value, 'dddd');

    this.inputreasionofvisitValue = value.chief_complan_name
    this.Reasion_Of_visit = value.chief_complan_ID

    this.empty = value

    this.tabs.nativeElement.childNodes[0].click();
    setTimeout(() => {
      this.tabs.nativeElement.childNodes[0].click();
    }, 100);
    // this.tabs.nativeElement.childNodes[0].click();


    console.log(this.Reasion_Of_visit, "visit value")
    // this.isButtonDisabled=false
  }


  hospital_location(event, value, item) {
    //  FOR TIME REMOIING
    this.totaltimevalue_obj = {};
    this.Appointmentslotbookingdata = ""
    this.provider = "0"
    this.inputprovidernameValue = ""
    this.ProviderID = ""
    this.Slot_time = this.Slot_days = this.Slot_date = ""
    this.timeslotvarifie = "0"
    this.slotid = ""
    this.finalData = ""
    //  
    this.inputhospitalnameValue = value;
    this.empty1 = value
    console.log(item);
    this.newhospitalid = item.hospital_id
    console.log(this.newhospitalid);
    this.get_provider_name();
    this.getProvidersAccToHospital()
    // this.isButtonDisabled=false
    this.providers.nativeElement.childNodes[0].click();
    setTimeout(() => {
      this.providers.nativeElement.childNodes[0].click();
    }, 100);
  }

  provider: any = '0'
  ProviderID: any = ""
  providernamesub(event, value, item) {
    // for removing data
    this.totaltimevalue_obj = {}
    this.Slot_time = this.Slot_days = this.Slot_date = ""
    this.timeslotvarifie = "0"
    this.slotid = ""
    this.finalData = ""
    // 
    this.newhospitalid = item.hospital_id
    console.log(this.newhospitalid);
    this.newhospitalid2 = item.hospital_ID
    console.log(this.newhospitalid);
    this.ProviderID = item.provider_ID;
    console.log(item.ProviderID);
console.log('4')
    this.getslot(this.patientID, this.newhospitalid2, this.ProviderID)




    this.inputprovidernameValue = value;
    this.provider = value
    this.Times.nativeElement.childNodes[0].click();
    setTimeout(() => {
      this.Times.nativeElement.childNodes[0].click();
    }, 100);
  }
  slotdatamaster: any
  Appointmentslotbookingdatalength: any
  slotdata: any
  getslot(patientID, newhospitalid2, ProviderID) {
    this.patientappointmentservices.getslotbookingtimeservicess(patientID, newhospitalid2, ProviderID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.Appointmentslotbookingdata = data
      this.slotdatamaster = data
      // this.Appointmentslotbookingdatalength=data.length
      this.slotdata = data

      // this.providers.nativeElement.childNodes[0].click();// 

      // const evenNumbers =data.filter(checkAdult);
      // function checkAdult(age) {
      //   return age.Date = this.formattedDate1;
      // }
      // console.log(evenNumbers)


      this.slot(this.slotdata)

      // console.log(this.totaltimevalue_obj, 'sss');


      // this.HospitalLocationlength = data.length
      this.ngxLoader.stopLoader("loader-01");

    }

    )
  }
  slot(slotdata) {
    console.log(slotdata, slotdata.length, ":total");

    // Sort slotdata by date and then by start time
   // Sort slotdata by start time
slotdata.sort((a, b) => {
  const startTimeA = new Date(a.Start_time).getTime();
  const startTimeB = new Date(b.Start_time).getTime();
  return startTimeA - startTimeB;
});


    // Filter out duplicates within each date
    const filteredSlotData = {};
    for (const slot of slotdata) {
        const date = slot.Date;

        // Initialize date array if it does not exist
        if (!filteredSlotData.hasOwnProperty(date)) {
            filteredSlotData[date] = [];
        }

        // Check if slot is a duplicate
        if (!this.isDuplicateSlot(filteredSlotData[date], slot)) {
            filteredSlotData[date].push(slot);
        }
    }

    // Update totaltimevalue_obj with filtered slot data
    this.totaltimevalue_obj = filteredSlotData;
}

// Helper function to check if a slot is a duplicate within an array
isDuplicateSlot(slotArray, newSlot) {
    for (const slot of slotArray) {
        if (this.isSlotEqual(slot, newSlot)) {
            return true; // Slot is a duplicate
        }
    }
    return false; // Slot is not a duplicate
}

// Helper function to compare two slots for equality
isSlotEqual(slot1, slot2) {
  // Check if Date and Start_time properties are equal
  return slot1.Date === slot2.Date && slot1.Start_time === slot2.Start_time;
}

  Slot_days: any
  Slot_time: any
  Slot_date: any
  Slot_End_time: any
  timeslotvarifie: any = 0
  Appointment_slottime(value) {
    this.Slot_time = this.transform(value.Start_time)
    this.Slot_End_time = value.End_time
    this.Slot_days = value.Days
    this.Slot_date = value.Date
    this.timeslotvarifie = value


    // // for slot status changes
    this.slotid = value.id
    console.log(this.slotid, "this is slot id")


    this.finalData = {
      inputreasionofvisitValue: this.inputreasionofvisitValue,
      inputhospitalnameValue: this.inputhospitalnameValue,
      inputprovidernameValue: this.inputprovidernameValue,
      Slot_time: this.Slot_time,
     
      Slot_End_time: this.Slot_End_time,
      Slot_days: this.Slot_days,
      Slot_date: this.Slot_date,
      patientid: this.patientID,
      Patientname: this.PatientNames,
      provideerId: this.ProviderID,
      hospitalID: this.organization_id,
      branchID: this.hospital_id,
      Reasion_Of_visit: this.Reasion_Of_visit,
      Data_Time_Type: 'S',
      Appointment_Type: this.appointmentMode,
      Visit_Type: '1',
      Duration: '10',
      visit_status: '12',
      slotid: this.slotid

    }

    this.VerifyAndSchedule.nativeElement.childNodes[0].click();
    setTimeout(() => {
      this.VerifyAndSchedule.nativeElement.childNodes[0].click();
    }, 100);
  }


  providerselecter() {

    console.log(this.newhospitalid);

    if (this.newhospitalid == 0) {

      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'pleaase fill the hospital location' });
    } else {
      this.newhospitalid = this.newhospitalid

    }
  }


  transform(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const parsedHours = parseInt(hours, 10);
    const ampm = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;

    return `${formattedHours}:${minutes} ${ampm}`;
  }
  formatDateToMySQL(inputDateString: string): string {
    const inputDate = new Date(inputDateString);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getSeconds()).padStart(2, '0');

    const mysqlFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return mysqlFormattedDate;
  }
  Finalappointment: any
  finaappointmentsubmit: any
  FinalHospitalid: any
  Finalpatientid: any
  Finalproviderlid: any
  Finalappointmentdata(value) {

    console.log(value, "Final Value to submit", value);
    var newdate = value.Slot_date + ' ' + value.Slot_time
    var newdate1 = value.Slot_date + ' ' + value.Slot_End_time
    // console.log(newdate);

    // const parsedDate = new Date(newdate);
    // console.log(parsedDate);

    // const inputDateString = "8/27/2023 11:10 AM";
    const mysqlFormattedDate = this.formatDateToMySQL(newdate);
    const mysqlFormattedDate1 = this.formatDateToMySQL(newdate1);
    console.log(mysqlFormattedDate); // Output: 2023-08-27 11:10:00
    value.Slot_time = mysqlFormattedDate
    value.Slot_End_time = mysqlFormattedDate1


    console.log(value, "Final Value to submit", value);

    if (value != undefined) {


      if (value.slotid) {
        this.patientappointmentservices.submit_slottime_service(value).subscribe((data: any) => {
          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
          // this.displayallargyModal = false
          // this.getAllergiesdata()
          console.log(data);
          var Finalappointment = data
          this.finaappointmentsubmit = Finalappointment
          this.router.navigate(['approved/Visit_Records'])

        })

      } else {
        this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
      }
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }
  }




  // changedisbable($event: any) {
  //   if (this.Reasion_Of_visit) {
  //     console.log(this.Reasion_Of_visit, "Reasion_Of_visit");
  //     // this.isshow=true
  //     this.tabs.nativeElement.childNodes[0].click();
  //     this.gethospitallocation();

  //     // this.isButtonDisabled = false

  //   }
  //   else {
  //     // this.isButtonDisabled=true
  //     // this.isshow=false
  //     this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'please select reason for visit' });
  //     // this.reason.nativeElement.childNodes[0].click();

  //     // this.hospitallocationModal = false;

  //   }
  // }
  checkmsg() {
    console.log("selected")

  }
  // }
  // }
  startover() {
    console.log("startbtn")
    this.Reasion_Of_visit = ""
    this.newhospitalid = 0
    this.reason.nativeElement.childNodes[0].click();
    $('.wizard li').prevAll().removeClass('completed')
    this.empty = 0
    this.empty1 = 0
    this.provider = 0
    this.timeslotvarifie = 0
    this.inputprovidernameValue = ""
    this.inputhospitalnameValue = ""
    this.Slot_time = this.Slot_days = this.Slot_date = ""
    this.ProviderID = 0
    this.slotid = 0
    this.inputreasionofvisitValue = ""
    this.Appointmentslotbookingdata = ""
    this.totaltimevalue_obj = {};
  }


  selectedTime: string = '';



  // reasonforvisi(){
  reqestforvisit = new FormGroup({
    reason: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    provider: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    endtime: new FormControl('', Validators.required),
    Appoinment_type: new FormControl(1, Validators.required),
    anytime_data: new FormControl('')
  })


  d: any;
  d2: any

  ontimesubmit1() {
  
    this.d = this.reqestforvisit.controls['time'].value;
    const date = new Date(this.d);
    this.d = this.datepipe.transform(date,'HH:mm') || '';
    // console.log(this.formatedate1,"this is the formated date 1");
  }

  ontimesubmit2() {
    this.d2 = this.reqestforvisit.controls['endtime'].value
    const date = new Date(this.d2);
    this.d2 = this.datepipe.transform(date, 'HH:mm') || ''; 
    // console.log(this.formatedate2,"this is the formated date 2");
  }


  submit() {
    console.log(this.reqestforvisit.value)

    // console.log(this.reqestforvisit.value)
    // console.log('this.reqestforvisit',this.reqestforvisit.value.anytime_data)
    // if(this.reqestforvisit.valid){
      if (this.checkanytime == true) {

        this.reqestforvisit.get('date').clearValidators()
        this.reqestforvisit.get('time').clearValidators()
        this.reqestforvisit.get('endtime').clearValidators()
        console.log(this.reqestforvisit.value.Appoinment_type)
  
        // if(this.reqestforvisit.value.Appoinment_type !=""){
  
  
        console.log(this.reqestforvisit.value)
        const obj = {
          patientid: this.patientID,
          Patientname: this.PatientNames,
          provideerId: this.ProviderID,
          hospitalID: this.organization_id,
          branchID: this.hospital_id,
          Reasion_Of_visit: this.Reasion_Of_visit,
  
        }
        this.patientappointmentservices.reqestforvisit(this.reqestforvisit.value, obj).subscribe((res) => {
          if (res) {
            this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your reqest Has Been Successfully Inserted' });
          }
          // else{
          //   this.messageserveice.add({ severity: 'failed', summary: 'Success!', detail: 'Your reqest Has Been unSuccessfully Inserted' });
          // }
          this.router.navigate(['approved/Visit_Records'],{queryParams:{formtype:2}})
  
        })
        // }
        // else{
        //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'form not valid' })
        // }
      }
      else {
  
        if (this.reqestforvisit.valid) {
          console.log(this.d2, this.d, "time compare")
          if (this.d2 > this.d) {
            console.log(this.d2 > this.d)
            console.log(this.reqestforvisit.value)
            const obj = {
              patientid: this.patientID,
              Patientname: this.PatientNames,
              provideerId: this.ProviderID,
              hospitalID: this.organization_id,
              branchID: this.hospital_id,
              Reasion_Of_visit: this.Reasion_Of_visit,
  
            }
  
            this.patientappointmentservices.reqestforvisit(this.reqestforvisit.value, obj).subscribe((res) => {
              if (res) {
                this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your reqest Has Been Successfully Inserted' });
              }
              this.router.navigate(['approved/Visit_Records'],{queryParams:{formtype:2}})
  
            })
  
          }
          else {
            this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'please select right time ' });
          }
        }
        else {
          this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'form not valid' })
        }
        // console.log(this.reqestforvisit.controls['time'].value)
        // if(this.reasonforvisit.controls['time'].value < this.reasonforvisit.controls['endtime'].value ){/
        //   console.log("condition right");
  
        // }
  
      }
    // }else{
    //   this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'form not valid' })
    // }
 
  }
 
  // })
  // for reqest visit
  visible: boolean = false;

  showDialog() {
    this.visible = true;
    this.reqestforvisit.patchValue({

      reason: this.inputreasionofvisitValue,
      location: this.inputhospitalnameValue,
      provider: this.inputprovidernameValue,
      Appoinment_type:1


    })
  }
  username: any = localStorage.getItem('user_name')
  usernames: any = JSON.parse(this.username);

  // this.username = localStorage.getItem('user_name')
  // this.usernames = JSON.parse(this.username);



  // condition ke liye
  // appoinmenttype:any=this.Appointmentslotbookingdata
  isdisable1: any
  checkanytime: any
  checked: boolean = true;
  anytime(event: any) {
    //  this.isdisable=false
    console.log(event.target.checked)
    this.checkanytime = event.target.checked
    if (this.checkanytime == true) {
      this.isdisable = true
      // this.isdisable1['color'='red']

    }
    else {
      this.isdisable = false
    }

  }

  formattedDate1: any
  filteredData: any = ""
  calendr() {
    console.log(this.date3);
    const inputDate = new Date(this.date3);
    const month = inputDate.getMonth() + 1; // Adding 1 because months are zero-based
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate);

    // Input date in the format "MM/DD/YYYY"
    const inputDate1 = formattedDate;

    // Function to check if a data item's date matches the input date
    function isInputDate1(item) {
        // Parse the date string from the data and compare it to the input date
        const itemDate = new Date(item.Date);
        const inputDateObj = new Date(inputDate);
        return (
            itemDate.getDate() === inputDateObj.getDate() &&
            itemDate.getMonth() === inputDateObj.getMonth() &&
            itemDate.getFullYear() === inputDateObj.getFullYear()
        );
    }

    // Filter the data based on the input date
    this.filteredData = this.slotdata.filter(isInputDate1);

    // Remove duplicates and sort by start time within each date

      this.Appointmentslotbookingdata = ""
    this.Appointmentslotbookingdata = this.filteredData
    this.totaltimevalue_obj = {};
    for (const slot of this.filteredData) {
        const date = slot.Date;
        if (!this.totaltimevalue_obj.hasOwnProperty(date)) {
            this.totaltimevalue_obj[date] = [];
        }

        // Check for duplicate slots before pushing
        if (!this.totaltimevalue_obj[date].some(existingSlot => this.isSlotEqual(existingSlot, slot))) {
            this.totaltimevalue_obj[date].push(slot);
        }
   
    }
  
    console.log(this.totaltimevalue_obj, 'sss',this.lenthofslot);
}
lenthofslot:any
// Helper function to compare two slots
isSlotEqual1(slot1, slot2) {
    // Assuming slots are objects with multiple properties
    // Adjust this comparison according to the actual slot structure
    return JSON.stringify(slot1) === JSON.stringify(slot2);
}

  

  // isdisable:false
  // for appoinment type
  Appoinemtdata: any


  Appoinmenttype() {
    this.patientappointmentservices.Appoinmenttype().subscribe((res) => {
      console.log(res)
      this.Appoinemtdata = res

    })
  }
  edit() {
    this.addreasonofvisitModal = true;
  }
  edit1() {
    this.hospitallocationModal = true;
  }
  edit2() {
    this.ProviderdataModal = true;
  }

  clearreqform() {
    this.reqestforvisit.reset()
  }
  showmore() {
    // console.log( this.totaltimevalue_obj,"df",this.slotdata,"sdafgtyh")
    // this.totaltimevalue_obj=this.slotdata
    this.totaltimevalue_obj = {}
    this.slot(this.slotdatamaster)
    this.filteredData = ''
  }




}






