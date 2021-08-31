import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice-login',
  templateUrl: './backoffice-login.component.html',
  styleUrls: ['./backoffice-login.component.scss']
})
export class BackofficeLoginComponent implements OnInit {

  loginForm: FormGroup;
  alert: boolean;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(undefined, [Validators.required]),
      password: new FormControl(undefined, [Validators.required])
    })
  }

  login() {

    this.adminService.login(this.loginForm.value["username"], this.loginForm.value["password"]).subscribe(
      success => {
        this.alert = false;
        this.router.navigate(['backoffice', "products"])
        return;
      },
      error => { this.alert = true }
    )
  }

}
