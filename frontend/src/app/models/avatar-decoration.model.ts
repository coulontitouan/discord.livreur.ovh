import { AnimableAsset } from "./animable-asset.model";

export interface AvatarDecorationFields {
    asset: string;
    sku_id: number;
    expires_at?: string;
}

export class AvatarDecorationData extends AnimableAsset {
    expires_at?: string;
    sku_id!: number;

    constructor(data: AvatarDecorationFields) {
        super(data.asset);
        Object.assign(this, data);
    }

    override getUrl(): string {
        return `https://cdn.discordapp.com/avatar-decoration-presets/${this.asset}.png`;
    }
}