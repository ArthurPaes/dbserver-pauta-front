import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { NewPautaModalComponent } from './new-pauta-modal/new-pauta-modal.component';
import { PautasListComponent } from './pautas-list/pautas-list.component';
import { PautasListModule } from './pautas-list/pautas-list.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { VotingModalComponent } from './voting-modal/voting-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    PautasListComponent,
    LoginComponent,
    SignUpComponent,
    VotingModalComponent,
    NewPautaModalComponent,
  ],
  imports: [
    LoginModule,
    SignUpModule,
    PautasListModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-left',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
