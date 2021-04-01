import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customValidator } from 'src/app/core/common/validator.custom';
import { FirebaseService } from 'src/app/core/services/firebaseServiec/firebase.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private service : FirebaseService,public router: Router) {

   


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



             
       



      })


  }

save()
{
  let fname : string = this.fn.value + " ";
  let lname : string = this.lastName.value;
  let name: string= fname.concat(lname).toUpperCase();
  let data: any = {};
  data['name']= name;
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
  console.log(data);
  this.service.addEmloyee(data).then(res => {
    console.log(res);
    
  }).catch(error => { console.log(error) });

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
