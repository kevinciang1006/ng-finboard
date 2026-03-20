import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/user`;

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }

  /** PATCH partial user fields (profile + preferences). */
  updateUser(updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(this.baseUrl, updates);
  }
}
