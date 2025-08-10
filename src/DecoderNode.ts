import {
    type tTick,
    aNode,
} from './Node';
import {
    type iOutputNode,
} from './LevelNode';
import {
    NotGateNode,
    AndGateNode,
    OrGateNode,
} from './GateNode';

export class Decoder1x2Node extends aNode {
    public readonly outputs: iOutputNode[];

    public get inputEN(): iOutputNode { return this.inputs[0]!; }
    public get inputA(): iOutputNode { return this.inputs[1]!; }
    public get inputData(): [iOutputNode] { return [this.inputA]; }

    public get output0(): iOutputNode { return this.outputs[0]!; }
    public get output1(): iOutputNode { return this.outputs[1]!; }

    constructor(
        private readonly inputs: iOutputNode[],
    ) {
        super();

        const EN = inputs[0]!;
        const A = inputs[1]!;

        const notA = new NotGateNode([A]).output;

        this.outputs = [
            new AndGateNode([EN, notA]).output,
            new AndGateNode([EN, A]).output,
        ];
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}

export class Decoder2x4Node extends aNode {
    public readonly outputs: iOutputNode[];

    public readonly inputEN: iOutputNode;
    public readonly inputA: iOutputNode;
    public readonly inputB: iOutputNode;
    public readonly inputData: [iOutputNode, iOutputNode];

    constructor(
        inputs: iOutputNode[],
    ) {
        super();

        const EN = inputs[0]!;
        const A = inputs[1]!;
        const B = inputs[2]!;

        this.inputEN = EN;
        this.inputA = A;
        this.inputB = B;
        this.inputData = [A, B];

        const notA = new NotGateNode([A]).output;
        const notB = new NotGateNode([B]).output;

        this.outputs = [
            new AndGateNode([EN, notA, notB]).output,
            new AndGateNode([EN, notA, B]).output,
            new AndGateNode([EN, A, notB]).output,
            new AndGateNode([EN, A, B]).output,
        ];
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}

export class DecoderNode extends aNode {
    public readonly outputs: iOutputNode[];

    public readonly inputEN: iOutputNode;
    public readonly inputData: iOutputNode[];

    constructor(
        inputs: iOutputNode[],
    ) {
        super();

        const inputEN = this.inputEN = inputs[0]!;
        const inputData = this.inputData = inputs.slice(1)!;

        const nots = inputData.map((input) => new NotGateNode([input]).output);

        this.outputs = [];
        for (let i = 0; i < (2 ** inputData.length); i++) {
            const bits: iOutputNode[] = [];
            for (let j = 0; j < inputData.length; j++) {
                bits.push((i & (1 << j)) ? inputData[j]! : nots[j]!);
            }
            this.outputs.push(new AndGateNode([inputEN!, ...bits!]).output);
        }
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}

export class Encoder4to2Node extends aNode {
    public readonly outputs: iOutputNode[];

    public readonly inputEN: iOutputNode;
    public readonly inputData: iOutputNode[];

    constructor(
        inputs: iOutputNode[],
    ) {
        super();

        const inputEN = this.inputEN = inputs[0]!;
        const inputData = this.inputData = inputs.slice(1)!;

        const inputD0 = inputData[0]!;
        const inputD1 = inputData[1]!;
        const inputD2 = inputData[2]!;
        const inputD3 = inputData[3]!;

        this.outputs = [
            new OrGateNode([inputD1, inputD3]).output,
            new OrGateNode([inputD2, inputD3]).output,
        ];
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}

export class PriorityEncoder4to2Node extends aNode {
    public readonly outputs: iOutputNode[];

    public readonly inputData: iOutputNode[];
    public readonly inputEN: iOutputNode;
    public readonly inputD0: iOutputNode;
    public readonly inputD1: iOutputNode;
    public readonly inputD2: iOutputNode;
    public readonly inputD3: iOutputNode;

    public readonly output: [iOutputNode, iOutputNode];
    public readonly outputY0: iOutputNode;
    public readonly outputY1: iOutputNode;
    public readonly outputValid: iOutputNode;

    constructor(
        inputs: iOutputNode[],
    ) {
        super();

        const inputEN = this.inputEN = inputs[0]!;
        const inputData = this.inputData = inputs.slice(1);

        const inputD0 = this.inputD0 = inputData[0]!;
        const inputD1 = this.inputD1 = inputData[1]!;
        const inputD2 = this.inputD2 = inputData[2]!;
        const inputD3 = this.inputD3 = inputData[3]!;

        const outputValid = this.outputValid = new OrGateNode([inputD0, inputD1, inputD2, inputD3]).output;
        const outputY1 = this.outputY1 = new OrGateNode([inputD3, inputD2,]).output;
        const outputY0 = this.outputY0 = new OrGateNode([inputD3, new AndGateNode([new NotGateNode([inputD2]).output, inputD1]).output]).output;

        this.output = [outputY0, outputY1];
        this.outputs = [outputY1, outputY0, outputValid];
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}

export class DecimalToBCDNode extends aNode {
    public readonly outputs: iOutputNode[];

    public readonly inputEN: iOutputNode;
    public readonly inputData: iOutputNode[];

    constructor(inputs: iOutputNode[]) {
        super();

        const inputEN = this.inputEN = inputs[0]!;
        const inputData = this.inputData = inputs.slice(1);

        const outs: iOutputNode[][] = [0, 1, 2, 3].map(() => []);
        for (let digit = 0; digit < 10; digit++) {
            const bcd = [
                (digit & 1) !== 0,
                (digit & 2) !== 0,
                (digit & 4) !== 0,
                (digit & 8) !== 0,
            ];
            for (let bit = 0; bit < 4; bit++) {
                if (bcd[bit]) {
                    outs[bit]!.push(
                        new AndGateNode([inputEN, inputData[digit]!]).output
                    );
                }
            }
        }

        this.outputs = outs.map((g) => new OrGateNode(g).output);
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}

export class BCDToDecimalNode extends aNode {
    public readonly outputs: iOutputNode[];

    public readonly inputEN: iOutputNode;
    public readonly inputData: iOutputNode[];

    constructor(inputs: iOutputNode[]) {
        super();

        const inputEN = this.inputEN = inputs[0]!;
        const inputData = this.inputData = inputs.slice(1);

        this.outputs = [];
        for (let digit = 0; digit < 10; digit++) {
            const bcd = [
                (digit & 1) !== 0,
                (digit & 2) !== 0,
                (digit & 4) !== 0,
                (digit & 8) !== 0,
            ];
            const ands: iOutputNode[] = [];
            for (let bit = 0; bit < 4; bit++) {
                if (bcd[bit]) {
                    ands.push(inputData[bit]!);
                } else {
                    ands.push(new NotGateNode([inputData[bit]!]).output);
                }
            }
            this.outputs.push(new AndGateNode([inputEN, ...ands]).output);
        }
    }

    override onUpdate(_prevTick: tTick, t: tTick): void {
        this.outputs.forEach((output) => {
            output.update(t);
        });
    }
}