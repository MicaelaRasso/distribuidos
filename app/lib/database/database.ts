// app/lib/database.ts
import fs from 'fs/promises';
import path from 'path';

export type FavoriteItem = {
  id: string; // usar string para evitar problemas (puede venir "1" o "001")
  name: string;
  [key: string]: any;
};

export class Database {
  private filePath: string;

  constructor(filename = 'database.json') {
    this.filePath = path.join(process.cwd(), filename);
  }

  private async ensureFile() {
    try {
      await fs.access(this.filePath);
    } catch (e) {
      await fs.writeFile(this.filePath, '[]', { encoding: 'utf8' });
    }
  }

  private async readRaw(): Promise<FavoriteItem[]> {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, { encoding: 'utf8' });
    try {
      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) throw new Error('Database content not an array');
      return parsed as FavoriteItem[];
    } catch (err) {
      // si está corrupto, sobreescribimos con vacío para no romper la app
      await fs.writeFile(this.filePath, '[]', { encoding: 'utf8' });
      return [];
    }
  }

  private async writeRaw(arr: FavoriteItem[]) {
    await fs.writeFile(this.filePath, JSON.stringify(arr, null, 2), { encoding: 'utf8' });
  }

  async getAll(): Promise<FavoriteItem[]> {
    return this.readRaw();
  }

  async findById(id: string): Promise<FavoriteItem | undefined> {
    const all = await this.readRaw();
    return all.find((it) => String(it.id) === String(id));
  }

  async add(item: FavoriteItem): Promise<FavoriteItem> {
    const all = await this.readRaw();
    const exists = all.find((it) => String(it.id) === String(item.id));
    if (exists) throw new Error('ALREADY_EXISTS');
    all.push(item);
    await this.writeRaw(all);
    return item;
  }

  async remove(id: string): Promise<FavoriteItem> {
    const all = await this.readRaw();
    const idx = all.findIndex((it) => String(it.id) === String(id));
    if (idx === -1) throw new Error('NOT_FOUND');
    const removed = all.splice(idx, 1)[0];
    await this.writeRaw(all);
    return removed;
  }
}

export default new Database();
