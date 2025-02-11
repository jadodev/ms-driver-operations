export interface Point {
    x: number;
    y: number;
  }
  
  export class DistanceCalculator {
    public static calculateEuclideanDistance(p1: Point, p2: Point): number {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
  
  export interface IZoneCalculator {
    getNearestReference(point: Point): { zone: string, point: Point };
  }
  
  export class ZoneCalculator implements IZoneCalculator {
    private static readonly referencePoints: { zone: string, point: Point }[] = [
      { zone: "ZoneA", point: { x: 10, y: 20 } },
      { zone: "ZoneB", point: { x: 30, y: 40 } },
      { zone: "ZoneC", point: { x: 50, y: 60 } },
      { zone: "ZoneD", point: { x: 70, y: 80 } },
    ];
  
    public getNearestReference(point: Point): { zone: string, point: Point } {
      let nearest = ZoneCalculator.referencePoints[0];
      let minDistance = DistanceCalculator.calculateEuclideanDistance(point, nearest.point);
      for (let i = 1; i < ZoneCalculator.referencePoints.length; i++) {
        const candidate = ZoneCalculator.referencePoints[i];
        const distance = DistanceCalculator.calculateEuclideanDistance(point, candidate.point);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = candidate;
        }
      }
      return nearest;
    }
  }
  