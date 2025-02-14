import { type Store } from '@subsquid/typeorm-store';

import { type Point } from '../../../model';

export const insertOpenedPoints = ({
  points,
  store,
}: {
  points: Point[];
  store: Store;
}) => {
  if (points.length === 0) {
    return;
  }

  console.log(`Inserting ${points.length} point(s).`);

  return store
    .insert(points)
    .catch((error) => console.error('Error inserting points:', error));
};
