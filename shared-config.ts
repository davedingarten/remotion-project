import { WebpackOverrideFn } from "@remotion/bundler";

export const VIDEO_FPS = 30;
export const VIDEO_CRF = 18;
export const VIDEO_FORMAT = 'jpeg';

export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
    const updateLoader = (loader: any) => {
        // Handle string loaders (e.g. "/path/to/css-loader/dist/cjs.js")
        if (typeof loader === "string" && loader.includes("css-loader")) {
            return {
                loader,
                options: {
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                        mode: "local",
                    },
                },
            };
        }

        // Handle object loaders
        if (
            typeof loader === "object" &&
            loader.loader &&
            loader.loader.includes("css-loader")
        ) {
            return {
                ...loader,
                options: {
                    ...loader.options,
                    modules: {
                        ...(loader.options?.modules || {}),
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                        mode: "local",
                    },
                },
            };
        }
        return loader;
    };

    const updateRule = (rule: any): any => {
        if (rule === "..." || !rule) return rule;

        // Handle oneOf
        if (rule.oneOf) {
            return {
                ...rule,
                oneOf: rule.oneOf.map(updateRule),
            };
        }

        // Check for CSS rules
        if (rule.test?.toString().includes(".css") || rule.test?.toString().includes("css")) {
            if (Array.isArray(rule.use)) {
                return {
                    ...rule,
                    use: rule.use.map(updateLoader),
                };
            }
        }
        return rule;
    };

    return {
        ...currentConfiguration,
        module: {
            ...currentConfiguration.module,
            rules: currentConfiguration.module?.rules?.map(updateRule) || [],
        },
    };
};
