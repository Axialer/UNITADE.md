/**
 * A class containing constants.
 * 
 * @class
 * @example
 * const audioExtensions = CONSTANTS.defaultExtensions['audio'];
 * console.log(audioExtensions); // ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav']
 */
export default class CONSTANTS {

    /**
     * A static object that maps file types to their default extensions.
     * 
     * - **audio**: ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav']
     * - **image**: ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp']
     * - **video**: ['mkv', 'mov', 'mp4', 'ogv', 'webm']
     * - **pdf**: ['pdf']
     * - **markdown**: ['md']
     * 
     * @type {{ [id: string]: string[] }}
     * @example
     * const videoExtensions = CONSTANTS.defaultExtensions['video'];
     * console.log(videoExtensions); // ['mkv', 'mov', 'mp4', 'ogv', 'webm']
     */
    public static defaultExtensions: {
        [id: string]: string[];
    } = {
        'audio': ['3gp', 'flac', 'm4a', 'mp3', 'oga', 'ogg', 'opus', 'wav'],
        'image': ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp'],
        'video': ['mkv', 'mov', 'mp4', 'ogv', 'webm'],
        'pdf': ['pdf'],
        'markdown': ['md']
    };

    /**
         * Initial theme to be used for rendering.
         * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black', 'hc-light.**/
    public static themes: Record<string, string> = {
        'vs-dark': 'DARK',
        'vs': 'LIGHT',
        'hc-black': 'PITCH-BLACK',
        'hc-light': 'PITCH-LIGHT',
        'auto': 'AUTO'
    };
}
