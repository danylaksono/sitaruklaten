import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-laman-cek-aduan',
  templateUrl: './laman-cek-aduan.component.html',
  styleUrls: ['./laman-cek-aduan.component.scss']
})
export class LamanCekAduanComponent implements OnInit {

  
  listOfReport:{};

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    console.log(this.cookie.get('currentUser'));
    var token = this.cookie.get('currentUser');
    let params = new HttpParams().set('access_token', token);
    var params2 = params.toString();
    this.http.get("http://localhost:3000/api/laporans", { params })
      .subscribe((res) => {
        console.log(res);
        this.listOfReport = res;
      
      })
      //.pipe(
      //  tap(data => {
      //    console.log(data);
      //  })
      //)
  }

}
