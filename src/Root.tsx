import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./MainComposition";
import { CompositionSchema } from "./CompositionSchema";
import data from "./data.json";
import compositions from "./compositions.json";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {compositions.map((config) => (
        <Composition
          key={config.id}
          id={config.id}
          component={(props) => (
            <MainComposition
              {...props}
              orientation={config.orientation as "landscape" | "portrait"}
              customWidth={config.customWidth}
            />
          )}
          durationInFrames={config.durationInFrames}
          fps={config.fps}
          width={config.width}
          height={config.height}
          schema={CompositionSchema}
          defaultProps={data}
        />
      ))}
    </>
  );
};
