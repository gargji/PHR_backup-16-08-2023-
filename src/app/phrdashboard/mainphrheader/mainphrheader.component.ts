import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { CommanserviceService } from 'src/app/commanservice.service';
@Component({
  selector: 'app-mainphrheader',
  templateUrl: './mainphrheader.component.html',
  styleUrls: ['./mainphrheader.component.css']
})
export class MainphrheaderComponent implements OnInit {
  public _opened: boolean = false;
  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(private router:Router,private socket:Socket,private commanservice:CommanserviceService,private route: Router,) { 
    // this.socket.on('receive_message2',(data)=>{
    //   this.check()
    //   // setTimeout(() => {
   
    //   //   alert("user logout")
    //   // }, 1000);
    // })
  }
  sessionid:any
  patientID:any
  ngOnInit(): void {
    var sessionid = localStorage.getItem('session_id')
    console.log(sessionid);
    this.sessionid = JSON.parse(sessionid || '{}')
    console.log(this.sessionid);
    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    console.log(this.patientID);
  }
  DEL(){
    this.socket.emit('login',this.logout())
   
  }
  session_id:any
  logout(){
    
    var sessionid = localStorage.getItem('session_id');
  console.log(sessionid)
  this.session_id = JSON.parse(sessionid || '{}')
    console.log(this.patientID);
    this.commanservice.updatestatus(this.patientID,this.session_id).subscribe((data)=>{
      console.log(data)
      this.socket.emit('logout',data)
      // this.router.navigate(['login'])
      this.check()
   
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
  
      this.commanservice.checkuser(this.patientID, sessionid).subscribe((res) => {
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
}
