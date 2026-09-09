import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sahnaf Global Tech - Solar, Gas & Electronics in Ogbomoso";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #059669 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "50px",
            width: "300px",
            height: "300px",
            background: "rgba(16, 185, 129, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50px",
            width: "300px",
            height: "300px",
            background: "rgba(251, 191, 36, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "30px",
              marginBottom: "40px",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="#fbbf24"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "white",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            Sahnaf Global Tech
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <span style={{ color: "#fbbf24" }}>⚡</span>
            Solar, Gas & Electronics
            <span style={{ color: "#10b981" }}>🔋</span>
          </div>

          {/* Location Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 30px",
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "50px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="3" fill="white" />
            </svg>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "white",
              }}
            >
              Ogbomoso, Nigeria
            </span>
          </div>
        </div>

        {/* Bottom Stats */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            display: "flex",
            gap: "60px",
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}
            >
              100+
            </div>
            <div>Projects</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}
            >
              500+
            </div>
            <div>Customers</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}
            >
              5+
            </div>
            <div>Years</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
