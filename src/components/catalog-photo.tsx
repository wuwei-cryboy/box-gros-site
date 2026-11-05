import { cn } from "@/lib/cn";

export function CatalogPhoto({
  src,
  alt,
  frame = true,
}: {
  src: string;
  alt: string;
  frame?: boolean;
}) {
  if (!frame) {
    return <img src={src} alt={alt} className="h-full w-full object-cover" />;
  }
  return (
    <div className="relative aspect-square overflow-hidden bg-bg">
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
      />
      <img src={src} alt={alt} className={cn("relative h-full w-full object-contain")} />
    </div>
  );
}
