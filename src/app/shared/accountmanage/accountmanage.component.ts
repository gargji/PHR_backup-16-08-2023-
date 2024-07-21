

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { CommanserviceService } from 'src/app/commanservice.service';
import { HealthrecordsservicesService } from 'src/app/phrdashboard/HealthRecordsServices/healthrecordsservices.service';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
// import SimpleWebAuthnBrowser from '@simplewebauthn/browser';
import {startRegistration, startAuthentication } from '@simplewebauthn/browser';
// import { WebAuthnJson } from '@github/webauthn-json';
// import axios from 'axios';


import QRCode from 'qrcode';
import { BaseComponent } from 'src/app/phrdashboard/common/base.component';
@Component({
  selector: 'app-accountmanage',
  templateUrl: './accountmanage.component.html',
  styleUrls: ['./accountmanage.component.css']
})
export class AccountmanageComponent extends BaseComponent implements OnInit {
username: any;
 client: any;

modeldata: any;
example3: any;
  myfile: any;
  filename: any;

  fullpathArray: any;
  fileInput: any;
  imageUrl: string;
  apiSubs: any;
  
  secret: string;
  token: string;
  isValid: boolean | null;
  branchID: any;
  // client: any;
  @Input() _opened:any
  // qrCodeData: string;
showsubmenu() {
throw new Error('Method not implemented.');
}


toggleSubMenu(subMenuId: string) {
  const subMenu = document.getElementById(subMenuId);
  if (subMenu) {
      subMenu.classList.toggle('show');
  }
}

statedata: any[];
getstate($event: Event) {
throw new Error('Method not implemented.');
}
countrydata: any[];

emailedit() {
throw new Error('Method not implemented.');
}
userdata: any;
downloadDocument() {
throw new Error('Method not implemented.');
}
 toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  id: string;
isCollapsed: any;
  constructor( public http: HttpClient,private socket:Socket,private formBuilder: FormBuilder,
     public routes: ActivatedRoute,private route: Router,
     private healthrecordsservices:HealthrecordsservicesService, public commanservice:CommanserviceService,public messageserveice: MessageService, private sanitizer: DomSanitizer
     ,private geolocationService: CommanserviceService,
    private geocodingService: CommanserviceService) {
      super()    
      this.socket.on('receive_message',(data)=>{
      setTimeout(() => {
       console.log('sss')
        // alert("called user new")
      }, 1000);
    });
    this.socket.on('receive_message2',(data)=>{
      this.check()
      // setTimeout(() => {
   
      //   alert("user logout")
      // }, 1000);
    })

   }
  @ViewChild('ytplayer', { static: false }) ytPlayer: ElementRef;
  viewdoc: boolean = true
  fullimage: any
  checkextention: any;
  src: any
  docid: any
  fullpath: any
  safeUrl: SafeResourceUrl;
  items:any;
  usernames;
  example1:any=false

  sidebarVisible=true
  matchkeyform = new FormGroup({
    key: new FormControl('',[Validators.required]),

   
  })
  avatarImage: string | ArrayBuffer = 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  addnumber:FormGroup
  addemail:FormGroup
  verifyotp:FormGroup
  changepassword:FormGroup
  todoListForm:FormGroup
  registerpasskey:FormGroup
  addgeolocation:FormGroup
  example2:any=false
  sessionid:any
  accountinfo: FormGroup
  setlimit:FormGroup
  hospital_ID:any
  @ViewChild('fileInput') fileInputRef: ElementRef | undefined;
  @ViewChild('qrCode', { static: true }) qrCode: ElementRef;
  ngOnInit(): void {
   
    this.src = "https://media.istockphoto.com/id/1649298438/photo/joyful-retired-couple-hiking.jpg?s=2048x2048&w=is&k=20&c=NdZsIz0Za4yFt34gqQcNbtZEpAahxO2p_Jk9SPfr2co="
    //  this.checkextention = 'jpg';

    this.routes.queryParams.subscribe((param) => {
   
      this.docid = param.id
      // this.patient = param.patientID;
   
      var sessionid = localStorage.getItem('session_id')
 
      this.sessionid = JSON.parse(sessionid || '{}')
  
      var hospital_id=localStorage.getItem('organization_id')

     this.hospital_ID=JSON.parse(hospital_id || '{}')
  
       var branch_id=localStorage.getItem('hospital_id')
       this.branchID=JSON.parse(branch_id || '{}')
 
       
    })
  

    this.getdocument()
    this.accountinfo = new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      mname: new FormControl(''),
      phone: new FormControl(''),
      Country:new FormControl(''),
      state: new FormControl(''),
      city:new FormControl(''),
       email:new FormControl(''),
    })
    this.getdata()
    this.getactivityhistory()
    this.getsessiondata()
    this.getpatientnumber()
    this.getpatientemail()
    this.get_allowrd_ip_data()
this.addnumber=new FormGroup({
  mobile_number:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
})
this.addemail=new FormGroup({
  email_address:new FormControl('',[Validators.required,Validators.email])
})
this.verifyotp=new FormGroup({
  otpvalue:new FormControl('',Validators.required)
})

this.changepassword = new FormGroup({
  cuurentpass: new FormControl(""),
  newpass: new FormControl(""),
  confirmnewpass: new FormControl('')
}) 
this.registerpasskey=new FormGroup({
  username: new FormControl('')
})

this.addgeolocation=new FormGroup({
  state: new FormControl('')
})

this.todoListForm = this.formBuilder.group({
  todos: this.formBuilder.array([
    this.createTodoFormGroup()
  ]),
  check1:('option1'),
  ip_name:(''),
  ranges: this.formBuilder.array([
    this.createRangeFormGroup() // Initialize with one default range
  ])

});
this.setlimit = new FormGroup({
  Limit: new FormControl("",Validators.required)
 
})




//  this.client = new WebAuthnClient();
this.getbackupcode()
  }
  example: boolean = true
  docview: boolean
  docdata: any = []
  key:any
  getdocument() {

    this.example = true
    this.docview = false
   

   
  }
  foundItem:any
  fordownload:any
  docchnage(data: any) {

    this.foundItem = this.docdata.filter(item => item.id == data.id);

    this.fordownload=this.foundItem[0].fileName
    // foundItem
    this.path(this.foundItem)
 
  }
  file_name:any
  fullpath1: any
  fullpath2: any
  path(data: any) {
    // this.checkextention = data[0].doctype_extention.split('/')[1]
    // console.log(this.checkextention, "splited")
    this.file_name =data[0].fileName

    this.fullpath = environment.media_path + data[0].documentpath

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fullpath)

    this.fullpath2 = this.fullpath1.changingThisBreaksApplicationSecurity

  }
  data1:any=''
  onmatch() {
    this.commanservice.checkpass(this.docid, this.matchkeyform.value).subscribe((data) => {
      console.log(data);
      this.data1=data
  
      // Assuming data is expected to be a JSON object containing a message property indicating success or failure
      if (this.data1 && this.data1.message === 'Success') {
        // Password matches
        this.example = false;
        // Perform any additional actions here if needed
      } else {
        // Password does not match
        this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Password does not match' });
      }
    }, (error) => {
      // Handle any errors from the service
      console.error('Error from checkpass service:', error);
      this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while checking password' });
    });
  } 




  
 
showmaildilog(){
  this.example1=true
}
showmaildilog2(){
this.alldata=this.modeldata
  this.example2=true
}

getdata(){
  this.commanservice.getuserdata( this.docid ).subscribe((res) => {
    console.log(res)
   
    this.userdata = res[0]


    console.log(this.userdata?.Country)
   var Country={id:'105',countrycode:'IN',Country:this.userdata?.Country}
   this.getStatesdataSelectedCountry({countrycode:this.userdata?.countrycode})

    
    this.accountinfo.patchValue({

      fname: this.userdata.firstName,
      lname: this.userdata.lastName,
      mname: this.userdata.displayName,
      phone: this.userdata.mobilePhone,
      Country: Country,
      
      city: this.userdata.city,
      email:this.userdata.emailId1,
    }

    )
    this.imageUrl = this.userdata.imgSrc
  })
}
conaintershow:any='PROFILE'
chnagecontainer(menu: string){
  this.activeMenu = menu;
this.conaintershow=menu
}
alldata:any
getactivityhistory(){
  this.commanservice.getactivityhistory(this.docid).subscribe((data)=>{
    console.log(data)
    this.modeldata=data
    this.alldata=data
  })
}
sessiondata:any
getsessiondata(){
  this.commanservice.getsessionhistory(this.docid).subscribe((data)=>{
    console.log(data,"session")
    this.sessiondata=data
    var timeget= this.sessiondata[1]
    // this.alldata=data
    console.log(this.getTimeAgo( timeget.transaction_time),"sssssssssssssss")
  })

}

filteredData:any
showspecificdata(item1){

  this.filteredData = this.modeldata.filter(item => item.id === item1.id)
  console.log( this.filteredData,"ssssssss" )
this.alldata=this.filteredData
  this.example2=true
}


logout(session){
 
  this.commanservice.updatestatus(this.docid,session).subscribe((data)=>{
    console.log(data)
    this.socket.emit('logout',data)
    this.getsessiondata()
 
  })
}

 getTimeAgo(timeString: string): string {
  const currentTime = new Date();
  const givenTime = new Date(timeString);

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime.getTime() - givenTime.getTime();

  // Convert milliseconds to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Define the thresholds for different time units
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  // Determine the appropriate time unit and format the time difference
  if (secondsDifference < minute) {
    return 'Just now';
  } else if (secondsDifference < hour) {
    const minutes = Math.floor(secondsDifference / minute);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (secondsDifference < day) {
    const hours = Math.floor(secondsDifference / hour);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (secondsDifference < month) {
    const days = Math.floor(secondsDifference / day);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (secondsDifference < year) {
    const months = Math.floor(secondsDifference / month);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    const years = Math.floor(secondsDifference / year);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
}
adddata:any
addDATA(DATA){
  
  this.adddata=DATA
  this.example3=true
}
submitmob(){
  console.log( this.addnumber.value)
  if(this.addnumber.valid){
    this.commanservice.addnumber(this.docid,this.addnumber.value).subscribe((data)=>{
      if(data=='success'){
        console.log(data)
        this.example3=false
        this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Successfully update' });
        this.getpatientnumber()
      }else{
        this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      }
  
    })
  }else{
    this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Form not valid' });
  }

}
submitemail(){
  console.log(this.addemail.value,"email")
  this.commanservice.addemail(this.docid,this.addemail.value).subscribe((data)=>{
    console.log(data)
    if(data){
      this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Email Insert Successfully'});
      this.example3=false
      this.getpatientemail()
    }else{
      this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
    }
   
  })
}
mobilenumberlist1:any
mobilenumberlist2:any
getpatientnumber(){
  this.commanservice.getpatientnumber(this.docid).subscribe((data)=>{
    console.log(data)
   this.mobilenumberlist1=data[0]
   this.mobilenumberlist2=data[1]
  
  })
}

check() {
  // Check if the user is logged in
  this.isUserLoggedIn().then(loggedIn => {
    if (!loggedIn) {
      // If the user is not logged in, clear the interval and perform logout
      localStorage.clear();
      this.route.navigate(['login']);
    }
  });
}

isUserLoggedIn(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    var sessionid = localStorage.getItem('session_id');
    sessionid = JSON.parse(sessionid || '{}')
    // console.log(this.patientID);
    // Check if sessionid exists
    if (!sessionid) {
      resolve(false); // Resolve with false if sessionid does not exist
      return;
    }

    // No need to parse sessionid as it's already a string

    this.commanservice.checkuser(this.docid, sessionid).subscribe((res) => {
      var checkdata = res[0];

      if (checkdata && checkdata.count === 1) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, (error) => {
      console.error('Error checking user status:', error);
      resolve(false); // Resolve with false if there's an error
    });
  });
}

setbydeaulmob(item){
console.log(item,"s")

this.commanservice.setbydeaultnumber(item,this.mobilenumberlist2).subscribe((data)=>{
  console.log(data)
  this.getpatientnumber()
})
}
emaillist1:any
emaillist2:any
getpatientemail(){
  this.commanservice.getpatientemail(this.docid).subscribe((data)=>{
    console.log(data)
   this.emaillist1=data[0]
   this.emaillist2=data[1]
  
  })
}

setbydeaulemail(item){
  console.log(item,"s")

this.commanservice.setbydeaultemail(item,this.emaillist2).subscribe((data)=>{

  console.log(data)
  if(data){
    this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Successfully Set as Primary' });
    this.getpatientemail()
  }
  
})
}

// for profile city state 


filtercountry(event) {
  // if (event.query.length >= 2) {
  console.log(event);

  //   this.timer = setTimeout(() => {
  this.healthrecordsservices.findCountry(event.query).subscribe((data: any) => {
    // this.procedureinsert.patchValue({ mobilecodes: data.mobilecodes })
    this.countrydata = data
    // console.log(this.results);
    console.log( this.countrydata )

  });
  //   }, 700);
  // }
} state1: any
getStatesdataSelectedCountry(event) {

  console.log(event);
  // this.procedureinsert.patchValue({ mobilecodes: event.mobileCode })
  if (event.countrycode) {
    this.healthrecordsservices.getStatesAPI(event.countrycode).subscribe((data: any) => {
      this.statedata = data
      var name=     this.statedata.filter(state => state.states_name === this.userdata.state);
      console.log(name)
      var statedata=name[0]
      console.log(data);
      this.accountinfo.patchValue({
        state:statedata
      })
      this.getStatesdataSelectedDistric({value:statedata})

    })
  }
  else {
    this.healthrecordsservices.getStatesAPI(event.country).subscribe((data: any) => {
      this.statedata = data
      console.log(data);

    })
  }
  //     this.getMobilecode(event)
  //     this.getTimeZoneCountrywise(event)
}
citydata:any

getStatesdataSelectedDistric(event) {
  console.log(event.value);
  this.healthrecordsservices.getDistrictDataAPI(event.value.states_name).subscribe((data: any) => {
    console.log(data);
    this.citydata = data
    // this.distict1 = data
  })

}
  
selectDistictData(event) {
  this.healthrecordsservices.getPincodesAccToDistrictAPI(event).subscribe((data: any) => {
    console.log(data);

    // this.postalcode1 = data;

    // console.log(this.postalcode1);

  });
}
postalcode: any
findPostalCode(event) {
  this.healthrecordsservices.findPostalCode(event.query).subscribe((data: any) => {
    this.postalcode = data

  })
}

chnagepass() {
  console.log(this.changepassword.value)
  if (this.changepassword.value.newpass == this.changepassword.value.confirmnewpass) {


    this.commanservice.chnagepass(this.docid, this.changepassword.value).subscribe((res) => {
      console.log(res)
      if (res == 200) {
        this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Changed Your Password ' });
        // this.show1 = false
        this.changepassword.reset()
        this.example3=false
      }
      else {
        this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Current password not match' });
      }
    })

  }
  else {
    this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'new password and confirm password not matched ' });
  }
}

addTodo() {
  const todos = this.todoListForm.get('todos') as FormArray;
  todos.push(this.createTodoFormGroup());
}
createTodoFormGroup(): FormGroup {
  return this.formBuilder.group({
    ip: [''],
   

  });
}
remove(index: number) {
  const todos = this.todoListForm.get('todos') as FormArray;
  todos.removeAt(index);
}
removerange(index: number){
  const ranges = this.todoListForm.get('ranges') as FormArray;
  ranges.removeAt(index);
}
isdisable:any='option1'
anytime(){
  
  this.isdisable = this.todoListForm.controls['check1'].value
  console.log(this.isdisable);
if(this.isdisable=='option1'){
    console.log("in condition1 ")


  }

  if(this.isdisable=='option2'){
    console.log('in condition2');
    
  
 
  }

}
addRange() {
  const rangeArray = this.formBuilder.group({
    rangeStart: [''],
    rangeEnd: ['']
  });
  const ranges = this.todoListForm.get('ranges') as FormArray;
  ranges.push(rangeArray);
}
createRangeFormGroup(): FormGroup {
  return this.formBuilder.group({
    rangeStart: [''],
    rangeEnd: ['']
  });
}

submit_allowed_ip(){
  console.log(this.todoListForm.value)
  this.commanservice.submit_allowed_ip(this.docid,this.todoListForm.value).subscribe((data)=>{
    console.log(data)
    if(data){
      this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Restricted  ' });
      this.example3=false
      this.get_allowrd_ip_data()
    }
    else{
      this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
    }
  })
}
ipdata:any
get_allowrd_ip_data(){
  this.commanservice.get_allowed_ip(this.docid).subscribe((data)=>{
    console.log(data)
    this.ipdata=data
  })
}

activeMenu: string = 'PROFILE';

deletemail(item){
this.commanservice.deletemail(this.docid,item.id).subscribe((res)=>{
if(res){
  this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully deleted ' });
  this.getpatientemail()
}

})
}
deletephone(item){
  this.commanservice.deletephone(this.docid,item.id).subscribe((res)=>{
    // console.log('rahul bhai ')
if(res){
  this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Changed ' });
  this.getpatientnumber()
}
  
  })
}
example5:any
CLOSE(){
  this.example5=true

}
closeaccount(){
  this.commanservice.closemyaccount(this.docid).subscribe((data)=>{
    console.log(data)
    if(data=='success'){
      this.example5=false
      this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Account closed' });
    }else{
      this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
    }
  })
}

// submitemail
submitlimit(){
  if(this.setlimit.valid)
    {
      this.commanservice.setlimit(this.docid,this.setlimit.value).subscribe((res)=>{
        console.log(res)
        if(res){
          this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Successfully update' });
          this.example3=false
        }else{
          this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        }
      })
    }
    else{
      this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Form filed Required' });
    }
 
}
otp:any
submitmailid(){

this.generateOTP()
console.log(this.otp,"Ssssssssssssssssss")
this.sendotp()
this.adddata=6

}
generateOTP() {
  const digits = '0123456789';
  this.otp = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    this.otp += digits[randomIndex];
    // console.log(this.otp)
  }
}

sendotp(){

  //  this.email= this.registrationForm.controls['email'].value
    console.log(this.otp)
    var email=this.addemail.value.email_address
this.commanservice.sendotp(this.otp,email).subscribe((res)=>{
  console.log(res)
  if(res){
    this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Otp send' });
  }
  else{
    this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
  }
 
  // this.show1 = false
})
}
matchotp(){
  if(this.verifyotp.controls['otpvalue'].value==this.otp){
    this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail:'Otp  matched' });
  this.submitemail()
  }else{
    this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Otp not match' });
  }

}
openFileUploadDialog() {
  if (this.fileInputRef && this.fileInputRef.nativeElement) {
    this.fileInputRef.nativeElement.click(); // Trigger click event on file input
  }
}
formdata: FormData = new FormData()
  onFileSelected(event: any) {

    const file = event.target.files[0];
    
    var name = this.docid + '.jpg';
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string; // Set imageUrl to the selected file
    };
   
    // var path = `${this.hospital_ID}\\patientData\\${this.docid}\\profilepicture\\${name}`;
    let fullPath = `\\\\${this.hospital_ID}\\\\patientData\\\\${this.docid}\\\\profilepicture\\\\${name}`;
    this.formdata.append('profile',file, fullPath);
    this.fullpath = environment.media_path+fullPath;
    console.log(fullPath,"ssss")
    // this.fullpathArray.push({ fullpath: fullPath, fileName:this.myfile.filename })
    this.healthrecordsservices.sendFileToServer(this.formdata).subscribe((res) => {
      console.log(res)
      if(res){
       
      }

    }
  )
  this.commanservice.updatepatientimg(this.docid, this.fullpath).subscribe((res)=>{
    if(res){
      // this.imageUrl=''
      console.log(res)
      // this.getdata()
      if(res){
        this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Update ' });
      }
     
    }

        })
    reader.readAsDataURL(file);

  }



  // uploadImagePatientProfileImagetoServer(id) {
  //   var tmp_ele;
  //   tmp_ele = document.getElementById('myFile') as any
  //   this.fileforupload = tmp_ele.files[0]
  //   var name = id + '.jpg';
  //   var path = `${this.hospitalData.guid}\\patientData\\${id}\\profilepicture\\${name}`;
  //   // var metaData = {path: path, name: name}
  //   if (this.fileforupload) {
  //     this.apiSubs = this.commanservice.uploadProfilePic(this.fileforupload, path).subscribe((data: any) => {
  //       if (data == "success") {
  //       }
  //     });
  //   }
  // }
  next2:any=false
  qrshow:any=false
  qrocde(){
    this.generateSecret(this.docid)    
this.qrshow=true
this.next2=true

  }
  // generateQRCode(){
  //   const otpAuthUri = `otpauth://totp/MyApp:${localStorage.getItem('username')}?secret=${this.secretKey}&issuer=MyApp`;
  //   QRCode.toDataURL(otpAuthUri, (err, url) => {
  //     if (err) {
  //       console.error('Error generating QR Code:', err);
  //       return;
  //     }
  //     this.qrCodeData = url;
  //   });
  // }
  // onSubmit(): void {
  //   // Validate OTP
  //   const isValidOTP = this.validateOTP();
  //   if (isValidOTP) {
  //     console.log('OTP is valid. User logged in.');
  //     // Perform login action
  //   } else {
  //     console.log('Invalid OTP. User denied access.');
  //     // Display error message
  //   }
  // }

  // validateOTP(): boolean {
  //   // Implement OTP validation using TOTP algorithm
  //   // For simplicity, assume OTP is valid if it matches the secret key
  //   const otp = this.enteredOTP;
  //   return otp === this.secretKey;
  // }
  backupCodes: string[] = [];
generateSecret(patientId: string): void {
  this.http.post<{ secret: string, otpUri: string, backupCodes: string[] }>(
    environment.apiurl + 'phr_patient/generateSecretKey',
    { patientId }  // payload for POST request containing the patient ID
  )
  .subscribe(
    response => {
      this.secret = response.secret;
      this.backupCodes = response.backupCodes;
      this.generateQRCode(response.otpUri);
    },
    error => {
      console.error('Error generating secret:', error);
    }
  );
}

  generateQRCode(otpUri: string): void {
    QRCode.toCanvas(this.qrCode.nativeElement, otpUri, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
      }
    });
  }
  Active:any=true
  verifyToken(): void {
    this.http.post<{ isValid: boolean }>(environment.apiurl+'phr_patient/verify', { token: this.token, secret: this.secret,patientID:this.docid})
      .subscribe(
        response => {
          this.isValid = response.isValid;
          if(this.isValid){

this.commanservice.updatesecurity(this.docid,'authenticator','1',this.secret).subscribe((res)=>{

  if(res)
    {     this.getdata()
      this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Activate' });
      this.qrshow=false
      this.backupcode()
      this.getdata()

    }
})
          }
          else{
   
            this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Otp not match' });
          }
        },
        error => {
          console.error('Error verifying token:', error);
        }
      );
  }

next:any=false

  otpinputshow(){
    this.next2=false
    this.next=true
 
  }

  deactive(){
    this.commanservice.updatesecurity(this.docid,'authenticator','0','').subscribe((res)=>{

      if(res){
        this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Deactived' });
        this.getdata()
      }else{
        this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      }
    
  })}

  passkeyshow:any=false
  getpasskey(){
    this.passkeyshow=true
  }
// }

 


// authenticate() {
//   throw new Error('Method not implemented.');
//   }
//   register() {
//     this.http.post<{ isValid: any }>(environment.apiurl+'webauthn', {  formvalue:this.registerpasskey.value,  })
//     .subscribe(
//       response => {
  
//      console.log('hy')
//       },
//       error => {
//         console.error('Error verifying token:', error);
//       }
//     );
//   }



// async register() {
  // register() {
  //   this.commanservice.register(this.username).subscribe((res)=>{
  //     console.log(res)
      
  //     // startRegistration(options)
  //     const challengeResult =  res
  //     console.log(challengeResult)
  //     // const { options } = challengeResult // Server side challenge

  //     const authenticationResult = startRegistration(challengeResult).then((response) => {
  //             return this.httpClient.post(environment.apiurl + 'register/response', { username, response, challenge }).toPromise();
  //           });
  //     // console.log(authenticationResult)

  //   })

      // .then(() =>console.log(Response,'mmm'))
      // .catch(err => alert('Registration failed: ' + err));
  // }

  
// }


  // async authenticate() {
    // login() {
    //   this.commanservice.login(this.username)
    //     .then(() => alert('Login successful'))
    //     .catch(err => alert('Login failed: ' + err));
    // }

    async login() {
      try {
        const response = await this.commanservice.loginChallenge(this.docid).toPromise();
        const { options } = response;
  
        const authenticationResult = await startAuthentication(options);

  
        await this.commanservice.loginVerify(this.docid, authenticationResult).toPromise();
      } catch (error) {

      }
    }
  
    async register() {
      try {
          const response = await this.commanservice.registerChallenge(this.docid).toPromise();
          const { options } = response;
  
          const registrationResult = await startRegistration(options);
          // console.log(registrationResult);
  
         const response1= await this.commanservice.registerVerify(this.docid, registrationResult).toPromise();
          
          // If response is true, set passkeyshow to false
          // console.log(response1)
          if (response1.verified === true){
              this.passkeyshow = false;
              this.getdata()
           
              this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully Activated ' });
              this.backupcode()
            

          }else{
            this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Not Activate' });
          }
      } catch (error) {
          console.error('Registration error:', error);
      }
  }
  alert1(){
  alert('not working')
  }
  updateuserpersonaldetail(){

    if(this.accountinfo.valid){
      this.commanservice.updateuserdetails(this.docid,this.accountinfo.value).subscribe((res)=>{
        // console.log(res)
        if(res){
          this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully update ' });
          this.getdata()
        }
      })
    }else{
      this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Form not valid' });
    }
 
  }

  backupcodedilog:boolean=false
  code:any
  backupcode(){
    this.commanservice.genratebackupcode(this.docid,this.hospital_ID,this.branchID).subscribe((res)=>{
// console.log(res)
if(res){
  this.code=res
  this.backupcodedilog=true
 this.getbackupcode()
}
    })
  }
  copyCodes(): void {
    const codesText = this.code.backupCodes.join('\n'); // Concatenate codes with newlines
    navigator.clipboard.writeText(codesText); // Copy codes to clipboard
    alert('Codes copied to clipboard!');
  }

  downloadCodes(): void {
    // const codesJson = JSON.stringify(this.code, null, 2); // Convert codes array to JSON string
    const codesJson =  this.code.backupCodes.join('\n'); 
    const blob = new Blob([codesJson], { type: 'application/json' }); // Create blob with JSON data
    const url = window.URL.createObjectURL(blob); // Create URL for blob
    const a = document.createElement('a'); // Create anchor element
    a.href = url;
    a.download = 'Healaxy-phr-backupcode.json'; // Set download attribute
    a.click(); // Simulate click to trigger download
    window.URL.revokeObjectURL(url); // Revoke URL to release memory
  }
  backupcodedata:any
  getbackupcode(){
    this.commanservice.getbackupcode(this.docid).subscribe((res)=>{
// console.log(res)
this.backupcodedata=res
    })
  }



  async submitgeolocation() {
    const cityName = this.addgeolocation.value.state.states_name;
  
    // Get coordinates for the city
    this.geocodingService.getCoordinatesForCity(cityName).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          const cityLatitude = parseFloat(response[0].lat);
          const cityLongitude = parseFloat(response[0].lon);
          console.log('Coordinates for', cityName + ':', cityLatitude, cityLongitude);
  
          // Get user's current position
          this.getCurrentPosition().then(
            (position: GeolocationPosition) => {
              const userLatitude = position.coords.latitude;
              const userLongitude = position.coords.longitude;
              console.log('User coordinates:', userLatitude, userLongitude);
  
              // Calculate distance between user and city
              const distance = this.calculateDistance(userLatitude, userLongitude, cityLatitude, cityLongitude);
              console.log('Distance from', cityName + ':', distance.toFixed(2), 'km');
  
              // Check if the user's location falls within the allowed radius of the city
              const radius = 400; // Example radius in kilometers
              const withinAllowedArea = distance <= radius;
              if (withinAllowedArea) {
                console.log('User is within the allowed area');
                // Proceed with your logic
              } else {
                console.log('User is outside the allowed area');
                // Handle the case where the user is outside the allowed area
              }
            },
            (error) => {
              console.error('Error getting user location:', error);
            }
          );
        } else {
          console.error('No coordinates found for', cityName);
        }
      },
      (error) => {
        console.error('Error getting coordinates for', cityName + ':', error);
      }
    );
  }
  
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius = 6371; // Earth's radius in kilometers
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c; // Distance in kilometers
  }
  
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
  


  deleteip(item){
console.log(item,"item")
this.commanservice.deleteip(item.id,item.patient_id).subscribe((res)=>{
  console.log(res)
  this.get_allowrd_ip_data()
})
  }
  deactivatepasskey(){
    this.commanservice.deactivepasskey(this.docid).subscribe((res)=>{
      console.log(res)
      if(res){
        this.messageserveice.add({ severity: 'success', summary: 'Service Message', detail: 'Sucessfully update ' });
        this.getdata()
      }
      else{
        this.messageserveice.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      }
    
    })
  }
}




// }