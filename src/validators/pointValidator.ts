export class PointValidator implements PointValidator {
    isValidPoint(point: string): boolean {
        if(point === "0" || point === "-0") {
            return true
        }
        return Boolean(Number(point))
    }
}