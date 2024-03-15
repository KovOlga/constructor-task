import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  usePlatform,
  Group,
  Button,
  FormItem,
  Input,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { getFact } from "./services/api";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const platform = usePlatform();
  const [state, setState] = useState("");
  const textInput = useRef();

  const onGetFact = () => {
    getFact().then((res) => {
      setState(res.fact);
    });
  };

  const onInputChange = (e) => {
    console.log("e", e);
  };

  function setCursorPosition(inputElem, position) {
    if (inputElem.setSelectionRange) {
      inputElem.focus();
      inputElem.setSelectionRange(position, position);
    }
  }

  useEffect(() => {
    const indexAfterFirstWord = state.split(" ")[0].length;
    setCursorPosition(textInput.current, indexAfterFirstWord);
  }, [state]);

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <Group>
                <Button onClick={onGetFact}>Получить факт</Button>
                <FormItem htmlFor="example">
                  <Input
                    getRef={textInput}
                    type="text"
                    id="example"
                    value={state}
                    onChange={onInputChange}
                  />
                </FormItem>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
