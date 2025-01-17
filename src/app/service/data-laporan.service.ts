import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DataLaporanService {


  public daftarLaporan: any = [];


  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getLaporan(): Observable<any[]> {
    var token = this.cookie.get('currentUser');
    let params = new HttpParams().set('access_token', token);

    //const authUrl='http://103.108.187.217/api/penggunas/login';
    return this.http.get<any[]>("http://103.108.187.217/api/laporans", { params })
      //.subscribe((res) => {
      .pipe(
        tap(data => {
          this.daftarLaporan = data;
          //console.log(data);
        })
      )

  }

}
