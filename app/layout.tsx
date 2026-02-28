export const metadata = {
  title: "Treasure Logic",
  description: "Strategic intelligence powered by Treasure David."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "#eaeaea",
          fontFamily: "system-ui"
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)"
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
