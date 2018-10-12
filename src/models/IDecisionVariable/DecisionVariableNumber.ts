import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableNumber extends DecisionVariable<number> {
  public updateBoundaries(): void {
    const list: IBoundary[] = [];
    list.push(
      { value: this.trueValue.toString(), outcome: true },
      { value: '!' + this.trueValue.toString(), outcome: false }
    );
    this.boundaries = list;
  }

  constructor(index: number, name: string, trueValue: number) {
    super(
      index,
      name,
      VariableType.NUMBER,
      trueValue
    );
  }
}
