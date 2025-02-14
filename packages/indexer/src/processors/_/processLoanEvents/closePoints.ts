import { type Store } from '@subsquid/typeorm-store';
import { millisecondsToSeconds } from 'date-fns';

import { calculatePointsForPoint } from 'points';

import { type LoanEventData, Point, PointEvents } from '../../../model';
import { type ClosedPoint } from '../scrapeEvents';

export const closePoints = async ({
  closedPoints,
  store,
}: {
  closedPoints: ClosedPoint[];
  store: Store;
}) => {
  if (closedPoints.length === 0) {
    return;
  }

  console.log(`Closing ${closedPoints.length} point(s).`);

  const updatePoints: Point[] = (
    await Promise.all(
      closedPoints.map(async (closedPoint) => {
        const point = await store.findOne(Point, {
          where: {
            event: PointEvents.Loan,
            id: closedPoint.id,
          },
        });
        if (!point) {
          console.info(`Point not found for loanId: ${closedPoint.id}`);
          return null;
        }
        if (point.event !== PointEvents.Loan) {
          console.error(
            `Point for loanId: ${closedPoint.id} has been added with the wrong event enum`
          );
          return null;
        }

        const pointData = point.data as LoanEventData;
        const points = calculatePointsForPoint({
          point: pointData,
          startTime: millisecondsToSeconds(closedPoint.blockTimestamp),
        });
        pointData.isClosed = true;
        pointData.points = points;

        return new Point({ ...point, data: pointData });
      })
    )
  ).filter((point): point is Point => point !== null);

  return store
    .save(updatePoints)
    .catch((error) => console.error('Error updating points:', error));
};
