import { Component, OnInit, Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({providedIn: "root"})
export class AppComponent implements OnInit {
  public showComponent:boolean=true;
  public navabaraction:String;
  public loginon:boolean=false;
  route: string;
  ngOnInit(): void {
    console.log(this.router.url)
   //if(this.url==="/")
  }
  title = 'Octopus';
constructor(private authService:AuthentificationService,private router:Router,location: Location){
  
//this just for the navabar display
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
       
        if (this.route == "/register" || this.route == "/login") {
          this.showComponent = false
          
        
          }
          else {
            this.showComponent =true;
          }
      } 
    });

  if (authService.isAuthan()) {
    this.router.navigate(['/login']);
}

}
  public isAdmin(){
    this.authService.isAdmin();
    
  }
  
  public isAuthenticd()
  {
    return this.authService.isAuthan();
  }
  public Ajouter()
  {
    
    this.navabaraction="Ajouter";
    this.router.navigate(['/gestion-users']);
  }
  public Consulter()
  {
    
this.navabaraction="Editer";
this.router.navigate(['/gestion-users']);

  }
 public Deconnecter()
 {
  this.router.navigate(['/']);
 }
}
