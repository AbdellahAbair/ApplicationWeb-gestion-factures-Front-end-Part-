import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthentificationService } from '../authentification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { sha256, sha224 } from 'js-sha256';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    confirmedpassword:new FormControl(''),
    listes:new FormControl('')
    
  });
  public cat:any;
  public erreur:String;
  public user:any;
   public ur;
   public host:String="http://localhost:8095"
  constructor(private x:AppComponent,private authserv:AuthentificationService,private router:Router,private http:HttpClient) { 
    
  
  }
  getData(url){
    
    console.log("2"+url)
    this.authserv.getallcenters(url).subscribe(res => { 
      console.log("3"+url)
      this.user=res;
      console.log(this.user)
    },err => {
       console.log("err");
      } 
    );
    
}

  ngOnInit() {
    let i=0;
    let arraylist;
    this.authserv.loadtoken();
    console.log(this.authserv.jwt)
 let url=this.host+"/centreLists";
 //console.log(this.list)
  
    this.authserv.getallcenters(url).subscribe(data=>{
      let y:any=data;
      let url=this.host+"/centreLists?page=0&size="+y.page.totalElements;
      console.log(url)
      this.getData(url);
      })


 // console.log(x);
    
/*

    this.authserv.getallcenters(url).subscribe(data=>{
    this.user=data;  
    //console.log(this.user) 
    //console.log(this.user._links.next);
    url=this.user._links.next
    return url;
    
    })*/
//console.log(url)
  /*  this.http.get(url)
      .pipe(
        map(heroes => {
          console.log(heroes[0]) // returns a {0|1} element array
        })
      );
  */
    
  }
  onRegister(data)
  {

//var CryptoJS = require("crypto-js");
let url=this.authserv.host+"/appUsers";
//console.log(data.username);
console.log(data.listes)

//var ciphertext = CryptoJS.AES.encrypt('Abdo', 'abdo6957884').toString();

//var bytes  = CryptoJS.AES.decrypt(ciphertext, 'abdo6957884');
//var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
//console.log(originalText); 
var op=sha256.hmac('Bearer ', '1234');
console.log(op)
if(data.username=="")
{console.log(null)
  this.erreur="Please enter the name?";
  return 0;
}
if(data.password=="")
{
  this.erreur="Please enter the password?";
  return 0;
}



this.authserv.getallusers().subscribe(x=>{
this.cat=x;   
for(let i=0;i<this.cat._embedded.appUsers.length;i++)
{
  if(this.cat._embedded.appUsers[i].username===data.username)
   {
    this.erreur="This user "+data.username+" is exists please choose another username";
    //console.log(this.erreur);
    
   }
  }
  if(!this.erreur)
  {
    //data.password=CryptoJS.AES.encrypt(data.password, 'abdo6957884').toString();
    //var bytes  = CryptoJS.AES.decrypt(data.password, 'abdo6957884');
    //var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
   // console.log(originalText); 
//data.password=op;
    
    this.authserv.saveUser(data).subscribe(data=>{  
      console.log(data);
  
      this.router.navigate(['/acceuill']);
    },err=>{
      console.log(err);
    })
  }
})

//console.log(this.cat._embedded.appUsers[0].username)
/*for(let i=0;i<this.cat._embedded.appUsers.length;i++)
{
  if(this.cat._embedded.appUsers[i].username===data.username)
   {
    this.erreur="This user "+data.username+" is exists please choose another username";
    //console.log(this.erreur);
    return 0;
   }
  }
  if(!this.erreur)
  {
    this.authserv.putusers(url,data).subscribe(data=>{  
      console.log(data);
       this.x.showNav=false;
      this.router.navigate(['/acceuill']);
    },err=>{
      console.log(err);
    })
  }*/
  } 
   public cli()
 {
   this.erreur="";
 }

}
