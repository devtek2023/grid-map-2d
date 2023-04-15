/**
 * Generate a random identifier.
 * @param length Size of the identifier
 * @returns identifier
 */
export const idGen = (length = 24): string => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";

  for (let i = 0; i <= length; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    id += chars.substring(randomNumber, randomNumber + 1);
  }

  return id;
}