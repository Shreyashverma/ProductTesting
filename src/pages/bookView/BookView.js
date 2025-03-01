import "../MyLibrary/MyLibrary.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import LibraryAccordian from "../../components/AccordianCollections/AccordianCollections";
import PortraitIcon from "@mui/icons-material/Portrait";
import CircularLoading from "../../Assets/circularLoadingANI/CircularLoading";
import LinearDotsLoading from "../../Assets/LinearDotsLoading/LinearDotsLoading";
import axios from "axios";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import loginAuths from "../../helperFunctions/logingFunction";
import SuggestedView from "../../components/SuggestedView/SuggestedView";
import { apiRoot } from "../../helperFunctions/apiRoot";
import Breadcum from "../../components/Breadcum/Breadcum";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#FF6600",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#FF6600",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#FF6600",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#FF6600",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <CheckCircleIcon className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};
const stepLabelStyling = {
    margin: 0,
    "& .MuiStepLabel-labelContainer": {
        position: "absolute",
        top: "-36px",
    },
};

const AccordionSummaryCustom = styled((props) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
    "&& .Mui-expanded": {
        margin: 0,
        marginBottom: "23px",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
    },
}));

const steps = ["Read", "Highlights", "Idea Cards"];
let booksData = [
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
];

const socialButtonsStyle = { color: "darkgrey" };

export default function BookView() {
    const [loadingFullData, setLoadingFullData] = useState(false);
    const [stepperCount, setStepperCount] = useState(-1);
    const [metaData, setMetaData] = useState([]);
    const bookState = JSON.parse(localStorage.getItem("bookState"));
    const { index, item, bookName } = bookState;
    const cardClickHandler = (e, index, title, state) => { };
    const timelineSpanStyle = {
        width: "119.666px",
    };
    const fetchFullData = (event, bookId) => {
        event.stopPropagation();
        setLoadingFullData(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        axios
            .get(
                `${apiRoot.endpoint}/api/library/metadata?title=&asin=&author=&book_id=${bookId}&user_id=${userId}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then((res) => {
                console.log("fullData, ", res.data.data);
                console.log("fullData, ", res.data.data[0].progress);
                setMetaData(res.data.data);
                setLoadingFullData(false);
                setStepperCount(3);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    const suggestedViewContainer = {
        position: "absolute",
        top: "0px",
        right: "-229px",
    };
    const itemIdCreator = (title) => {
        const splitedTitle = title.split(" ");
        const requiredTitle = splitedTitle.join("-");
        return requiredTitle;
    };

    console.log("BookView", bookState);
    return (
        <div className="feedParentContainer">
            <div className="feedBoxLayout">
                <Breadcum />
                <div key={item?.id} id={item?.title} className="libraryListsContainer">
                    <div
                        style={{
                            border: "1px solid var(--borderColors)",
                            borderRadius: "12px ",
                            background: "white",
                            padding: "0.7rem",
                        }}
                    >
                        <Stack direction={"column"} sx={{ width: "100%" }}>
                            <div
                                className="libraryLists"
                                onClick={(e) => {
                                    cardClickHandler(e, index, item?.title, item?.state);
                                }}
                            >
                                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                                    <div>
                                        <img
                                            src={item?.img_path}
                                            alt={item?.title}
                                            className="libraryListsImg"
                                        />
                                        <div className="rating">
                                            <Rating
                                                name="read-only"
                                                sx={{ color: "#FF6600" }}
                                                value={item?.rating}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
                                        {/* //CardHeaderTitle */}
                                        <div className="">
                                            {/* <Tooltip title={item.title} arrow> */}
                                            <Stack
                                                direction="row"
                                                justifyContent="left"
                                                alignItems="center"
                                                spacing={1}
                                                mb={1}
                                            >
                                                {" "}
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
                                            <h3 >{item?.title.length > 98 ? item?.title.slice(0, 99) + '...' : item?.title}</h3>
                                            {/* </Tooltip> */}
                                            <span className="">By {item?.author}</span>
                                        </div>

                                        {/* //Timline */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <Box sx={{ width: "100%", marginTop: "32px" }}>
                                                    <Stepper
                                                        alternativeLabel
                                                        activeStep={stepperCount}
                                                        connector={<QontoConnector />}
                                                    >
                                                        {steps.map((label) => (
                                                            <Step key={label}>
                                                                <StepLabel
                                                                    StepIconComponent={QontoStepIcon}
                                                                    sx={stepLabelStyling}
                                                                >
                                                                    {label}
                                                                </StepLabel>
                                                            </Step>
                                                        ))}
                                                    </Stepper>
                                                </Box>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-around",
                                                        textAlign: "center",
                                                        // marginTop: "16px",
                                                    }}
                                                >
                                                    {!metaData?.length ? (
                                                        loadingFullData ? (
                                                            <>
                                                                <LinearDotsLoading />
                                                                <LinearDotsLoading />
                                                                <LinearDotsLoading />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>...</span>
                                                                <span>...</span>
                                                                <span>...</span>
                                                            </>
                                                        )
                                                    ) : (
                                                        <>
                                                            <span style={timelineSpanStyle}>
                                                                {metaData[0].progress
                                                                    ? `${metaData[0].progress}%`
                                                                    : "0%"}
                                                            </span>
                                                            <span style={timelineSpanStyle}>
                                                                {metaData[0].h_progress
                                                                    ? `${metaData[0].h_progress}%`
                                                                    : "0%"}
                                                            </span>
                                                            <span style={timelineSpanStyle}>
                                                                {metaData[0].idea?.length
                                                                    ? `${metaData[0].idea?.length}%`
                                                                    : "0"}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Stack>
                                </Stack>
                                <div className="fetchStatusIconContainer">
                                    {loadingFullData ? (
                                        <CircularLoading />
                                    ) : metaData.length ? (
                                        <PublishedWithChangesIcon sx={{ color: "lightgreen" }} />
                                    ) : (
                                        <AutorenewIcon
                                            sx={{ color: "var(--primaryColor)" }}
                                            onClick={(e) => fetchFullData(e, item?._id)}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* //SocialButtons */}
                            <div
                                className="reactionButtonsContainer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <div className="socialButtons">
                                    <Stack direction="row" spacing={3}>
                                        <FavoriteBorder sx={{ color: "#FF6600" }} />
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
                            <hr />
                            <div>
                                <LibraryAccordian metaData={metaData} />
                            </div>
                        </Stack>
                    </div>
                    <div style={suggestedViewContainer}>
                        <SuggestedView
                            bookId={item?._id}
                            userId={item?.user_id}
                            bookName={bookName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
