import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderService,public alertCtrl:AlertController) {
    this.items = this.navParams.data;
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
            this.orderService.updateItemToSent(order_id,item_id).then((data) => {
              this.navCtrl.pop();
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    prompt.present();
  }
  updateStatus(item) {
    if (item.status == "waiting") {
      this.orderService.updateItemToAccept(item.order_id, item.item_id).then((data) => {
        this.navCtrl.pop();
      }, (err) => {
        console.log(err);
      });
    } else if (item.status == "accept") {

      this.showPrompt(item.order_id, item.item_id);

    } else if (item.status == "sent") {
      this.orderService.updateItemToComplete(item.order_id, item.item_id).then((data) => {
        this.navCtrl.pop();
      }, (err) => {
        console.log(err);
      })
    } else if (item.status == "return") {

    }

  }

  updateStatusReject(item) {
    this.orderService.updateItemToReject(item.order_id, item.item_id).then((data) => {
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
    })

  }


}
