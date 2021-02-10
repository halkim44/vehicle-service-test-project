export class UpdateBookingDTO {
  vehicle?: string;

  technicians_assigned?: string[];

  made_by?: string;

  service_started?: Date;

  service_ended?: Date;

  due_date?: Date;

  branch?: string;
}