import { CreateshopPage } from '../createshop/createshop';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { ShopService,ShopModel,ShopListModel} from '@ngcommerce/core';


/**
 * Generated class for the ListshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listshop',
  templateUrl: 'listshop.html',
})
export class ListshopPage {
  shop = {} as ShopListModel;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,public shopService:ShopService,public modalControl : ModalController ) {
     this.getShop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListshopPage');
    
  }
  getShop(){
    this.shopService.getShopListByUser().then(data =>{
      this.shop.items = data;
    });
  }
  createShopModal(){
  let shopModal = this.modalControl.create(CreateshopPage);
  shopModal.onDidDismiss(data =>{

  });
  shopModal.present();

  }

}
