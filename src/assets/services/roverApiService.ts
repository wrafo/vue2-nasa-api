import axios from "axios";

interface Image {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
  };
}

export default class RoverApiService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchImages(
    selectedRover: string,
    searchDate: string,
    selectedCamera: string
  ): Promise<Image[]> {
    try {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos`;

      const response = await axios.get<Image[]>(url, {
        params: {
          earth_date: searchDate,
          camera: selectedCamera,
          api_key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error occurred while looking for images:", error);
      throw error;
    }
  }
}
