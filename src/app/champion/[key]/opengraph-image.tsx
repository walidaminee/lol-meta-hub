import { ImageResponse } from "next/og";
import { getChampList, champSplash } from "@/lib/ddragon";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { key: string } }) {
  const { key } = params;
  const { champions } = await getChampList();
  const champ = champions.find((c:any)=>c.id.toLowerCase()===key.toLowerCase());
  const title = champ?.name ?? "Champion";
  const splash = champ ? champSplash(champ.id) : undefined;

  return new ImageResponse(
    (
      <div style={{ width:"100%", height:"100%", position:"relative" }}>
        {splash && (
          <img
            src={splash}
            alt={title}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"blur(2px) brightness(.7)" }}
          />
        )}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:72, fontWeight:800 }}>
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
