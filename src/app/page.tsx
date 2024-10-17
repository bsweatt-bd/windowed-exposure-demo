"use client";

import React, {RefObject, useEffect, useState} from 'react';
import {Scanner, useWindowedExposure} from "@bit-tyler/react-qr-scanner";
import styled from "styled-components";

const VIDEO_WIDTH = 1600;
const VIDEO_HEIGHT = 1200;
const VIEW_BOX_SIZE = 570;
const BarcodeContainer = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
`
const Home: React.FC = () => {
    const [targetAPL, setTargetAPL] = useState<number>(100);
    const videoConstraints = {
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        framerate: 30
    };
    const windowedExposure = useWindowedExposure({targetAPL});

    const [scannedWalletAddress, setScannedWalletAddress] = useState<string>("----");
    const [barcodeFormats, setBarcodeFormats] = useState<BarcodeFormat[]>();
    const onCameraSetup = (videoElementRef: RefObject<HTMLVideoElement>, videoTrackRef: RefObject<MediaStreamTrack>) => {
        windowedExposure.setVideoElementRef(videoElementRef.current);
        windowedExposure.setVideoTrackRef(videoTrackRef.current);
        windowedExposure.setPaused(false);
    };

    const handleTargetAPLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetAPL(Number(event.target.value));
    };

    const handleAddressScan = (result) => {
        setScannedWalletAddress(result[0].rawValue);
        console.log(`Scanned address: ${JSON.stringify(result)}`);
    }

    const togglePaused = () => {
        windowedExposure.setPaused(!windowedExposure.paused);
    }

    useEffect(() => {
        BarcodeDetector.getSupportedFormats().then((formats) => {
            setBarcodeFormats(formats.filter(f => f !== "unknown"));
        });
    }, []);

    return (
        <div>
            <h1>Webcam APL Control with useWindowedExposure Hook</h1>
            <BarcodeContainer>
                <Scanner
                    constraints={videoConstraints}
                    styles={{
                        container: {
                            width: VIEW_BOX_SIZE,
                            height: VIEW_BOX_SIZE,
                            justifyItems: 'center',
                        },
                        video: { width: VIEW_BOX_SIZE, height: VIEW_BOX_SIZE, objectFit: 'cover' },
                    }}
                    onSetup={onCameraSetup}
                    formats={barcodeFormats}
                    onScan={handleAddressScan}
                    allowMultiple={true}
                />
            </BarcodeContainer>
            <div>
                <label>
                    Target APL:
                    <input
                        type="range"
                        min="0"
                        max="255"
                        value={targetAPL}
                        onChange={handleTargetAPLChange}
                    />
                    {targetAPL.toFixed(0)}
                </label>
            </div>
            <div>
                {/*<p>Current APL: {currentAPL.toFixed(2)}</p>*/}
                {/*<p>Exposure Time: {exposureTime ? exposureTime.toFixed(2) : 'N/A'} μs</p>*/}

                <p>Scanned wallet: {scannedWalletAddress}</p>
                <p>Formats: {barcodeFormats?.join(",")}</p>
            </div>
            <div>
                <button
                    onClick={() => togglePaused()}>
                    {windowedExposure.paused && "Windowed exposure paused" || "Windowed exposure running" }
                </button>
            </div>

            {/*<canvas ref={windowedExposure.setCanvasRef}*/}
            {/*        style={{width: 200, height: 200}}></canvas>*/}
        </div>
    );
};

export default Home;
