import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { UserProfilePage } from '../user-profile/user-profile';

/**
 * Generated class for the InstructionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instruction',
  templateUrl: 'instruction.html',
})
export class InstructionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstructionPage');
  }
  ready(){
    this.navCtrl.push(EditPage);
    this.viewCtrl.dismiss();
  }
  back(){
    this.navCtrl.push(UserProfilePage).then
    
  }

}
