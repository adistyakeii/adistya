declare module "app-types" {
  import { Timestamp } from "firebase/firestore";
  export interface DevotionalType {
    title: string;
    thumbnail: string;
    content: string;
    created: Timestamp;
  }
}
