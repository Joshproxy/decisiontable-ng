import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DecisionTableData } from '../models/DecisionTableData';
import { VariableType } from '../models/VariableType';

@Component({
  selector: 'app-decision-table',
  templateUrl: './decisionTable.component.html',
  styleUrls: ['./decisionTable.component.css']
})
export class DecisionTableComponent {
  private _data: DecisionTableData;
  readonly variableType = VariableType;
  @Output()
  toggleColumnVisibility = new EventEmitter<number>();
  constructor() {}

  @Input()
  set data(value: DecisionTableData) {
    this._data = value;
  }

  get data(): DecisionTableData {
    return this._data;
  }

  toggleColumn(index: number) {
    this.toggleColumnVisibility.emit(index);
  }

  columnClassName(columnIndex: number, outcome: boolean): string {
    let c = outcome ? 'trueValue' : 'falseValue';
    c = c + (this.data.columnsVisible[columnIndex] ? '' : ' column-hidden');
    return c;
  }

  get results(): boolean[] {
    const results: boolean[] = [];
    for (let c = 0; c < this.data.columnCount; c++) {
      let result = true;
      for (let r = 0; r < this.data.decisionVariables.length; r++) {
        if (!this.data.matrix[r][c].outcome) {
          result = false;
          break;
        }
      }
      results.push(result);
    }
    return results;
  }
}
