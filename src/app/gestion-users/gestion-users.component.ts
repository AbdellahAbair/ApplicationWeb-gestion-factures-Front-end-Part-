import { Component, OnInit} from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent implements OnInit {


  public action:String;
  public users:any;
  constructor(private auth:AuthentificationService) { }

  ngOnInit(): void {
    this.action="Ajouter";
   /* this.auth.getallusers().subscribe(data=>{
      this.users=data;
      console.log(this.users)
      
         }
         )
        */
       this.auth.getallusers().subscribe({
        next(x) { console.log('data: ', x); 
      this.users=x;
      },
        error(err) { console.log('errors already caught... will not run'); }
      });


      
  }
  Consulter()
  {
    console.log("Editer")
    this.action="Editer";
    
  }
  Ajouter()
  {
    console.log("Ajouter")
    this.action="Ajouter";
    
  }
  
  

 
}
