declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

interface ImportMetaEnv {
  VUE_APP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
