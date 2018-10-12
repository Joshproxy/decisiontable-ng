import { IBoundary } from '../IBoundary';
import { VariableType } from '../VariableType';
import { DecisionVariable } from './DecisionVariable';

export class DecisionVariableString extends DecisionVariable<string> {
    public updateBoundaries(): void {
        const list: IBoundary[] = [];
        list.push(
            { value: '\'' + this.trueValue + '\'', outcome: true },
            { value: '\'!' + this.trueValue + '\'', outcome: false }
        );
        this.boundaries = list;
    }

    constructor(index: number, name: string, trueValue: string) {
        super(index, name, VariableType.STRING, trueValue);
    }
}
