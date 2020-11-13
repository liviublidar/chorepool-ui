import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})

export class CredentialsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  public showRegisterForm: boolean = false;
  public showLoginPassword: boolean = false;
  public showRegisterPassword: boolean = false;
  public showSplash: boolean = true;

  /**
   * patter that validates email to be in the correct format
   */
  private emailRegexpPatern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * pattern that validates password to have numbers, uppercase, lowercase and special characters
   */
  private passwordRegexpPatter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  /**
   * create the reactive login form
   */
  public loginForm = new FormGroup({
    loginEmailControl: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(6),
        Validators.pattern(this.emailRegexpPatern)],
        // updateOn: 'blur'
    }),

    loginPwdControl: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegexpPatter)],
    })
  });

  /**
   * create reactive register form
   */
  public registerForm = new FormGroup({
    registerEmailControl: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(6),
        Validators.pattern(this.emailRegexpPatern)],
        // updateOn: 'blur'
    }),

    registerPwdControl: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegexpPatter)],
    }),
    registerPwdConfirmControl: new FormControl(''),
  });

  ngOnInit() {
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }

  private clearLoginForm(): void {
    this.loginForm.setValue({
      loginEmailControl: '',
      loginPwdControl: ''
    });

    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
  }

  private clearRegisterForm(): void {
    this.registerForm.setValue({
      registerEmailControl: '',
      registerPwdControl: '',
      registerPwdConfirmControl: ''
    });

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }

  private clearForms(): void {
    this.clearLoginForm();
    this.clearRegisterForm();
  }

  public onLoginSubmit(): void {
    console.log('submitting');
  /*     console.log(this.loginForm.get('loginEmailControl').errors); */
    this.authService.login().subscribe((data) => {
      console.log(data);
    });

  }

  public onRegisterSubmit(): void {
    console.log('submitting');
    console.log(this.registerForm.get('registerEmailControl').errors);
  }

  public toggleShowLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  public toggleShowRegisterPassword(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  /**
   * based on the value of this.<loginOrRegister>Password returns the input type to be text or password.
   * to show either dots or textual password in the frontend
   * @param loginOrRegister string should be either 'login' or 'register'
   */
  public credentialsFieldTypeResolver(loginOrRegister: string): string {
    return this['show' + loginOrRegister.charAt(0).toUpperCase() + loginOrRegister.slice(1) + 'Password']
      ? 'text'
      : 'password' ;
  }

  /**
   * translate validator errors to an array of strings that can be displayed to end user
   * @param formControlName name of the formcontrol for which we want errors
   */
  public getFormControlErrors(formControlName: string): string[] {
    const errors: ValidationErrors = this.showRegisterForm
      ? this.registerForm.get(formControlName).errors
      : this.loginForm.get(formControlName).errors;

    if (!errors){
      return [];
    }

    return Object.keys(errors).map((iterableItem: string) => {
      let errorMessage: string;

      switch (iterableItem) {
        case 'email':
          errorMessage = 'You need a valid email address';
          break;

        case 'minlength':
          errorMessage = `You need at least ${errors.minlength.requiredLength} characters`;
          break;

        case 'pattern':
          errorMessage = formControlName.endsWith('EmailControl')
            ? 'An email address has the following format: name@domain.com'
            : 'You need numbers, uppercase, lowercase and special characters';
          break;

        case 'required':
          errorMessage = 'This field is required';
      }
      return errorMessage;
    });
  }

  /**
   * gets the text underneath the forms based on where you are
   */
  public getNotice(): string[] {
    return this.showRegisterForm
      ? ['Already have an account? ', 'Login here']
      : ['Don\'t have an account? ', 'Register here'];
  }

  /**
   * shows login or register forms respectively after clearing them
   * returns void
   */
  public switchBetweenLoginAndRegister(): void {
    this.clearForms();
    this.showRegisterForm = !this.showRegisterForm;
  }
}
