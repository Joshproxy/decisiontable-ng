import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';

export interface IDecisionVariable {
  name: string;
  type: VariableType;
  trueValue: any;
  boundaries: IBoundary[];
  id: number;
  updateBoundaries: () => void;
}

export abstract class DecisionVariable<T> implements IDecisionVariable {
  public boundaries: IBoundary[];
  constructor(
    public id: number,
    public name: string,
    public type: VariableType,
    public trueValue: T
  ) {
    this.updateBoundaries();
  }
  public abstract updateBoundaries(): void;
}
