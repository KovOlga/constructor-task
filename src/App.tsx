import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  usePlatform,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import FunFact from "./components/fun-fact";
import InputName from "./components/input-name";

export default function App() {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <FunFact />
              <InputName />
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
