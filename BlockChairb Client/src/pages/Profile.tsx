import React from "react";
import { Avatar } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "../styles/Profile.css";
import { useState } from "react";
import { selectUser, updateUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/ChatComponents/Sidebar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import { green, pink } from "@material-ui/core/colors";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import EditIcon from "@material-ui/icons/Edit";
import { inherits } from "util";
import { maxWidth } from "@mui/system";
import { Center } from "@chakra-ui/react";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 350,
    margin: `${theme.spacing(1.5)}px auto`,
    padding: theme.spacing(1.5),
  },
  green: {
    color: "#fff",
    backgroundColor: "#3a5a40",
    width: "80%",
    height: "80%",
    "&:hover": {
      color: "#3a5a40",
      backgroundColor: "#dad7cd",
    },
  },

  empty: {
    color: "#081c15",
    backgroundColor: "#fff",
    width: "100%",
  },
}));

function Chat(props: any) {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);
  const [avatar, setAvatar] = useState(user.avatar);
  const dispatch = useDispatch();

  const editPseudo = async () => {
    const MySwal = withReactContent(Swal);

    const { value: pseudo }: any = await MySwal.fire({
      title: "Enter a new pseudo",
      input: "text",
      inputPlaceholder: "Please Enter a new pseudo",
    });

    if (pseudo) {
      const tempUser: any = { ...user };
      tempUser.username = pseudo;
      dispatch(updateUser(tempUser));
    }
  };

  const editEmail = async () => {
    const MySwal = withReactContent(Swal);

    const { value: email }: any = await MySwal.fire({
      title: "Enter a new email",
      input: "email",
      inputPlaceholder: "Please Enter a new email",
    });

    if (email) {
    }
  };

  const editPassword = async () => {
    const MySwal = withReactContent(Swal);

    const { value: password }: any = await MySwal.fire({
      title: "Enter a new password",
      input: "password",
      inputPlaceholder: "Please Enter a new password",
    });

    if (password) {
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="ProfileMain">
        <img
          src={avatar}
          alt=""
          style={{
            marginBottom: 30,
            marginTop: 20,
            width: 180,
            height: 180,
          }}
        />
      </div>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar className={classes.empty}>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap style={{ margin: "8px 0px 0px 0px " }}>
              Pseudo
            </Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.green} onClick={editPseudo}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar className={classes.empty}>
              <AlternateEmailIcon />
            </Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap style={{ margin: "8px 0px 0px 0px" }}>
              Email
            </Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.green} onClick={editEmail}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar className={classes.empty}>
              <LockIcon />
            </Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap style={{ margin: "8px 0px 0px 0px" }}>
              Password
            </Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.green} onClick={editPassword}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Chat;
