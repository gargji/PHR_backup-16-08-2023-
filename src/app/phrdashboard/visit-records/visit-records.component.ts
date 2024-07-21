import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem, MessageService } from 'primeng/api';
import { CommanserviceService } from 'src/app/commanservice.service';
import { PatientAppointmentService } from '../HealthRecordsServices/patient-appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-records',
  templateUrl: './visit-records.component.html',
  styleUrls: ['./visit-records.component.css']
})
export class VisitRecordsComponent implements OnInit, AfterViewInit {
  currentDateTime: string;
  currentDate: any;
  items: MenuItem[] | undefined;
  items1: MenuItem[] | undefined;
  last = false;
  date14: Date;
  patientID: any;
  patientvisitrecordlength: any
  patientvisitrecord: any;
  property: any;
  value: any;
  username: any
  usernames: any

  public _opened: boolean = false;
  public _toggleSidebar() {
    this._opened = !this._opened;
  }
  activeIndex: number = 0

  constructor(public routes: ActivatedRoute, public healthrecordsservices: HealthrecordsservicesService, private ngxLoader: NgxUiLoaderService, private messageService: MessageService, private commanservice: CommanserviceService) {



  }
  ngAfterViewInit() {
    // Your initialization code here
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

    this.items = [
      // {
      //     label: 'Edit',
      //     icon: 'pi pi-fw pi-pencil',
      //     command: () => {
      //       this.update();
      //   }
      // },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => {
          console.log(this.visitrecordid)
          this.deletevisitrecord(this.visitrecordid);
        }
      }
    ];

    this.items1 = [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => {
          this.deletereqestrecord(this.visitrecordid);
        }
      }
    ];

    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 2000);


    // setTimeout(() => {

    // }, 2000);

    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    console.log(this.patientID);

    this.getvisitrecord();
    this.getrequestvisitData()
    // for user name
    this.username = localStorage.getItem('user_name')
    this.usernames = JSON.parse(this.username);




  }

  pastdata: any
  comming_visit: any;
  // getvisitrecord() {
  //   const date = new Date();
  //   this.currentDateTime = date.toLocaleString();
  //   this.ngxLoader.startLoader("loader-01");
  //   this.healthrecordsservices.getvisitrecordData(this.patientID).subscribe((data: any) => {
  //     if (data) {
  //       this.ngxLoader.stopLoader("loader-01");
  //       this.patientvisitrecord = data
  //       console.log(this.patientvisitrecord, "patient visit record", data[0].start_date)

  //       if (this.patientvisitrecord.length > 0) {
  //         const currentDateTime = new Date();

  //         const year = currentDateTime.getFullYear();
  //         const month = currentDateTime.getMonth() + 1; // Months are zero-based, so we add 1
  //         const day = currentDateTime.getDate();
  //         const hours = currentDateTime.getHours();
  //         const minutes = currentDateTime.getMinutes();
  //         const seconds = currentDateTime.getSeconds();






  //         const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //         // const formattedDateTime = `2023-10-11 12:29:49`;
  //         console.log(formattedDateTime)
  //         if (data[0].start_date > formattedDateTime) {
  //           const formattedDateTime = new Date();
  //           console.log(formattedDateTime,"this is formated date")
  //           this.pastdata = this.patientvisitrecord.filter((x) => {
  //             const visitStartDate = new Date(x.start_date); // Assuming x.start_date is a valid date string
  //             console.log(visitStartDate,"1234")

  //             return visitStartDate < formattedDateTime;
  //           });
  //           console.log(this.pastdata)
  //         }
  //         if (data[0].start_date >= formattedDateTime) {
  //           const formattedDateTime = new Date();

  //           this.comming_visit = this.patientvisitrecord.filter((x) => {
  //             const visitStartDate = new Date(x.start_date);

  //             return visitStartDate > formattedDateTime;
  //           });
  //         }
  //         console.log(this.comming_visit, "new")
  //       }
  //     }
  //   })
  // }



  getvisitrecord() {
    const date = new Date();
    this.currentDateTime = date.toLocaleString();
    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getvisitrecordData(this.patientID).subscribe((data: any) => {
      if (data) {
        this.ngxLoader.stopLoader("loader-01");
        this.patientvisitrecord = data
        // console.log(this.patientvisitrecord,"patient visit record",data[0].start_date)
        const formattedDateTime = new Date();
        this.comming_visit = this.patientvisitrecord.filter((x) => {
          const visitStartDate = new Date(x.start_date);

          return visitStartDate > formattedDateTime;
        });


        this.pastdata = this.patientvisitrecord.filter((x) => {
          const visitStartDate = new Date(x.start_date); // Assuming x.start_date is a valid date string
          console.log(visitStartDate)
          return visitStartDate <= formattedDateTime;
        });
        // console.log(",,,,,,,,,,,",this.pastdata)   
      }
    })

  }
  // new code from rahul 



  // end new code

  //     if(this.patientvisitrecord.length >0){
  //       console.log("0")
  //       const currentDateTime = new Date();
  //     const year = currentDateTime.getFullYear();
  //     const month = currentDateTime.getMonth() + 1; // Months are zero-based, so we add 1
  //     const day = currentDateTime.getDate();
  //     const hours = currentDateTime.getHours();
  //     const minutes = currentDateTime.getMinutes();
  //     const seconds = currentDateTime.getSeconds();
  //     const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //     console.log(formattedDateTime,"ssss")
  //     console.log(data[0].start_date,".......")
  //     if(this.patientvisitrecord[0].start_date <= formattedDateTime){
  //       console.log(this.patientvisitrecord[0].start_date > formattedDateTime)
  //       console.log("2")
  //       const formattedDateTime1 = new Date();
  //      console.log(formattedDateTime1)
  //      this.pastdata = this.patientvisitrecord.filter((x) => {
  //         const visitStartDate = new Date(x.start_date); // Assuming x.start_date is a valid date string
  // console.log(visitStartDate)
  //         return visitStartDate < formattedDateTime1;
  //       });    
  //       console.log(",,,,,,,,,,,",this.pastdata)   
  //     }
  //     console.log(formattedDateTime)
  //     if(this.patientvisitrecord[0].start_date > formattedDateTime){
  //       console.log(",,,,,,,,,,,",this.pastdata)
  //       const formattedDateTime = new Date(); 
  //       console.log("1")
  //       this.comming_visit= this.patientvisitrecord.filter((x) => {
  //          const visitStartDate = new Date(x.start_date); 

  //          return visitStartDate > formattedDateTime;
  //        });

  //     }
  //     else{
  //       console.log('gdbd')
  //     }
  //     }



  //   }}) 
  // }
  // }

  // }
  reqestdata: any
  getrequestvisitData() {
    this.ngxLoader.startLoader("loader-01");
    console.log(this.patientID)
    this.healthrecordsservices.getrequestvisitData(this.patientID).subscribe((data) => {
      console.log(data)
      this.ngxLoader.stopLoader("loader-01");
      this.reqestdata = data

    })
  }
  update() {
    this.messageService.add({ severity: 'error', summary: 'Success', detail: 'in working progress' });
  }

  deletevisitrecord(visitrecordid) {

    console.log(visitrecordid)
    this.healthrecordsservices.deletevisitrecord(visitrecordid).subscribe((res) => {
      console.log(res)
      this.getvisitrecord();
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully deleted' });
    })








  }
  deletereqestrecord(visitrecordid) {

    console.log(visitrecordid)


    this.healthrecordsservices.deletereqestrecord(visitrecordid).subscribe((data:any) => {


      console.log(data)

      // this.getvisitrecord();
      if (data == 'success') {

        this.getrequestvisitData()
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully deleted' });
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Not deleted ' });
      }

    })
  }
  // getSignature(){
  //   console.log('hitting button');

  //   this.commanservice.joinZoomMeeting('');
  // }
  visitrecordid: any
  data(id) {
    console.log(id, 'this is id')
    this.visitrecordid = id
  }
}
