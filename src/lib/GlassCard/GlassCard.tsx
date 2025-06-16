import { type CSSProperties, forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";
import { displacementMap } from "./utils";

const getMap = () => {
    return displacementMap;
};

/* ---------- SVG filter (edge-only displacement) ---------- */
const GlassFilter: React.FC<{ id: string; displacementScale: number; width: string; height: string }> = ({
    id,
    displacementScale,
    width,
    height,
}) => (
    <svg style={{ position: "absolute", width, height }} aria-hidden="true">
        <defs>
            <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="black" stopOpacity="0" />
                <stop offset={`${Math.max(30, 80)}%`} stopColor="black" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
            <filter id={id} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
                <feImage
                    id="feimage"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    result="DISPLACEMENT_MAP"
                    href={getMap()}
                    preserveAspectRatio="xMidYMid slice"
                />

                {/* Create edge mask using the displacement map itself */}
                <feColorMatrix
                    in="DISPLACEMENT_MAP"
                    type="matrix"
                    values="0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0 0 0 1 0"
                    result="EDGE_INTENSITY"
                />
                <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
                    <feFuncA type="discrete" tableValues={`0 0 1`} />
                </feComponentTransfer>

                {/* Original undisplaced image for center */}
                <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

                {/* Red channel displacement with slight offset */}
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="DISPLACEMENT_MAP"
                    scale={displacementScale * -1}
                    xChannelSelector="R"
                    yChannelSelector="B"
                    result="RED_DISPLACED"
                />
                <feColorMatrix
                    in="RED_DISPLACED"
                    type="matrix"
                    values="1 0 0 0 0
                 0 0 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
                    result="RED_CHANNEL"
                />

                {/* Green channel displacement */}
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="DISPLACEMENT_MAP"
                    scale={displacementScale * -1}
                    xChannelSelector="R"
                    yChannelSelector="B"
                    result="GREEN_DISPLACED"
                />
                <feColorMatrix
                    in="GREEN_DISPLACED"
                    type="matrix"
                    values="0 0 0 0 0
                 0 1 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
                    result="GREEN_CHANNEL"
                />

                {/* Blue channel displacement with slight offset */}
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="DISPLACEMENT_MAP"
                    scale={displacementScale * -1}
                    xChannelSelector="R"
                    yChannelSelector="B"
                    result="BLUE_DISPLACED"
                />
                <feColorMatrix
                    in="BLUE_DISPLACED"
                    type="matrix"
                    values="0 0 0 0 0
                 0 0 0 0 0
                 0 0 1 0 0
                 0 0 0 1 0"
                    result="BLUE_CHANNEL"
                />

                {/* Combine all channels with screen blend mode for chromatic aberration */}
                <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
                <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

                {/* Add slight blur to soften the aberration effect */}
                <feGaussianBlur in="RGB_COMBINED" stdDeviation={Math.max(0.1, 0.5)} result="ABERRATED_BLURRED" />

                {/* Apply edge mask to aberration effect */}
                <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

                {/* Create inverted mask for center */}
                <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
                    <feFuncA type="table" tableValues="1 0" />
                </feComponentTransfer>
                <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

                {/* Combine edge aberration with clean center */}
                <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
            </filter>
        </defs>
    </svg>
);

/* ---------- container ---------- */
const GlassContainer = forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<{
        className?: string;
        style?: React.CSSProperties;
        displacementScale?: number;
        blurAmount?: number;
        mouseOffset?: { x: number; y: number };
        onMouseLeave?: () => void;
        onMouseEnter?: () => void;
        onMouseDown?: () => void;
        onMouseUp?: () => void;
        active?: boolean;
        shadowMode?: boolean;
        cornerRadius?: number;
        padding?: string;
        glassSize?: { width: string; height: string };
        onClick?: () => void;
    }>
>(
    (
        {
            children,
            className = "",
            style,
            displacementScale = 100,
            blurAmount = 0.01,
            onMouseEnter,
            onMouseLeave,
            onMouseDown,
            onMouseUp,
            shadowMode = false,
            cornerRadius = 10,
            padding = "0px 0px",
            glassSize = { width: "auto", height: "auto" },
            onClick,
        },
        ref,
    ) => {
        const filterId = useId();

        const backdropStyle = {
            filter: `url(#${filterId})`,
            backdropFilter: `blur(${(shadowMode ? 12 : 4) + blurAmount * 32}px) saturate(100%)`,
        };

        const containerDivStyle = {
            display: "flex",
        };

        const innerContainerDivStyle = {
          borderRadius: `${cornerRadius}px`,
      };

        return (
            <div style={{ ...containerDivStyle }} >
                <div className={`${className}`} ref={ref} style={{ ...style, ...innerContainerDivStyle }} onClick={onClick}>
                    <GlassFilter
                        id={filterId}
                        displacementScale={displacementScale}
                        width={glassSize.width}
                        height={glassSize.height}
                    />
                    <div
                        className="glass"
                        style={{
                            borderRadius: `${cornerRadius}px`,
                            position: "relative",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "24px",
                            padding,
                            overflow: "hidden",
                            transition: "all 0.2s ease-in-out",
                            boxShadow: shadowMode
                                ? "0px 16px 70px rgba(0, 0, 0, 0.75)"
                                : "0px 12px 40px rgba(0, 0, 0, 0.25)",
                        }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                    >
                        {/* backdrop layer that gets wiggly */}
                        <span
                            className="glass__warp"
                            style={
                                {
                                    ...backdropStyle,
                                    position: "absolute",
                                    inset: "0",
                                } as CSSProperties
                            }
                        />

                        {/* user content stays sharp */}
                        <div
                            className="transition-all duration-150 ease-in-out text-white"
                            style={{
                                position: "relative",
                                zIndex: 1,
                                // font: "500 20px/1 system-ui",
                                textShadow: shadowMode
                                    ? "0px 2px 12px rgba(0, 0, 0, 0)"
                                    : "0px 2px 12px rgba(0, 0, 0, 0.4)",
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);

GlassContainer.displayName = "GlassContainer";

interface GlassCardProps {
    children: React.ReactNode;
    displacementScale?: number;
    blurAmount?: number;
    cornerRadius?: number;
    mouseOffset?: { x: number; y: number };
    mouseContainer?: React.RefObject<HTMLElement | null> | null;
    className?: string;
    padding?: string;
    style?: React.CSSProperties;
    shadowMode?: boolean;
    onClick?: () => void;
}

export default function GlassCard({
    children,
    displacementScale = 100,
    blurAmount = 0.01,
    cornerRadius = 10,
    mouseOffset: externalMouseOffset,
    mouseContainer = null,
    className = "",
    padding = "0px 0px",
    shadowMode = false,
    style = {},
    onClick,
}: GlassCardProps) {
    const glassRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [glassSize, setGlassSize] = useState({ width: "auto", height: "auto" });
    const [internalMouseOffset, setInternalMouseOffset] = useState({ x: 0, y: 0 });

    const mouseOffset = externalMouseOffset || internalMouseOffset;

    // Internal mouse tracking
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const container = mouseContainer?.current || glassRef.current;
            if (!container) {
                return;
            }

            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setInternalMouseOffset({
                x: ((e.clientX - centerX) / rect.width) * 100,
                y: ((e.clientY - centerY) / rect.height) * 100,
            });
        },
        [mouseContainer],
    );

    // Set up mouse tracking if no external mouse position is provided
    useEffect(() => {
        if (externalMouseOffset) {
            // External mouse tracking is provided, don't set up internal tracking
            return;
        }

        const container = mouseContainer?.current || glassRef.current;
        if (!container) {
            return;
        }

        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove, mouseContainer, externalMouseOffset]);

    // Update glass size whenever component mounts or window resizes
    useEffect(() => {
        const updateGlassSize = () => {
            if (glassRef.current) {
                const rect = glassRef.current.getBoundingClientRect();
                setGlassSize({ width: rect.width.toString(), height: rect.height.toString() });
            }
        };

        updateGlassSize();
        window.addEventListener("resize", updateGlassSize);
        return () => window.removeEventListener("resize", updateGlassSize);
    }, []);

    const baseStyle = {
        ...style,
    };

    return (
        <div style={{ position: "relative" }}>
            <GlassContainer
                ref={glassRef}
                className={className}
                style={baseStyle}
                cornerRadius={cornerRadius}
                displacementScale={shadowMode ? displacementScale * 0.5 : displacementScale}
                blurAmount={blurAmount}
                glassSize={glassSize}
                padding={padding}
                mouseOffset={mouseOffset}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                active={isActive}
                shadowMode={shadowMode}
                onClick={onClick}
            >
                {children}
            </GlassContainer>
        </div>
    );
}
