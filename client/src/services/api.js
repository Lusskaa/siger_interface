import axios from "axios";
import { toast } from "react-toastify";

const apiSiger = axios.create({
  baseURL: "http://localhost:3001",
});

apiSiger.interceptors.request.use(async (config) => {
  const userData = await localStorage.getItem("siger:userData");
  const token = userData && JSON.parse(userData).token;
  config.headers.authorization = `Bearer ${token}`;

  return config;
});

apiSiger.interceptors.response.use((resp) => {
  if (resp.status > 299) {
    if (resp.data.errors)
      toast.error(
        <span>
          {resp.data.errors.map((msg, index) => (
            <span key={index}>
              {msg}
              <br />
            </span>
          ))}
        </span>
      );
    else if (resp.data.error) toast.error(resp.data.error);
    else {
      console.log("ERROR: ", resp.data);
      toast.error("Erro de infraestrutura");
    }

    return Promise.reject(resp.data);
  } else return resp;
});

export default apiSiger;
