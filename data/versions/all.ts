import { VersionData } from "../../types/versions";
import iidx1 from "@/data/versions/iidx1";
import substream from "@/data/versions/substream";
import iidx2 from "@/data/versions/iidx2";
import iidx3 from "@/data/versions/iidx3";
import iidx4 from "@/data/versions/iidx4";
import iidx5 from "@/data/versions/iidx5";
import iidx6 from "@/data/versions/iidx6";
import iidx7 from "@/data/versions/iidx7";
import iidx8 from "@/data/versions/iidx8";
import iidx9 from "@/data/versions/iidx9";
import iidx10 from "@/data/versions/iidx10";
import iidx11 from "@/data/versions/iidx11";
import iidx12 from "@/data/versions/iidx12";
import iidx13 from "@/data/versions/iidx13";
import iidx14 from "@/data/versions/iidx14";
import iidx15 from "@/data/versions/iidx15";
import iidx16 from "@/data/versions/iidx16";
import iidx17 from "@/data/versions/iidx17";
import iidx18 from "@/data/versions/iidx18";
import iidx19 from "@/data/versions/iidx19";
import iidx20 from "@/data/versions/iidx20";
import iidx21 from "@/data/versions/iidx21";
import iidx22 from "@/data/versions/iidx22";
import iidx23 from "@/data/versions/iidx23";
import iidx24 from "@/data/versions/iidx24";
import iidx25 from "@/data/versions/iidx25";
import iidx26 from "@/data/versions/iidx26";
import iidx27 from "@/data/versions/iidx27";
import iidx28 from "@/data/versions/iidx28";
import iidx29 from "@/data/versions/iidx29";
import iidx30 from "@/data/versions/iidx30";
import iidx31 from "@/data/versions/iidx31";
import iidx32 from "@/data/versions/iidx32";
import iidx33 from "@/data/versions/iidx33";
import infinitas from "@/data/versions/infinitas";

const allVersions: VersionData[] = [
  iidx1,
  substream,
  iidx2,
  iidx3,
  iidx4,
  iidx5,
  iidx6,
  iidx7,
  iidx8,
  iidx9,
  iidx10,
  iidx11,
  iidx12,
  iidx13,
  iidx14,
  iidx15,
  iidx16,
  iidx17,
  iidx18,
  iidx19,
  iidx20,
  iidx21,
  iidx22,
  iidx23,
  iidx24,
  iidx25,
  iidx26,
  iidx27,
  iidx28,
  iidx29,
  iidx30,
  iidx31,
  iidx32,
  iidx33,
  infinitas,
];

export default allVersions.map((version) => {
  return {
    ...version,
    songs: version.songs.sort((a, b) => a.title.localeCompare(b.title)),
  };
});
