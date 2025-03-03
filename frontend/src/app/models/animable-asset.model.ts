import { Asset } from "./asset.model";

export abstract class AnimableAsset extends Asset{
    animated: boolean;

    constructor(asset: string) {
        super(asset);
        this.animated = this.asset.startsWith("a_");
    }

    getExtension(): "png" | "gif" {
        return this.animated ? "gif" : "png";
    }
}