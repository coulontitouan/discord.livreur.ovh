export type AssetSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

export abstract class Asset {
    asset!: string;

    constructor(asset: string) {
        this.asset = asset;
    }

    abstract getUrl(size?: AssetSize): string;

    sizeQueryString(size: AssetSize): string {
        return `size=${size}`;
    }
}