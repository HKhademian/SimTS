
export type tTick = number & { /** @private */ readonly '': unique symbol; };

export interface iNode {
    update(tick: tTick): void;
}

export abstract class Node implements iNode {
    private lastTick: tTick = <tTick>(-1);

    update(tick: tTick): void {
        const prevTick = this.lastTick;
        if (prevTick >= tick) { return; }
        // TODO: NOTE: maybe a step by step simultion would be better
        this.lastTick = tick;
        this.onUpdate(prevTick, tick);
    }

    protected abstract onUpdate(prevTick: tTick, tick: tTick): void;
}
