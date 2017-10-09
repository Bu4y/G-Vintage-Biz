import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CorService, OrderModel, OrderService } from "@ngcommerce/core";
/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.items = this.navParams.data;
    loading.dismiss();
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  showPrompt(order_id, item_id) {
    let prompt = this.alertCtrl.create({
      title: 'Ref. ID',
      message: "Please Enter Your Ref. ID",
      inputs: [
        {
          name: 'refid',
          placeholder: 'Ref. ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.orderService.updateItemToSent(order_id, item_id).then((data) => {
              loading.dismiss();
              this.navCtrl.pop();
            }, (err) => {
              loading.dismiss();
              alert(err);
            });
          }
        }
      ]
    });
    prompt.present();
  }
  updateStatus(item) {
    let loading = this.loadingCtrl.create();
    loading.present();
    if (item.status == "waiting") {
      this.orderService.updateItemToAccept(item.order_id, item.item_id).then((data) => {
        loading.dismiss();
        this.navCtrl.pop();
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
    } else if (item.status == "accept") {
      loading.dismiss();
      
      this.showPrompt(item.order_id, item.item_id);

    } else if (item.status == "sent") {
      this.orderService.updateItemToComplete(item.order_id, item.item_id).then((data) => {
        loading.dismiss();
        this.navCtrl.pop();
      }, (err) => {
        loading.dismiss();
        alert(err);
      })
    } else if (item.status == "return") {

    }

  }

  updateStatusReject(item) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.orderService.updateItemToReject(item.order_id, item.item_id).then((data) => {
      loading.dismiss();      
      this.navCtrl.pop();
    }, (err) => {
      loading.dismiss();      
      alert(err);
    })

  }


}
