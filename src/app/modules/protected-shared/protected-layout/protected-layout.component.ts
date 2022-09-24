import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenManagerService } from 'src/app/services/auth-token-manager.service';

@Component({
  selector: 'app-protected-layout',
  templateUrl: './protected-layout.component.html',
  styleUrls: ['./protected-layout.component.scss']
})
export class ProtectedLayoutComponent implements OnInit {

  constructor(
    private readonly authTokenManager: AuthTokenManagerService, 
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authTokenManager.dropToken()
    this.router.navigate([''])
  }
}
