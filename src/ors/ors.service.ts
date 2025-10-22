import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { RideRequestDto } from 'src/rides/dto/request.dto';

@Injectable()
export class OrsService {
  private readonly baseUrl = 'https://api.openrouteservice.org/v2/directions';

  async getRoute(
    dto : RideRequestDto,
    profile: string = 'driving-car',
  ) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${profile}/geojson`,
        {
          coordinates: [dto.pickup, dto.destination],
        },
        {
          headers: {
            Authorization: process.env.ORS_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );

      const routeFeature = response.data.features[0];
      const { summary, geometry } = routeFeature.properties;

      return {
        distanceKm: (summary.distance / 1000).toFixed(2),
        durationMin: (summary.duration / 60).toFixed(0),
        geometry,
      };
    } catch (error) {
      console.error('ORS API Error:', error.response?.data || error.message);
      throw new HttpException(
        'Failed to fetch route from OpenRouteService',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
