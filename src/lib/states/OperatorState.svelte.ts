export type StatKey =
    | "maxHP"
    | "atk"
    | "def"
    | "res"
    | "cost"
    | "baseAttackTime"
    | "respawnTime"
    | "block"
    | "taunt";

export class OperatorState {
    phases: any[];
    potentials: any[];
    favor: Record<string, number>;

    selectedPhase = $state(0);
    selectedPotential = $state(0);
    _currentLevel = $state(1);
    isTrustBonusActive = $state(false);

    constructor(phases: any[], potentials: any[], favor: Record<string, number>) {
        this.phases = phases;
        this.potentials = potentials;
        this.favor = favor;
        // Default to max phase
        this.selectedPhase = phases.length - 1;
        // Default to max level of max phase
        this._currentLevel = this.maxLevel;
    }

    get maxLevel() {
        return this.phases[this.selectedPhase].maxLevel;
    }

    get currentLevel() {
        // Ensure level doesn't exceed max level of current phase
        return Math.min(this._currentLevel, this.maxLevel);
    }

    set currentLevel(value: number) {
        this._currentLevel = value;
    }

    get attributes() {
        return this.calculateStats(
            this.phases[this.selectedPhase],
            this.currentLevel,
            this.selectedPotential,
            this.isTrustBonusActive
        );
    }

    get trustBonusText() {
        if (!this.favor) return "";
        let bonuses: string[] = [];
        for (const [key, value] of Object.entries(this.favor)) {
            if (value > 0) {
                let name = key;
                if (key === "maxHP") name = "Max HP";
                else if (key === "atk") name = "ATK";
                else if (key === "def") name = "DEF";
                else if (key === "res") name = "RES";
                else if (key === "attack_speed") name = "ASPD";

                if (name) bonuses.push(`${name} +${value}`);
            }
        }
        return bonuses.join(", ");
    }

    private calculateStats(
        phase: {
            range: any;
            maxLevel: number;
            minStats: any;
            maxStats: any;
        },
        level: number,
        potentialRank: number,
        trust: boolean
    ) {
        let levelfactor = (level - 1) / (phase.maxLevel - 1);
        // If maxLevel is 1, avoid division by zero
        if (phase.maxLevel === 1) levelfactor = 1;

        let minStats = phase.minStats;
        let maxStats = phase.maxStats;

        let stats = {
            range: phase.range,
            maxHP: Math.round(
                minStats.maxHP + (maxStats.maxHP - minStats.maxHP) * levelfactor
            ),
            atk: Math.round(
                minStats.atk + (maxStats.atk - minStats.atk) * levelfactor
            ),
            def: Math.round(
                minStats.def + (maxStats.def - minStats.def) * levelfactor
            ),
            res: Math.round(
                minStats.res + (maxStats.res - minStats.res) * levelfactor
            ),
            cost: minStats.cost,
            baseAttackTime: minStats.baseAttackTime,
            respawnTime: minStats.respawnTime,
            block: minStats.block,
            taunt: minStats.taunt,
        };

        // Apply potential buffs
        for (let i = 0; i < potentialRank; i++) {
            if (i >= this.potentials.length) break;

            const p = this.potentials[i];
            if (p.type === "BUFF") {
                const attr = p.attribute.toLowerCase();

                let statKey: StatKey | "" = "";
                if (attr === "max_hp" || attr === "hp") statKey = "maxHP";
                else if (attr === "atk") statKey = "atk";
                else if (attr === "def") statKey = "def";
                else if (attr === "magic_resistance" || attr === "res")
                    statKey = "res";
                else if (attr === "cost" || attr === "dp_cost")
                    statKey = "cost";
                else if (attr === "attack_speed") statKey = "baseAttackTime";
                else if (attr === "block_cnt") statKey = "block";
                else if (attr === "respawn_time") statKey = "respawnTime";

                if (statKey && (stats as any)[statKey] !== undefined) {
                    if (p.formula === "ADDITION") {
                        (stats as any)[statKey] += p.value;
                    }
                }
            }
        }

        // Apply Trust Bonus
        if (trust && this.favor) {
            for (const key in this.favor) {
                if ((stats as any)[key] !== undefined) {
                    (stats as any)[key] += this.favor[key];
                }
            }
        }

        return stats;
    }
}
