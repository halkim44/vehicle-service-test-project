export class CreateUserDTO {
  name: string;
  readonly password: string;
  is_technician?: boolean;
}
