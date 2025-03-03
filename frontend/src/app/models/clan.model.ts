import { Asset, AssetSize } from "./asset.model";

export interface ClanFields {
    badge: string;
    identity_guild_id: string;
    identity_enabeld: boolean;
    tag: string;
}

export class ClanData extends Asset {
    identity_guild_id: string;
    identity_enabeld!: boolean;
    tag: string;

    constructor(data: ClanFields) {
        super(data.badge);
        Object.assign(this, data);
        this.identity_guild_id = data.identity_guild_id;
        this.tag = data.tag;
    }

    override getUrl(size: AssetSize = 4096): string {
        return `https://cdn.discordapp.com/clan-badges/${this.identity_guild_id}/${this.asset}.png?${this.sizeQueryString(size)}`;
    }

    getGuild(){
        // TODO 
    }
}
