import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

// import { CommanService } from 'src/app/services/comman.service';
import { MessageService } from 'primeng/api'
// import { PatientService } from '../Services/patient-service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { debounce } from 'rxjs';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
@Component({
  selector: 'app-flowsheet',
  templateUrl: './flowsheet.component.html',
  styleUrls: ['./flowsheet.component.css']
})
export class FlowsheetComponent implements OnInit {
  cols: any[] = []
  newsScore: any

  // @Input() patientguid: any;
  product: any
  date: any
  field: any
  rowData: any[] = []
  col: any[] = []
  BP: any = 'BP'
  bile: any
  flowsheetdata: any
  display: boolean = false
  date1: any
  genderdata: any
  flowsheetvital: any[] = []
  seletedInput: any
  vitalcolms: any
  displaysidebar: boolean = false;
  displayDialogGraph: boolean = false
  vitaltime: any
  flowsheetsidebardata: any
  vitalflowdata: any;
  Siteflowsheetdata;
  active: boolean = true
  activeState: boolean = true
  cities: any
  flowsheetdatacontants: any
  displaydata: boolean = false
  flowsheetvitalss: any[] = []
  advanceSingleoption: any
  sidebarsubheader: any[]=[]
  sidebarsubheaders: any
  beoleandata:any

  // Height (cm/m)"Weight","Height","HeadOFC","BMI","BSA"
  // Weight (kg/lb)
  // Head OFC (cm)
  // BSA (m2)Consciousness
  customHeaders5:any = ["Consciousness"]
  customHeaders4:any = ["Height","Weight","HeadOFC","BSA"]
customHeaders3:any = ["Temprature","Temprature_site","Temprature_Device"]
  customHeaders1:any = ["Pulse"]
  customHeaders2:any = ["HpercapnicRF","RR","spO2","SuplementalO2","O2Flow"]
  customHeaders:any = ["SBP","DBP","MBP","BP_Site","Position","Cuff_size","Method"]
  // graphdatas: {
  //   // labels:  this.headerdialog ,
  //   datasets: { label: any; data: any; fill: string; borderColor: string; pointStyle: string; tension: number; min: string; max: string; }[];
  // };
  sheetgraphdata: any;
  sheetgraphdate: any;
  constructor(private formbuilder: FormBuilder, private commanservice: HealthrecordsservicesService,public messageserveice: MessageService) {
    this.newsScore = [
      { name: '1', headernews: 'AGGREGATE SCORE' },
      { name: '2', headernews: 'NCRC' },
      { name: '3', headernews: 'Suggested Response' },
      { name: '4', headernews: 'Monitarizing frequency' },
      { name: '5', headernews: 'Excalation of care' }
    ];
    this.sidebarsubheaders = [
      { id: '1', header: 'Blood Pressure', value: 0 },
      { id: '2', header: 'Heart Rate', value: 0 },
      { id: '3', header: 'Body Temprature', value: 0 },
      { id: '4', header: 'Consciousness', value: 0 },
      { id: '5', header: 'Respiration', value: 0 },
      { id: '6', header: 'Antropometry', value: 0 }
    ];
    this.beoleandata = [
      { name: 'Yes', value: 'yes' },
      { name: 'NO', value: 'NO' },
    ]

    this.advanceSingleoption = {
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 2,
          backgroundColor: "transparent",
          color: '#f36f21',

          font: {

          }
        },

        legend: {
          position: 'right',
          Align: 'start',
          labels: {
            boxWidth: 70,
          }
        },
      },


      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 200,
        },

      }


    }
  }
  patientguid:any
  ngOnInit(): void {
    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientguid = JSON.parse(patientid || '{}')
    console.log(this.patientguid);

    this.getflowsheetCheckBoxsave();
    // flowsheetCheckBoxsaveget
    this.getflowsheetcolumdata();
    this.flowsheetheaderdata();
    this.getflowsheetdata();
    Chart.register(ChartDataLabels)
    // this.getflowsheetcontaindata();
    // this.getscoredata();
    this.get_transation_vital_data();
    this.getsitedata()
    this.getcuffsize()
    this.getmethod()
    this.GetPosition()
    this.getTemprature_Device()
    this.getConsciousness()
  }
  patchflowsheet() {

  }
  flowsheet = new FormGroup({
    patientId: this.formbuilder.array([this.initItemRows()]),
  })
  flowsheetform = new FormGroup({
    flowsheetinput: new FormControl(),
    flowsheedropdowns: new FormControl(),
  })
  initItemRows() {
    return this.formbuilder.group({
      webrefrence: new FormControl(),
    })
  }
  timeid:any
  
  formattedDate: string;
  pushvalue() {
    this.patchflowsheet();
    console.log(this.date1, this.timeid);
    
    this.display = false;
    this.formatDate(this.date1);
    // if (this.timeid == ' ' || this.timeid == null || this.timeid == undefined) {
    //   this.cols.push({ DateAndTime: this.formattedDate.trim() });
    //   debugger
    // } else {
      this.commanservice.changetimeof_flowsheet(this.timeid, this.formattedDate.trim(),this.patientguid).subscribe((data: any) => {
        if (data == 'success') {
          for (let i = 0; i < this.cols.length; i++) {
            if (this.cols[i].id == this.timeid) {
              this.cols[i].DateAndTime = this.formattedDate.trim()
            }
    
          }
          this.get_transation_vital_data();
          this.getflowsheetdata();
          
          this.timeid=' '
        }
      })
    // }
  
  }
  
    formatDate(date1) {
      const originalDate = new Date(date1);
  
      const day = originalDate.getDate();
      const month = originalDate.getMonth() + 1; // Months are zero-based
      const year = originalDate.getFullYear();
      const hours = originalDate.getHours();
      const minutes = originalDate.getMinutes();
  
      // Format the components into the desired string
      this.formattedDate = `${this.formatTwoDigits(day)}-${this.formatTwoDigits(month)}-${year} ${this.formatTwoDigits(hours)}:${this.formatTwoDigits(minutes)}`;
      console.log(this.formattedDate);
      
    }
  
    private formatTwoDigits(value: number): string {
      return value < 10 ? `0${value}` : `${value}`;
    

  }
  convertTo12HourFormat(time24Hr: string): string {
    const timeParts = time24Hr.split(':');
    var hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];


    let period = 'AM';

    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    return `${hours}:${minutes} ${period}`;
  }
  saveflowsheetColumData() {
    this.commanservice.saveflowsheetColumData(this.cols, this.patientguid).subscribe((data: any) => {

    })
  }

  formArrs: any[] = []
  get formArr() {
    return this.flowsheet.get('patientId') as FormArray;
  }

  getflowsheetdata() {
    this.commanservice.getflowsheetdata().subscribe((data: any) => {
      this.flowsheetdata = data
    })
  }
  scoredata: any
  dataValues:any
  get_transation_vital_data(){
    this.commanservice.get_transation_vital_data(this.patientguid).subscribe((data: any) => {
      this.dataValues = data
      this.cols=data
      console.log('qqqqqqqqqqqqqqqqqq',this.dataValues);
      
    })
  }
  // getscoredata() {
  //   this.commanservice.getscoredata().subscribe((data: any) => {
  //     this.scoredata = data
  //   })
  // }
  Respirationsvalue: any[] = []
  flowsheetheader: any
  bpsheet: any
  bpsheet1: any
  bpsheet2: any
  bpsheet3: any
  bpsheet4: any
  bpsheet5: any
  flowsheetheaderdata() {
    this.commanservice.flowsheetheaderdata().subscribe((data: any) => {
      this.flowsheetheader = data;
     
      
      for (let i = 0; i < this.flowsheetvitalss.length; i++) {
        if (this.flowsheetvitalss[i].headernames == 'Blood Pressure') {
          this.flowsheetvital = this.flowsheetheader.filter(key => key.flowsheetheader == 'Blood Pressure');
          this.bpsheet = this.flowsheetvital.length
        } else if (this.flowsheetvitalss[i].headernames == 'Respiration') {
          this.Respirationsvalue = this.flowsheetheader.filter(key => key.flowsheetheader == 'Respiration');
          this.bpsheet1 = this.Respirationsvalue.length
        }
        else if (this.flowsheetvitalss[i].headernames == 'Heart Rate') {
          this.HeartRatee = this.flowsheetheader.filter(key => key.flowsheetheader == 'Heart Rate');
          this.bpsheet2 = this.HeartRatee.length
        }
        else if (this.flowsheetvitalss[i].headernames == 'Consciousness') {
          this.Consciousnesse = this.flowsheetheader.filter(key => key.flowsheetheader == 'Consciousness');
          this.bpsheet3 = this.Consciousnesse.length
        }
        else if (this.flowsheetvitalss[i].headernames == 'Body Temprature') {
          this.BodyTempraturee = this.flowsheetheader.filter(key => key.flowsheetheader == 'Body Temprature');
          this.bpsheet4 = this.BodyTempraturee.length;
        }
        else if (this.flowsheetvitalss[i].headernames == 'Antropometry') {
          this.Antropometrys = this.flowsheetheader.filter(key => key.flowsheetheader == 'Antropometry');
          this.bpsheet5 = this.Antropometrys.length
        }
      }

    })
  }
  mainheader: any
  BloodPrusure: any
  BloodPressure: any[] = []
  color: any
  flowsheetvitals: any[] = []
  eventvalue: any
  headvalues: any
  Respirationeheader: any
  flowsheetvitalsss: any
  Consciousnes: any
  Antropomet: any
  BodyTempratureeindex:any
  BloodPrusureindex:any
  HeartRatindex:any
  Respirationeindex:any
  Consciousnesseindex:any
   Antropometryindex:any
  savecheckbox(event,id, HeartRate) {
    for (let i = 0; i < this.sidebarsubheader.length; i++) {
      if(this.sidebarsubheader[i].id==id){
      if (event.currentTarget.checked == true) {
        this.sidebarsubheader[i].value = 1;
      }
      else {
        this.sidebarsubheader[i].value = 0;
      }
    }
  }
    this.eventvalue = event.currentTarget.checked;
    this.headvalues = HeartRate
    this.color = 'red'
    if (this.headvalues == 'Blood Pressure') {
      this.BloodPrusure = HeartRate;
      this.BloodPrusureindex = this.flowsheetvitals.findIndex(key => key.headernames == 'Blood Pressure');
      if (event.currentTarget.checked == true) {
        this.flowsheetvitals.push({ ids: 1, headernames: HeartRate })
        this.flowsheetvital = this.flowsheetheader.filter(key => key.flowsheetheader == 'Blood Pressure');
        this.bpsheet = this.flowsheetvital.length
        // this.petchdata(); setTimeout(() => {
        //   this.petchdata();
        // }, 150);
      } else {
        this.flowsheetvitals.splice(this.BloodPrusureindex , 1);
        this.flowsheetvital = []
       
      }
      console.log(this.flowsheetvitals);
    }
    
    
    else
      if (HeartRate == 'Heart Rate') {
        this.HeartRat = HeartRate;
        this.HeartRatindex = this.flowsheetvitals.findIndex(key => key.headernames == 'Heart Rate');
        if (event.currentTarget.checked == true) {
          this.flowsheetvitals.push({ ids: 2, headernames: HeartRate })
          this.HeartRatee = this.flowsheetheader.filter(key => key.flowsheetheader == 'Heart Rate');
 
          this.bpsheet2 = this.HeartRatee.length
          // setTimeout(() => {
          //   this.petchdata()
          // }, 150);
          if (HeartRate.ative == 1) {
          } else { }
        } else {
          this.flowsheetvitals.splice(this.HeartRatindex, 1);
          this.HeartRatee = []
        }
        console.log(this.flowsheetvitals);
        
      }
      else
        if (HeartRate == 'Body Temprature') {
          this.BodyTempratur = HeartRate;
          this.BodyTempratureeindex = this.flowsheetvitals.findIndex(key => key.headernames == 'Body Temprature');
          if (event.currentTarget.checked == true) {
            this.flowsheetvitals.push({ ids: 3, headernames: HeartRate })
            this.BodyTempraturee = this.flowsheetheader.filter(key => key.flowsheetheader == 'Body Temprature');
            this.bpsheet4 = this.BodyTempraturee.length
            // setTimeout(() => {
            //   // this.petchdata()
            // }, 150);
            if (HeartRate.ative == 1) {

            } else { }
          } else {
            this.flowsheetvitals.splice(this.BodyTempratureeindex, 1);
            this.BodyTempraturee = []
          }
          console.log(this.flowsheetvitals,this.BodyTempratureeindex);
        }
        else
          if (HeartRate == 'Respiration') {
            this.Respirationeindex = this.flowsheetvitals.findIndex(key => key.headernames == 'Respiration');
            this.Respirationeheader = HeartRate;
            if (event.currentTarget.checked == true) {
              this.flowsheetvitals.push({ ids: 4, headernames: HeartRate })
              this.flowsheetdatas.push({ colm: this.colm, rowss: this.rows, contant: this.flowsheetform.controls['flowsheetinput'].value, time: this.header, header: this.headerid, subheader: this.subheader, ids: this.flowsheetid })
              this.flowsheetvitalsss = this.flowsheetvitals.reverse().filter((obj, index, self) =>
                index == self.findIndex((t) => (
                  t.headernames == obj.headernames
                ))
              )
              this.Respirationsvalue = this.flowsheetheader.filter(key => key.flowsheetheader == 'Respiration');
              this.bpsheet1 = this.Respirationsvalue.length
              // setTimeout(() => {
              //   this.petchdata()
              // }, 150);
              if (HeartRate.ative == 1) {
              } else { }
            } else {
              this.flowsheetvitals.splice(this.Respirationeindex , 1);
              this.Respirationsvalue = [];
            }
            console.log(this.flowsheetvitals);
          }
          else
            if (HeartRate == 'Consciousness') {
              this.Consciousnesseindex = this.flowsheetvitals.findIndex(key => key.headernames == 'Consciousness');
              this.Consciousnes = HeartRate;
              if (event.currentTarget.checked == true) {
                this.flowsheetvitals.push({ ids: 5, headernames: HeartRate })
                this.Consciousnesse = this.flowsheetheader.filter(key => key.flowsheetheader == 'Consciousness');
                this.bpsheet3 = this.Consciousnesse.length
                // setTimeout(() => {
                //   this.petchdata()
                // }, 150);
                if (HeartRate.ative == 1) {
                } else { }
              } else {
                this.flowsheetvitals.splice(this.Consciousnesseindex, 1);
                this.Consciousnesse = []
              }
              console.log(this.flowsheetvitals);
            }
            else
              if (HeartRate == 'Antropometry') {
                this.Antropomet = HeartRate;
                this.Antropometryindex = this.flowsheetvitals.findIndex(key => key.headernames == 'Antropometry');
                if (event.currentTarget.checked == true) {
                  this.flowsheetvitals.push({ ids: 6, headernames: HeartRate })
                  this.Antropometrys = this.flowsheetheader.filter(key => key.flowsheetheader == 'Antropometry');
                  this.bpsheet5 = this.Antropometrys.length
                  // setTimeout(() => {
                  //   this.petchdata()
                  // }, 150);
                  if (HeartRate.ative == 1) {
                  } else { }
                } else {
                  this.flowsheetvitals.splice(this.Antropometryindex, 1);
                  this.Antropometrys = []
                }
              }
             
              
              
  }
  HeartRatee: any[] = []
  HeartRat: any
  BodyTempratur: any
  BodyTempraturee: any[] = []
  Consciousnesse: any
  Antropometrys: any
  addtime() {
    this.display = true;
  }
  colm: any
  rows: any
  header: any
  newsindex: any
  newsrow: any
  headername: any
  fiftysix: any
  headerid: any
  subheader; any
  bntStyle: string;
  rowid: any
  colmid: any
  headerids: any
  subheaderdata: any
  datetime: any
  valueindex: any
  headerss:any
  datess:any
  subheaders:any
  sidebardata( header, colms, i, rowi, BP,subheader) {
    this.displaysidebar = true;

this.dates=header
this.subheaders=subheader
    console.log(header, colms, i, rowi, BP,subheader);
    // document.getElementById(`${this.colm}_${this.rows}_${this.headerid}`).classList.add('activecell')
    this.headerid = BP;
    this.colm = i;
    this.rows = rowi;
    this.datetime = header
    if (BP == 'BP') {
      this.valueindex = this.bpsheet
    } else
      if (BP == 'HeartRat') {
        this.valueindex = this.bpsheet2
      } else
        if (BP == 'Respirationeheader') {
          this.valueindex = this.bpsheet1
        } else
          if (BP == 'BodyTempratur') {
            this.valueindex = this.bpsheet4
          } else
            if (BP == 'Antropometry') {
              this.valueindex = this.bpsheet5
            } else
              if (BP == 'Consciousnes') {
                this.valueindex = this.bpsheet3
              }
    this.colmid = i + 1,
      this.rowid = rowi
    this.subheaderdata = colms;
    const allElements = document.querySelectorAll('.flowsheetContaner');
    allElements.forEach((element) => {
      element.classList.remove('activecell');
    });
    document.querySelectorAll('.flowsheetContaner').forEach

    console.log(i,rowi,BP);
    this.colm = i;
    this.rows = rowi;
       console.log(`${this.colm}_${this.rows}_${this.headerid}`);
       
         document.getElementById(`${this.colm}_${this.rows}_${this.headerid}`).classList.add('activecell')
       
    this.subheader = colms;
    this.headerid = BP;

    this.header = header;
    this.colm = i;
    this.rows = rowi;
    this.vitalcolms = colms
    this.vitaltime = header
    this.flowsheetform.reset()
    this.inputarray = ''
    this.newsrow = i;
    this.headername = colms
    // document.getElementById(`${i}_${rowi}_${BP}`).classList.add('activecell')
  }
  values: any
  uniqueArr: any
  filtervalue: any
  flowsheetid: any
  flowsheetdatas: any[] = [];
  flowSheetObj = {patientid: '', data:[]}
  savesidebardata() {
    this.values = this.flowsheetform.controls['flowsheetinput'].value
    this.colm;
    this.rows;
  
    
    
    // this.dates=header

console.log(this.dates, this.subheaders,this.values);



var modifDate;
var tempIndex = this.flowSheetObj.data.findIndex((x) => x.date == this.dates);
if(tempIndex>-1){
  if(this.flowSheetObj.data[tempIndex].values.hasOwnProperty(this.subheaders)){
    this.flowSheetObj.data[tempIndex].values[`${this.subheaders}`] = this.values;
  }
  else{
    this.flowSheetObj.data[tempIndex].values[`${this.subheaders}`] = this.values
  }
}
else{
  var tempobj = {date: this.dates, values: {}};
  // if(tempobj.values.hasOwnProperty(this.subheaders)){
  //   tempobj.values[`${this.subheaders}`] = this.values;
  // }
  // else{
    tempobj.values[`${this.subheaders}`] = this.values;
    this.flowSheetObj.data.push(tempobj);
  // }
}
console.log('-----',this.flowSheetObj);



    console.log(this.colm,this.rows,this.headerid, this.flowsheetform.controls['flowsheetinput'].value);
    // document.getElementById(`1_0_BP`).innerHTML = this.flowsheetform.controls['flowsheetinput'].value;
    document.getElementById(`${this.colm}_${this.rows}_${this.headerid}`).innerHTML = this.flowsheetform.controls['flowsheetinput'].value;
    // if()
    // if (document.getElementById(`${this.colm}_${this.rows}_${this.headerid}`).innerHTML == this.flowsheetform.controls['flowsheetinput'].value == null) {
    // }
    // this.flowsheetid = this.colm + '_' + this.rows + '_' + this.headerid;
    // if (this.flowsheetdatas.length > 0) {
    //   for (let i = 0; i < this.flowsheetdatas.length; i++) {
    //     if (this.colm == this.flowsheetdatas[i].colm && this.rows == this.flowsheetdatas[i].rows) {
    //       this.flowsheetdatas[i].contant = this.values;
    //     }
    //     else {
    //       this.flowsheetdatas.push({ datetime: this.datetime, subheaderdata: this.subheaderdata, colm: this.colm, rowss: this.rows, contant: this.flowsheetform.controls['flowsheetinput'].value, time: this.header, header: this.headerid, subheader: this.subheader, ids: this.flowsheetid })
    //       this.flowsheetdatas.filter((element) => this.rows != element.rowss && this.colm != element.colm);
    //       this.flowsheetdatas = this.flowsheetdatas.reverse().filter((obj, index, self) =>
    //         index == self.findIndex((t) => (
    //           t.ids == obj.ids
    //         ))
    //       ).reverse();
    //     }
    //     break;
    //   }
    // }
    // else {
    //   this.flowsheetdatas.push({ datetime: this.datetime, subheaderdata: this.subheaderdata, colm: this.colm, rowss: this.rows, contant: this.flowsheetform.controls['flowsheetinput'].value, time: this.header, header: this.headerid, subheader: this.subheader, ids: this.flowsheetid })
    //   this.flowsheetdatas = this.flowsheetdatas.reverse().filter((obj, index, self) =>
    //     index == self.findIndex((t) => (
    //       t.ids == obj.ids
    //     ))
    //   ).reverse();
    // }
    
    document.getElementById(`${this.colm}_${this.rows}_${this.headerid}`).classList.remove('activecell');
     this.colm = this.colm + 1;
     var colmm=this.colm;
     if(this.headerid=='BP'){
      console.log(this.customHeaders[colmm]);
      this.subheaders=this.customHeaders[colmm];
     }else
     if(this.headerid=='HeartRat'){
      this.subheaders=this.customHeaders1[colmm];
     }else
     if(this.headerid=='Respirationeheader'){
      this.subheaders=this.customHeaders2[colmm];
     }else
     if(this.headerid=='BodyTempratur'){
      this.subheaders=this.customHeaders3[colmm];
     }else
     if(this.headerid=='Antropometry'){
      this.subheaders=this.customHeaders4[colmm];
     }else
     if(this.headerid=='Consciousnes'){
      this.subheaders=this.customHeaders5[colmm];
     }
     
    
 
    this.bpsheet
    // if (this.rows <= this.valueindex - 1) {
    // }
    // else {
    //   this.colm = this.colm + 1;
    //   this.rows = 0
    // }
    this.flowsheetform.reset()
    this.inputarray = ' ';
    document.getElementById(`${this.colm}_${this.rows}_${this.headerid}`).classList.add('activecell')
    console.log(this.colm,this.rows,this.headerid);
    
  
  }
  flowsheetsidebardataa: any
  sidwbarfilddataqq() {
    console.log(this.flowsheetform.controls['flowsheedropdowns'].value);
    // debugger
    this.flowsheetform.patchValue({ flowsheetinput: this.flowsheetform.controls['flowsheedropdowns'].value })
  }
  saveinput() {
  }
  flowsheetsave() {
    this.sidebarsubheaderdata();
    this.flowsheetCheckBoxsave();
    // this.saveflowsheetColumData();
    console.log(this.flowSheetObj.data);
   
    
    this.commanservice.flowsheetsave(this.flowSheetObj.data, this.flowsheetvital, this.patientguid).subscribe((data: any) => {
      if (data =='success'){
        this.messageserveice.add({ severity: 'success', summary: 'Successfully', detail: 'Successfully Save FlowSheet' });
      }
    })
  }
  flowsheetCheckBoxsave() {
    this.commanservice.flowsheetCheckBoxsave(this.flowsheetvitals, this.patientguid).subscribe((data: any) => {
    })
  }
  sidebarsubheaderdata() {
    this.commanservice.sidebarsubheaderdata(this.sidebarsubheader, this.patientguid).subscribe((data: any) => {
    })
  }
  checkedVal: any
  colss: any
  dataheaderss: any
  sidebarsubheaderr:any[]=[]
  flowsheetsidebardatas:any[]=[]
  getflowsheetCheckBoxsave() {
    this.commanservice.getflowsheetCheckBoxsave(this.patientguid).subscribe((data: any) => {
      this.flowsheetvitalss = data[0];
      this.flowsheetvitals = data[0];
      this.activeState = true;
      if (data[1].length > 0) {
        this.sidebarsubheaderr = data[1]
        for (let j = 0; j < this.sidebarsubheaderr.length; j++) {
          this.flowsheetsidebardatas.push({id:this.sidebarsubheaderr[j].id,header:this.sidebarsubheaderr[j].header,value:this.sidebarsubheaderr[j].value})  
          this.sidebarsubheader.push({id:this.sidebarsubheaderr[j].id,header:this.sidebarsubheaderr[j].header,value:parseInt(this.sidebarsubheaderr[j].value)})  
        }
      } else {
        this.sidebarsubheader = this.sidebarsubheaders
      }
    })
  }

  // getflowsheetcontaindata() {
  //   this.commanservice.getflowsheetcontaindata(this.patientguid).subscribe((data: any) => {
  //     this.flowsheetdatas = data
  //     this.flowsheetdatacontants = data;
  //     this.petchdata()
  //   })
  // }

  petchdata() {
    for (let i = 0; i < this.flowsheetdatacontants.length; i++) {
      try {
        document.getElementById(this.flowsheetdatacontants[i].ids).innerHTML = this.flowsheetdatacontants[i].contant;
      } catch (error) {
      }
    }
  }
  dates:any
  columlength: any
  getflowsheetcolumdata() {
    this.commanservice.getflowsheetcolumdata(this.patientguid).subscribe((data: any) => {
      this.cols = data
      // console.log('---',this.cols.unshift({Patient_Id:'', date:'Header/Date',id: '', time: ''}));
      
      
      this.columlength = this.cols.length;
      this.dates=new Date()
      if(this.columlength==0){
        var duedate = this.dates.toISOString().split('T')[0];
        var times = this.dates.toISOString().split('T')[1];
        var timess = times.split('.')[0];
        var tmt = this.convertTo12HourFormat(timess);
        this.cols.push({ id: 0, date: duedate, times: tmt });
        this.columlength = this.cols.length
        this.display = false;
        this.date1 = ''
      }
    })
  }
  inputarray: any = ''
  value1: any
  valuepush1(id) {
    this.inputarray = this.inputarray.concat(id)
    this.flowsheetform.patchValue({ flowsheetinput: this.inputarray })
  }
  sidebardat() {
    document.getElementById(`0_1_1`).innerHTML = 'aman'
  }
  viewdetaildata: any
  headerdialog: any
  get_data_intable(product) {
    console.log(product);
    this.headerdialog=product
    this.displaydata = true
    this.gettabledata(product)
  }
  selectData(event) { }
  headerdialogs:any
  get_graph_data(event) {
    this.headerdialog=event
    console.log(this.headerdialog);
    

    if(this.headerdialog=='SBP'  || this.headerdialog=='DBP'  || this.headerdialog=='MBP'  || this.headerdialog=='Pulse'  || this.headerdialog=='RR' || this.headerdialog=='spO2'  || this.headerdialog=='O2Flow' ||  this.headerdialog=='Temprature' ||  this.headerdialog=='Height' || this.headerdialog=='Weight' || this.headerdialog=='HeadOFC' || this.headerdialog=='BSA')
     {
    this.displayDialogGraph = true
  
     }
     else{
      this.displayDialogGraph = false
    
      this.messageserveice.add({ severity: 'error', summary: 'Graph', detail: 'Graph not show' });
     }
  
    console.log(this.headerdialog);
 
    this.gettabledata(event)
   
    
  }
  
  gettabledata(product) {
    
    this.commanservice.graphdata(product,this.patientguid).subscribe((data: any) => {
      this.viewdetaildata = data
      
      console.log(this.viewdetaildata,this.viewdetaildata.length);

      this.sheetgraphdate=[]
      this.sheetgraphdata=[]
      for (let i = 0; i < this.viewdetaildata.length; i++) {
        this.sheetgraphdata.push(parseInt(this.viewdetaildata[i].name))
        this.sheetgraphdate.push(this.viewdetaildata[i]?.DateAndTime)
        console.log(this.sheetgraphdata,  this.sheetgraphdate);
        
      }
      console.log(this.sheetgraphdata,  this.sheetgraphdate);
      this.bindCharts()
    })
    
  }
  closedialogs(){
    this.displaydata=false
  }
  vitalsitedata:any
  getsitedata(){
    this.commanservice.vitalsitedata().subscribe((data)=>{
      this.vitalsitedata=data
      console.log( this.vitalsitedata,"vitals data>>>>>>>>")
    })
  }
  cuffsize:any
  getcuffsize(){
    this.commanservice.cuffsize().subscribe((data)=>{
      this.cuffsize=data
      console.log( this.cuffsize,"cuff data>>>>>>>>")
    })
  }
  method:any
  getmethod(){
    this.commanservice.getmethod().subscribe((data)=>{
      this.method=data
      console.log( this.method,"method data>>>>>>>>")
    })  }
    position:any
    GetPosition(){
      this.commanservice.getposition().subscribe((data)=>{
        this.position=data
        console.log( this.position,"position data>>>>>>>>")
      })
    }
    Temprature_Device:any
    getTemprature_Device(){
      this.commanservice.gettempraturedevice().subscribe((data)=>{
        this.Temprature_Device=data
        console.log( this.Temprature_Device,"Temprature_Device data>>>>>>>>")
      })
    }

    Consciousness:any
    getConsciousness(){
      this.commanservice.getConsciousness().subscribe((data)=>{
        this.Consciousness=data
        console.log( this.Consciousness,"Consciousness data>>>>>>>>")
      })
    }
    isCollapsed = false;
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }

    canceldisplay(){
      this.display=false
      this.date1=''
    }
    flase1:boolean=false
    colsindex:any
    DeleteRecords(col){
      console.log(col.id);
      console.log(col);

      this.colsindex = this.cols.findIndex(key => key.id == col.id);
      
      this.cols.splice(this.colsindex , 1);
      
      this.commanservice.deletevitalflowsheetdata(col.id).subscribe((data:any)=>{
  if(data=='delete'){
    this.get_transation_vital_data();
    this.getflowsheetdata();
    
  }else{
  this.cols.push({DateAndTime:this.formattedDate.trim()});
  }
      })
      
    }
    // timeid:any
    editdata(col){
      console.log(col.id);
      this.display=true
      this.timeid=col.id
     
    }
    // labels:any
    graphdatas:any
    bindCharts() {
console.log(this.headerdialogs,"ddd",this.headerdialog);

      this.graphdatas = {
        labels:  this.sheetgraphdate ,
        datasets: [
          {
            label:  this.headerdialog ,
            data: this.sheetgraphdata,
            fill: '+1',
            
            borderColor: '#26A69A',
            pointStyle :'triangle',
            tension: .1,
            min:'0',
            max:'120'
          },
          
        ]
      }
      
      // this.advanceSingleoption = {
      //   plugins: {
      //     datalabels: {
      //       align: 'end',
      //       anchor: 'end',
      //       borderRadius: 2,
      //       backgroundColor: "transparent",
      //       color: '#f36f21',
       
      //       font: {
  
      //       }
      //     },
          
      //     legend: {
      //       position : 'right',
      //       Align:'start',
      //       labels: {
      //         boxWidth:70,
             
      //       }
      //     },
          
      //   },
      
       
      //   scales: {
      //     y: {
            
      //       suggestedMin: 0,
    
          
      //       suggestedMax: 200,
      //     },
        
           
  
         
      //   }
       
  
      // }
    }
}
