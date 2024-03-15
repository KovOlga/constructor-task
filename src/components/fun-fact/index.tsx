import { Button, FormItem, Group, Input } from "@vkontakte/vkui";
import { FC, useEffect, useRef, useState } from "react";
import { getFact } from "../../services/api";

const FunFact: FC = () => {
  const [fact, setFact] = useState("");
  const textInput = useRef();

  const onInputChange = (e) => {
    console.log("e", e);
  };

  const onGetFact = () => {
    getFact().then((res) => {
      setFact(res.fact);
    });
  };

  function setCursorPosition(inputElem, position) {
    if (inputElem.setSelectionRange) {
      inputElem.focus();
      inputElem.setSelectionRange(position, position);
    }
  }

  useEffect(() => {
    const indexAfterFirstWord = fact.split(" ")[0].length;
    setCursorPosition(textInput.current, indexAfterFirstWord);
  }, [fact]);

  return (
    <Group>
      <Button onClick={onGetFact}>Получить факт</Button>
      <FormItem htmlFor="example">
        <Input
          getRef={textInput}
          type="text"
          id="example"
          value={fact}
          onChange={onInputChange}
        />
      </FormItem>
    </Group>
  );
};

export default FunFact;
