import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ToastController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import firebase from "firebase";
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '../../../node_modules/@angular/forms';
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
  bio;
  role;
  city;
  gender;
  profileObj = {};
  id;

  constructor(public navCtrl: NavController, public navParams: NavParams,   public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserProfilePage');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        this.id = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref("Pic/" +this.id)
          .on(
            "value",
            data => {
              let infor = data.val();
              if(infor != null && infor != ""){
                this.url = infor.url;
              }else{
                console.log("no picture");
                
              }
            },
            error => {
              console.log(error.message);
            }
          );

        console.log(this.id);

        firebase
          .database()
          .ref("Registration/" +this.id)
          .on("value", (data: any) => {
            let userDetails = data.val();

            console.log(userDetails);

            let userID = firebase.auth().currentUser.uid;

            console.log(userID);

            if (userDetails != null && userDetails != "") {
              let obj = {
                id: userID,
                fullname: userDetails.fullname,
                email: userDetails.email,
                bio: userDetails.bio,
                city:userDetails.city,
                gender:userDetails.gender,
              };

              this.arrProfile.push(obj);

              this.fullname = obj.fullname;
              this.email = obj.email;
              this.bio=obj.bio;
              this.city=obj.city;
              this.gender=obj.gender;
             

              console.log(this.fullname);
              console.log(obj);
            } else if (userDetails === null && userDetails === "") {
              console.log("User doesnt exist");
            }
          });

        this.arrProfile = [];
      } else {
        console.log("User has not sign in");
      }
    });
  }

  url =  "../../assets/imgs/user.png";
  insertImage(event: any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  submit(form: NgForm) {
    let userID = firebase.auth().currentUser.uid;
    console.log(form.value.fullname + " " +form.value.email);
    console.log(form.value.bio+" " + " " +form.value.stagename);

    this.fullname=form.value.fullname ;
    this.email=form.value.email;
    this.bio=form.value.bio;
    this.city=form.value.city;
    this.gender=form.value.gender;
  

    // if(this.fullname!=null && this.fullname!=""&& this.email!=null && this.email!="" && this.bio!=null && this.bio!="" &&this.city!=null && this.city!="")
    // {
    //       this.role="Dj"
    // }
    // else{
    //   this.role="Audience"
    // }


    let obj = {
      fullname: form.value.fullname,
      email: form.value.email,
      bio: form.value.bio,
      city:form.value.city,
      gender:this.gender,
     

    };
    firebase
    .database()
    .ref("Pic/" + userID)
    .set({
      url:this.url
    });

    this.arrProfile.push(obj);

 


    this.db.update(userID, obj);

    //firebase.database().ref('Registration/'+userID).update(obj);

    let user = firebase.auth().currentUser;
    user
      .updateEmail(obj.email)
      .then(() => {
        // Update successful.
        const toast = this.toastCtrl.create({
          message: 'Information Successfuly Saved',
          duration: 2000
        });

        toast.present();
        // this.navCtrl.popToRoot();
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });

      this.navCtrl.pop();
      
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
