import { FC, useState } from "react";
import { getAgeByName, getAgeByNameWithDelay } from "../../services/api";
import { Button, Div, FormItem, Group, Input } from "@vkontakte/vkui";
import { useMutation, useQuery } from "@tanstack/react-query";

const InputName: FC = () => {
  const [name, setName] = useState("olga");
  const [age, setAge] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const fetchVGV = async (name: string) => {
    console.log("res");
    const data = await getAgeByName(name);
    console.log("data", data);
    return data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["age"],
    queryFn: () => fetchVGV(name),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

  let timerId;

  const getAgeBtnClick = () => {
    console.log("click");
    clearTimeout(timerId);
    getAgeByName(name).then((res) => {
      console.log("res", res);
      setAge(res.age);
    });
  };

  const countDownOnInputBlur = () => {
    timerId = setTimeout(() => {
      console.log("timeout worked");
      setEnabled(true);
    }, 3000);
  };

  /////////////////
  const onInputChangesws = (e) => {
    console.log("e", e);
    setName(e.target.value);
  };

  return (
    <Group>
      <Button onClick={getAgeBtnClick}>Узнать возраст</Button>
      <FormItem htmlFor="exampleec">
        <Input
          type="text"
          id="exampleec"
          value={name}
          onChange={onInputChangesws}
          onBlur={countDownOnInputBlur}
        />
      </FormItem>
      <Div>{age}</Div>
    </Group>
  );
};

export default InputName;
