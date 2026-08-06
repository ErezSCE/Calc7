import { TextEncoder, TextDecoder } from 'util';

// Polyfill globals for environments where they are missing (e.g., jsdom)
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
