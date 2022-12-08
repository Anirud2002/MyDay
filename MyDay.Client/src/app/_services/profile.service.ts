import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Info } from '../_interfaces/info.modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = "https://localhost:5001/api/";
  constructor(private http: HttpClient) { }

  async saveInfo(info: Info){
      return this.http.post(`${this.baseUrl}/api/info`, info);
  }
}
