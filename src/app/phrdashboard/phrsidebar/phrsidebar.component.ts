import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-phrsidebar',
  templateUrl: './phrsidebar.component.html',
  styleUrls: ['./phrsidebar.component.css']
})

export class PHRsidebarComponent implements OnInit {
  // this._opened = opened;
  items: MenuItem[];
  patientid: any;
  patientID: any;
  guid: any
  username: any
  usernames: any
  item1: any
  visit_summary: any
  // items: any[] = [];

  constructor() { }

  ngOnInit(): void {



    this.guid = localStorage.getItem('guid')
    this.guid = JSON.parse(this.guid);
    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    console.log(this.patientID);


    this.username = localStorage.getItem('user_name')
    this.usernames = JSON.parse(this.username);

    this.visit_summary = JSON.parse(localStorage.getItem('visit_summary'))


    console.log(this.visit_summary, "ssssssssssssssssssssssssssssssssssssssss")

    this.items = [

      {
        label: 'Documents',
        icon: 'pi pi-file',
        routerLink: 'documentshare',
      },


      {
        label: 'Message',
        icon: 'fa fa-envelope ',
        routerLink: 'massage',
        // items: [
        //     {
        //         label: 'Inbox/My Messages/Chats',
        //         icon:'pi pi-fw pi-circle-fill'
        //     },
        //     {
        //         label: 'Ask A Question/Secure Chat',
        //         icon:'pi pi-fw pi-circle-fill'
        //     },
        //     {
        //         label: 'Request A Record/Certificate',
        //         icon:'pi pi-fw pi-circle-fill'
        //     },
        //     {
        //         label: 'Letters',
        //         icon:'pi pi-fw pi-circle-fill'
        //     },
        //     {
        //       label: 'Contact Us',
        //       icon:'pi pi-fw pi-circle-fill'
        //      }


        //     ],

      },

      {
        label: 'Visit Records',
        icon: 'fa-solid fa-hospital-user',
        routerLink: 'Visit_Records',

      },

      {
        label: 'Schedule Care',
        icon: 'pi pi-fw pi-heart',
        items: [
          // {
          //     label: 'My Calender',
          //     icon:'pi pi-fw pi-circle-fill'

          // },
          {
            label: 'Schedule An Appointment',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'book_appointment',
          },
          {
            label: 'My Doctors/Care Team',
            icon: 'pi pi-fw pi-circle-fill'
          },
          {
            label: 'My Pharmacies',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'pharmacy',
          }

        ]
      },

      // {
      //   label: 'TeleConsult',
      //   icon:'pi pi-fw pi-phone',
      //   items: [
      //       {
      //           label: 'Join Teleconsult',
      //           icon:'pi pi-fw pi-circle-fill'

      //       },
      //       {
      //           label: 'Create New Meeting',
      //           icon:'pi pi-fw pi-circle-fill'
      //       }       

      //   ]
      //   },




      // {
      //   label: 'Radiology-PACS',
      //   icon:'pi pi-fw pi-microphone',
      //   items: [
      //       {
      //           label: 'DICOM Files',
      //           icon:'pi pi-fw pi-circle-fill'

      //       },
      //       {
      //           label: 'Cloud PACS',
      //           icon:'pi pi-fw pi-circle-fill'
      //       }       

      //   ]
      //   },

      {
        label: 'My Health Records',
        icon: 'pi pi-fw pi-home',
        routerLink: 'dashboard',
        items: [
          // {
          //     label: 'Flow Chart',
          //     icon:'pi pi-fw pi-circle-fill',
          //     routerLink:'vitals'

          // },

          {
            label: 'Health Summary',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'healthSummery'

          },

          {
            label: 'Medication',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'medication'
          },
          {
            label: 'Procedure',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'procedure'
          },
          {
            label: 'Diet',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'Diet'
          },
          {
            label: 'Therapies',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'Therapies'
          },
          {
            label: 'Visit Records',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'Visit_Records'
          },
          // {
          //   label: 'Test Results(Radiology)',
          //   icon: 'pi pi-fw pi-circle-fill',
          //   routerLink: 'radiology'
          // },
          // {
          //   label: 'Images',
          //   icon: 'pi pi-fw pi-circle-fill',


          // },
          {
            label: 'Plan Of Care/To-Do List',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink:'task'
          },
          {
            label: 'Preventive Care',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'prevebtive_care'
          },
          //   {
          //     label: 'Medical And Family History',
          //     icon:'pi pi-fw pi-circle-fill',
          //     routerLink:'Family_History'
          // },
          // {
          //   label: 'My Document Center',
          //   icon:'pi pi-fw pi-circle-fill',
          //   routerLink:'document_center'
          //   },
          {
            label: 'My Document ',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'documentshare'
          },
          {
            label: 'Labs Flow Sheet',
            icon: 'pi pi-fw pi-circle-fill',
            routerLink: 'newflowsheet'

          },
          // {
          //   label: 'Flow Sheet',
          //   icon: 'pi pi-fw pi-circle-fill',
          //   routerLink: 'flowsheet'

          // },
       




        ]
      },

      // {
      //   label: 'Share Records',
      //   icon: 'pi pi-fw pi-share-alt',
      //   routerLink: 'sharerecords',
      //   items: [
      //     {
      //       label: 'Share Records',
      //       icon: 'pi pi-fw pi-circle-fill'

      //     },
      //     {
      //       label: 'Link Weklinks',
      //       icon: 'pi pi-fw pi-circle-fill'
      //     }

      //   ]
      // },

      {
        label: 'Place Orders',
        icon: 'pi pi-fw pi-cart-plus',
        items: [
          {
            label: 'Pharmacy',
            icon: 'pi pi-fw pi-circle-fill'

          },
          {
            label: 'Labs',
            icon: 'pi pi-fw pi-circle-fill'
          },
          //   {
          //     label: 'Radology',
          //     icon:'pi pi-fw pi-circle-fill'

          // },
          //   {
          //     label: 'Remote Heath Monitoring ',
          //     icon:'pi pi-fw pi-circle-fill'

          // },       
          {
            label: 'Medical Tourism',
            icon: 'pi pi-fw pi-circle-fill'

          },

        ]
      },
      {
        label: 'Lab Result & Order',
        icon: 'fa fa-solid fa-flask',
        routerLink: 'labresult&order',
      },

      {
        label: 'Settings',
        icon: 'pi pi-fw pi-key',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-circle-fill'

          },
          {
            label: 'Upgrade Plan',
            icon: 'pi pi-fw pi-circle-fill'
          },
          {
            label: 'Health Cash Card',
            icon: 'pi pi-fw pi-circle-fill'

          },
          {
            label: 'Communication Settings ',
            icon: 'pi pi-fw pi-circle-fill'

          },
          {
            label: 'TeleMeet Setting',
            icon: 'pi pi-fw pi-circle-fill'

          },
          {
            label: 'Share Records Settings',
            icon: 'pi pi-fw pi-circle-fill'

          },
          {
            label: 'Theme',
            icon: 'pi pi-fw pi-circle-fill'

          },

        ]
      },

      {
        label: 'My Signatures',
        icon: 'fa fa-solid fa-signature',
        routerLink: 'my_signatures',
      },

      {
        label: 'My Ledger (Tab)',
        icon: 'pi pi-fw pi-user-edit',

      },



    ]
    this.item1 = this.items

    //   if(this.visit_summary==0){
    //     this.items.splice(1, 0,    {
    //       label: 'Visit Records',
    //       icon:'fa-solid fa-hospital-user',
    //       routerLink:'Visit_Records',
    //       },);
    //    }
  }
  searchTerm = '';
  filteredItems: any[] = [];

  // onInputChange() {
  //   if(this.searchTerm.length>2){
  //     this.filteredItems = this.filterItems(this.searchTerm);
  //     this.startSearch()
  //   }else{
  //     this.items=this.item1
  //   }

  // }

  // filterItems(term: string): any[] {
  //   term = term.toLowerCase();
  //   return this.items.filter((item) => item.label.toLowerCase().includes(term));
  // }

  // startSearch() {
  //   // You can use the filteredItems array as needed
  //   console.log(this.filteredItems);
  //   this.items=this.filteredItems
  // }
  // items: MenuItem[] = [
  //   // ... your existing items
  // ];

  // item1: MenuItem[] = this.items;

  // searchTerm = '';
  // filteredItems: MenuItem[] = [];

  onInputChange() {
    if (this.searchTerm.length > 2) {
      this.filteredItems = this.filterItems(this.searchTerm, this.item1);
      this.startSearch();
    } else {
      this.items = this.item1;
    }
  }

  filterItems(term: string, items: MenuItem[]): MenuItem[] {
    term = term.toLowerCase();
    return items.reduce((acc, item) => {
      const matchesLabel = item.label.toLowerCase().includes(term);
      const matchesNestedItems = item.items
        ? this.filterItems(term, item.items).length > 0
        : false;

      if (matchesLabel || matchesNestedItems) {
        acc.push({ ...item, items: matchesNestedItems ? this.filterItems(term, item.items) : [] });
      }

      return acc;
    }, [] as MenuItem[]);
  }

  startSearch() {
    // You can use the filteredItems array as needed
    console.log(this.filteredItems);
    this.items = this.filteredItems;
  }


}
