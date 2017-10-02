import { NotificationPage } from '../pages/notification/notification';
import { ProductPage } from '../pages/product/product';
import { OrderPage } from '../pages/order/order';
import { AccountPage } from '../pages/account/account';
import { RegisterPage } from './../pages/register/register';
import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { HttpModule } from "@angular/http";

import { EcommerceCoreModule} from "@ngcommerce/core";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    OrderPage,
    ProductPage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    EcommerceCoreModule.forRoot('https://greenvintage-v2.herokuapp.com/api/')
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    OrderPage,
    ProductPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    Facebook,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
