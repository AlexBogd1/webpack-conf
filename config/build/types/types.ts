export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  publicFolder: string;
}

export type BuildMode = "development" | "production";
export type PlatformMode = "mobile" | "desktop";

export interface BuildOptions {
  port: number;
  mode?: BuildMode;
  paths: BuildPaths;
  isAnalyzer?: boolean;
  platform?: PlatformMode;
}
