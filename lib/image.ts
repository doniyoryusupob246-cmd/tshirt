export const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1600;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
    img.src = src;
  });
}

function downscaleImage(img: HTMLImageElement, maxDimension: number): string {
  const scale = Math.min(maxDimension / img.width, maxDimension / img.height, 1);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;

  ctx.drawImage(img, 0, 0, width, height);
  // PNG — сохраняет прозрачность (важно для принтов с прозрачным фоном)
  return canvas.toDataURL('image/png');
}

/**
 * Валидирует и подготавливает загруженный файл к использованию как принт:
 * проверяет тип/размер, уменьшает слишком большие изображения.
 */
export async function processImageFile(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Можно загружать только изображения');
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`Файл слишком большой (максимум ${MAX_IMAGE_SIZE_MB} МБ)`);
  }

  const dataUrl = await readFileAsDataUrl(file);
  const img = await loadImage(dataUrl);

  if (img.width <= MAX_IMAGE_DIMENSION && img.height <= MAX_IMAGE_DIMENSION) {
    return dataUrl;
  }

  return downscaleImage(img, MAX_IMAGE_DIMENSION);
}
