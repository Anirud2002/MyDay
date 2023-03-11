import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Info } from '../_interfaces/info.modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = "https://localhost:5001/api/";
  private profilePicUpdated: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  async saveInfo(info: Info){
      return this.http.post(`${this.baseUrl}profile`, info).pipe(map(user => {
        return user;
      }));
  }

  async deleteProfilePic(publicID: string){
    return this.http.delete(`${this.baseUrl}profile/delete-profile-pic/${publicID}`).toPromise();
  }

  updateProfilePic(profilePic: any){
    this.profilePicUpdated.next(profilePic);
  }

  public get profilePicUpdated$(){
    return this.profilePicUpdated.asObservable();
  }
}
