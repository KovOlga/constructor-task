import { Button, FormItem, Group, Input } from "@vkontakte/vkui";
import { FC, useEffect, useRef, useState } from "react";
import { getFact } from "../../services/api";

const FunFact: FC = () => {
  const [fact, setFact] = useState("");
  const textInput = useRef<HTMLInputElement>();

  const onGetFact = () => {
    getFact()
      .then((res) => {
        setFact(res.fact);
      })
      .catch(() => {
        console.log("error happened");
      });
  };

  function setCursorPosition(inputElem: HTMLInputElement, position: number) {
    if (inputElem.setSelectionRange) {
      inputElem.focus();
      inputElem.setSelectionRange(position, position);
    }
  }

  useEffect(() => {
    if (textInput.current) {
      textInput.current.value = fact;
      const indexAfterFirstWord = fact.split(" ")[0].length;
      setCursorPosition(textInput.current, indexAfterFirstWord);
    }
  }, [fact]);

  return (
    <Group>
      <Button onClick={onGetFact}>Получить факт</Button>
      <FormItem htmlFor="fact">
        <Input getRef={textInput} type="text" id="fact" />
      </FormItem>
    </Group>
  );
};

export default FunFact;
