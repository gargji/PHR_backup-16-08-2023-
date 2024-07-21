import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, TemplateRef, } from '@angular/core';
// import { CommanService } from 'src/app/comman.service';
// import { MessagecenterService } from '../messagecenter.service';
import { PatientSignaturesService } from '../../HealthRecordsServices/patient-signatures.service';


@Component({
  selector: 'app-messagesidebar',
  templateUrl: './messagesidebar.component.html',
  styleUrls: ['./messagesidebar.component.css']
})
export class MessagesidebarComponent implements OnInit {
  displayBasic3:boolean=false
  @Output() OpenSaveButtonToEmit = new EventEmitter();
  constructor(public patientSignatures:PatientSignaturesService) { }

  ngOnInit(): void {
  }
  
  displayModal: boolean;
  processbarThree: number = 0;
  // displayBasic3: boolean;
  showBasicDialog3() {
    console.log('showBasicDialog3');
    
   this.displayBasic3=true

    
  }

  cancelDialog2(){
    console.log('cancelDialog message sidebar');
    this.displayBasic3=false
  }
}
