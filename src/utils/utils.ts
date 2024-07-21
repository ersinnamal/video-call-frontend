export const createId = (): string =>
  Math.ceil(Math.random() * 1000).toString();

const API_HOST = process.env.REACT_APP_API_HOST;

export interface CreateRequestFunctionParams {
  path: string;
  method: "GET" | "POST";
}

export const createRequestFunction = <TResBody, TReqBody = {}>({
  path,
  method,
}: CreateRequestFunctionParams) => {
  return async ({
    body,
    params,
  }: {
    body?: TReqBody;
    params?: { [key: string]: string };
  }): Promise<TResBody> => {
    const headers: HeadersInit = {};

    let url = API_HOST + path;

    if (params) {
      Object.keys(params).forEach((key) => {
        url = url.replace(`:${key}`, params[key]);
      });
    }

    if (body) {
      JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const r = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers,
    });

    const data = await r.json();
    return data;
  };
};
