import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from "firebase";
import { NgForm } from '../../../node_modules/@angular/forms';
import { CatergoriesPage } from '../catergories/catergories';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

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

    if(form.value.price >= 1  && form.value.price <=5000){

    firebase.database().ref('Registration/'+this.id).update({
      fullname: form.value.fullname,
      email: form.value.email,
      stagename: form.value.stagename,
      bio: form.value.bio,
      city: form.value.city,
      genre: form.value.genre,
      role: "Dj",
      price:form.value.price,
      gender: form.value.gender,
      payment:form.value.payment
    })
    firebase
    .database()
    .ref("Pic/" + this.id)
    .set({
      url: this.url
    })
   
   
    
      this.navCtrl.popTo(ProfilePage);

  }else{
    const prompt = this.alertCtrl.create({
      title: 'Caution',
      message: "The amount you have entered cannot be greater than R5000.00",
      buttons: [
        {
          text: 'OK',
          handler: data => {

            console.log('price');
            console.log(form.value.price);
            form.value.price = 0;
            console.log(form.value.price);
          }
        },
      ]
    });
    prompt.present();
  }
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