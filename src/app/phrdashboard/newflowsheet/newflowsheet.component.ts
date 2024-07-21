
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommanserviceService } from 'src/app/commanservice.service';
import { DatePipe} from '@angular/common';
// import { Chart } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';




@Component({
  selector: 'app-newflowsheet',
  templateUrl: './newflowsheet.component.html',
  styleUrls: ['./newflowsheet.component.css'],
  providers:[DatePipe]
})
export class NewflowsheetComponent implements OnInit {
  activeStatus:boolean=true;
  Status:true;
  // @Input() patientguid: any;
  flowsheetheader:any[]=[]
  LIVERFUNCTIONTEST:any[]=[]
  Coagulationprofile:any[]=[]
  flowsheetvitals:any[]=[]
  filtertime:any[]=[]
  displaysidebar:boolean=false
  patientguid: any;
  hospital_ID: any;
  branchID: any;
id: any;
guid: any;
statusClass: any;
  constructor(private commanservice: CommanserviceService, public messageservice:MessageService,private datePipe: DatePipe) {
    this.filtertime
    = [
      { name: 'All Results', id: '1' },
      { name: 'Since Time Marks', id: '2'},
      { name: 'Today', id: '3' },
      { name: '3 Days', id: '4' },
      { name: '1 Month', id: '5' },
      { name: '3 Month', id: '6' },
      { name: '6 Month', id: '7' },
      { name: '1 Year', id: '8' },
      { name: 'Since Last Encounter', id: '9' },
    ];
  }

  ngOnInit(): void {

    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientguid = JSON.parse(patientid || '{}')
    console.log(this.patientguid);
    var hospital_id = localStorage.getItem('organization_id')
    console.log(hospital_id, "hospital id");
    this.hospital_ID = JSON.parse(hospital_id || '{}')
    console.log(this.hospital_ID)
    var branch_id = localStorage.getItem('hospital_id')
    this.branchID = JSON.parse(branch_id || '{}')
    console.log(this.branchID)
    // this.active=true
   this.getflowsheetfavrate();
    this.getflowsheetdataheader()
    this.getflowsheetcolumdata();
    this.flowsheetlabsdataheader()
    this.getflowsheetcolumdata();
    this.getlabsflowsheetcontaindata();
    this.getLabsflowsheetCheckBoxsave();
    this.scroedcard_search('event')
  
  }
  flowsheetform = new FormGroup({
    flowsheetinput: new FormControl(),
    Impression: new FormControl(),
  })
  getflowsheetdataheader(){
    this.commanservice.getflowsheetdataheader(this.labsname).subscribe((data: any) => {
      this.flowsheetheader=data
      
    })
  }
  indexingarry:any[]=[]
  flowsheetdatalabs:any[]=[]
  flowsheetvitalss:any[]=[]

  savecheckbox(event, HeartRate) {
  
    for (let i = 0; i < this.sidebarsubheader.length; i++) {
      if (this.sidebarsubheader[i].id == HeartRate.id) {
        if (event.currentTarget.checked == true) {
          this.sidebarsubheader[i].value = 1;
          this.flowsheetvitalss.push({ headernames: HeartRate.flowsheet_header_name, id: HeartRate.id })
          // this.indexingarry.push({index: this.flowsheetvitalss.length,value:HeartRate.id})
        }
        else {
          this.sidebarsubheader[i].value = 0;
        
          this.flowsheetvitalss.splice(i, 1);
          // }
        }
        
      }
    }
    console.log(event,this.sidebarsubheader);
   
    if (event.currentTarget.checked == true) {
    this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.flowsheet_header_name == HeartRate.flowsheet_header_name);
    
    // this.flowsheetdatalabs.push(this.flowsheetvital)
    this.flowsheetdatalabs.push({"key":HeartRate.flowsheet_header_name,"data":this.flowsheetvital})
    console.log(this.indexingarry, this.flowsheetdatalabs);
    // this.flowsheetdatalabs[this.flowsheetdatalabs.length-1].push({value:this.flowsheetdatalabs.length})
  
         setTimeout(() => {
        this.patchdata();
     }, 150);
    }
    else{
      // console.log(this.flowsheetdatalabs.indexOf(HeartRate.id));
      // var idnnn=this.flowsheetdatalabs.indexOf(HeartRate.flowsheet_header_name)
      // console.log(idnnn);
      

      // this.flowsheetdatalabs.splice(this.flowsheetdatalabs.length-1);
      for (let j = 0; j < this.flowsheetdatalabs.length; j++) {
        console.log(this.flowsheetdatalabs[j].key==HeartRate.flowsheet_header_name);
        if(this.flowsheetdatalabs[j].key==HeartRate.flowsheet_header_name){
          this.flowsheetdatalabs.splice(j,1);
        }
        // const element = array[j];
        
      }
    }
  }
 
  flowsheetvital:any
checkboxheader:any
flowsheetvit:any

  getLabsflowsheetCheckBoxsave(){
    this.flowsheetdatalabs=[]
    this.flowsheetvitalss=[]
    this.checkboxheader=[]
    this.commanservice.getLabsflowsheetCheckBoxsave(this.patientguid,this.labsname).subscribe((data: any) => {
      console.log('',data);
      if(data.length==0){
        
         this.flowsheetvit=this.sidebarsubheader; 
         for (let i = 0; i < this.flowsheetvit.length; i++) {
          // this.savecheckboxes(event,this.flowsheetvit[i])
          this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.flowsheet_header_name == this.flowsheetvit[i].flowsheet_header_name);
          
          // this.flowsheetdatalabs.push(this.flowsheetvital)
          this.flowsheetdatalabs.push({"key":this.flowsheetvit[i].flowsheet_header_name,"data":this.flowsheetvital})
          console.log(this.indexingarry, this.flowsheetdatalabs);
          // this.flowsheetvitalss.push({id:this.flowsheetvit[i].idm, patient_id:this.flowsheetvit[i].patient_id, headernames:this.flowsheetvit[i].headernames})
          
         }
      }
      else{
        
        this.flowsheetvit=data;
      
    
      
     this.checkboxheader=data;
   
     for (let i = 0; i < this.flowsheetvit.length; i++) {
      this.savecheckboxes(event,this.flowsheetvit[i])
      // this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.flowsheet_header_name == this.flowsheetvit[i].headernames);
      
      // // this.flowsheetdatalabs.push(this.flowsheetvital)
      // this.flowsheetdatalabs.push({"key":this.flowsheetvit[i].headernames,"data":this.flowsheetvital})
      
      console.log(this.indexingarry,'tttttttttttttttt', this.flowsheetdatalabs);
      // this.flowsheetvitalss.push({id:this.flowsheetvit[i].idm, patient_id:this.flowsheetvit[i].patient_id, headernames:this.flowsheetvit[i].headernames})
      
     }
    }
 
    })
  }
  cols:any[]=[]
  date1:any
  pushvalue() {

    var duedate = this.date1.toISOString().split('T')[0];
    var times = this.date1.toISOString().split('T')[1];
    var timess=times.split('.')[0];
    // var 
    // const currentTime = new Date();
    // this.formattedTime = this.datePipe.transform(timess, 'h:mm a');
    var fdate = duedate.concat(' ',timess)
    this.cols.push({id:0, date: fdate, times: timess,datess:duedate });
    console.log('duedate', duedate);
    console.log('vaibhav', this.cols);
   this.display=false
  }
  display:boolean=false
  dates:any
  addtime() {
    this.date1=new Date()
    this.display = true;
  }
  timedata:any[]=[]
  getflowsheetcolumdata(){
    this.timedata=[]
    this.commanservice.getlabsflowsheetcolumdata(this.patientguid,this.labsname).subscribe((data: any) => {
      console.log(data);
      this.cols=data
      for (let i = 0; i < this.cols.length; i++) {
        var datess=this.cols[i].date.split(' ')[0];
        this.timedata.push({Patient_Id:this.cols[i].Patient_Id,date:this.cols[i].date,id:this.cols[i].id,labsname:this.cols[i].labsname,times:this.cols[i].times,datess:datess})
      }
      console.log(this.timedata);
      
    })
  }
  KIDNEYFUNCTIONTEST:any[]=[]
  LIPIDPROFILESERUM:any
  BloodSugars:any
  THYROIDFUNCTIONTEST:any
  DrugTOXICOLOGY:any
  VIRALMARKERS:any
  getmasterLabsflowsheetheader(){
    this.commanservice.getmasterLabsflowsheetheader().subscribe((data: any) => {
      console.log(data);
      this.flowsheetheader=data
      for (let i = 0; i < this.checkboxheader.length; i++) {
        if(this.checkboxheader[i].headernames=='COMPLETE BLOOD COUNT'){
          this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.header == 'COMPLETE BLOOD COUNT');
        }else if(this.checkboxheader[i].headernames=='LIVER FUNCTION TEST'){
          this.LIVERFUNCTIONTEST =  this.flowsheetheader.filter(key =>  key.header == 'LIVER FUNCTION TEST ');
        }
      else if(this.checkboxheader[i].headernames=='Coagulation profile'){
        this.Coagulationprofile =  this.flowsheetheader.filter(key =>  key.header == 'Coagulation profile');
      }
      else if(this.checkboxheader[i].headernames=='Kidney Function Test'){
       this.KIDNEYFUNCTIONTEST =  this.flowsheetheader.filter(key =>  key.header == 'KIDNEY FUNCTION TEST');
      }
      else if(this.checkboxheader[i].headernames=='Blood Sugars'){
        this.BloodSugars =  this.flowsheetheader.filter(key =>  key.header == 'Blood Sugars');
       }
       else if(this.checkboxheader[i].headernames=='Lipid Profile'){
        this.LIPIDPROFILESERUM =  this.flowsheetheader.filter(key =>  key.header == 'LIPID PROFILE, SERUM');
       }
       else if(this.checkboxheader[i].headernames=='Thyride Function Test'){
        this.THYROIDFUNCTIONTEST = this.flowsheetheader.filter(key =>  key.header == 'THYROID FUNCTION TEST');
       }
       else if(this.checkboxheader[i].headernames=='Drug/TOXICOLOGY'){
        this.VIRALMARKERS=this.flowsheetheader.filter(key =>  key.header == 'Drug/TOXICOLOGY');
       }
        
      }
      // this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.header == 'COMPLETE BLOOD COUNT');
      // this.LIVERFUNCTIONTEST =  this.flowsheetheader.filter(key =>  key.header == 'LIVER FUNCTION TEST ');
      // this.Coagulationprofile =  this.flowsheetheader.filter(key =>  key.header == 'Coagulation profile');
      // this.KIDNEYFUNCTIONTEST =  this.flowsheetheader.filter(key =>  key.header == 'KIDNEY FUNCTION TEST');
      // this.BloodSugars =  this.flowsheetheader.filter(key =>  key.header == 'Blood Sugars');
      // this.LIPIDPROFILESERUM =  this.flowsheetheader.filter(key =>  key.header == 'LIPID PROFILE, SERUM');
      // this.THYROIDFUNCTIONTEST = this.flowsheetheader.filter(key =>  key.header == 'THYROID FUNCTION TEST');
      // this.DrugTOXICOLOGY=this.flowsheetheader.filter(key =>  key.header == 'THYROID FUNCTION TEST');
      // this.VIRALMARKERS=this.flowsheetheader.filter(key =>  key.header == 'VIRAL MARKERS');
    })
  }
  valuepush1(id){
    console.log('vaibhav chouhan ');
     console.log('vaibha',id);
  this.inputarray=this.inputarray.concat(id)
  console.log(this.inputarray.concat(id));
    this.flowsheetform.patchValue({flowsheetinput: this.inputarray})

  }
  bntStyle:any
  subheader:any
  headerid:any
  header:any
  colm:any
  rows:any
  vitalcolms:any
  vitaltime:any
  inputarray:any=''
  newsrow:any
  headername:any
  ReferenceRangeMax:any
  ReferenceRangeMin:any
  headernames:any
  Service_catogeory:any
  radiologyvalue:any
  showradvalue:any
  Unit:any
  sidebardata(event, header, colms, i, rowi,BP,product) {
    console.log(event,'111111111', header,'222222222', colms,'333333333333', i, rowi,'4444444444', BP,'555555555',product);
    // if(`${header}_${product.id}_${product.flowsheet_header_name}`)
    // document.getElementById(`${i}_${rowi}_${this.headerid}`).classList.add('activecell')
    var idvalue=`${i}_${rowi}_${BP}`
    
    this.radiologyvalue =  this.flowsheetdatacontants.filter(key =>  key.ids == idvalue);
    this.showradvalue=this.radiologyvalue[0]?.radilogyname
    console.log( this.showradvalue);
    // if(document.getElementById("sampleBox122222")){
    //   document.getElementById("sampleBox1222220")?.remove();
    // }
    // console.log(event,"Click Event");
    // var div=document.createElement('div');
    // div.style.height='100px';
    // div.style.width="300px";
    // div.innerText=this.showradvalue
    // div.id="sampleBox122222"
    // div.style.position="relative";
    // div.style.left=event.clientX-120+"px";
    // div.style.top=event.clientY-event.clientY-100+"px";
    // div.style.background="pink";
    // div.style.zIndex="323";
    // document.getElementById("showTextBox").appendChild(div);

    
    console.log(this.radiologyvalue);
    
    
    this.ReferenceRangeMax=product.ReferenceRangeMax
    this.ReferenceRangeMin=product.ReferenceRangeMin
    this.Service_catogeory=product.Service_catogeory
    this.Unit=product.Units
    this.headernames=BP
    const allElements = document.querySelectorAll('.flowsheetContaner');
    allElements.forEach((element) => {
      element.classList.remove('activecell');
    });
    document.querySelectorAll('.flowsheetContaner').forEach
    this.subheader=colms;
    this.headerid=BP;
    console.log(`${i}_${rowi}_${this.headerid}`);
    
  
    // document.getElementById(`${i}_${rowi}_${this.Bp}`).classList.add('activecell')
    document.getElementById(`${i}_${rowi}_${BP}`).classList.add('activecell')
    debugger
    this.displaysidebar = true;
    console.log('',event, header, colms,i,rowi);
    console.log('body vaibhav',event, header, colms, i, rowi);
    console.log('vaibhav sidebardata',rowi);
    this.header=header;
    this.colm = i;
    console.log( this.colm);
    
    this.rows = rowi;
    console.log(header, colms);
    this.inputarray=''
    this.flowsheetform.reset()
    console.log('event.target.value', event.target);
    this.vitalcolms = colms
    this.vitaltime = header
  }
  values:any
  flowsheetid:any
  newsindex:any
  flowsheetdatas:any[]=[]
  savesidebardata() {
    // if(Service_catogeory!='RAD'")
    this.values = this.flowsheetform.controls['flowsheetinput'].value
    this.colm;
    this.rows;
    
    console.log(this.colm,this.rows,this.headerid);
    
    this.flowsheetid= this.colm+'_'+this.rows+'_'+this.headerid;
    console.log(this.flowsheetid);
    if(this.Service_catogeory!='RAD'){
      document.getElementById(`${this.flowsheetid}`).innerHTML = this.flowsheetform.controls['flowsheetinput'].value;
    }else{
     
    }
   
   console.log('this.flowsheetid',this.flowsheetid);
   this.inputarray=''
  console.log(this.newsindex,this.newsrow);
    if (this.flowsheetdatas.length >   0) {
      for (let i = 0; i < this.flowsheetdatas.length; i++) {
        if (this.colm == this.flowsheetdatas[i].colm && this.rows == this.flowsheetdatas[i].rows) {
          console.log('savesidebardata1111', this.flowsheetdatas[i].contant, this.values);
          this.flowsheetdatas[i].contant = this.values;
          console.log('this.', this.flowsheetdatas);
        }
        else {
          this.flowsheetdatas.push({Unit:this.Unit, colm: this.colm, rowss: this.rows,radilogyname:this.flowsheetform.controls['Impression'].value , value: this.flowsheetform.controls['flowsheetinput'].value ,datetimevalue:this.header,header:this.headerid,subheader:this.subheader,ids:this.flowsheetid})
          console.log(this.rows,this.colm);
           this.flowsheetdatas.filter((element)=>this.rows != element.rowss && this.colm != element.colm);
          this.flowsheetdatas = this.flowsheetdatas.reverse().filter((obj, index, self) =>
          index == self.findIndex((t) => (
          t.ids ==obj.ids 
          ))
          ).reverse();
          console.log('this.flowsheetdatas2222222222', this.flowsheetdatas);
         }
         break;
      }
    }
    else {
      console.log('111111111111');
      console.log(this.flowsheetdatas);
      this.flowsheetdatas.push({ colm: this.colm, rowss: this.rows,radilogyname:this.flowsheetform.controls['Impression'].value , value: this.flowsheetform.controls['flowsheetinput'].value ,datetimevalue:this.header,header:this.headerid,subheader:this.subheader,ids:this.flowsheetid})
      this.flowsheetdatas = this.flowsheetdatas.reverse().filter((obj, index, self) =>
          index == self.findIndex((t) => (
          t.ids ==obj.ids 
          ))
          ).reverse();
          console.log('this.flowsheetdatas2222222222', this.flowsheetdatas);
    }
    this.flowsheetform.reset()
  }
  flowsheetsave() {
  this.LabsflowsheetCheckBoxsave();
    this.saveflowsheetColumData();
    console.log(' this.flowsheetform', this.flowsheetdatas, this.flowsheetvital,this.patientguid);
    this.commanservice.Labsflowsheetsave(this.flowsheetdatas, this.flowsheetvital,this.patientguid,this.labsname).subscribe((data: any) => {
      console.log(data);
      if(data='success')
{
  this.messageservice.add({ severity: 'success', summary: 'Successfully', detail: 'Successfully Save FlowSheet' });
}
    })
  }
  flowsheetdatacontants:any
  getlabsflowsheetcontaindata(){
    this.commanservice.getlabsflowsheetcontaindata(this.patientguid,this.labsname).subscribe((data: any) => {
      console.log(data);
      this.flowsheetdatas=data
      this.flowsheetdatacontants=data;
      setTimeout(() => {
        this.patchdata();
     }, 150);
    })
  }
  patchdata(){
    for (let i = 0; i < this.flowsheetdatacontants.length; i++) {
      try {  
        // document.getElementById(`${this.flowsheetdatacontants[i].colm}_${this.flowsheetdatacontants[i].datetimevalue}_${this.flowsheetdatacontants[i].header}`).classList.add('activecell')
        // document.getElementById(`${this.flowsheetdatacontants[i].colm}_${this.flowsheetdatacontants[i].datetimevalue}_${this.flowsheetdatacontants[i].header}_'red'`).style.backgroundColor = '#e0e321';
        document.getElementById(`${this.flowsheetdatacontants[i].colm}_${this.flowsheetdatacontants[i].datetimevalue}_${this.flowsheetdatacontants[i].header}`).innerHTML = this.flowsheetdatacontants[i].value;
      } catch (error) {
        console.log('error');
      }
    }
    for (let i = 0; i < this.flowsheetdatacontants.length; i++) {
      try {  
        // document.getElementById(`${this.flowsheetdatacontants[i].colm}_${this.flowsheetdatacontants[i].datetimevalue}_${this.flowsheetdatacontants[i].header}`).classList.add('activecell')
        document.getElementById(`${this.flowsheetdatacontants[i].colm}_${this.flowsheetdatacontants[i].datetimevalue}_${this.flowsheetdatacontants[i].header}_'red'`).style.color = 'white';
        document.getElementById(`${this.flowsheetdatacontants[i].colm}_${this.flowsheetdatacontants[i].datetimevalue}_${this.flowsheetdatacontants[i].header}_'red'`).style.backgroundColor = 'green';
      } catch (error) {
        console.log('error');
      }
    }
  }
  saveflowsheetColumData(){
    this.commanservice.savelabsflowsheetColumData(this.cols,this.patientguid,this.labsname).subscribe((data: any) => {
      console.log(data);
  })
}
LabsflowsheetCheckBoxsave(){
  console.log('LabsflowsheetCheckBoxsave',this.flowsheetvitalss);
  this.commanservice.LabsflowsheetCheckBoxsave(this.flowsheetvitalss,this.patientguid,this.labsname).subscribe((data: any) => {
    console.log(data);
  })
}
/////////////////////////////new flowsheetdata////////////
sidebarsubheader:any
flowsheetlabsdataheader(){
  console.log('LabsflowsheetCheckBoxsave');
  this.commanservice.flowsheetlabsdataheader(this.labsname).subscribe((data: any) => {
    console.log(data);
    this.sidebarsubheader=data
    for (let i = 0; i < data.length; i++) {
// this.sidebarsubheader.push({
//   id:data[i].id, flowsheet_name:data[i].flowsheet_name, flowsheet_header_name:data[i].flowsheet_header_name, flowsheet_field_name:data[i].flowsheet_field_name, created_time:data[i].flowsheet_field_name,value:'1'
// })
      
    }
    
   
  })
}
displaydata:boolean
headerdialog:any
viewdetaildata:any
get_data_intable(product) {
  // console.log(product.flowsheet_field_name,flowsheetdatas);
  
  this.viewdetaildata =  this.flowsheetdatas.filter(key =>  key.header == product.labservicename);
  
  this.headerdialog=product.labservicename;
  this.displaydata = true
  // this.gettabledata(product)
  // this.bindCharts()
}

graphdatas:any
advanceSingleoption:any
closedialogs(){
  this.displaydata = false
}
selectData(event){}
displayDialogGraph:boolean
get_graph_data(product) {
  
  this.viewdetaildata =  this.flowsheetdatas.filter(key =>  key.header == product.labservicename);

  this.headerdialog=product.labservicename;
  // this.displaydata = true
  this.displayDialogGraph = true
  this.gettabledata(product)
  this.bindCharts()
}
sheetgraphdata:any[]=[]
sheetgraphdate:any[]=[]
gettabledata(product) { 
    console.log(this.viewdetaildata,this.viewdetaildata.length);
    this.sheetgraphdate=[]
    this.sheetgraphdata=[]
    for (let i = 0; i < this.viewdetaildata.length; i++) {
      this.sheetgraphdata.push(parseInt(this.viewdetaildata[i].value))
      this.sheetgraphdate.push(this.viewdetaildata[i]?.datetimevalue)
      console.log(this.sheetgraphdata,  this.sheetgraphdate);
    }
    console.log(this.sheetgraphdata,  this.sheetgraphdate);
    this.bindCharts()
}
bindCharts() {
  this.graphdatas = {
    labels:  this.sheetgraphdate ,
    datasets: [
      {
        label: this.headerdialog,
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
        position : 'right',
        Align:'start',
        labels: {
          boxWidth:70,
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
favorate:any
scoredname:any
toggleStarColor(event,scorename){
}
labsname:any='labs'
scored_cardgOncselect(event){
  console.log(event);
  this.labsname=event.flowsheet_name;
}
scored_cardgOncselects(event){
  console.log(event);
  this.labsname=event.flowsheet_name;
  
  this.getflowsheetdataheader()
  this.getflowsheetcolumdata();
  this.flowsheetlabsdataheader()
  // this.getflowsheetcolumdata();
  this.getlabsflowsheetcontaindata();
  this.getLabsflowsheetCheckBoxsave();
  
}

getflowsheetfavrate(){
  this.commanservice.getflowsheetfavrate().subscribe((data: any) => {
 this.favorate=data

  })
}
scroedcard_search(event){
  console.log(event);
  
  this.commanservice.getlabsnamelist(event).subscribe((data: any) => {
    console.log(data);
    this.scoredname=data
   
    this.flowsheetvit=[]
    this.flowsheetdatalabs=[]
    this.flowsheetvitalss=[]
    console.log(this.flowsheetdatalabs,this.flowsheetvitalss);
    
   
    this.getflowsheetdataheader()
    this.getflowsheetcolumdata();
    this.flowsheetlabsdataheader()
    // this.getflowsheetcolumdata();
    this.getlabsflowsheetcontaindata();
    this.getLabsflowsheetCheckBoxsave();
})
}
flowsheetdatafabrate(){
  this.flowsheetvit=[]
  this.flowsheetdatalabs=[]
  this.flowsheetvitalss=[]
  console.log(this.flowsheetdatalabs,this.flowsheetvitalss);
  
 
  this.getflowsheetdataheader()
  this.getflowsheetcolumdata();
  this.flowsheetlabsdataheader()
  // this.getflowsheetcolumdata();
  this.getlabsflowsheetcontaindata();
  this.getLabsflowsheetCheckBoxsave();
}
canceldropdown(){
  this.display=false
}
colss:any
currentDate:any
currentDateMinusThreeDays:any
Get_frequencydata(event,guid){
  console.log(event.value,this.timedata);
  if(event.value=='1'){
    this.getflowsheetcolumdata();
    this.getlabsflowsheetcontaindata();
  }else
  if(event.value=='3'){
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    
    this.cols =  this.timedata.filter(key =>  key.datess ==  this.currentDate);
    this.getlabsflowsheetcontaindata();
  }else
  if(event.value=='4'){
    this.currentDate = new Date();
    this.currentDateMinusThreeDays = new Date();
    this.currentDateMinusThreeDays.setDate(this.currentDate.getDate() - 3);
    this.currentDate = this.datePipe.transform( this.currentDateMinusThreeDays, 'yyyy-MM-dd');
    
    this.cols =  this.timedata.filter(key =>  (key.datess >=  this.currentDate));
    this.getlabsflowsheetcontaindata();
  }
  else
  if(event.value=='5'){
    this.currentDate = new Date();
    this.currentDateMinusThreeDays = new Date();
    this.currentDateMinusThreeDays.setDate(this.currentDate.getDate() - 30);
    this.currentDate = this.datePipe.transform( this.currentDateMinusThreeDays, 'yyyy-MM-dd');
    
    this.cols =  this.timedata.filter(key =>  (key.datess >=  this.currentDate));
    this.getlabsflowsheetcontaindata();
  }
  else
  if(event.value=='6'){
    this.currentDate = new Date();
    this.currentDateMinusThreeDays = new Date();
    this.currentDateMinusThreeDays.setDate(this.currentDate.getDate() - 91);
    this.currentDate = this.datePipe.transform( this.currentDateMinusThreeDays, 'yyyy-MM-dd');
    
    this.cols =  this.timedata.filter(key =>  (key.datess >=  this.currentDate));
    this.getlabsflowsheetcontaindata();
  }
  else
  if(event.value=='7'){
    this.currentDate = new Date();
    this.currentDateMinusThreeDays = new Date();
    this.currentDateMinusThreeDays.setDate(this.currentDate.getDate() - 182);
    this.currentDate = this.datePipe.transform( this.currentDateMinusThreeDays, 'yyyy-MM-dd');
    
    this.cols =  this.timedata.filter(key =>  (key.datess >=  this.currentDate));
    this.getlabsflowsheetcontaindata();
  }
  else
  if(event.value=='8'){
    this.currentDate = new Date();
    this.currentDateMinusThreeDays = new Date();
    this.currentDateMinusThreeDays.setDate(this.currentDate.getDate() - 365);
    this.currentDate = this.datePipe.transform( this.currentDateMinusThreeDays, 'yyyy-MM-dd');
    
    this.cols =  this.timedata.filter(key =>  (key.datess >=  this.currentDate));
    this.getlabsflowsheetcontaindata();
  }
  
}
onDateChange(event){
console.log(event);

this.currentDate =event
    
this.cols =  this.timedata.filter(key =>  key.datess ==  this.currentDate);
this.getlabsflowsheetcontaindata();
}
savecheckboxes(event,HeartRate) {
  // this.flowsheetdatalabs=[]
  // this.flowsheetvitalss=[]
  for (let i = 0; i < this.sidebarsubheader.length; i++) {
    if(this.sidebarsubheader[i].id==HeartRate.idm){
    // if (event.currentTarget.checked == true) {
      this.sidebarsubheader[i].value = 1;
      this.flowsheetvitalss.push({headernames: HeartRate.headernames,id: HeartRate.idm})
      // this.indexingarry.push({index: this.flowsheetvitalss.length,value:HeartRate.id})
    // }
    // else {
    //   this.sidebarsubheader[i].value = 0;
    //   this.flowsheetvitalss.splice(this.flowsheetvitals.length-1, 1);
    // }
  }
  }
  
  
  // if (event.currentTarget.checked == true) {
  this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.flowsheet_header_name == HeartRate.headernames);
  // this.flowsheetdatalabs.push(this.flowsheetvital)
  
  this.flowsheetdatalabs.push({"key":HeartRate.headernames,"data":this.flowsheetvital})
  console.log(this.indexingarry, this.flowsheetdatalabs);
  // this.flowsheetdatalabs[this.flowsheetdatalabs.length-1].push({value:this.flowsheetdatalabs.length})

       setTimeout(() => {
      this.patchdata();
   }, 150);
  // }
  // else{
  //   this.flowsheetdatalabs.splice(this.flowsheetdatalabs.length-1, 1);
  // }
}
// savecheckbox(event, HeartRate) {
//   // this.flowsheetdatalabs=[]
//   // this.flowsheetvitalss=[]
//   for (let i = 0; i < this.sidebarsubheader.length; i++) {
//     if (this.sidebarsubheader[i].id == HeartRate.id) {
//       if (event.currentTarget.checked == true) {
//         this.sidebarsubheader[i].value = 1;
//         this.flowsheetvitalss.push({ headernames: HeartRate.flowsheet_header_name, id: HeartRate.id })
//         // this.indexingarry.push({index: this.flowsheetvitalss.length,value:HeartRate.id})
//       }
//       else {
//         this.sidebarsubheader[i].value = 0;
//         // if(HeartRate.idm=)
//         // for (let j = 0; j < this.flowsheetvitalss.length; j++) {
//         // console.log(this.flowsheetvitalss[j].id==HeartRate.id);
//         // debugger
//         // if(this.flowsheetvitalss[j].id==HeartRate.id)
//         // debugger
//         this.flowsheetvitalss.splice(i, 1);
//         // }
//       }
//     }
//   }
//   console.log(event,this.sidebarsubheader);
 
//   if (event.currentTarget.checked == true) {
//   this.flowsheetvital =  this.flowsheetheader.filter(key =>  key.flowsheet_header_name == HeartRate.flowsheet_header_name);
  
//   // this.flowsheetdatalabs.push(this.flowsheetvital)
//   this.flowsheetdatalabs.push({"key":HeartRate.flowsheet_header_name,"data":this.flowsheetvital})
//   console.log(this.indexingarry, this.flowsheetdatalabs);
//   // this.flowsheetdatalabs[this.flowsheetdatalabs.length-1].push({value:this.flowsheetdatalabs.length})

//        setTimeout(() => {
//       this.patchdata();
//    }, 150);
//   }
//   else{
//     // console.log(this.flowsheetdatalabs.indexOf(HeartRate.id));
//     // var idnnn=this.flowsheetdatalabs.indexOf(HeartRate.flowsheet_header_name)
//     // console.log(idnnn);
    

//     // this.flowsheetdatalabs.splice(this.flowsheetdatalabs.length-1);
//     for (let j = 0; j < this.flowsheetdatalabs.length; j++) {
//       console.log(this.flowsheetdatalabs[j].key==HeartRate.flowsheet_header_name);
//       if(this.flowsheetdatalabs[j].key==HeartRate.flowsheet_header_name){
//         this.flowsheetdatalabs.splice(j,1);
//       }
//       // const element = array[j];
      
//     }
//   }
// }
}


// }
