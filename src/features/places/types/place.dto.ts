export type PlaceDto = {
  title: string;
  imageUri: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type FirebasePlacesResponse = {
  [id: string]: PlaceDto;
};
