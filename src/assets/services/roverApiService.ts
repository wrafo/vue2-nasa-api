import axios, { AxiosResponse } from "axios";

interface Image {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
  };
}

export class RoverApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RoverApiError";
  }
}

export default class RoverApiService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getApiKey(): string {
    return this.apiKey;
  }

  async searchImages(
    selectedRover: string,
    searchDate: string,
    selectedCamera: string
  ): Promise<Image[]> {
    try {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos`;

      const response: AxiosResponse<Image[]> = await axios.get(url, {
        params: {
          earth_date: searchDate,
          camera: selectedCamera,
          api_key: this.getApiKey(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error occurred while looking for images:", error);
      throw new RoverApiError("Error occurred while looking for images");
    }
  }
}
