import { Component, OnInit,SimpleChanges  } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommanserviceService } from 'src/app/commanservice.service';
import {Message,MessageService} from 'primeng/api';
import { BaseComponent } from 'src/app/phrdashboard/common/base.component';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']

})
export class RegistrationComponent extends BaseComponent implements OnInit {
username:any
otp: string;

email:any
branchId:any
dob:any
  patient:any
  hopitalID:any
  original_id_b64: string
  original_pid_b64: string
  original_organization_id_b64: string
  original_hospital_id_b64: string
  orginalURL:string;

  registrationForm: FormGroup
  constructor(  private commanService: CommanserviceService, public messageservice: MessageService, private route:Router,public routes:ActivatedRoute) { 
    super()
  }
 
 
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
this.generate()
// this.getmail()
 // for value set
 this.registrationForm.patchValue({
 
  captcha:this.captcha1


  
}
)
  }



  ngOnInit(): void {
    // this.createRegistrationForm()
  
    this.generateOTP();
    // this.sendotp()

    this.routes.queryParams.subscribe((param) => {
      console.log(param);
      this.hopitalID=param.hopitalID
      this.patient = param.patientID;
      console.log('this.patient',this.patient,this.hopitalID);
      this.createRegistrationForm()
      this.createdobverify()    });
    // this.getusername()
   
    

    // this.activatedRoute.queryParams.subscribe((params) => {
    //   console.log(params);
    //   this.original_id_b64 = params['id'];
    //   this.original_pid_b64 = params['pid'];
    //   this.original_organization_id_b64 = params['organization_id'];
    //   this.original_hospital_id_b64 = params['hospital_id'];
    //   this.orginalURL = 'http://localhost:4200/register?pid='+this.original_pid_b64+'id='+this.original_organization_id_b64+'organization_id'+this.original_hospital_id_b64+'hospital_id'+this.original_id_b64;

    //  });
     
    this.generate()

    // for value set
   
   
  }


  dobverify:any
  createRegistrationForm(){

    this.registrationForm = new FormGroup({
      password: new FormControl('',[Validators.required ,Validators.minLength(8),Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )]),
      confirm_password: new FormControl('',Validators.required),
      confirmcaptcha:new FormControl('',Validators.required),
      captcha:new FormControl(''),
     email:new FormControl(''),
     termcondtion:new FormControl('')


    })
   

    this.getmail()
  }

  createdobverify(){
    this.dobverify=new FormGroup({
      pname: new FormControl(''),
      dob:new FormControl('',Validators.required)

    })
    this.emailverify=new FormGroup({
      otp:new FormControl('',Validators.required)
    
    })
  }

  emailid:any
  sendotp(){
  //  this.email= this.registrationForm.controls['email'].value
    console.log(this.otp,this.emailid)
this.commanService.sendotp(this.otp,this.emailid).subscribe((res)=>{
  console.log(res)
})
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
  submit_registration_details(){
   
    console.log("submit",this.registrationForm.value);

    if(this.registrationForm.valid){
      if(this.registrationForm.value.confirmcaptcha!=""){
        if(this.registrationForm.value.confirmcaptcha==this.captcha1){
       if(this.registrationForm.controls['password'].value !='' && this. registrationForm.controls['confirm_password'].value != ''){
      
          if(this.registrationForm.controls['password'].value == this.registrationForm.controls['confirm_password'].value){
            if(this.registrationForm.controls['termcondtion'].value==true){
      
            
            console.log('validddddddddddddddddddddddddd');
      
            //
      this.expression2=false
      this.expression3=true
      
            this.sendotp()
            
         
      
          }
          else{
            this.messageservice.add({severity:'error', summary: 'Error', detail: 'Accept Term And Conditon'});
          }
        
        }
          else{
            this.messageservice.add({severity:'error', summary: 'Error', detail: 'Password Does Not Match'});
            // this.registrationForm.reset();
            // this.generate()
          }
        }
        else{
          this.messageservice.add({severity:'error', summary: 'Error', detail: 'Form Invalide Please Full Fill Form'});
         
          this.registrationForm.reset();
          this.generate()
          
        }
      }else{
        this.messageservice.add({severity:'error', summary: 'Error', detail: 'Captcha Does Not Match'});
      }
      
      }else{
        this.messageservice.add({severity:'error', summary: 'Error', detail: 'Form Invalide Please Full Fill Form'});
         
      }
    }else{
      this.messageservice.add({severity:'error', summary: 'Error', detail: 'password not vaild'});
    }
    
//     console.log(this.registrationForm.value, this.original_id_b64, this.original_pid_b64,this.original_organization_id_b64,this.original_hospital_id_b64);

  }

  // declaring and initializing some variables
 alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
// let status = document.getElementById('status');
// we'll use this status dom element to display the response while verifing the code
// status.innerText = "Captcha Generator";
 captcha1:any;


generate(){
 
  let first = this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
  let second = Math.floor(Math.random() * 10);
  let third = Math.floor(Math.random() * 10);
  let fourth = this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
  let fifth = this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
  let sixth = Math.floor(Math.random() * 10);
  this.captcha1 = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
  console.log( this.captcha1);

  this.registrationForm.patchValue({
 
    captcha:this.captcha1
     
  
    
  }
  )
  // . . . . . 
  }
// for captcHA Mateched
//   check(){
//     if(this.registrationForm.value.confirmcaptcha==this.captcha1)
// {
//  this. submit_registration_details()
// }  
// else{
//   console.log("not match");
  
// }}
// for get email 
name:any
date: Date | undefined;
getmail(){
  this.commanService.getemail(this.patient).subscribe((res)=>{
    console.log(res);
    if(res){
      this.email=res[0]?.emailId1
      this.emailid=res[0]?.emailId1
      this.username=res[0]?.completeName
      this.branchId=res[0]?.branchId
      this.dob=res[0]?.dateOfBirth
      this.name=res[0]?.completeName
      console.log(this.email,this.dob)

      this.registrationForm.patchValue({
   
        captcha:this.captcha1,
        email:res[0]?.emailId1,
        // name:this.name
          })


          this.dobverify.patchValue({
            pname :this.name
          })
          
    }
      
      
    })
    
  
}
// getusername(){
//   this.commanService.getusername(this.patient).subscribe((res)=>{
//     console.log(res)
//     this.username=res
//   })
// }
formattedDate: string;
expression2=false
expression3=false
expression1=true
submit(){
if(this.dobverify.valid){

  this.formattedDate = this.formatDate(this. dobverify.controls['dob'].value);
  
// console.log()
console.log(this.dobverify.value)
if(this.formattedDate == this.dob){


// if(this.formattedDate== this.dob){
  this.expression1=false
 this.expression2=true

}else{
  this.messageservice.add({severity:'error', summary: 'Error', detail: 'Date Of Birth Is Invaild'});
}}
else{
  this.messageservice.add({severity:'error', summary: 'Error', detail: 'Enter Dob '});
}
}
formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

emailverify:any
submit2(){
if(this.otp==this.emailverify.controls['otp'].value)
{
  console.log("true")
  this.commanService.submit_registration_details(this.registrationForm.value,this.hopitalID,this.patient,this.username,this.branchId).subscribe((data:any)=>{  
    console.log(data)
            if(data=='success'){
              this.messageservice.add({severity:'success', summary:'Service Message', detail:'Sucessfully Create Your Password '});
              // console.log("hit")
              setTimeout(() => {
                this.route.navigate(['/login'])
              }, 1000);
       
            }
            else{
              this.messageservice.add({severity:'error', summary: 'Error', detail: 'User alredy registered'});
            }
        })
        
}
else{
  this.messageservice.add({severity:'error', summary: 'Error', detail: 'Otp Does Not Match'});
}

}





chektermcondition(){
  this.visible=false
  this.registrationForm.patchValue({
 
    termcondtion:true
  
  
    
  }
  )

}
Cancel()
{
  this.visible=false
  // this.registrationForm.patchValue({
 
  //   termcondtion:false
  
  
    
  // }
  // )
}}
