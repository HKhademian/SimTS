import { Level } from './Level';

export type iGateLogic = (inputs: Level[]) => Level;

export const Not_GateLogic: iGateLogic = (inputs) => {
    if (inputs.length <= 0) {
        return Level.Z;
    }
    if (inputs[0] === Level.X) {
        return Level.X;
    }
    return inputs[0] === Level.H ? Level.L : Level.H;
};

export const Buffer_GateLogic: iGateLogic = (inputs) => {
    if (inputs.length <= 0) {
        return Level.Z;
    }
    return inputs[0]!;
};

export const And_GateLogic: iGateLogic = (inputs) => {
    if (inputs.includes(Level.X)) {
        return Level.X;
    }
    return inputs.every(l => l === Level.H) ? Level.H : Level.L;
};

export const Or_GateLogic: iGateLogic = (inputs) => {
    if (inputs.includes(Level.X)) {
        return Level.X;
    }
    return inputs.some(l => l === Level.H) ? Level.H : Level.L;
};


export const Nand_GateLogic: iGateLogic = (inputs) => {
    if (inputs.includes(Level.X)) {
        return Level.X;
    }
    return inputs.every(l => l === Level.H) ? Level.L : Level.H;
};

export const Nor_GateLogic: iGateLogic = (inputs) => {
    if (inputs.includes(Level.X)) {
        return Level.X;
    }
    return inputs.some(l => l === Level.H) ? Level.L : Level.H;
};

export const Xor_GateLogic: iGateLogic = (inputs) => {
    if (inputs.includes(Level.X)) {
        return Level.X;
    }
    return inputs.filter(l => l === Level.H).length % 2 === 1 ? Level.H : Level.L;
};

export const Xnor_GateLogic: iGateLogic = (inputs) => {
    if (inputs.includes(Level.X)) {
        return Level.X;
    }
    return inputs.filter(l => l === Level.H).length % 2 === 0 ? Level.H : Level.L;
};
