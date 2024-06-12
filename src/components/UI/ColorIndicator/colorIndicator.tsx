import clsx from "clsx";

export enum EIndicatorColor {
  Success = "success",
  Warning = "warning",
  Danger  = "danger",
}

interface IndicatorProps {
  state: EIndicatorColor;
}

export const ColorIndicator = ({
  state
}: IndicatorProps) => {
  const classes = clsx(
    "inline-block align-sub h-4 w-4 mx-1 rounded rounded-xl bg-red-800",
    state == EIndicatorColor.Danger && "bg-red-600",
    state == EIndicatorColor.Warning && "bg-yellow-600",
    state == EIndicatorColor.Success && "bg-green-600",
  );

  return (
    <span className={classes}></span>
  );
};