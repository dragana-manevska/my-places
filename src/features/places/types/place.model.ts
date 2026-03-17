export type Place = {
  id?: string;
  title: string;
  imageAssetId: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};
