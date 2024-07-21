import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-base-component',
    template: ``
  })
  export class BaseComponent {

    messagesendFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }



    familysFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }



    immunizationsFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }

    
    // createRegistrationFormGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
    //   console.log(formGroup);
      
    //   let isValid = true;  
    //   if (formGroup != null) {  
    //     this.markAllControlTouched(formGroup);  
    //     isValid = this.checkFormGroupValidations(formGroup);  
    //   }  
    //   return isValid;
    // }

    allargyFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }


    medicationFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }

    currenthealthFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }

    currentreasonofvisitGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }
    

    HospitaladdressGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }

    providernameGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }


    validateFormAndGrid(formGroup: FormGroup, errorMessages: string[] = []): boolean {
      console.log(formGroup);
      
      let isValid = true;  
      if (formGroup != null) {  
        this.markAllControlTouched(formGroup);  
        isValid = this.checkFormGroupValidations(formGroup);  
      }  
      return isValid;
    }

    checkFormGroupValidations(formGroup: FormGroup): boolean {
      let isFormValid: boolean = formGroup.valid;
      if (isFormValid) {
        Object.keys(formGroup.controls).forEach(field => {
          const childFromGroup = formGroup.get(field);
          if (childFromGroup instanceof FormGroup) {
            if (!childFromGroup.valid) { return false; }
          }
        });
      }
      return isFormValid;
    }

    showErrorBorderOnControls(formControl: AbstractControl) {
      // console.log(formControl);
      
      let error = null;  
      if (formControl != null) {  
        if( (formControl.touched) && (formControl.errors != null)){
          error = "ng-dirty ng-invalid ng-touched"
        }  
      }  
      return error;  
    }
    
    validateControl(formGroup: FormGroup, controls: string[], errorMessages: string[] = []): boolean {
      let isValid = true;  
      if (formGroup != null && FormControl.length > 0) {  
        controls.forEach(x => {
          formGroup.controls[x].markAsTouched();  
        })
  
        controls.forEach(x => {
          if (!formGroup.controls[x].valid) {
            isValid = false;
          }
        });
      }
  
      if (!isValid) {
        errorMessages.push("error");
      }
  
      if (errorMessages.length > 0) {
        isValid = false;
       // this.showErrorNotification(errorMessages);
      }  
      return isValid;  
    }
  
   markAllControlTouched(formGroup: FormGroup) {  
      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);  
        if (control instanceof FormControl) {  
          control.markAsTouched({ onlySelf: true });  
        } else if (control instanceof FormGroup) {  
          this.markAllControlTouched(control);  
        }  
      });  
    }
  
    checkForNumberOnlyInput(event): boolean {
      if ((event.key != null) && !isNaN(Number(event.key))) { return true; }  
      else { return false; }  
    }
  
    setValidatorsOnControl(formGroup: FormGroup, controls: string[], validator?: string) {  
      controls.forEach(control => {  
        if (validator == "required") {  
          formGroup.controls[control].setValidators(Validators.required);  
        }  
        else if (validator == "MaxLength") {  
          formGroup.controls[control].setValidators(Validators.minLength(10));  
        }  
        else if (validator == "requiredEx") {  
          formGroup.controls[control].setValidators(Validators.required);  
        }  
        else {  
          formGroup.controls[control].setValidators(null);  
        }  
        formGroup.get(control).updateValueAndValidity({ emitEvent: false, onlySelf: true });  
      })  
    }
  
   disableControl(formGroup: FormGroup, controls: string[]) {  
      controls.forEach(control => {
          formGroup.controls[control].disable();  
      })  
    }
  
    enableControl(formGroup: FormGroup, controls: string[]) {  
      controls.forEach(control => {  
        formGroup.controls[control].enable();  
      })  
    }

    markControlAsUntouched(formGroup: FormGroup, controls: string[]) {  
      controls.forEach(control => {  
        formGroup.controls[control].markAsUntouched();  
      })  
    }
  
    convertDatetoCurrentDatestring(Date: Date): string {  
      let dateString: string;  
      //dateString = moment(Date).format('DDMMYYYY');  
      return dateString;  
    }

    /*allowNumberInputOnly(event): string {  
      let isNumericInput = ((event.srcElement != null) && event.srcElement.value.match(Const.ONLY_NUMBER_INPUT_REGEX) && !isNaN(Number(event.srcElement.value)));
      if (!isNumericInput) {  
        event.srcElement.value = event.srcElement.value.replace(/\D/g, '');  
      }  
      return event.srcElement.value;  
    }*/
  
   
  
    /*allowNumCharInputOnly(event): string {  
      let isValid = ((event.srcElement != null) && (event.srcElement.value) && event.srcElement.value.match(Const.ONLY_NUMBER_CHARACTER_INPUT_REGEX));
      if (!isValid) {  
        event.srcElement.value = event.srcElement.value.replace(/[^A-Za-z0-9]/g, "");  
      }  
      return event.srcElement.value;  
    }*/
  
    public isValidPersonalId(Data: string): boolean {  
      if ((Data) && (Data.length === 13)) {  
        let personalId: string = Data;  
        let sum: number = 0;  
        let j: number = 13;  
        for (var k: number = 0; k < 12; k++) {  
          var i: number = +(personalId[k]);  
          var p: number = i * j;  
          sum += p;  
          j--;  
        }
      if (sum === 0) { return false; }  
        let resultInt = (11 - (sum % 11)).toString();  
        let personalIdLastDigit = personalId[12].toString()  
        let lastLogicDigit = resultInt.substr(resultInt.length - 1);  
        if (!(personalIdLastDigit === lastLogicDigit)) { return false; }  
        else { return true; }  
      }  
      else {  
        return false;  
      }  
    }  
  }