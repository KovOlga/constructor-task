import { ChangeEvent, FC, useState } from "react";
import { getAgeByName } from "../../services/api";
import { Button, Div, FormItem, Group, Input } from "@vkontakte/vkui";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const regex = /\W+|\d/;

const InputName: FC = () => {
  const [name, setName] = useState("olga");
  const [age, setAge] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const queryClient = useQueryClient();
  let timerId: number;

  const { isLoading } = useQuery({
    queryKey: ["age"],
    queryFn: async () => {
      const data = await getAgeByName(name);
      setAge(data.age);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
    retry: false,
  });

  const getAgeBtnClick = () => {
    console.log("click");
    clearTimeout(timerId);
    if (isLoading) {
      queryClient.cancelQueries({ queryKey: ["age"] });
    }
    getAgeByName(name)
      .then((res) => {
        console.log("res", res);
        setAge(res.age);
      })
      .catch((err: { error: string }) => {
        console.log("error", err);
      });
  };

  const countDownOnInputBlur = () => {
    timerId = setTimeout(() => {
      console.log("timeout worked");
      setEnabled(true);
    }, 3000);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const found = e.target.value.match(regex);
    if (found) {
      setIsInputError(true);
      return;
    } else {
      setIsInputError(false);
    }
    setName(e.target.value);
  };

  return (
    <Group>
      <Button onClick={getAgeBtnClick}>Узнать возраст</Button>
      <FormItem
        htmlFor="name"
        bottom={!isInputError ? "" : "Должны быть только буквы"}
        status={!isInputError ? "valid" : "error"}
      >
        <Input
          type="text"
          id="name"
          value={name}
          onChange={onInputChange}
          onBlur={countDownOnInputBlur}
        />
      </FormItem>
      <Div>{age}</Div>
    </Group>
  );
};

export default InputName;
