import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {MaterialModule} from 'src/app/material/material.module'
import {BackendErrorMessagesComponent} from './components/backendErrorMessages/backendErrorMessages.component'

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
