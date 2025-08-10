import { Level } from "./Level";
import { aNode, type iNode, type tTick } from "./Node";

export interface iOuputNode<
    OUT extends Level | Level[] = Level,
> extends iNode {
    get output(): OUT;
}

export class ConstNode<
    OUT extends Level | Level[] = Level,
> implements iOuputNode<OUT> {
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
> implements iOuputNode<OUT> {
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
> extends aNode implements iOuputNode<OUT> {

    constructor(
        private _output: OUT,
        private readonly computeFn: (prevTick: tTick, tick: tTick) => OUT,
    ) { super(); }

    get output(): OUT {
        return this._output;
    }

    override onUpdate(prevTick: tTick, tick: tTick): void {
        this._output = this.computeFn(prevTick, tick);
    }
}

export class DynamicNode<
    OUT extends Level | Level[] = Level,
> extends ComputeNode<OUT> {
    constructor(
        node: iOuputNode<OUT>,
    ) {
        super(
            node.output,
            (_prevTick, tick) => {
                node.update(tick);
                return node.output;
            },
        );
    }
}

export const LEVEL_X = new ConstNode(Level.X);
export const LEVEL_Z = new ConstNode(Level.Z);
export const LEVEL_L = new ConstNode(Level.L);
export const LEVEL_H = new ConstNode(Level.H);
