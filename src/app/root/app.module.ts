import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { PageComponent } from './containers/page/page.component';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { PopupComponent } from './components/popup/popup.component';
import { OverflowTooltipDirective } from './directive/overflow-tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PopupComponent,
    OverflowTooltipDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    OverflowTooltipDirective
  ],
  providers: [
    AuthService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
