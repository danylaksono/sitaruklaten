import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})


@NgModule({
  imports: [
    MaterialModule

  ]
})

export class SidenavListComponent implements OnInit {

  element: HTMLElement;
  isExpanded = false;

  isLoggedIn : Observable<boolean>;
  
 

  constructor(
    private auth: AuthService
  ) { 
    this.isLoggedIn = auth.isLoggedIn();
  }

  printEvent(event){
    console.log(event);
  }

  toggleActive(event:any){
    //console.log(this.isExpanded);
    //debugger;
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "white";
    } 
    var target = event.currentTarget;
    target.style.backgroundColor = "lightblue";
    this.element = target;
  }

  ngOnInit() {
    
  }

}
