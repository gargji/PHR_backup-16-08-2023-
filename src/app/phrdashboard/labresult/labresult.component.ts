import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthrecordsservicesService } from '../HealthRecordsServices/healthrecordsservices.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem, MessageService } from 'primeng/api';
import { CommanserviceService } from 'src/app/commanservice.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-labresult',
  templateUrl: './labresult.component.html',
  styleUrls: ['./labresult.component.css']
})

export class LabresultComponent implements OnInit {
  hospital_ID: any;
  branchID: any;
  laborderdata: any;
  siebarimage: any;
  envpath: string;
  display: boolean = false;
  modeldata: any = [];
  reqestdatalength: any;
  laborderdatalength: any;
  laborder: any;
  images: any;
  labresult: any;
  imagelabresult: any;
  filepath: Object;
  systemdata: any;
  systemdataresult: any;
  labresultdatalength: any;
  imagerorderdatalength: any;
  imagelabresultlength: any;
  systemdatalength: any;
  systemresultdatalength: any;
  designhtml: any;
  patientdetails: any;
  constructor(public routes: ActivatedRoute, public healthrecordsservices: HealthrecordsservicesService, private ngxLoader: NgxUiLoaderService, private messageService: MessageService, private commanservice: CommanserviceService, public http: HttpClient,) {



  }
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
  ngOnInit(): void {



    var patientid = localStorage.getItem('guid')
    console.log(patientid);
    this.patientID = JSON.parse(patientid || '{}')
    console.log(this.patientID);
    var hospital_id = localStorage.getItem('organization_id')
    console.log(hospital_id, "hospital id");
    this.hospital_ID = JSON.parse(hospital_id || '{}')
    console.log(this.hospital_ID)
    var branch_id = localStorage.getItem('hospital_id')
    this.branchID = JSON.parse(branch_id || '{}')
    console.log(this.branchID)
    this.getvisitrecord()
    this.getrequestvisitData()
  }

  pastdata: any
  comming_visit: any;




  getvisitrecord() {

    this.ngxLoader.startLoader("loader-01");
    this.healthrecordsservices.getlaborder(this.patientID).subscribe((data: any) => {
      if (data) {
        this.ngxLoader.stopLoader("loader-01");
        this.laborderdata = data
        // this.laborderdatalength=  this.laborderdata.length

        this.laborder = this.laborderdata.filter((x) => {
          return x.class === 'Labs';
        });
        this.laborderdatalength = this.laborder.length
        this.images = this.laborderdata.filter((x) => {
          return x.class === 'RAD';
        });
        this.imagerorderdatalength = this.images.length
        this.labresult = this.laborderdata.filter((x) => {
          return x.ResultStatus == '1';
        });
        this.labresultdatalength = this.labresult.length


        this.imagelabresult = this.images.filter((x) => {
          return x.ResultStatus == '1';
        });
        this.imagelabresultlength = this.imagelabresult.length
        this.systemdata = this.laborderdata.filter((x) => {
          return x.class === 'Systems';
        });
        this.systemdatalength = this.systemdata.length
        this.systemdataresult = this.systemdata.filter((x) => {
          return x.ResultStatus === 'Systems';
        });
        this.systemresultdatalength = this.systemdataresult.length
      }
    })

  }

  reqestdata: any
  getrequestvisitData() {
    this.ngxLoader.startLoader("loader-01");
    console.log(this.patientID)
    this.healthrecordsservices.getlabresult(this.patientID).subscribe((data) => {
      console.log(data)
      this.ngxLoader.stopLoader("loader-01");
      this.reqestdata = data


      this.reqestdatalength = this.reqestdata.length

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


    this.healthrecordsservices.deletereqestrecord(visitrecordid).subscribe((data: any) => {


      console.log(data)

      // this.getvisitrecord();
      if (data == 'success') {

        this.getrequestvisitData()
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Your Data Has Been Successfully deleted' });
      } else {
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


  async download(data) {
    await this.healthrecordsservices.getdownload(data.orderId, this.patientID).subscribe((res) => {
      console.log(res)
      this.filepath = res[0].filePath
      console.log(this.filepath)
      this.envpath = environment.media_path;
      this.siebarimage = this.filepath;



      // downloadDocument(data) {
      // this.siebarimage = data.full_path;
      // Replace with the actual URL of the file on the server
      const fileUrl = this.envpath + this.siebarimage;

      console.log(fileUrl)
      const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream', });

      // this.http.get(fileUrl, { headers, responseType: 'blob' as 'json' }).subscribe(response:Blob => {
      //   saveAs(response, data.fileName+'.ext'); // Specify the desired file name
      // });
      console.log(fileUrl)
      this.http.get(fileUrl, { responseType: 'blob' as 'json' }).subscribe((response: Blob) => {
        saveAs(response, data.fileName); // Specify the desired file name
      });
    })

  }


  showDialog(data) {
    this.display = true
    // this.modeldata[0]=data
    this.getlabresultdetail(data.orderId)
    console.log(this.modeldata)
  }
  saveDiv(modeldata) {

    this.healthrecordsservices.detailsdata(modeldata).subscribe((data:any)=>{
      console.log(data,"patient_datails")
      this.patientdetails=data[0]
      // console.log(this.patientdetails?.hospital_name)
  

  
     this.healthrecordsservices.genrateLABTEMP(this.patientID).subscribe((data:any)=>{
        console.log(data,"template")
        this.designhtml=data[0].html
        // this.guid=data[0].guid
// start


document.getElementById('maindiv').innerHTML =   this.designhtml
setTimeout(() => {
// this.saveDiv('rah','title')
this.printDataReferals()

}, 500);

      // 
        // facility details
        document.getElementById('labTitle').innerHTML =   'Lab Result'

    
      document.getElementById('value_practiceAddress').innerText=this.patientdetails?.hospital_address
      document.getElementById('value_practiceName').innerText=this.patientdetails?.hospital_name,
      // document.getElementById('value_phoneNo').innerText=this.patientdetails?.hospital_phone
      document.getElementById('value_email').innerText=this.patientdetails?.hospital_email
      document.getElementById('value_webUrl').innerText=this.patientdetails?.hospital_website
      document.getElementById('value_gstin').innerText=this.patientdetails?.hospital_gstn
      document.getElementById('value_facilityCode').innerText=this.patientdetails?.hospital_postalcode
      // end facility details


      // document.getElementById('rah').innerHTML =  this.designhtml

      // patient details
      document.getElementById('value_patientName').innerText=this.patientdetails?.patient_name
      document.getElementById('value_patientEmail').innerText=this.patientdetails?.patient_email
      document.getElementById('value_dob').innerText=this.patientdetails?.patient_dob
      // document.getElementById('value_patientAge').innerText=this.patientdetails?.patient_age
      // document.getElementById('value_patientGender').innerText=this.patientdetails?.patient_gender

      // document.getElementById('value_patientHomePhone').innerText=this.patientdetails?.patient_Home_phone
      // document.getElementById('value_patientWorkPhone').innerText=this.patientdetails?.patient_work_phone
      document.getElementById('value_patientMobilePhone').innerText=this.patientdetails?.patient_mob
      document.getElementById('value_patientAddress').innerText=this.patientdetails?.patient_address
    //   // patient details end 
    
    
    // invoice details 
    //  document.getElementById('patient_ValueLabRef').innerText=this.modeldata[0].labRefNumber+'lab'
  
    //  document.getElementById('patient_valueOrderDate').innerText=this.modeldata[0].TransactionTime 
    //  document.getElementById('value_invoiceAmount').innerText='rahul garg'
    //  document.getElementById('value_invoiceDate').innerText=event.invoicedate
    //  document.getElementById('value_invoiceNumber').innerText=event.invoicenumber

    // //  provider details
    document.getElementById('providerValueName').innerText =  this.patientdetails?.provider_name || '';

     document.getElementById('providerValuePhone').innerText=this.patientdetails?.provider_phone
    //  document.getElementById('value_referalProviderName').innerText='rahul garg'
    //  document.getElementById('value_patientAddress').innerText='rahul garg'
  

// console.log(this.dat.productName)

    // table
//     function extractTaxPercentage(taxpercent) {
//       // Assuming taxpercent is a string like "12% IGST S"
//       // Extracting the percentage value using regular expression
//       const regex = /(\d+(\.\d+)?)%/;
//       const match = taxpercent.match(regex);
//       return match ? match[0] : "N/A"; // return the whole matched substring (including %) or "N/A" if not found
//   }
    document.getElementById("div_testOrdered").innerHTML = `

    <table width="100%" class="rtable" id="div_procedureCodesTable"> 
    <thead> 
    <tr> <th data-category="showOrHideColumn" align="left" width="5%" name="div_procedureLineItemNumber" id="procedureLineItemNumber">#</th>
     <th data-category="showOrHideColumn" align="left" width="25%" name="div_cpt" id="cpt">Result Name</th>
     <th data-category="showOrHideColumn" align="left" width="14%" name="div_modifiers" id="modifiers">Result</th> 
     <th data-category="showOrHideColumn" align="left" width="14%" name="div_diagnosisPointer" id="diagnosisPointer" >Reference</th> 

     
      <th data-category="showOrHideColumn" align="left" width="10%" name="div_cptQty" id="cptQty">Interpretation </th>
       

    </thead> 


        <tbody>
            ${this.modeldata.map((item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.labOrderName}</td>
                    <td>${item.Results}</td>
                    <td>${item.min -item.max}</td>
                    <td>${item.intrepretation}</td>
         

                  
                </tr>
            `).join('')}
        </tbody>
    </table>
`;

// document.getElementById('value_procedure_Subtotal').innerText=this.invoiceform.controls['sumarytotlaamount'].value
// document.getElementById('value_procedure_total').innerText=this.invoiceform.controls['finalamount'].value
// this.invoiceform.get('sumarytotlaamount')?.setValue(sumTotal);
// this.invoiceform.get('finalamount')?.setValue(sumTotalTaxInclude);
      // console.log( document.getElementById('value_patientName').innerText)
   


    })


   })



// end






    //  })



    
  


   
  }
  printDataReferals(){

    setTimeout(() => {
      const printContents =  document.getElementById('maindiv').innerHTML
      // const printContents =  this.designhtml;
      console.log(printContents)
      // Open a new window for printing
      const WindowPrt = window.open('', '_blank');
    
      // Write the content to the new window
      WindowPrt.document.write(printContents);
    
      // Close the document after writing
      WindowPrt.document.close();
      // document.getElementById('rah').innerHTML =  ""
    
      // Focus and print the new window
      WindowPrt.focus();
      WindowPrt.print();
    
      // Close the new window after printing
      setTimeout(() => {
          WindowPrt.close();
      }, 200);
  
    }, 500);
          }

  
  generatePdf(htmlContent: string) {
    return this.http.post<Blob>('http://your-server.com/api/pdf', { htmlContent });
  }
  getlabresultdetail(orderId) {
    this.healthrecordsservices.getlabresultdetail(orderId, this.patientID).subscribe((data) => {
      console.log(data)
      this.modeldata = data

    })
  }


}
