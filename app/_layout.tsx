import { AuthHandler } from '@/components/AuthHandler';
import { useFonts } from 'expo-font';
import Root from "../components/Root";
import { ThemeHandler } from "../components/ThemeHandler";

export default function RootLayout() {
  const [loaded] = useFonts({
    "mainFontRegular": require("../assets/fonts/JostVariableFont_wght.ttf"),
  })

  return(
    <ThemeHandler>
      <AuthHandler>
        {loaded ? <Root /> : null}
      </AuthHandler>
    </ThemeHandler>
  );
}
