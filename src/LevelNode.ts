import { Level } from "./Level";
import { aNode, type iNode, type tTick } from "./Node";

export interface iOutputNode<
    OUT extends Level | Level[] = Level,
> extends iNode {
    get output(): OUT;
}

export class ConstNode<
    OUT extends Level | Level[] = Level,
> implements iOutputNode<OUT> {
    constructor(
        private readonly _output: OUT,
    ) { }

    get output(): OUT {
        return this._output;
    }

    update(): void { }
}

export class MutNode<
    OUT extends Level | Level[] = Level,
> implements iOutputNode<OUT> {
    constructor(
        private _output: OUT,
    ) { }

    get output(): OUT {
        return this._output;
    }
    set output(output: OUT) {
        this._output = output;
    }

    update(): void { }
}

export class ComputeNode<
    OUT extends Level | Level[] = Level,
> extends aNode implements iOutputNode<OUT> {

    constructor(
        private _output: OUT,
        private readonly computeFn: (t: tTick) => OUT,
    ) { super(); }

    get output(): OUT {
        return this._output;
    }

    override onUpdate(t: tTick): void {
        this._output = this.computeFn(t);
    }
}

export class DynamicNode extends ComputeNode<Level> {
    constructor(
        outIndex: number,
        node: iOutputNode<Level[]>,
    ) {
        super(
            node.output[outIndex]!,
            (tick) => {
                node.update(tick);
                return node.output[outIndex]!;
            },
        );
    }
}

export const LEVEL_X = new ConstNode(Level.X);
export const LEVEL_Z = new ConstNode(Level.Z);
export const LEVEL_L = new ConstNode(Level.L);
export const LEVEL_H = new ConstNode(Level.H);
