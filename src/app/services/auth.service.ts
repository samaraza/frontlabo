import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AdminSignUpRequestModel,
  SignInRequestModel,
} from '../models/Request/RequestModel';
import {
  AdminSignUpResponseModel,
  SignInResponseModel,
} from '../models/Response/ResponseModel';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  singUpAdmin(
    payload: AdminSignUpRequestModel
  ): Observable<AdminSignUpResponseModel> {
    console.log(payload);
    return this.http.post<AdminSignUpResponseModel>(
      `${environment.apiUrl}/auth/registerAdmin`,
      payload
    );
  }

  singInAdmin(payload: SignInRequestModel): Observable<SignInResponseModel> {
    console.log(payload);
    return this.http.post<AdminSignUpResponseModel>(
      `${environment.apiUrl}/auth/login`,
      payload
    );
  }
}
