import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "@styles/globals.css";

export const metadata = {
  title: "Password Generator",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
