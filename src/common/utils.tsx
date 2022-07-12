/**
 *
 * @param start number
 * @param end number
 * @returns {Array}
 */
export default function range(start: number, end: number): number[] {
  const length: number = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
}

export const DOTS: string = "...";
