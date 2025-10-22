import { Controller } from '@nestjs/common';
import { OrsService } from './ors.service';

@Controller('ors')
export class OrsController {
  constructor(private readonly orsService: OrsService) {}
}
