function passwordMatchValidator(g: UntypedFormGroup) {
  return g.get('registerPassword').value === g.get('registerPassword_confirmation').value
    ? null : {'mismatch': true};
}

function hasNoErrors(g: UntypedFormGroup) {
  for (const [formControlName, formControl] of Object.entries(g.controls)) {
    if (formControl.errors){
      console.log('this is what i think is error', formControl.errors);
      return {'hasAnyError': true};
    }
  }
  return null;
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { Router } from "@angular/router";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})

export class CredentialsComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  public showRegisterForm: boolean = false;
  public showLoginPassword: boolean = false;
  public showRegisterPassword: boolean = false;
  public showRegisterConfirmPassword: boolean = false;
  public showSplash: boolean = true;
  public hasFamily: boolean = false;

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
  public loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(6),
        Validators.pattern(this.emailRegexpPatern)],
        // updateOn: 'blur'
    }),

    password: new UntypedFormControl('', {
      validators: [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegexpPatter)],
    })
  });


  /**
   * create reactive register form
   */
  public registerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),

    dob: new UntypedFormControl('', {
      validators: [Validators.required],
    }),

    email: new UntypedFormControl('', {
      validators: [Validators.required, Validators.email, Validators.minLength(6),
        Validators.pattern(this.emailRegexpPatern)],
      // updateOn: 'blur'
    }),

    registerPassword: new UntypedFormControl('', {
      validators: [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegexpPatter)],
    }),

    code: new UntypedFormControl(''),

    registerPassword_confirmation: new UntypedFormControl('', {
      validators: [Validators.required]
    }),

    familyCodeControl: new UntypedFormControl(''),
    household: new UntypedFormControl(''),
  }, { validators: [passwordMatchValidator, hasNoErrors], updateOn: 'change'});

  ngOnInit() {
    this.initSplash();
    this.initFamilyCodeClearer();
  }

  private initFamilyCodeClearer(): void {
    this.registerForm.controls.familyCodeControl.valueChanges.subscribe(value => {
      this.hasFamily = value;
      if (this.hasFamily === true) {
        this.registerForm.controls.code.setValidators(this.noWhitespaceValidator);
      } else {
        this.registerForm.get('code').reset();
        this.registerForm.get('code').clearValidators();
        this.registerForm.get('code').clearAsyncValidators();
        this.registerForm.get('code').updateValueAndValidity();
      }
    });
  }

  private initSplash(): void {
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }

  private clearLoginForm(): void {
    this.loginForm.setValue({
      email: '',
      password: ''
    });

    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
  }

  private clearRegisterForm(): void {
    this.registerForm.setValue({
      name: '',
      dob: '',
      email: '',
      registerPassword: '',
      registerPassword_confirmation: '',
      code: '',
      familyCodeControl: '',
      household: ''
    });

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }

  private clearForms(): void {
    this.clearLoginForm();
    this.clearRegisterForm();
  }

  public onLoginSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe((data) => {
      this.authService.setAuthenticatedUser(this.authService.buildUserData(data));
      this.router.navigate(['/dashboard']);
    });
  }

  public onRegisterSubmit(): void {
    if (this.registerForm.errors){
      alert('Please complete the form with correct values');
    } else {
      this.authService.register(this.registerForm.value).subscribe((data) => {
        this.authService.setAuthenticatedUser(this.authService.buildUserData(data));
        this.router.navigate(['/dashboard']);
      });
    }
  }

  public toggleShowLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  public toggleShowRegisterPassword(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  public toggleShowRegisterConfirmPassword(): void {
    this.showRegisterConfirmPassword = !this.showRegisterConfirmPassword;
  }

  /**
   * based on the value of this.<loginOrRegister>Password returns the input type to be text or password.
   * to show either dots or textual password in the frontend
   * @param loginOrRegister string should be either 'login' or 'register'
   */
  public credentialsFieldTypeResolver(pwdIdentifier: string): string {
    return this['show' + pwdIdentifier + 'Password']
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

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
