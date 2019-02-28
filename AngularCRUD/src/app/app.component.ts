import { Component, OnInit } from '@angular/core';  
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import {CommonService} from './common.service';  
   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
    
     
  constructor(private newService :CommonService,) {   }  
   Repdata;   
   valbutton ="Save";  
   isavailable;
   NotificationAlert;
ngOnInit() {    
  this.newService.getuser().subscribe(data =>  this.Repdata = data)  
  console.log(this.Repdata);
}  
  
onSave = function(user,isValid: boolean) {    
 user.mode= this.valbutton;  
  this.newService.saveuser(user)  
  .subscribe(data =>  { this.NotificationAlert=data.data;  
       
    this.ngOnInit();    
  },error => this.errorMessage = error )  
    
}      
edit = function(kk) { 

this.id = kk._id;  
this.name= kk.name;  
this.country= kk.country;  
this.valbutton ="Update";  
this.isavailable=true;
this.NotificationAlert=""
}  
  
delete = function(id) {  
this.newService.deleteuser(id)  
.subscribe(data =>   { this.NotificationAlert=data.data ; this.ngOnInit();}, error => this.errorMessage = error )   
}  
  
addData=function(event){
  
    this.isavailable=false;
    this.valbutton="Save";   
}
}  