import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ToastController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import firebase from "firebase";
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '../../../node_modules/@angular/forms';
import { CatergoriesPage } from '../catergories/catergories';
/**
 * Generated class for the EditUserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user-profile',
  templateUrl: 'edit-user-profile.html',
})
export class EditUserProfilePage {

  arrProfile = new Array();
  fullname;
  email;
  pic;
  genre;
  bio;
  stagename;
  g;
  role;
  city;
  payment;
  price;
  rate;
  gender;
  id;
  url= "../../assets/imgs/user.png";
  profileObj = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {

  }
  ionViewDidLoad(){
    console.log("ViewLoad");
    
    this.id = firebase.auth().currentUser.uid;
    firebase.database().ref('Registration/'+this.id).on("value",data=>{
      console.log(data.val());
      let infor = data.val();
      this.fullname = infor.fullname;
      this.stagename = infor.stagename;
      this.city= infor.city;
      this.price=infor.price;
      this.payment = infor.payment;
      this.bio = infor.bio;
      this.genre=infor.genre;
      this.gender= infor.gender;
       this.email = infor.email
       this.role = infor.role 

    })

    firebase.database().ref("Pic/" + this.id).on('value',data=>{
      let picInfor = data.val();
      console.log(picInfor.url);
      if ( picInfor != null &&  picInfor != "") {
        this.url =  picInfor.url;
      } else {
      }
    })



  }
  insertImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit(form:NgForm){

    const loader = this.loadingCtrl.create({
      content: "Saving Information...",
    
    });
    loader.present();

    firebase.database().ref('Registration/'+this.id).update({
      fullname: form.value.fullname,
      email: form.value.email,
      bio: form.value.bio,
      city: form.value.city,
      gender: form.value.gender,
   
    })
    firebase
    .database()
    .ref("Pic/" + this.id)
    .set({
      url: this.url
    })
 
    loader.dismiss();
    
      



  }
  remove(){
    this.url= "../../assets/imgs/user.png";
    firebase
    .database()
    .ref("Pic/" + this.id)
    .set({
      url: this.url
    })
  }

}
