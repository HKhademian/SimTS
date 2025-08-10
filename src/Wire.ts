import {
    Level
} from './Level';
import {
    type iOutputNode,
} from './LevelNode';
import {
    type tTick,
    aNode,
} from './Node';

export class Wire extends aNode implements iOutputNode {
    private readonly nodes: iOutputNode[] = [];
    private _level: Level = Level.Z;

    attachNode(node: iOutputNode) {
        this.nodes.push(node);
    }

    detachNode(node: iOutputNode) {
        const idx = this.nodes.indexOf(node);
        if (idx >= 0) {
            this.nodes.splice(idx, 1);
        }
    }

    get output(): Level {
        return this._level;
    }

    protected override onUpdate(t: tTick): void {
        const levels = this.nodes
            .map(d => { d.update(t); return d.output; })
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
