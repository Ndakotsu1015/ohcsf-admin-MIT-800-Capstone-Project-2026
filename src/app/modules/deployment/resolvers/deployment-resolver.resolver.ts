import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';



export const deploymentResolverResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};

export class DeploymentResolverResolver implements Resolve<boolean> {
  constructor(private readonly deploymentEndpoint: DeploymentEndpoint) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('Called Deployment...', route);
    return of(true).pipe(
      catchError((error) => {
        console.error('Failed to load deployment data.', error);
        return of(false);
      })
    );
  }
}
