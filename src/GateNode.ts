import {
    Level
} from "./Level";
import {
    type iOutputNode,
    ComputeNode,
} from "./LevelNode";
import {
    type tTick,
    aNode,
} from "./Node";
import {
    type iGateLogic,
    Buffer_GateLogic, Not_GateLogic,
    And_GateLogic, Nand_GateLogic,
    Or_GateLogic, Nor_GateLogic,
    Xor_GateLogic, Xnor_GateLogic,
} from "./GateLogic";

export abstract class aGateNode extends aNode {
    protected abstract readonly gateLogic: iGateLogic;

    private _output: Level = Level.Z;
    public readonly output: iOutputNode = new ComputeNode(this._output, (_prevTick, tick) => {
        this.update(tick);
        return this._output;
    });

    constructor(
        public readonly inputs: iOutputNode[],
    ) { super(); }

    protected override onUpdate(tick: tTick): void {
        const levels = this.inputs.map(input => {
            input.update(tick);
            return input.output;
        });
        this._output = this.gateLogic(levels);
    }
}

export class NotGateNode extends aGateNode {
    protected readonly gateLogic = Not_GateLogic;
}

export class BufferGateNode extends aGateNode {
    protected readonly gateLogic = Buffer_GateLogic;
}

export class AndGateNode extends aGateNode {
    protected readonly gateLogic = And_GateLogic;
}

export class NandGateNode extends aGateNode {
    protected readonly gateLogic = Nand_GateLogic;
}

export class OrGateNode extends aGateNode {
    protected readonly gateLogic = Or_GateLogic;
}

export class NorGateNode extends aGateNode {
    protected readonly gateLogic = Nor_GateLogic;
}

export class XorGateNode extends aGateNode {
    protected readonly gateLogic = Xor_GateLogic;
}

export class XnorGateNode extends aGateNode {
    protected readonly gateLogic = Xnor_GateLogic;
}
