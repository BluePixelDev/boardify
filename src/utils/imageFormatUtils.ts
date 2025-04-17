export function getImageFormatFromHeaders(content: ArrayBuffer): string | null {
    const header = new Uint8Array(content.slice(0, 4));
    const headerString = String.fromCharCode(...header);

    // Check for PNG (0x89 0x50 0x4e 0x47)
    if (headerString === '\x89PNG') return 'png';

    // Check for JPEG (0xFF 0xD8 0xFF)
    if (headerString === '\xFF\xD8\xFF') return 'jpeg';

    // Check for GIF (0x47 0x49 0x46 0x38)
    if (headerString === 'GIF8') return 'gif';

    // Check for WebP (0x52 0x49 0x46 0x46 "RIFF" + 0x57 0x45 0x42 0x50 "WEBP")
    if (headerString === 'RIFF') {
        const webpHeader = new Uint8Array(content.slice(8, 12));
        const webpString = String.fromCharCode(...webpHeader);
        if (webpString === 'WEBP') return 'webp';
    }

    // Check for SVG (based on XML header for SVG files)
    if (headerString === '<?xm') {
        const svgHeader = new TextDecoder().decode(new Uint8Array(content.slice(0, 5)));
        if (svgHeader === '<?xml') return 'svg';
    }

    return null;
}
