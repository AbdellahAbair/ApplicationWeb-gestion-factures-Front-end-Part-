import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import {Router, CanActivate} from '@angular/router';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
@Injectable({providedIn: "root"})
export class LoginComponent implements OnInit,CanActivate  {
 

private nom:String;
private mdps:any;
isClicked :boolean= false;
 canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (this.authService.isAuthan) {
    return true;
  }
  this.router.navigate(['/']);
  return false;
}

  constructor(private authService:AuthentificationService,private router :Router,private x:AppComponent) {
   
   }
  public error:any="";
  reactiveForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    
  })
private coller:boolean=false;
  ngOnInit() {
    
  }
  public onLogin()
  {
   let x= this.reactiveForm.get("username").value;
    console.log(x);
 
    this.authService.login(this.reactiveForm.value).subscribe(resp=>{
     //console.log(resp);
     //this.x="abdellah";
     console.log(resp);
 let jwt=resp.headers.get('Authorization');
 
 console.log(jwt);
  this.authService.saveToken(jwt);
  this.error="";
  this.x.loginon=true;
  this.authService.saveToken(jwt)
  
  this.router.navigate(['/acceuill']);
  
},err=>{
      this.error="Password or your username is not correct!"
      console.log(this.error);
     // this.nom="Abdellah";
    // this.mdps="1234";
    this.x.loginon=false;
  return false;
    });
    console.log(this.error);
    //console.log(this.reactiveForm.value.username);
  }
 public cli()
 {
   this.error="";
 }
  public isAdmin(){
    
    let x=this.authService.isAdmin();
    return x;
    
  }
public get(){
 // this.reactiveForm.get("username").setValue("Asbdellah");
  //this.nom=this.reactiveForm.get("password").value;
  //console.log(this.nom);

}
  public isAuthenticd()
  {
    
    return this.authService.isAuthan();
    
  }
  public coupe()
{
  console.log("don't copy");
}
public paste(){
  console.log("don't paste");
  this.coller=true;

  

  
}




}
