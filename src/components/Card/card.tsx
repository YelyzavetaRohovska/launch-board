import { ICore } from "@/models/cores";
import Image from "next/image";
import ColorIndicator, { EIndicatorColor } from "../UI/ColorIndicator";


interface CardProps {
  image?: {
    width: number;
    height: number;
    small?: string;
    large?: string;
    alt: string;
  };
  title: string;
  flightNumber: number;
  cores: ICore[];
  success?: boolean;
  description?: string;
}

export const Card = ({
  image,
  title,
  flightNumber,
  cores,
  success = false,
  description = "Not provided",
}: CardProps) => {
  return (
    <div
      className="flex w-full justify-between gap-4 mb-4 bg-stone-900 border rounded-md border-stone-700 p-4 items-start max-md:flex-col"
    >
      <div className="p-2 border rounded-md bg-stone-800 border-stone-700">
        { image?.small && (
          <Image
            src={image.small}
            width={image.width}
            height={image.width}
            alt={image.alt}
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        <h2 className="pb-1">{title}</h2>
        <p>Flight number: {flightNumber}</p>
        <p>Details: {description}</p>
        <p>Success: <ColorIndicator state={getState(success)}/></p>
      </div>
      <div className="flex flex-col w-full">
        <p className="pb-1">Total cores number: {cores.length}</p>
        <ul>
          {cores.map(core => (
          <li key={core.core}>
            {core.core} - <ColorIndicator state={getState(core.landing_success)}/>
          </li>))}
        </ul>
      </div>
    </div>
  );
}

function getState(value: boolean | null): EIndicatorColor {
  if (value == null) return EIndicatorColor.Warning;

  return value ? EIndicatorColor.Success : EIndicatorColor.Danger;
}