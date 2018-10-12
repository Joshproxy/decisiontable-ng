import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DecisionVariable, IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
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

  public modifyVariableType = (newType: VariableType): IDecisionVariable => {
    let newVariableType: IDecisionVariable;

    switch (newType) {
      case VariableType.BOOLEAN:
        newVariableType = new DecisionVariableBoolean(
          this._variable.id,
          this._variable.name
        );
        break;
      case VariableType.STRING:
        newVariableType = new DecisionVariableString(
          this._variable.id,
          this._variable.name,
          ''
        );
        break;
      case VariableType.NUMBER:
        newVariableType = new DecisionVariableNumber(
          this._variable.id,
          this._variable.name,
          1
        );
        break;
      case VariableType.NUMBER_RANGE:
        newVariableType = new DecisionVariableNumberRange(
          this._variable.id,
          this._variable.name
        );
        break;
      default:
        newVariableType = new DecisionVariableBoolean(
          this._variable.id,
          this._variable.name
        );
    }
    return newVariableType;
  }

  onChange() {
    this._variable.updateBoundaries();
    this.changed.emit(this._variable);
  }

 changeVariableType = (newTypeValue: string) => {
    const newType = parseInt(newTypeValue, 10) as VariableType;
    this._variable = this.modifyVariableType(newType);
    this.onChange();
  }

  remove() {
    this.removed.emit(this._variable.id);
  }
}
