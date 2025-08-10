
export type tTick = number & { /** @private */ readonly '': unique symbol; };

export interface iNode {
    update(t: tTick): void;
}

export abstract class aNode implements iNode {
    protected prevTick: tTick = <tTick>(-1);
    private lastTick: tTick = <tTick>(-1);

    update(t: tTick): void {
        if (this.lastTick >= t) { return; }
        // TODO: NOTE: maybe a step by step simultion would be better
        this.prevTick = this.lastTick;
        this.lastTick = t;
        this.onUpdate(t);
    }

    protected abstract onUpdate(t: tTick): void;
}
