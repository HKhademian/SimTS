import { Level } from './Level';
import { Node, type iNode, type tTick } from './Node';

export interface iLevelNode extends iNode {
    get level(): Level;
}

export class Wire extends Node implements iLevelNode {
    private readonly nodes: iLevelNode[] = [];
    private _level: Level = Level.Z;

    attachNode(node: iLevelNode) {
        this.nodes.push(node);
    }

    detachNode(node: iLevelNode) {
        const idx = this.nodes.indexOf(node);
        if (idx >= 0) {
            this.nodes.splice(idx, 1);
        }
    }

    get level(): Level {
        return this._level;
    }

    protected override onUpdate(_prevTick: tTick, tick: tTick): void {
        const levels = this.nodes
            .map(d => { d.update(tick); return d.level; })
            .filter(l => l != null && l !== Level.Z);
        const unique = Array.from(new Set(levels));
        if (unique.length === 0) {
            this._level = Level.Z;
        }
        else if (unique.length === 1) {
            this._level = unique[0]!;
        }
        else {
            this._level = Level.X;
        }
    }
}
