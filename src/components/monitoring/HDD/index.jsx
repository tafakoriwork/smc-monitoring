import Window from "../../tools/window";
import FreeSize from "./freeSize";
import MountedShow from "./mounted";
import TotalSize from "./totalSize";
import UsedSize from "./usedSize";

function HDD() {
  return (
    <>
      <Window body_ui={<MountedShow />} title={"Mounted"} />
      <Window body_ui={<FreeSize />} title={"free size"} />
      <Window body_ui={<UsedSize />} title={"used size"} />
      <Window body_ui={<TotalSize />} title={"total size"} />
    </>
  );
}

export default HDD;
