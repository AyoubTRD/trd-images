import { searchImages } from "pixabay-api";
import { ImageHit } from "pixabay-api/dist/PixabayResponse";

const { remote, fs, https, wallpaper } = window;

export interface ImageI extends ImageHit {
  largeImageURL: string;
}

export class Api {
  private page: number = 1;
  private totalPages: number;

  constructor(private key: string) {}

  async getImages(query: string = "wallpaper"): Promise<ImageI[]> {
    this.page = 1;

    const res = await searchImages(this.key, query, {
      per_page: 40,
      page: this.page
    });

    this.page++;
    this.totalPages = res.total / 40;

    return res.hits as ImageI[];
  }

  async loadMore(query: string): Promise<ImageI[]> {
    if (this.totalPages >= this.page) {
      const res = await searchImages(this.key, query, {
        per_page: 40,
        page: this.page
      });
      this.page++;

      return res.hits as ImageI[];
    }
  }

  async downloadImage(image: ImageI): Promise<void> {
    const dialog = remote.dialog;
    const win = remote.getCurrentWindow();
    const file = await dialog.showSaveDialog(win, {
      title: "Save File - Download Image",
      buttonLabel: "Save Image",
      nameFieldLabel: ".jpg",
      filters: [
        {
          name: "Images",
          extensions: ["jpg", "png", "jpeg"]
        }
      ]
    });
    if (!file.canceled) {
      const src = `${image.largeImageURL}?key=${this.key}`;

      await this.download(src, file.filePath);
      console.log("Image downloaded successfully");
    }
  }

  download(url: string, path: string) {
    return new Promise((resolve, reject) => {
      try {
        https.get(url, res => {
          const f = fs.createWriteStream(path);
          res.pipe(f);
          f.on("finish", () => {
            resolve();
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async setWallpaper(image: ImageI): Promise<void> {
    const src = `${image.largeImageURL}?key=${this.key}`;
    const filePath = `wallpaper.jpg`;
    await this.download(src, filePath);
    wallpaper.set(filePath);
  }
}
