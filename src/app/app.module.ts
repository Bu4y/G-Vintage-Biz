import { CreateshopPage } from '../pages/createshop/createshop';
import { OneSignal } from '@ionic-native/onesignal';
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
import { EcommerceCoreModule, IonSegmentOrderComponent, IonListOrderComponent, IonOrdersComponent, IonDetailOrderComponent, IonFormProfileComponent, IonListProductComponent, IonDetailProductComponent, IonFormProductComponent, IonListShopComponent, IonFormShopComponent, IonUploadImageComponent, IonDetailShopComponent } from "@ngcommerce/core";
import { Ionic2RatingModule } from 'ionic2-rating'
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { ProductDetailPage } from './../pages/product-detail/product-detail';
import { CreatProductPage } from '../pages/creat-product/creat-product';
import { ListshopPage } from '../pages/listshop/listshop';
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { LoadingProvider } from '../providers/loading/loading';
import { IonUploadImagesComponent } from '../components/ion-upload-image/ion-upload-image';
import { ShopDetailPage } from './../pages/shop-detail/shop-detail';
import { MomentPipe } from '../pipes/moment/moment';
import { Dialogs } from "@ionic-native/dialogs";

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
    OrderDetailPage,
    ProductDetailPage,
    NotificationPage,
    CreatProductPage,
    ListshopPage,
    CreateshopPage,
    IonListOrderComponent,
    IonSegmentOrderComponent,
    IonOrdersComponent,
    IonFormProfileComponent,
    IonDetailOrderComponent,
    IonListProductComponent,
    IonDetailProductComponent,
    IonFormProductComponent,
    IonListShopComponent,
    IonFormShopComponent,
    IonUploadImagesComponent,
    IonUploadImageComponent,
    EditProfilePage,
    ShopDetailPage,
    IonDetailShopComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp, {
      SegmentButton: 'segment',
      mode: 'md'
    }),
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
    NotificationPage,
    OrderDetailPage,
    ProductDetailPage,
    CreatProductPage,
    ListshopPage,
    CreateshopPage,
    EditProfilePage,
    ShopDetailPage
  ],
  providers: [
    StatusBar,
    Facebook,
    SplashScreen,
    OneSignal,
    ImagePicker,
    Base64,
    Dialogs,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider
  ]
})
export class AppModule { }
