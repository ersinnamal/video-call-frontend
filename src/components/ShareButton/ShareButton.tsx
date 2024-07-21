import classes from "./ShareButton.module.css";
import { ReactComponent as ClipboardIcon } from "../../assets/clipboard-outline.svg";

const ShareButton = (): JSX.Element => {
  return (
    <div
      onClick={() => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
      }}
      className={classes.shareContainer}
    >
      <div className={classes.shareIconContainer}>
        <ClipboardIcon className={classes.shareIcon} width={24} />
      </div>
      {window.location.href.split("://")[1]}
    </div>
  );
};

export default ShareButton;
