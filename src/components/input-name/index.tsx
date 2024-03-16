import { ChangeEvent, FC, useState } from "react";
import { getAgeByName } from "../../services/api";
import { Button, Div, FormItem, Group, Input } from "@vkontakte/vkui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const InputName: FC = () => {
  const [name, setName] = useState("olga");
  const [age, setAge] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const queryClient = useQueryClient();
  let timerId;

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

  const getAgeBtnClick = () => {
    console.log("click");
    clearTimeout(timerId);
    if (isLoading) {
      queryClient.cancelQueries({ queryKey: ["age"] });
    }
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
  const onInputChangesws = (e: ChangeEvent<HTMLInputElement>) => {
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
