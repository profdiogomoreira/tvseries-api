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

  findAll(page: number, limit: number): any[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.data.slice(start, end);
  }

  findOne(id: string): any {
    const series = this.data.find((item) => item.id === Number(id));
    if (!series) {
      throw new NotFoundException(`Série com ID ${id} não encontrada`);
    }
    return series;
  }

  findByTitle(titulo: string): any[] {
    return this.data.filter((series) =>
      series.titulo.toLowerCase().includes(titulo.toLowerCase()),
    );
  }
}
