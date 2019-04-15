declare module "*.svg" {
    const content: any;
    export default content;
}

declare const API_BASE_URI: string;
declare const BUILD_DATE: string;
declare const GIT_BRANCH: string;
declare const GIT_COMMITHASH: string;
declare const GIT_VERSION: string;
