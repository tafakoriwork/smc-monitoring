import Window from "../../tools/window";
import FreeSize from "./freeSize";
import TotalSize from "./totalSize";
import UsedSize from "./usedSize";

function HDD() {
  return (
    <>
      <Window body_ui={<UsedSize />} title={"used size"} />
      <Window body_ui={<TotalSize />} title={"total size"} />
      <Window body_ui={<FreeSize />} title={"free size"} />
    </>
  );
}

export default HDD;
