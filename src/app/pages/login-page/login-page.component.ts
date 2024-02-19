import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UsuarioResponse } from 'src/app/services/auth/auth.interface';

@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    FormsModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule
  ],
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  submitform(){
    let userPayload = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }

    this.authService.login(userPayload).subscribe({
      next: (res: UsuarioResponse & any) => {
        this.authService.guardarToken(res.token, {
          _id: res._doc._id,
          email: res._doc.email
        });
        this.router.navigate(['home']);
      },
      error: (e) => {},
      complete: () => {}
    });
  }

  get emailInvalido(): boolean {
    return this.loginForm.controls.email.invalid && this.loginForm.controls.email.touched
  }

  get formularioInvalido(): boolean {
    return this.loginForm.invalid;
  }
}
