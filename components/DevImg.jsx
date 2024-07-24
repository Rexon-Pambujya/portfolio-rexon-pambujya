import Image from "next/image";
export default function DevImg({ containerStyles, imgSrc }) {
  return (
    <div className={`${containerStyles}`}>
      <div className="relative w-full h-full" style={{ marginTop: "-30px" }}>
        <Image
          src={imgSrc}
          fill
          style={{
            objectFit: "scale-down",
          }}
          priority
          alt="Image of the dev who created this website"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
