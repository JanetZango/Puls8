import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ChatroomPage } from '../chatroom/chatroom';
import firebase from "firebase";
/**
 * Generated class for the ViewBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-booking',
  templateUrl: 'view-booking.html',
})
export class ViewBookingPage{
  bookings;
  fanName;
  fanEmail;
  fanPic;
  fanMsg;
  fanDate;
  fanTime;
  id;
  key;
  city;
  usersKey;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBookingPage');

    this.bookings = this.navParams.get('bookingDetails');
   console.log(this.bookings);

   this.fanName=this.bookings.fanName;
   this.fanEmail=this.bookings.fanEmail;
   this.fanPic=this.bookings.picture;
  // this.fanMsg=this.bookings.fanMsg;
  this.fanDate=this.bookings.fanDate;
  this.fanTime=this.bookings.fanTime;
  this.id=this.bookings.id;
  this.key=this.bookings.key;
  this.city = this.bookings.city;
  this.usersKey=this.bookings.userskey;
  
 
  this.fanMsg="Would like to chat with you, please respond";

  console.log("users key ")
   console.log(this.usersKey);



  }

  back(){
   
  }

  chatroom(){
    //  alert("yes")
    //   firebase.database().ref('inbox/'+this.id).child(this.key).update({
    //     check:true,
    //     date:this.fanDate,
    //     fanEmail:this.fanEmail,
    //     key:this.usersKey,
    //     name:this.fanEmail,
    //     time:this.fanTime,
      
    //   })




      firebase.database().ref('Bookings/'+this.id).child(this.key).set({
        check:true,
        date:this.fanDate,
        fanEmail:this.fanEmail,
        key:this.usersKey,
        name:this.fanEmail,
        time:this.fanTime,
      
      }).then(data=>{
      
      })
      // firebase.database().ref('bookings/'+this.id).child(this.key).update({
      //   check:true
      // })

      console.log(this.usersKey);



     this.navCtrl.push(ChatroomPage,{theuserkey:this.usersKey})

     this.view.dismiss();
      
  }


}
