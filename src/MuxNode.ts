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

export class MuxNode extends aNode {
    public readonly output: iOutputNode;

    public get select(): iOutputNode { return this.inputs[0]; }
    public get dataA(): iOutputNode { return this.inputs[1]; }
    public get dataB(): iOutputNode { return this.inputs[2]; }
    public get dataOut(): iOutputNode { return this.output; }

    constructor(
        private readonly inputs: [iOutputNode, iOutputNode, iOutputNode],
    ) {
        super();

        this.output = new OrGateNode([
            new AndGateNode([
                new NotGateNode([inputs[0]]).output,
                inputs[1],
            ]).output,
            new AndGateNode([
                inputs[0],
                inputs[2],
            ]).output,
        ]).output;
    }

    override onUpdate(t: tTick): void {
        this.output.update(t);
    }
}

export class DemuxNode extends aNode {
    public readonly outputs: [iOutputNode, iOutputNode];

    public get select(): iOutputNode { return this.inputs[0]; }
    public get dataIn(): iOutputNode { return this.inputs[1]; }
    public get dataA(): iOutputNode { return this.outputs[0]; }
    public get dataB(): iOutputNode { return this.outputs[1]; }

    constructor(
        private readonly inputs: [iOutputNode, iOutputNode],
    ) {
        super();

        this.outputs = [
            new AndGateNode([
                new NotGateNode([inputs[0]]).output,
                inputs[1],
            ]).output,
            new AndGateNode([
                inputs[0],
                inputs[1],
            ]).output,
        ];
    }

    override onUpdate(t: tTick): void {
        this.outputs[0].update(t);
        this.outputs[1].update(t);
    }
}