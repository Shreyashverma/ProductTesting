import React, { useEffect } from "react";
import { useState } from "react";
import "../MyLibrary/MyLibrary.css";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import { IdeaCardAccordian } from "../../components/AccordianCollections/AccordianCollections";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PortraitIcon from "@mui/icons-material/Portrait";
import {
  dynamicBulletHandler,
  getLabelId,
  getIdeacardIcons,
} from "../../helperFunctions/getIdeacardIcons";
import { useSelector } from "react-redux";

// let booksData = {
//   _id: "642325574dc0760034d8f977",
//   book_id: "642325564dc0760034d8981f",
//   label_id: "63584f343bcadd010442c447",
//   highlight_id: "642325574dc0760034d8aae9",
//   user_id: "642325564dc0760034d897ed",
//   title: "To write a great book, you must first become the book.",
//   description: [],
//   own_thoughts: [],
//   picture_link: "",
//   rating: 0,
//   tags: [],
//   level: 0,
//   start: 17320,
//   end: 17401,
//   created_at: 1673730692254,
//   updated_at: null,
//   retrieved_at: 1673730692254,
//   deleted_at: null,
//   lastviewed_at: null,
// };
const MenuItemStyles = {
  margin: "5px 1px",
  borderRadius: "30px",
};

const socialButtonsStyle = { color: "darkgrey" };
const AccordionSummaryCustom = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "&& .Mui-expanded": {
    margin: 0,
    marginBottom: "23px",
  },
}));

export default function IdeaCardPage() {
  const ideacardData = useSelector((state) => state.ideacardReducer.value);
  const [data, setData] = useState(ideacardData);
  const currentLocation = window.location.pathname;
  const [breadcrumbs, setBreadcrumbs] = useState([
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={currentLocation}
      onClick={() => { }}
    >
      <Chip
        avatar={<TipsAndUpdatesIcon />}
        sx={{ fontWeight: 600 }}
        label={currentLocation.substring(1)}
      />
    </Link>,
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const allIcons = JSON.parse(localStorage.getItem("ideacardIcons"));

  const socialToggleHandler = () => {
    let tempData = JSON.parse(JSON.stringify(data));
    tempData.state = !tempData.state;
    setData(tempData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (iconLabelId) => {
    setAnchorEl(null);
    // setIconOption(option);
    const tempNotes = data;
    console.log("tempNotes", tempNotes);
    tempNotes.label_id = iconLabelId;
    console.log("iconLabelId", iconLabelId);
    setData(tempNotes);
  };

  useEffect(() => {
    setData(ideacardData);
  }, [ideacardData]);

  return (
    <>
      {data && (
        <>
          {" "}
          <div
            style={{
              border: "1px solid var(--borderColors)",
              padding: "7px",
              borderRadius: "12px ",
              background: "white",
              margin: "0 0 0 0.7rem",
              padding: "0.5rem 0",
              paddingTop: "0",
            }}
          >
            <div className="ideacard-Title">
              {/* //Shared by */}
              <Stack
                direction="row"
                justifyContent="left"
                alignItems="center"
                spacing={1}
                mb={1}
                sx={{ paddingLeft: "3.4rem", paddingRight: "0.5rem" }}
              >
                <PortraitIcon
                  sx={{ fontSize: "14px", color: "lightslategrey" }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "lightslategrey",
                  }}
                >
                  Shared By: <b>Mauro Guerini</b>{" "}
                </span>
              </Stack>
              {/* //CardHeaderTitle */}
              <Stack
                direction="row"
                justifyContent="left"
                alignItems="center"
                spacing={1.5}
                mb={1}
                sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
              >
                <span
                  id="ideaCardLabels"
                  aria-controls={open ? "ideaCardLabelsMenu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => {
                    handleClick(e);
                    e.stopPropagation();
                  }}
                // style={{
                //   height: "fit-content",
                //   display: "inline-block",
                //   marginTop: "17px",
                // }}
                >
                  {getIdeacardIcons(data.label_id, "large")}
                </span>
                <h3> {data.title}</h3>
              </Stack>
            </div>
            {/* //Graphics */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                paddingLeft: "3.6rem",
                paddingRight: "0.5rem",
              }}
            >
              {data.picture_link && (
                <img
                  src={data.picture_link}
                  alt={data.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px ",
                  }}
                />
              )}
            </div>

            {/* //SocialButtons */}

            <div
              className="reactionButtonsContainer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ paddingLeft: "3.4rem", paddingRight: "0.5rem" }}
            >
              <div className="socialButtons">
                <Stack direction="row" spacing={3}>
                  <FavoriteBorder sx={{ color: "var(--primaryColor)" }} />
                  <ChatBubbleOutline sx={socialButtonsStyle} />
                  <ShareIcon sx={socialButtonsStyle} />
                </Stack>
              </div>
              <div className="bookmarkButtons">
                <Stack direction="row" spacing={3}>
                  <BookmarkBorderIcon sx={socialButtonsStyle} />
                  <MoreVertIcon sx={socialButtonsStyle} />
                </Stack>
              </div>
            </div>
            <hr style={{ border: "1px solid var(--borderColors)" }} />
            <div className="otherAccordians">
              <IdeaCardAccordian data={data} />
            </div>
          </div>
          <Menu
            id="ideaCardLabelsMenu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
            MenuListProps={{
              "aria-labelledby": "ideaCardLabels",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: 28,
            }}
          >
            {allIcons?.map((item, index) => {
              return (
                <MenuItem
                  key={index + item._id}
                  sx={MenuItemStyles}
                  onClick={() => handleClose(item._id)}
                >
                  {dynamicBulletHandler(item.label, "medium")} &nbsp;{" "}
                  {item.label}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      )}
    </>
  );
}
