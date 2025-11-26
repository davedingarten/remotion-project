import { Config } from "@remotion/cli/config";
import { VIDEO_CRF, VIDEO_FORMAT, webpackOverride } from "./shared-config";

Config.setVideoImageFormat(VIDEO_FORMAT);
Config.setOverwriteOutput(true);

// Export Quality Settings
Config.setCrf(VIDEO_CRF); 

Config.overrideWebpackConfig(webpackOverride);
