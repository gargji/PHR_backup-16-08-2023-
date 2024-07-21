import { Component, OnInit,Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-commancontrolvalidators',
  templateUrl: './commancontrolvalidators.component.html',
  styleUrls: ['./commancontrolvalidators.component.css']
})
export class CommancontrolvalidatorsComponent implements OnInit {
  @Input() control: FormControl;
  @Input() validationKeys: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {

    for (let propertyName in this.control.errors) {

      if (this.control.errors.hasOwnProperty(propertyName) && !this.control.valid && this.control.touched || this.control.dirty) {

        return this.validationKeys[propertyName];

      }

    }

    return null;

  }


}
