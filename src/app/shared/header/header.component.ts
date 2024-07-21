import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { CommanserviceService } from 'src/app/commanservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private socket:Socket,private commanservice:CommanserviceService,private route: Router) { }
  sessionid:any
  patientID:any
  @Input() _opened:any
  ngOnInit(): void {
  }
  collapse(){
    // document.querySelector('.navbar-toggler').classList.add('collapsed');
    document.querySelector('.navbar-collapse').classList.remove('show');
    document.querySelector('.navbar-collapse').classList.remove('show');
  }

  collapse1(){
    // document.getElementById('navbarTogglerDemo02').classList.add('collapsed');
    document.getElementById('navbarTogglerDemo02').classList.remove('show');
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
  getuserdetail(){
    var sessionid = localStorage.getItem('session_id')

    this.sessionid = JSON.parse(sessionid || '{}')

    var patientid = localStorage.getItem('guid')

    this.patientID = JSON.parse(patientid || '{}')

  }
}
