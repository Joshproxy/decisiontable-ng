import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableBoolean extends DecisionVariable<boolean> {
    public updateBoundaries(): void {
        const list: IBoundary[] = [];
        list.push(
            { value: 'T', outcome: true },
            { value: 'F', outcome: false }
        );
        this.boundaries = list;
    }
    constructor(index: number, name: string) {
        super(index, name, VariableType.BOOLEAN, true);
    }
}
