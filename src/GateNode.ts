import { AndGateLogic, BufferGateLogic, NandGateLogic, NorGateLogic, NotGateLogic, OrGateLogic, XnorGateLogic, XorGateLogic, type iGateLogic } from "./GateLogic";
import { ComputeLevelNode, Level, type iLevelNode } from "./Level";
import { aNode, type tTick } from "./Node";

export abstract class aGateNode extends aNode {
    protected abstract readonly gateLogic: iGateLogic;

    private _output: Level = Level.Z;
    public readonly output: iLevelNode = new ComputeLevelNode(this._output, (tick) => {
        this.onUpdate(tick);
        return this._output;
    });

    protected constructor(
        public readonly inputs: iLevelNode[],
    ) { super(); }

    protected override onUpdate(tick: tTick): void {
        const inputLevels = this.inputs.map(input => {
            input.update(tick);
            return input.level;
        });
        this._output = this.gateLogic.compute(inputLevels);
    }
}

export class NotGateNode extends aGateNode {
    protected readonly gateLogic = new NotGateLogic();
}

export class BufferGateNode extends aGateNode {
    protected readonly gateLogic = new BufferGateLogic();
}

export class AndGateNode extends aGateNode {
    protected readonly gateLogic = new AndGateLogic();
}

export class NandGateNode extends aGateNode {
    protected readonly gateLogic = new NandGateLogic();
}

export class OrGateNode extends aGateNode {
    protected readonly gateLogic = new OrGateLogic();
}

export class NorGateNode extends aGateNode {
    protected readonly gateLogic = new NorGateLogic();
}

export class XorGateNode extends aGateNode {
    protected readonly gateLogic = new XorGateLogic();
}

export class XnorGateNode extends aGateNode {
    protected readonly gateLogic = new XnorGateLogic();
}
