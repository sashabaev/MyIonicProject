import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomeComponent } from '../pages/home/home.component';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { CartService } from '../services/cartService';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from '../pages/register/register.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthorizeService } from '../services/AuthorizeService';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RepeatPasswordEStateMatcher } from '../services/validators';
import { ShoppingListComponent } from '../pages/shopping-list/shopping-list.component';


@NgModule({
  declarations: [    
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomeComponent,
    RegisterComponent,   
    LoginComponent,
    ShoppingListComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,   
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ShoppingListComponent
  ],
  providers: [
    CookieService,
    CartService,
    AuthorizeService,
    Validators,
    RepeatPasswordEStateMatcher,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
