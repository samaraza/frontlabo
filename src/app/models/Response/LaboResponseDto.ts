export interface LaboResponseDto {
    id: string;
    laboType: LaboType;
  }
  
  export enum LaboType {
    technique,
    scientifique,
    informatique,
    physique,
  }
  