export const log = function(message: string, type: string = "success"): void {
  const ColorMap: { [x: string]: string } = {
    success: "green",
    error: "red",
    info: "blue",
    not: "gray",
  };
  const color = ColorMap[type] || "gray";
  console.log(`%c ${message}`, `color: ${color}`);
};
