import type { iNode, tTick } from "./Node";

export class Simulation {
    private currentTick: tTick = <tTick>(0);
    private nodes: iNode[] = [];

    addNode(node: iNode) {
        this.nodes.push(node);
    }

    tick() {
        this.currentTick++;
        for (const node of this.nodes) {
            node.update(this.currentTick);
        }
    }
}
