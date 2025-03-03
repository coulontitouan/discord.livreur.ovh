import { AvatarDecorationData, AvatarDecorationFields } from "./avatar-decoration.model";
import { AvatarData } from "./avatar.model";
import { BannerData } from "./banner.model";
import { ClanData, ClanFields } from "./clan.model";

import { Vibrant } from "node-vibrant/browser";

const DISCORD_EPOCH = 1420070400000; // 1er janvier 2015, 00:00:00 UTC

interface ProfilFields {
    accent_color?: number;
    banner_color?: string;
    discriminator: string;
    flags?: number;
    global_name: string;
    id: string;
    public_flags?: number;
    username: string;

    avatar: string;
    avatar_decoration_data?: AvatarDecorationFields;
    banner: string;
    clan?: ClanFields;
    primary_guild?: ClanFields;
}

export class ProfilData {
    accent_color?: number;
    banner_color?: string;
    discriminator!: string;
    flags?: number;
    global_name!: string;
    id!: string;
    public_flags?: number;
    username!: string;

    avatar: AvatarData;
    avatar_decoration_data?: AvatarDecorationData;
    banner?: BannerData;
    clan?: ClanData;
    primary_guild?: ClanData;

    constructor(data: ProfilFields) {
        Object.assign(this, data);
        this.avatar = new AvatarData(data.avatar, data.id);
        this.avatar_decoration_data = data.avatar_decoration_data && new AvatarDecorationData(data.avatar_decoration_data);
        if (data.banner){
            this.banner = new BannerData(data.banner, data.id);
        }
        console.log(this.banner?.getUrl())
    }

    public getId(): string {
        return this.id;
    }

    public getCreationDate(): Date {
        const snowflakeBigInt = BigInt(this.id);
        const timestamp = Number(snowflakeBigInt >> 22n) + DISCORD_EPOCH;
        return new Date(timestamp);
    }

    public getAvatarUrl(): string {
        return this.avatar.getUrl();
    }

    public getDecorationUrl(): string | undefined {
        return this.avatar_decoration_data?.getUrl();
    }

    public async getBannerColor(): Promise<string> {
        return this.banner_color ?? Vibrant.from(this.avatar.getUrl()).getPalette().then((palette) => {
            return !(palette.Vibrant) ? "#000000" : palette.Vibrant.hex;
        });
    }

    public async getBanner(): Promise<{ color: string; url: string | null; }> {
        return {
            color: await this.getBannerColor(),
            url: this.banner?.getUrl() ?? null
        };
        /* Usage example:
        this.profil.getBanner().then((banner) => {
                console.log(banner);
            })
        */
    }

}