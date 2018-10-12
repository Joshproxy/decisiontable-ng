import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
import { DecisionVariableBoolean } from '../models/IDecisionVariable/DecisionVariableBoolean';
import { DecisionVariableNumber } from '../models/IDecisionVariable/DecisionVariableNumber';
import {
    DecisionVariableNumberRange
} from '../models/IDecisionVariable/DecisionVariableNumberRange';
import { DecisionVariableString } from '../models/IDecisionVariable/DecisionVariableString';
import { VariableType } from '../models/VariableType';

@Component({
  selector: 'app-decision-table-variable',
  templateUrl: './decisionTableVariable.component.html',
  styleUrls: ['./decisionTableVariable.component.css']
})
export class DecisionTableVariableComponent {
  private _variable: IDecisionVariable;
  @Output()
  changed = new EventEmitter<IDecisionVariable>();
  @Output()
  typeChanged = new EventEmitter<IDecisionVariable>();
  @Output()
  removed = new EventEmitter<number>();
  readonly variableType = VariableType;
  constructor() {}

  @Input()
  set variable(value: IDecisionVariable) {
    this._variable = value;
  }

  get variable(): IDecisionVariable {
    return this._variable;
  }

  onChange() {
    this.changed.emit(this._variable);
  }

  changeVariableType = (newTypeValue: string) => {
    const newType = parseInt(newTypeValue, 10) as VariableType;
    this._variable.type = newType;
    this.typeChanged.emit(this._variable);
  }

  remove() {
    this.removed.emit(this._variable.id);
  }
}
