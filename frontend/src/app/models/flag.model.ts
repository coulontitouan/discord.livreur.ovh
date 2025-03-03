import { Asset } from "./asset.model";

export class FlagData extends Asset {
    override getUrl() {
        return `https://cdn.discordapp.com/badge-icons/${this.asset}.png`;
    }
}