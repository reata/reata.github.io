import Giscus from "@giscus/react";
import { SITE } from "../data/site";

export default function GiscusWrapper() {
  return (
    <Giscus
      id="comment"
      {...SITE.giscus}
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="top"
      loading="lazy"
      async
    />
  );
}
