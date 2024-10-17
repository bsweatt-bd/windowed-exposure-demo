interface PhotoCapabilities {
    exposureMode?: string[];
    exposureCompensation?: number;
    exposureTime?: {
        min: number;
        max: number;
        step: number;
    };
    fillLightMode?: string[];
    focusMode?: string[];
    imageHeight?: {
        min: number;
        max: number;
        step: number;
    };
    imageWidth?: {
        min: number;
        max: number;
        step: number;
    };
    redEyeReduction?: boolean;
    whiteBalanceMode?: string[];
    zoom?: {
        min: number;
        max: number;
        step: number;
    };
}

interface MediaTrackSettings {
    exposureTime? : number
}

interface MediaTrackCapabilities {
    exposureMode?: string[];
    exposureTime?: {
        min: number;
        max: number;
        step: number;
    };
    // Add other properties if needed
}

interface MediaTrackConstraintSet {
    exposureMode?: string;
    exposureTime?: number;
    // Add other properties if needed
}
