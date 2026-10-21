import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../store/app.state";
import { authSelectAccessToken } from "../../store/auth/auth.selectors";
import { environment } from "src/environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private access_token: string | null = null;

  constructor(private readonly appStore: Store<AppState>) {
    this.appStore.select(authSelectAccessToken)
      .subscribe({
        next: (access_token) => {
          this.access_token = access_token;
        }
      })
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestUrl = `${environment.apiUrl}`;
    const isApiUrl = req.url.startsWith(requestUrl);
    const access_token = this.access_token;
    if (isApiUrl && access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        },
      });
    }
    return next.handle(req)
  }
}
