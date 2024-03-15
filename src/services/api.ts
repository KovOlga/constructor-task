interface IOptions {
  method: string;
  headers: {
    "Content-Type": "application/json";
  };
  body?: string;
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

export const getFact = (): Promise<any> => {
  return request("https://catfact.ninja/fact", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
