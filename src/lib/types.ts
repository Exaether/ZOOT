export interface Operator {
    id: string;
    name: string;
    rarity: number;
    profession: string;
    subProfession: string;
    nation?: string;
    group?: string;
    displayNumber?: string;
    position?: string;
    tagList?: string[];
    skins: string[];
    phases: number[];
    skills: string[];
    talents?: number[];
    equips?: string[];
}
