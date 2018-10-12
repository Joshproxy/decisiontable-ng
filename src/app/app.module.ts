import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DecisionTableComponent } from '../decisionTable/decisionTable.component';
import {
    DecisionTableCreatorComponent
} from '../decisionTableCreator/decisionTableCreator.component';
import {
    DecisionTableVariableComponent
} from '../decisionTableVariable/decisionTableVariable.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DecisionTableCreatorComponent,
    DecisionTableVariableComponent,
    DecisionTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
