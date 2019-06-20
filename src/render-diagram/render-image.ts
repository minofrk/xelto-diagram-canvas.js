import { ImageDestination, Image } from '../types';

export default function renderImage(
    dest: ImageDestination,
    ...images: Image[]
): void {
    for (const img of images) {
        for (const brush of img) {
            brush(dest);
        }
    }
}
