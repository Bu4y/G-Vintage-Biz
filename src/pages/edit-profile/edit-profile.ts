import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel, AuthenService } from "@ngcommerce/core";


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  editProfile = {} as UserModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authenService: AuthenService, public alertCtrl: AlertController) {
    this.editProfile = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
    console.log(this.editProfile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  editAccount() {
    // this.editProfile
    this.authenService.updateUser(this.editProfile).then((resp) => {
      window.localStorage.setItem('jjuserbuyer', JSON.stringify(resp));
      this.navCtrl.pop();
    }, (error) => {
      console.error(error);
    });

  }
  changePassword() {
    let prompt = this.alertCtrl.create({
      title: 'Change Password',
      message: "Enter a New Password",
      inputs: [
        {
          name: 'currentPassword',
          placeholder: 'Old Password',
          type: 'password',
        },
        {
          name: 'newPassword',
          placeholder: 'New Password',
          type: 'password',
        }, {
          name: 'verifyPassword',
          placeholder: 'Confirm Password',
          type: 'password',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.authenService.changePassword(data).then((resp) => {
              console.log(resp);
            }, (error) => {
              console.error(error);
            });
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}