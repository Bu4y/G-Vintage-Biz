import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthenService, SignupModel  } from "@ngcommerce/core";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user:any= {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public service : AuthenService,public loadingCtrl: LoadingController) {
   this.user =  this.navParams.data; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    let newUser = this.user;
    newUser.firstName = this.user.first_name;
    newUser.lastName = this.user.last_name;

    // alert(JSON.stringify(newUser));
    let loading = this.loadingCtrl.create();
    loading.present();
    this.service.signUp(newUser).then(data=>{
     // alert(JSON.stringify(data));
     loading.dismiss();
      this.navCtrl.pop();
    }).catch(e=>{
      loading.dismiss();
      alert("<pre>"+JSON.stringify(e));
    });


  }

}
