/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // add more env variables here if needed
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
