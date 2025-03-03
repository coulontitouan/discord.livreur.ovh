import { AnimableAsset } from "./animable-asset.model";
import { AssetSize } from "./asset.model";

export interface AvatarFields {
    asset: string | null;
}

export class AvatarData extends AnimableAsset {
    static readonly DEFAULT_AVATAR = "default";
    user_id!: string;

    constructor(asset: string | null, user_id: string) {
        asset = asset ?? AvatarData.DEFAULT_AVATAR;
        super(asset);
        this.user_id = user_id;
    }

    private getDefaultAvatarUrl() {
        const index = (BigInt(this.user_id) >> BigInt(22)) % BigInt(6)
        return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
    }

    override getUrl(size: AssetSize = 4096) {
        if (this.asset == AvatarData.DEFAULT_AVATAR) {
            return this.getDefaultAvatarUrl();
        }
        return `https://cdn.discordapp.com/avatars/${this.user_id}/${this.asset}.${this.getExtension()}?${this.sizeQueryString(size)}`;
    }
}