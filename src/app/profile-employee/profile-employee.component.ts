import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { customValidator } from '../core/common/validator.custom';
import { FirebaseService } from '../core/services/firebaseServiec/firebase.service';
import { SharedDataService } from '../core/services/sharedData/shared-data.service';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
   _empData: any;
  
   showEmployee : boolean = false;
   numericRegex ='^[0-9 ]*$';
   alphabatRegx = /^[a-zA-Z ]*$/;
   form : any;
   _city :any;
   _yoe : any;
   _jd: Date;
   _state:any;
   _pincode : any;
   _EmpId : any;

  constructor( private sharedData :SharedDataService,
                private fb: FormBuilder, 
                private service : FirebaseService,
                public router: Router,
                private _bottomSheet: MatBottomSheet,
                private _snackBar: MatSnackBar) { 
    
    this.sharedData._latestData$.subscribe(latestData =>{console.log(latestData), this._empData = latestData});
  }

  ngOnInit(): void {


    this.form = this.fb.group(
      {
        name: this.fb.group({

                      firstName:
                        [
                          '',
                          [
                            Validators.required,
                            Validators.minLength(4),
                            customValidator.containNoblankspace,
                            Validators.pattern(this.alphabatRegx)
                          ],
                        ],
                      lastName:
                        [
                          '',
                          [
                            Validators.required,
                            Validators.minLength(4),
                            customValidator.containNoblankspace,
                            Validators.pattern(this.alphabatRegx)
                          ],
                        ],
                        
              }),
          email:
              [
                '',
                [
                  Validators.required,
                  customValidator.containNoblankspace,
                  Validators.email,
                  
                  
                ],
              ],

          contactNumber : 
              ['',

                [
                  Validators.required,
                  customValidator.containNoblankspace,
                  Validators.pattern(this.numericRegex)
                ],
              
              
              ],

              password :
             ['',

              [ 
                Validators.required,
                customValidator.containNoblankspace,
                
              ],
             ],

             designation :
             ['',
                  [
                  Validators.required,
                  customValidator.containNoblankspace,
                  Validators.pattern(this.alphabatRegx)

                  ],          
             ],

             joinDate :
             ['',
                    [ 
                      // Validators.required,
                      customValidator.dateValidatorFuture,
                    ]
            
            
            ],

            currentAddress :
            ['',
                [  Validators.required,
                  
                ],
          
          ],
          panNumber : 
          ['',

            [
              Validators.required,
              customValidator.containNoblankspace,
              Validators.pattern(this.numericRegex)
            ],
          
          
          ],

          aadharNumber : 
          ['',

            [
              Validators.required,
              customValidator.containNoblankspace,
              Validators.pattern(this.numericRegex)
            ],
          
          
          ],

          EmpId:
          ['',
          [
            Validators.required
          ]
        
        ]        
      });


    if(this._empData)
    {
      
      this.fn.value= this._empData['firstname'];
      this.lastName.value = this._empData['lastname'];
      this.mailchk.value= this._empData['email'];
      this.contactNumber.value=this._empData['contactNumber'];
      this.alter.value=this._empData['password'];
      this.designation.value=this._empData['designation'];
      this.panNumber.value=this._empData['panNumber'];
      this.aadharNumber.value=this._empData['aadharNumber'];
      this.form.get('currentAddress').value=this._empData['address'];
      this._yoe=this._empData['yearOfExperience'];
      this.EmpId.value=this._empData['EmpId'];
      this._jd =this._empData['joiningDate'];
      this._city=this._empData['city'];
      this._pincode =this._empData['pincode'];
      this._state=this._empData['state'];
       console.log(this._empData);
    }


  }

  update()
  {
    let fname : string = this.fn.value + " ";
    let lname : string = this.lastName.value;
    let name: string= fname.concat(lname).toUpperCase();
    let data: any = {};
    data['name']= name;
    data['id']= this._empData['id'];
    data['firstname']= fname;
    data['lastname'] = lname;
    data['email']= this.mailchk.value;
    data['contactNumber']= this.contactNumber.value;
    data['password']= this.alter.value? this.alter.value : ' ';
    data['designation']= this.designation.value;
    data['panNumber']= this.panNumber.value;
    data['aadharNumber']= this.aadharNumber.value;
    data['address'] = this.form.get('currentAddress').value;
    data['yearOfExperience']= this._yoe? this._yoe : ' ';
    data['EmpId']= this.EmpId.value;
    data['joiningDate']= this._jd ? this._jd : " ";
    data['city'] = this._city? this._city : ' ';
    data['pincode']= this._pincode ? this._pincode : " ";
    data['state'] = this._state ? this._state : ' ';
    this.service.updateEmloyee(data.id, data);
    this._snackBar.open('Data Updated!!', 'Cancle', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this._bottomSheet.dismiss();
    //console.log(data);
  }
  close(): void {
    this._bottomSheet.dismiss();
    
  }
  get fn()
{
  return this.form.get('name.firstName');
}

get lastName()
{
  return this.form.get('name.lastName');
}

get mailchk()
{
  return this.form.get('email');
}

get contactNumber()
{
  return this.form.get('contactNumber');
}

get alter()
{
  return this.form.get('password');
}

get designation()
{
  return this.form.get('designation');
}

get panNumber()
{
  return this.form.get('panNumber');

}

get aadharNumber()
{
  return this.form.get('aadharNumber');
}

get EmpId()
{
  return this.form.get('EmpId');
}

}
