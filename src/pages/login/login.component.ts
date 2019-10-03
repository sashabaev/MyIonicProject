import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizeService } from '../../services/AuthorizeService';
import { environment } from '../../environments/environment';
import { NavParams } from 'ionic-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private _authorizeService: AuthorizeService;
  public userName: string;
  public password: string;
  public isCorrectPas: boolean = true;
  public idUrl: string;  
  public _cookieService: CookieService;
  constructor(authorizeService: AuthorizeService, cookieService: CookieService, public navParams: NavParams) {
    this.idUrl = environment.identityServerUrl;
    // if (cookieService.get("access_token") === "true") {
    //   this.navParams.get('home');
    // }
    this._authorizeService = authorizeService;
    this._cookieService = cookieService;
  }

  ngOnInit() {
  //  this.route
  //     .queryParams
  //     .subscribe(params => {
  //       // Defaults to 0 if no query param provided.
  //       this.userName = params['email'];
  //       this.password = params['password'];
  //     });
   }

  login() {
    this.isCorrectPas = true;
    this._authorizeService.getUsers().subscribe(
      resp => {
        console.log(resp);
        let objs = JSON.parse(resp._body);
        const user =objs.find(x=>x.email === this.userName);
        if(user){
          if(user.password === this.password){
            this._cookieService.set("access_token", "true")
            this._cookieService.set("access_token_admin", "true")
            this.navParams.get('home');
            //this.router.navigate(['home'])
            return
          }
        }
        this.isCorrectPas = false;        
      },
      error => {
        console.log('oops', error)
      }      
    );
  }
}
