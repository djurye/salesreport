import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{
  hide = signal(true);
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor (private router: Router, private userService: UserService) {
  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required]),
    });
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = this.loginForm.value;
    this.userService.getUserByUsername(loginData.username).subscribe({
      next: (user) => {
        if (user && loginData.password === user.password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Username or password is incorrect';
        }
      },
      error: (err) => {
        console.error('Error fetching user', err);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    });
  }
}
