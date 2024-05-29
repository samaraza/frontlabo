export interface AdminSignUpResponseModel {
  firstname: String;
  lastname: String;
  email: String;
  role: Role;
}
export enum Role {
  PROFFESSEUR,
  ADMINISTRATEUR,
  PREPARATRICE,
  DIRECTEUR,
}
export interface SignInResponseModel {
  firstname: String;
  lastname: String;
  email: String;
  role: Role;
}
