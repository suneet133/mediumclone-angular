import {Component, OnInit} from '@angular/core'
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {registerAction} from '../../store/actions'
import {isSubmittingSelector} from '../../store/selectors'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true
  form!: FormGroup
  isSubmitting$!: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  get registerFormControls() {
    return this.form.controls
  }

  getErrorMessageEmail() {
    if (this.registerFormControls.email.hasError('required')) {
      return 'You must enter a value'
    }

    return this.registerFormControls.email.hasError('email')
      ? 'Not a valid email'
      : ''
  }

  getErrorMessageUsername() {
    if (this.registerFormControls.username.hasError('required')) {
      return 'You must enter a value'
    }

    return this.registerFormControls.username.hasError('minlength')
      ? 'Minimum length is 3 characters'
      : ''
  }

  getErrorMessagePassword() {
    if (this.registerFormControls.password.hasError('required')) {
      return 'You must enter a value'
    }

    return this.registerFormControls.password.hasError('pattern')
      ? 'Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number'
      : ''
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid, this.form.valid)
    this.store.dispatch(registerAction(this.form.value))
  }
}
