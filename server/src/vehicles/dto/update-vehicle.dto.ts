export class UpdateVehicleDTO {
  readonly model_name?: string;
  readonly number_plate?: string;
  readonly owner?: string;
  readonly alternate_drivers?: string[];
  readonly class?: string;
}
