import { fileTypeFromBuffer } from "file-type";

export async function getFileFormat(
  buffer: ArrayBuffer
): Promise<string | null> {
  const result = await fileTypeFromBuffer(buffer);
  if (result) {
    return result.ext;
  }
  const svgHeader = new TextDecoder().decode(
    new Uint8Array(buffer.slice(0, 5))
  );
  if (svgHeader === "<?xml") {
    return "svg";
  }
  return null;
}
