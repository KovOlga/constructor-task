import { FC, useState } from "react";
import { getAgeByName } from "../../services/api";
import { Button, Div, FormItem, Group, Input } from "@vkontakte/vkui";

const InputName: FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const onInputChangesws = (e) => {
    console.log("e", e);
    setName(e.target.value);
  };

  const onGetAge = () => {
    getAgeByName(name).then((res) => {
      console.log("res", res);
      setAge(res.age);
    });
  };

  return (
    <Group>
      <Button onClick={onGetAge}>Узнать возраст</Button>
      <FormItem htmlFor="exampleec">
        <Input
          type="text"
          id="exampleec"
          value={name}
          onChange={onInputChangesws}
        />
      </FormItem>
      <Div>{age}</Div>
    </Group>
  );
};

export default InputName;
