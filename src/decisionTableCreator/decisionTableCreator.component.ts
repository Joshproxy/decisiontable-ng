import { Component, Input } from '@angular/core';

import { DecisionTableData } from '../models/DecisionTableData';
import { IDecisionVariable } from '../models/IDecisionVariable/DecisionVariable';
import { DecisionVariableBoolean } from '../models/IDecisionVariable/DecisionVariableBoolean';
import { VariableType } from '../models/VariableType';

@Component({
  selector: 'app-decision-table-creator',
  templateUrl: './decisionTableCreator.component.html',
  styleUrls: ['./decisionTableCreator.component.css']
})
export class DecisionTableCreatorComponent {
  data: DecisionTableData;
  readonly variableType = VariableType;
  constructor() {
    this.data = new DecisionTableData();
  }

  onVariableChange(changedVariable: IDecisionVariable) {
    this.data.changeVariable(changedVariable);
  }

  onVariableTypeChange(changedVariable: IDecisionVariable) {
    this.data.changeVariable(changedVariable, true);
  }

  onVariableRemoved(id: number) {
    this.data.removeVariable(id);
  }

  toggleColumn(columnIndex: number) {
    this.data.toggleColumnVisibility(columnIndex);
  }
}
