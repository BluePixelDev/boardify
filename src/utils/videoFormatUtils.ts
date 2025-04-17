export function getVideoFormatFromHeaders(content: ArrayBuffer): string | null {
    const header = new Uint8Array(content.slice(0, 4));
    const headerString = String.fromCharCode(...header);

    // Check for MP4 (0x00 0x00 0x00 0x18 "ftypmp4")
    if (headerString === '\x00\x00\x00\x18') {
        const mp4Header = new Uint8Array(content.slice(4, 8));
        const mp4String = String.fromCharCode(...mp4Header);
        if (mp4String === 'ftyp') {
            const ftypSubHeader = new Uint8Array(content.slice(8, 12));
            const ftypString = String.fromCharCode(...ftypSubHeader);
            if (ftypString === 'mp4') return 'mp4';
        }
    }

    // Check for WebM (0x1A 0x45 0xDF 0xA3)
    if (headerString === '\x1A\x45\xDF\xA3') return 'webm';

    // Check for Ogg (0x4F 0x67 0x67 0x53)
    if (headerString === 'OggS') return 'ogg';

    // Check for AVI (0x52 0x49 0x46 0x46 "RIFF" + 0x41 0x56 0x49 0x20 "AVI ")
    if (headerString === 'RIFF') {
        const aviHeader = new Uint8Array(content.slice(8, 12));
        const aviString = String.fromCharCode(...aviHeader);
        if (aviString === 'AVI ') return 'avi';
    }

    return null;
}
