import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { User } from '../../models/user';
import { Positions } from '../../models/positions';
import { TokenResponse } from '../../models/token';
import { AuthPayload, AuthResponse } from '../../models/auth';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  // Sends a request to the server to register a new user.
  public registerUser(requestBody: AuthPayload): Observable<AuthResponse> {
    const token = this.localStorageService.get('token');
    const formData = new FormData();
    formData.append('email', requestBody.email);
    formData.append('name', requestBody.name);
    formData.append('phone', requestBody.phone);
    formData.append('position_id', requestBody.position);
    formData.append('photo', requestBody.file);
    return this.http.post<AuthResponse>('api/v1/users', formData, {
      headers: { Token: token }
    });
  }

  public getToken(): Observable<TokenResponse> {
    return this.http.get<TokenResponse>(`api/v1/token`);
  }

  public getUser(pageNumber): Observable<User> {
    return this.http.get<User>(`api/v1/users?page=${pageNumber}&count=6`);
  }

  public getPositions(): Observable<Positions> {
    return this.http.get<Positions>(`api/v1/positions`);
  }
}
