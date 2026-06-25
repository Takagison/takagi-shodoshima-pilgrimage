import type { Spot } from "@/lib/data";

export function SpotImage({
  spot,
  variant = "thumbnail",
  className = "",
  showCaption = true,
}: {
  spot: Spot;
  variant?: "thumbnail" | "hero";
  className?: string;
  showCaption?: boolean;
}) {
  const src = variant === "hero" ? spot.image.hero : spot.image.thumbnail;

  return (
    <figure className={`overflow-hidden rounded-[16px] bg-sky-100 ${className}`}>
      <img
        src={src}
        alt={spot.image.alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading={variant === "hero" ? "eager" : "lazy"}
      />
      {showCaption ? (
        <figcaption className="bg-white/88 px-4 py-3 text-xs leading-5 text-slate-500">
          {spot.image.caption} 图片：{spot.image.credit}，{spot.image.license}
        </figcaption>
      ) : null}
    </figure>
  );
}
