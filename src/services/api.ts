interface IOptions {
  method: string;
  headers: {
    "Content-Type": "application/json";
  };
}

const getResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(await res.json());
};

const request = (url: string, options: IOptions) => {
  return fetch(url, options).then(getResponse);
};

export const getFact = (): Promise<{ fact: string }> => {
  return request("https://catfact.ninja/fact", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAgeByName = (name: string): Promise<{ age: number }> => {
  return request(`https://api.agify.io/?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
