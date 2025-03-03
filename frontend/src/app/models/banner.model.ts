import { AnimableAsset } from "./animable-asset.model";
import { AssetSize } from "./asset.model";

export interface BannerFields {
    asset: string;
}

export class BannerData extends AnimableAsset {
    user_id!: string;

    constructor(asset: string, user_id: string) {
        super(asset);
        this.user_id = user_id;
    }

    override getUrl(size: AssetSize = 4096) {
        return `https://cdn.discordapp.com/banners/${this.user_id}/${this.asset}.${this.getExtension()}?${this.sizeQueryString(size)}`;
    }
}