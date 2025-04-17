export function getAudioFormatFromHeaders(content: ArrayBuffer): string | null {
    const header = new Uint8Array(content.slice(0, 4));
    const headerString = String.fromCharCode(...header);

    // Check for MP3 (0x49 0x44 0x33 - ID3)
    if (headerString === 'ID3') return 'mp3';

    // Check for Ogg (0x4F 0x67 0x67 0x53)
    if (headerString === 'OggS') return 'ogg';

    // Check for FLAC (0x66 0x4C 0x61 0x43)
    if (headerString === 'fLaC') return 'flac';

    // Check for WAV (0x52 0x49 0x46 0x46 "RIFF" + 0x57 0x41 0x56 0x45 "WAVE")
    if (headerString === 'RIFF') {
        const wavHeader = new Uint8Array(content.slice(8, 12));
        const wavString = String.fromCharCode(...wavHeader);
        if (wavString === 'WAVE') return 'wav';
    }

    return null;
}
