import { Component, OnInit } from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { Message } from 'primeng/api';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { BaseComponent } from '../common/base.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-healthsummary',
  templateUrl: './healthsummary.component.html',
  styleUrls: ['./healthsummary.component.css'],
  providers: [DatePipe]
})
export class HealthsummaryComponent extends BaseComponent implements OnInit {
  myDialogClass: string = 'my-custom-dialog';
  isLoading: boolean ;
  activeIndex: number = 0
  // index=0
  // handleChange(e:MouseEvent,tabIndex) {
  //   e.stopPropagation();
  //   if (this.index == tabIndex){
  //     return;
  //   }
  //   console.log(tabIndex,"this is working" )
  //   // this.confirmationService.confirm({
  //   //   message: "There are unsaved changes, do you want to proceed?",
  //   //   accept: () => {
  //   //     this.index = tabIndex;
  //   //   },
  //   //   reject: () => {}
  //   // });
  // }
  handleChange(e) {
    // console.log('Index is :', e.index);
    if (e.index == 0) {
      // this.getpatientproblem()
    }
    else if (e.index == 1) {
      this.getmedicationdata()
      this.getMed_Frequency_data();
      this.getMed_Instrations_data();
      this.getMed_dose_quantity()
    }
    else if (e.index == 2) {
      this.getAllergiesdata()
      this.getALLergiestype()
    }

    else if (e.index == 3) {
      this.getImmunizationsdata();
    }
    else if (e.index == 4) {

    }
    else if (e.index == 5) {
      this.getFamiltHistory()
    }
  }


  handleChange2(e) {
    // console.log('Index 2 is  :', e.index);
    if (e.index == 0) {

    }
    else if (e.index == 1) {
      this.getProcedureHistory()
    }
    else if (e.index == 2) {
      this.getTobaccoHistory()
    }
    else if (e.index == 3) {
      this.getSexualHistory()
    }
    else if (e.index == 4) {
      this.getImplantedDeviceshistory()
    }
    else if (e.index == 5) {
      this.getHospitalizationhistory()
    }
    else if (e.index == 6) {
      this.getAlcohslSubstanceshistory()
    }
  }
  items: MenuItem[] | undefined;
  items1: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;
  medFreequancy: string;
  medInstration: string;
  meddose: string;
  medstartdate: Date
  username: any;
  usernames: any;
  allerserverity: any;
  // position:string;
  currenthealthinsert: FormGroup;
  currenthealthissue: any;
  medicationinsert: FormGroup;
  allargyinsert: FormGroup;
  healthissuedate: Date;
  dateonsetdate: Date;
  dateofonset_date: Date;
  lastoccurence_date: Date;
  Administerd_date: Date;
  medenddate: Data;
  Immunizationsinsert: FormGroup;
  familyhistoryinsert: FormGroup;
  Allergy_Type: any
  displayhealthissueModal: boolean;
  visible: any
  patientID: any;
  medicationlength: any
  summarymedicationdata: any;
  summaryAllergiesdata: any;
  summaryImmunizations: any;
  patientproblemdata: any;
  FamiltHistorydata: any;
  ProcedureHistory: any;
  tobaccohistory: any;
  Sexualhistory: any;
  ImplantedDeviceshistory: any;
  FamiltHistorylength: any;
  Hospitalizationhistory: any;
  AlcohslSubstanceshistory: any;

  AlcohslSubstanceslength: any;
  ProcedureHistorylength: any;
  tobaccohistorylength: any;
  Sexualhistorylength: any;
  ImplantedDeviceslength: any;
  Hospitalizationlength: any;
  property: any;
  value: any;
  hospital_id: any;
  hospital_ID: any
  Branch_id: any
  Branch_ID: any
  patientid: any
  displayModal: boolean = false;
  displayallargyModal: boolean = false;
  displayFamilyModal: boolean = false;
  displayImmunizationsModal: boolean = false
  displayBasic: boolean = false;
  medication_drug: any
  allargydatasub: any
  Immunizationsdatasub: any
  familyhistorydata: any;
  msgs: Message[] = [];
  // familystatus: status[]=[]

  //   familystatus = [
  //   { name: 'Alive ', code: 'alive' },
  //   { name: 'Death', code: 'death' },

  // ];
  // statusdatashow: any;
  // getfamilystatus(){
  //   this.healthrecordsservices.getfamilystatusdata(this.patientID).subscribe((data:any)=>{
  // console.log(data,"this is family status data")
  // this.statusdatashow=data

  //   })
  // }
  // severityshow
  // getseveritydata() {

  //   this.healthrecordsservices.getseveritydataShow(this.patientID).subscribe((data: any) => {

  //     console.log('test data',data);
  //     console.log(data.length);
  //     this.severityshow=data
  //     // this.medicationlength=data.length
  //   })

  // }
  // patient problem data 
  // problem1:any
  // problem_name1:any
  // onsetDate1:any



  public _opened: boolean = false;
  router: any;
  public _toggleSidebar() {
    this._opened = !this._opened;
  }


  showhealthissuesDialog() {
    this.displayhealthissueModal = true;
    // this.currenthealthinsert.reset()
  }


  showallargyDialog() {
    this.displayallargyModal = true;
  }

  showFamilyDialog() {
    this.displayFamilyModal = true;
  }


  constructor(public routes: ActivatedRoute,public healthrecordsservices: HealthrecordsservicesService, public confirmationservice: ConfirmationService, public messageserveice: MessageService, private ngxLoader: NgxUiLoaderService, private datepipe: DatePipe) {
    super()
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe((param) => {
      console.log(param.formtype, "query oaraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      if (param.formtype == undefined) {
        this.activeIndex = 0
      }
      else {
        this.activeIndex = param.formtype
      }

    });

    // this.routes.queryParams.subscribe((param) => {
    //   console.log(param.formtype, "query oaraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //   if (param.formtype == undefined) {
    //     this.activeIndex = 0
    //   }
    //   else {
    //     this.activeIndex = param.formtype
    //     if( this.activeIndex==1){
    //      this.getmedicationdata()
    //     }
    //   }

    // });
    this.ngxLoader.start();
    this.ngxLoader.startLoader('loader-01');


    this.username = localStorage.getItem('user_name')
    this.usernames = JSON.parse(this.username);



    // 28/09/2-23
    this.hospital_id = localStorage.getItem('hospital_id')
    this.hospital_ID = JSON.parse(this.hospital_id);
    this.Branch_id = localStorage.getItem('organization_id')
    this.Branch_ID = JSON.parse(this.Branch_id);
    // 28/09/2-23



    var patientid = localStorage.getItem('guid')
    // console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    // console.log(this.patientID);



    this.getpatientproblem();
    // this.getFamiltHistory();
    this.getseveritydata();


    // for select button patient relative is alive or not
    this.getfamilystatus()
    this.getfamilyrelation()


    this.currenthealthinsert = new FormGroup({
      healthcare_insert: new FormControl('', [Validators.required]),
      healthissue_date: new FormControl('', [Validators.required]),
      healthissue_note: new FormControl('',)
    })


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


    this.allargyinsert = new FormGroup({
      allargy_insert: new FormControl('', [Validators.required]),
      reaction_serverity: new FormControl('', [Validators.required]),
      Allergytype: new FormControl(''),
      dateofonsetn_date: new FormControl('', [Validators.required]),
      lastoccurencen_date: new FormControl('', [Validators.required]),
      note: new FormControl('')
    })


    this.Immunizationsinsert = new FormGroup({
      Immunizationsname_insert: new FormControl('', [Validators.required]),
      manufacture: new FormControl(""),
      note: new FormControl(""),
      dateAdministerd_date: new FormControl('', [Validators.required]),
    })


    this.familyhistoryinsert = new FormGroup({
      family_patient_name: new FormControl('', [Validators.required]),
      family_patient_status: new FormControl('', [Validators.required]),
      family_patient_relation: new FormControl('', [Validators.required]),
      family_patient_Problem: new FormControl('', [Validators.required]),
      family_patient_onset: new FormControl('', [Validators.required]),
      family_patient_age: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(3)]),

    })
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
    this.items1 = [
  
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',

        command: () => {
          //  this.delete_procedure(this.menuid)
          console.log(this.menuid)
          this.immunization_delete(this.menuid)

        }
      }
    
    ];
    this.items2 = [
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
          console.log(this.menuid,"add family hisoty")
          this.family_history_del(this.menuid)
          // this.medication_delete(this.menuid)

        }
      }
 
    
    ];
  }

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

  getAllergiesdata() {
    this.healthrecordsservices.getAllergiesData(this.patientID).subscribe((data: any) => {
      // console.log('getAllergiesdata data',data);
      // console.log(data.length);
      this.summaryAllergiesdata = data
      this.medicationlength = data.length

    })
  }

  getALLergiestype() {
    this.healthrecordsservices.getAllergiestype(this.patientID).subscribe((res) => {
      console.log(res)
      this.Allergy_Type = res
    })

  }
  getImmunizationsdata() {
    this.healthrecordsservices.getgetImmunizationsData(this.patientID).subscribe((data: any) => {
      // console.log(data,'getImmunizationsdata data');
      // console.log(data.length);
      this.summaryImmunizations = data
      this.medicationlength = data.length

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

  getFamiltHistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getFamiltHistory(this.patientID).subscribe((data: any) => {
      // console.log(data);
      console.log(data.length);
      this.FamiltHistorydata = data
      this.FamiltHistorylength = data.length
      this.ngxLoader.stopLoader("loader-01");

    })
  }

  getProcedureHistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getProcedureHistoryservice(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.ProcedureHistory = data
      this.ProcedureHistorylength = data.length
      this.ngxLoader.stopLoader("loader-01");

    })
  }

  getTobaccoHistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getTobaccoHistoryservice(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.tobaccohistory = data
      this.tobaccohistorylength = data.length
      this.ngxLoader.stopLoader("loader-01");
    })
  }

  getSexualHistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getSexualHistoryservice(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.Sexualhistory = data
      this.Sexualhistorylength = data.length
      this.ngxLoader.stopLoader("loader-01");
    })
  }

  getImplantedDeviceshistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getImplantedDeviceshistoryservice(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.ImplantedDeviceshistory = data
      this.ImplantedDeviceslength = data.length
      this.ngxLoader.stopLoader("loader-01");

    })
  }


  getHospitalizationhistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getgetHospitalizationhistoryservice(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.Hospitalizationhistory = data
      this.ImplantedDeviceslength = data.length
      this.ngxLoader.stopLoader("loader-01");

    })
  }

  getAlcohslSubstanceshistory() {
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getAlcohslSubstanceshistoryservice(this.patientID).subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      this.AlcohslSubstanceshistory = data
      this.AlcohslSubstanceslength = data.length
      this.ngxLoader.stopLoader("loader-01");

    })
  }

  delete_allergy(id: any) {

    console.log(id);

    this.confirmationservice.confirm({
      message: 'Remove Form Dashboard And Show On history?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        // var index=  this.summaryAllergiesdata.findIndex(id)
        // 
        const index = this.summaryAllergiesdata.findIndex(object => {
          return object.id === id;
        });


        console.log(index);
        this.healthrecordsservices.delete_Allergy(id).subscribe((data: any) => {
          // console.log(data,"this is remove allergy data");

          // this.getAllergiesdata()

          if (data == 'success') {

            this.getAllergiesdata()

            this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Allergies Data Has Been Deleted' });
            this.displayBasic = false
          } else {
            this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have not   delete this data' });
          }



        })
      },
      reject: (type: any) => {
        this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You Have Canceled The Delete Data Option' });
      }
    });
  }

  delete_patientprobl(id: any) {
    this.confirmationservice.confirm({
      message: 'Remove Form Dashboard And Show On history?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {

        // for delete static
        const index = this.patientproblemdata.findIndex(object => {
          return object.id === id;
        });


        console.log(index);
        // this.healthrecordsservices.delete_Allergy(id).subscribe((data: any) => {
        //   console.log(data,"this is remove allergy data");







        this.healthrecordsservices.delete_Patientprobl(id).subscribe((data: any) => {

          if (data == 'success') {
            console.log(
              this.patientproblemdata.splice(index, 1), "ho rha h")
            console.log(this.patientproblemdata, "splice hone ke baad");

            // for the static delete


            this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Health Issues Data Has Been Deleted' });
            this.displayBasic = false
            // this.getpatientproblem()
          }
          else {
            this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have not   delete this data' });
          }


        })
      },
      reject: (type: any) => {
        this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
      }
    });


  }

  submit_healthissue() {


    // console.log(this.currenthealthinsert.value.healthissue_date)
    let dateformat = new Date(this.currenthealthinsert.value.healthissue_date);
    this.currenthealthinsert.value.healthissue_date = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
    // console.log(this.currenthealthinsert.value.healthissue_date,"new date")

    // console.log(this.currenthealthinsert.value);
    if (this.currenthealthFormAndGrid(this.currenthealthinsert)) {
      this.healthrecordsservices.submit_healthissue(this.currenthealthinsert.value, this.patientID, this.hospital_ID, this.Branch_ID).subscribe((data: any) => {
        // console.log(data);
        var id = data.result.insertId
        if (data.success) {

          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
          this.displayhealthissueModal = false
          // this.getpatientproblem()
          var d = new Date(this.currenthealthinsert.value.healthissue_date)
          var date = d.toISOString().split('T')[0];
          // console.log(date);

          var problem1 = this.currenthealthinsert.value.healthcare_insert.id
          var problem_name1 = this.currenthealthinsert.value.healthcare_insert.term
          var onsetDate1 = date
          var note = this.currenthealthinsert.value.healthissue_note

          // console.log(id);


          const helthdata = {
            problem: problem1,
            problem_name: problem_name1,
            onsetDate: onsetDate1,
            id: id,
            notes: note
          }


          // this.pdata.append
          this.patientproblemdata.push(helthdata)

          //  this. problem=this.currenthealthinsert.value.healthcare_insert.id
          //  this. problem_name=this.currenthealthinsert.value.healthcare_insert.term
          //  this. onsetDate=this.currenthealthinsert.value.healthissue_date
          //  console.log(this.problem)
          // console.log(this.patientproblemdata,"append hone ke baad");
          //   this.patientproblemdata.push([this.problem,this.problem_name,this.onsetDate])
          // console.log(this.patientproblemdata);


        }
      })
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }


  }

  filterhealthisse(event: any) {
    console.log(event);
    console.log(event.query);
    // this.healthrecordsservices.getpatientproblem(this.patientID).subscribe((data:any)=>{
    this.healthrecordsservices.master_healthisse(event.query).subscribe((data: any) => {
      // console.log(data);
      this.currenthealthissue = data
    })
  }



  showModalDialog() {
    this.displayModal = true;
  }


  // submit_madiactiondata(){
  //   this.medicationinsert = new FormGroup({
  //     medication_insert: new FormControl(''),

  //   });
  // console.log(this.medicationinsert)
  // }

  unitDoesData: any;
  unitDoesDataArray: any = [];

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

      this.healthrecordsservices.submit_madiaction(this.medicationinsert.value, this.patientID, this.hospital_ID, this.Branch_ID).subscribe((data: any) => {


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




  filterMedication(event: any) {
    console.log(event);
    console.log(event.query);
    this.healthrecordsservices.master_drug(event.query).subscribe((data: any) => {
      console.log(data, "this is medication  filter data");
      this.medication_drug = data
    })
  }




  submit_allargydata() {
    this.allargyinsert = new FormGroup({
      allargy_insert: new FormControl(''),

    });
    console.log(this.allargyinsert);
  }

  submit_allargy() {


    console.log(this.allargyinsert.value);
    if (this.allargyFormAndGrid(this.allargyinsert)) {

      // let dateformat = new Date(this.allargyinsert.value.start_date);
      // this.allargyinsert.value.start_date = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
      // console.log(this.allargyinsert.value.start_date,"new date")

      this.healthrecordsservices.allargyshowdata(this.allargyinsert.value, this.patientID, this.hospital_ID, this.Branch_ID).subscribe((data: any) => {
        this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.displayallargyModal = false
        this.getAllergiesdata()
        console.log(data);
        var allargy = data
        this.allargydatasub = allargy
      })
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }

  }


  filterallargy(event: any) {
    console.log(event);
    console.log(event.query);
    this.healthrecordsservices.masterallargy(event.query).subscribe((data: any) => {
      console.log(data);
      this.allargydatasub = data
    })
  }



  showImmunizationsDialog() {
    this.displayImmunizationsModal = true;
  }

  submitImmunizations_data() {
    this.Immunizationsinsert = new FormGroup({
      Immunizationsname_insert: new FormControl(''),

    });
    console.log(this.Immunizationsinsert);
  }



  submit_Immunizations() {

    console.log(this.Immunizationsinsert.value);
    if (this.immunizationsFormAndGrid(this.Immunizationsinsert)) {
      this.healthrecordsservices.Immunizationshowdata(this.Immunizationsinsert.value, this.patientID, this.hospital_ID, this.Branch_ID).subscribe((data: any) => {
        this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.displayImmunizationsModal = false
        this.getImmunizationsdata()

        //   console.log(data);
        //  var Immunizations=data
        //  console.log(Immunizations);
        // this.Immunizationsdatasub=Immunizations
      })
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }

  }

  filterImmunizations(event: any) {
    console.log(event);
    console.log(event.query);
    this.healthrecordsservices.masterImmunizations(event.query).subscribe((data: any) => {
      console.log(data, "this is suggection data");
      this.Immunizationsdatasub = data
    })
  }


  HealthIssues(event: any) {

    this.currenthealthinsert.reset();
  }

  Medication(event: any) {
    this.medicationinsert.reset();
  }

  Allergy(event: any) {
    this.allargyinsert.reset();
  }

  Familyhistory(event: any) {
    this.familyhistoryinsert.reset();
  }

  Immunizations(event: any) {
    this.Immunizationsinsert.reset();
  }


  severityshow: any;
  getseveritydata() {

    this.healthrecordsservices.getseveritydataShow(this.patientID).subscribe((data: any) => {

      console.log('test data', data);
      console.log(data.length);
      this.severityshow = data
      // this.medicationlength=data.length
    })

  }

  statusdatashow: any;
  getfamilystatus() {
    this.healthrecordsservices.getfamilystatusdata(this.patientID).subscribe((data: any) => {
      // console.log(data,"this is family status data")
      this.statusdatashow = data

    })
  }


  // familyrelation show
  Relationdatashow: any
  getfamilyrelation() {
    this.healthrecordsservices.getfamilyRelation(this.patientID).subscribe((data: any) => {
      // console.log(data,"this is family relation data data")
      this.Relationdatashow = data

    })
  }



  //  cities: familystatus[] | undefined;



  Frequencyshow: any;
  getMed_Frequency_data() {

    this.healthrecordsservices.getMedFrequencydataShow(this.patientID).subscribe((data: any) => {

      console.log('test data', data);
      console.log(data.length);
      this.Frequencyshow = data
      // this.medicationlength=data.length
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

  Instrationsshow: any;
  getMed_Instrations_data() {

    this.healthrecordsservices.getMedInstrationsdataShow(this.patientID).subscribe((data: any) => {

      console.log('test data', data);
      console.log(data.length);
      this.Instrationsshow = data
      // this.medicationlength=data.length
    })

  }

  filterfamilyhistory(event: any) {
    console.log(event);
    console.log(event.query);
    this.healthrecordsservices.masterfamilyhistory(event.query).subscribe((data: any) => {
      console.log(data);
      this.familyhistorydata = data
    })
  }

  submit_familyhistory() {

    let dateformat = new Date(this.familyhistoryinsert.value.family_patient_onset);
    this.familyhistoryinsert.value.family_patient_onset = this.datepipe.transform(dateformat, 'yyyy-MM-dd');
    console.log(this.familyhistoryinsert.value.family_patient_onset, "new date")
    console.log(this.familyhistoryinsert.value)

    // for show cuurent added data
    var familyhistoryname = this.familyhistoryinsert.value.family_patient_name;
    var familyhistoryage = this.familyhistoryinsert.value.family_patient_age;
    var familyhistorypatient_status = this.familyhistoryinsert.value.family_patient_status.status;
    var familyhistoryrelation = this.familyhistoryinsert.value.family_patient_relation.name
    var familyhistoryProblem = this.familyhistoryinsert.value.family_patient_Problem.term;
    var datepatient_onset_date = this.familyhistoryinsert.value.family_patient_onset;
    var add_datepatient_onset_date = new Date(datepatient_onset_date);
    var Administerdpatient_onset_date = add_datepatient_onset_date.toISOString().split('T')[0];


    // 

    if (this.familysFormAndGrid(this.familyhistoryinsert)) {
      this.healthrecordsservices.familyhistoryinsertdata(this.familyhistoryinsert.value, this.patientID, this.hospital_ID, this.Branch_ID).subscribe((data: any) => {
        var id1 = data.result.insertId
        var obj = {
          name: familyhistoryname,
          Age: familyhistoryage,
          relation: familyhistoryrelation,
          id: id1,
          Alive: familyhistorypatient_status,
          problem_name: familyhistoryProblem,
          OnsetDate: Administerdpatient_onset_date,
          uploaded_by:'PHR'
        }
        console.log(data);

        this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully Inserted' });
        this.displayFamilyModal = false
        // this.getFamiltHistory()

        // for current data load
        this.FamiltHistorydata.push(obj)
        console.log(this.FamiltHistorydata);
        var phrfamilyhistorydata = data
        console.log(phrfamilyhistorydata);
        this.familyhistorydata = phrfamilyhistorydata
      })
    }
    else {
      this.messageserveice.add({ severity: 'error', summary: 'Form Did Not Save!', detail: 'Enter Valid Data In Field' });
    }

  }



  ManufactureDose: any
  getVaccinedata(event) {
    console.log(event);
    //  this.Immunizationsinsert.patchValue({Vaccine_description:event.FullVaccineName,CVX_Code:event.CVXCode})
    // this.ManufactureDose = data
    this.healthrecordsservices.get_Manufacrure_data(event.CVXCode).subscribe((data: any) => {
      this.ManufactureDose = data
      console.log(this.ManufactureDose);

    })

  }

  menuid: any
  data(value) {
    console.log(value)
    this.menuid = value
  }


  //  for medication delete
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
            this.displayBasic = false
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


  // for medication edit

  edit_medication(id: any) {
    console.log(id)

    // this.isEdit = true;
    
    const foundItem = this.summarymedicationdata.filter(item => item.id === id);
    console.log(foundItem, "pkd ")


    var obj = { id: foundItem[0]?.ClinicalDrug, name: foundItem[0].ClinicalDrugName }
    var obj2 = { name: foundItem[0].doseUnit }
    this.medicationinsert.patchValue({
      // Frequency_name:obj,
      medication_insert: obj,
      dose: foundItem[0].Dose,
      dose_unit: obj2
    })
    this.showModalDialog()
    this.healthrecordsservices.edit_medication(id).subscribe((data: any) => {

      //  this.patchdata = data[0];  
      //  this.editid=data[0].id
      //  console.log(this.patchdata)

      //   const procedure_date=this.datepipe.transform(this.patchdata.start_date, 'dd/MM/yyyy');


      //   console.log("this is the formated date",procedure_date);

      //    // this.procedureinsert.patchValue(this.patchdata);
      //    this.procedureinsert.patchValue({
      //       start_date:procedure_date,
      //       note:this.patchdata.note
      //    });
      //    var obj={id:this.patchdata?.procedur,name:this.patchdata.name}
      //    var obj1={id:this.patchdata?.IndicationForProcedure,term:this.patchdata.procedure_indication }

      //    this.procedureinsert.patchValue({procedure_name:obj});
      //    this.procedureinsert.patchValue({procedure_indication:obj1});

      // this.displayBasic = false
      // this.getReasonOfVisit()


      // this.getmedicationdata();
    })
  }



// for family history delete

family_history_del(id) {
  this.confirmationservice.confirm({
    message: 'Remove Form Dashboard And Show On history?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {

      // for delete static
      console.log(id)

   

        this.healthrecordsservices.delete_family_history(id).subscribe((data: any) => {
if(data=="success"){
  


          console.log(this.FamiltHistorydata, "delete medication")
          const index = this.FamiltHistorydata.findIndex(object => {
            return object.id === id;
          });


          console.log(index);
          // this.healthrecordsservices.delete_Allergy(id).subscribe((data: any) => {
          //   console.log(data,"this is remove allergy data");





          // for the static delete

            this.FamiltHistorydata.splice(index, 1)
          console.log(this.FamiltHistorydata, "splice hone ke baad");

          // for the static delete


          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Medication  Data Has Been Deleted' });
          this.displayBasic = false
          this.menuid = ""
          // this.getpatientproblem()
        }else{
          this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'error' });
        }
        }
        
        
        )
      
    

      // return


    },
    reject: (type: any) => {
      this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
    }
  });


}


immunization_delete(id) {
  this.confirmationservice.confirm({
    message: 'Remove Form Dashboard And Show On history?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {

      // for delete static
      console.log(id)

   

        this.healthrecordsservices.delete_immunization(id).subscribe((data: any) => {
if(data=="success"){
  


          console.log(this.summaryImmunizations, "delete medication")
          const index = this.summaryImmunizations.findIndex(object => {
            return object.id === id;
          });


          console.log(index);
          // this.healthrecordsservices.delete_Allergy(id).subscribe((data: any) => {
          //   console.log(data,"this is remove allergy data");





          // for the static delete

            this.summaryImmunizations.splice(index, 1)
          console.log(this.summaryImmunizations, "splice hone ke baad");

          // for the static delete


          this.messageserveice.add({ severity: 'success', summary: 'Success!', detail: 'Your Current Medication  Data Has Been Deleted' });
          this.displayBasic = false
          this.menuid = ""
          // this.getpatientproblem()
        }else{
          this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'error' });
        }
        }
        
        
        )
      
    

      // return


    },
    reject: (type: any) => {
      this.messageserveice.add({ severity: 'error', summary: 'Canceled Request', detail: 'You have canceled The Delete Data Option' });
    }
  });


}

}
