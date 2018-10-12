import { IBoundary } from './IBoundary';
import { IDecisionVariable } from './IDecisionVariable/DecisionVariable';
import { DecisionVariableBoolean } from './IDecisionVariable/DecisionVariableBoolean';
import { DecisionVariableNumber } from './IDecisionVariable/DecisionVariableNumber';
import { DecisionVariableNumberRange } from './IDecisionVariable/DecisionVariableNumberRange';
import { DecisionVariableString } from './IDecisionVariable/DecisionVariableString';
import { NumberRange } from './NumberRange';
import { VariableType } from './VariableType';

export class DecisionTableData {
  constructor() {
    this._decisionVariables = [];
    this._matrix = [];
    this._columnsVisible = [];
  }

  get decisionVariables(): IDecisionVariable[] {
    return this._decisionVariables;
  }

  get matrix(): IBoundary[][] {
    return this._matrix;
  }

  get columnsVisible(): boolean[] {
    return this._columnsVisible;
  }

  get variableNames(): string[] {
    return this.decisionVariables.map(v => v.name);
  }

  get columnCount(): number {
    let count = 1;
    this.decisionVariables.forEach(v => (count = v.boundaries.length * count));
    return count;
  }
  private _decisionVariables: IDecisionVariable[];
  private _matrix: IBoundary[][];
  private _columnsVisible: boolean[];

  private static changeVariableType = (variable: IDecisionVariable) => {
    let newVariableType: IDecisionVariable;

    switch (variable.type) {
      case VariableType.BOOLEAN:
        newVariableType = new DecisionVariableBoolean(
          variable.id,
          variable.name
        );
        break;
      case VariableType.STRING:
        newVariableType = new DecisionVariableString(
          variable.id,
          variable.name,
          ''
        );
        break;
      case VariableType.NUMBER:
        newVariableType = new DecisionVariableNumber(
          variable.id,
          variable.name,
          1
        );
        break;
      case VariableType.NUMBER_RANGE:
        newVariableType = new DecisionVariableNumberRange(
          variable.id,
          variable.name
        );
        break;
      default:
        newVariableType = new DecisionVariableBoolean(
          variable.id,
          variable.name
        );
    }
    return newVariableType;
  }

  private nextId = () => {
    const vars = this.decisionVariables;
    return vars.length > 0 ? vars[vars.length - 1].id + 1 : 0;
  }

  private updateColumnsVisible = () => {
    this._columnsVisible =
      this._matrix.length > 0 ? this._matrix[0].map(() => true) : [];
  }

  changeVariable(editedVariable: IDecisionVariable, typeChanged: boolean = false) {
    editedVariable.updateBoundaries();
    this._decisionVariables = this._decisionVariables.map(v => {
      if (v.id === editedVariable.id) {
        if (typeChanged) {
          editedVariable = DecisionTableData.changeVariableType(editedVariable);
        }
        return editedVariable;
      } else {
        return v;
      }
    });
    this.updateMatrix();
  }

  addVariable() {
    const newId = this.nextId();
    const newVariable = new DecisionVariableBoolean(
      newId,
      String.fromCharCode('A'.charCodeAt(0) + newId)
    );
    this.decisionVariables.push(newVariable);
    this.updateMatrix();
  }

  removeVariable(variableId: number) {
    const removeIndex = this.decisionVariables.findIndex(
      d => d.id === variableId
    );
    this.decisionVariables.splice(removeIndex, 1);
    this.updateMatrix();
  }

  clear() {
    this._decisionVariables = [];
    this._columnsVisible = [];
    this.updateMatrix();
  }

  toggleColumnVisibility(index: number) {
    this._columnsVisible[index] = !this._columnsVisible[index];
  }

  public updateMatrix() {
    this._matrix = [];

    let powFactor = 1;
    let count = 0;
    this.decisionVariables.forEach((v, ri) => {
      const row: IBoundary[] = [];
      for (let ci = 0; ci < this.columnCount; ci++) {
        const boundaryIndex =
          ri === 0
            ? ci % v.boundaries.length
            : Math.floor(count / powFactor) % v.boundaries.length;
        row.push(v.boundaries[boundaryIndex]);

        count++;
      }
      this._matrix.push(row);
      powFactor = powFactor * v.boundaries.length;
    });
    this.updateColumnsVisible();
  }
}
