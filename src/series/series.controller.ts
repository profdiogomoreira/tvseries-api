import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const series = this.seriesService.findAll(page, limit);
    return {
      page,
      limit,
      data: series,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const series = this.seriesService.findOne(id);
    return {
      id,
      data: series,
    };
  }

  @Get('search')
  findByTitle(@Query('title') title: string) {
    const series = this.seriesService.findByTitle(title);
    return {
      message: `TV series matching the title: ${title}`,
      data: series,
    };
  }
}
