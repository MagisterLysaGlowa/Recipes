export function generateRandomString(length: number, charset?: string): string {
  // Domyślny zestaw znaków: litery (małe i duże) oraz cyfry
  const defaultCharset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const characters = charset || defaultCharset;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
    return ""; // Brak rozszerzenia lub plik kończy się kropką
  }
  return fileName.slice(lastDotIndex + 1);
}
