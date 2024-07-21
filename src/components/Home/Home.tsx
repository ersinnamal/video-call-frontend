import classes from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { createRoom } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { clientId } = useContext(AuthContext);

  const { data, refetch } = useQuery({
    queryFn: () => createRoom({ body: { clientId } }),
    queryKey: ["create-room"],
    enabled: false,
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    if (data) {
      navigate(`room/${data.roomId}`);
    }
  }, [data]);

  return (
    <div className={classes.pageContainer}>
      <div className={classes.container}>
        <input
          placeholder="ROOM NUMBER"
          className={classes.input}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={classes.buttonsContainer}>
          <button
            className={`${classes.button} ${value.length === 0 ? classes.disabledButton : ""}`}
            disabled={value.length === 0}
            onClick={() => navigate(`room/${value}`)}
          >
            Connect
          </button>
          <button className={classes.button} onClick={() => refetch()}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
