import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'util';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { AuthorizeService } from '../../services/AuthorizeService';
//import { RepeatPasswordEStateMatcher, RepeatPasswordValidator } from '../../services/validators';
import { environment } from '../../environments/environment';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private _authorizeService: AuthorizeService;
  //passwordsMatcher = new RepeatPasswordEStateMatcher;
  form: any;
  //public userName: string;
  //public password: string;
  public idUrl: string;  
  myGroup:FormGroup;
  public _cookieService: CookieService;
  constructor(authorizeService: AuthorizeService, cookieService: CookieService,public navParams: NavParams, private formBuilder: FormBuilder) {
    this.idUrl = environment.identityServerUrl;
    // if (cookieService.get("access_token")) {
    //   this.navParams.get('products');
    // }
    this._authorizeService = authorizeService;
    this._cookieService = cookieService;
    this.form = this.formBuilder.group ( {
      userName: new FormControl(),
      password: new FormControl(),
      passwordAgain: new FormControl()     
    });
  }

  ngOnInit() {      

  }
  register() {
    this._authorizeService.registerNewAccount(this.form.value.userName, this.form.value.password).subscribe(
      resp => {
        console.log(resp);
        let obj = resp;
        this._cookieService.set("isAutorize", "true")
        this.navParams.get('products');
        //this.router.navigate(['login'],{ queryParams: { email: obj.email, password: obj.password } })
      },
      error => {
        console.log('oops', error)
      }      
    );
  }
  
}
