export interface Course {
  id: string;
  title?: string;
  modules: Module[];
}

export interface Module {
  id: string;
  heading: string;
  slides: Slide[];
  references?: string[];
}

export interface Slide {
  id: string;
  type: number;
  text_list: string[];
  image_list: string[];
  figures: Figure[];
}

export interface Figure {
  type: string;
  data: {
    rows: string[];
    columns: string[];
    values: any[][];
  };
}

export interface UploadedFile {
  filename: string;
  url: string;
  uploadDate: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface OnboardingData {
  country: string;
  paymentMethods: string[];
}

export interface UserProgress {
  courseId: string;
  completedSlides: string[];
}

export interface FolderNode {
  id: string;
  name: string;
  type: "folder" | "file";
  path: string;
  children?: FolderNode[];
  size?: number;
  uploadDate?: string;
}

export interface FolderTree {
  root: FolderNode;
}
