import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { TVSeries } from './series.model';
import { join } from 'path';

const dataFilePath = join(__dirname, '../../data/series.json');

@Injectable()
export class SeriesService {
  private data: TVSeries[];

  constructor() {
    this.readJsonFile();
  }

  private readJsonFile(): void {
    this.data = JSON.parse(readFileSync(dataFilePath, 'utf8')) as TVSeries[];
  }

  findOne(id: string): any {
    const serie = this.data.find((item) => item.id === Number(id));
    if (!serie) {
      throw new NotFoundException(`Série com ID ${id} não encontrada`);
    }
    return serie;
  }

  findByTitle(title: string, page: number, limit: number) {
    const filtered = title
      ? this.data.filter((series) =>
          series.titulo.toLowerCase().includes(title.toLowerCase()),
        )
      : this.data;
    const start = (page - 1) * limit;
    const end = start + limit;
    return { total: filtered.length, series: filtered.slice(start, end) };
  }
}
