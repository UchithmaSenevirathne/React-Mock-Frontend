export class Crop {
    cropCode: string;
    cropCommonName: string;
    cropScientificName: string;
    category: string;
    cropSeason: string;
    fieldCode: string;
    cropImage: string;


    constructor(cropCode: string, cropCommonName: string, cropScientificName: string, category: string, cropSeason: string, fieldCode: string, cropImage: string) {
        this.cropCode = cropCode;
        this.cropCommonName = cropCommonName;
        this.cropScientificName = cropScientificName;
        this.category = category;
        this.cropSeason = cropSeason;
        this.fieldCode = fieldCode;
        this.cropImage = cropImage;
    }
}
