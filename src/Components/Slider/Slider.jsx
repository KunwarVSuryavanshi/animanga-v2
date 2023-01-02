import React, { useRef, useState } from "react";
import "./Slider.scss";
import Skeleton from "@mui/material/Skeleton";
import { Chip, ClickAwayListener, Popper } from "@mui/material";
import { cleanHTML, getRandomeColor } from "../../Common/utils";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TableRowsIcon from "@mui/icons-material/TableRows";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import CustomPlayer from "../CustomPlayer/CustomPlayer";

function Slider(props) {
  const [anchorElem, setAnchorElem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const slideRef = useRef();
  const cardRef = useRef();
  const arr = new Array(7).fill(1);
  const open = Boolean(anchorElem?.target);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setLoading(true);
    setOpenModal(false);
  };

  const handleHover = (e, item) => {
    if (e.target.getAttribute("name") === "card") {
      e.target.parentElement.style.border = `3px solid ${
        item?.coverImage?.color ?? item?.color ?? getRandomeColor()
      }`;
      handleClose();
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.getAttribute("name") === "card") {
      e.target.parentElement.style.border = "3px solid transparent";
    }
  };

  const handleClick = (event, data) => {
    if (props.trailer) {
      console.log(data);
      setOpenModal(true);
      setSources([
        {
          url: `https://www.youtube.com/watch?v=${data?.trailer?.id}`,
        },
      ]);
    } else if (event.target.getAttribute("name") === "card" && props.watch) {
      setAnchorElem({ target: event.target, data });
    } else if (props.play) {
      navigate(`/watch/${data.id}`);
      event.target.parentElement.style.border = "3px solid transparent";
    }
  };

  const handleClose = () => {
    setAnchorElem(null);
  };

  const handleLeftScroll = () => {
    slideRef.current.scrollLeft -=
      cardRef?.current?.previousSibling?.offsetWidth * 2;
  };

  const handleRightScroll = () => {
    slideRef.current.scrollLeft +=
      cardRef?.current?.previousSibling?.offsetWidth * 2;
  };

  const handleWatch = (data) => {
    navigate(`/watch/${data.id}`);
  };

  return (
    <div className="slider_root">
      <div className="slider_title">
        {props.data?.length > 0 && <>{props.icon} {props.title}</>}
        {/* <span className="">&#9432;</span> */}
        <span className="scroll-btn">
          <NavigateBeforeIcon onClick={handleLeftScroll} />
          <NavigateNextIcon onClick={handleRightScroll} />
        </span>
      </div>
      <div
        ref={slideRef}
        className="slider_container snaps-inline"
        name="container"
      >
        {props.data?.length > 0
          ? props.data?.map((item, key) => {
              return (
                <div
                  ref={cardRef}
                  id={`card_${key}`}
                  className={`card`}
                  onClick={(e) => handleClick(e, item)}
                  key={key}
                >
                  <div
                    className="card_image"
                    style={{
                      backgroundImage: `url(${
                        item?.coverImage?.extraLarge ??
                        item?.coverImage?.large ??
                        item?.image
                      })`,
                    }}
                    onMouseOver={(e) => handleHover(e, item)}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                    name="card"
                  >
                    {(props?.watch || item?.rating) && (
                      <div className="rating">
                        {isNaN(item?.averageScore / 10)
                          ? item?.rating / 10
                          : item?.averageScore / 10}
                      </div>
                    )}
                  </div>
                  <div title={`${item?.title?.romaji}`} className="card_title">
                    {item?.title?.english ??
                      item?.title?.romaji ??
                      item?.name?.full}{" "}
                    {/* {props.related && <span className="related_type">({item?.relationType})</span>} */}
                  </div>
                  {/* {props.trailer && (
                    <div className="startDate">
                      {item?.startDate?.day
                        ? (item?.startDate?.day +
                          "/" +
                          item?.startDate?.month +
                          "/" +
                          item?.startDate?.year)
                        : item?.startDate?.month
                        ? (item?.startDate?.month + "/" + item?.startDate?.year)
                        : item?.startDate?.year}
                    </div>
                  )} */}
                  {props.related && (
                    <div className="related_type">({item?.relationType})</div>
                  )}
                </div>
              );
            })
          : arr.map((item, index) => {
              return (
                <div className={`card`} key={index}>
                  <div className="card_image">
                    <Skeleton
                      variant="rectangular"
                      width={"12vw"}
                      height={"42vh"}
                      animation="pulse"
                    />
                  </div>
                </div>
              );
            })}
        <Popper
          id={open ? `card_popover` : undefined}
          open={open}
          anchorEl={anchorElem?.target}
          // anchorOrigin={{
          //   vertical: "center",
          //   horizontal: "right",
          // }}
          placement={"right"}
          // transformOrigin={{
          //   vertical: "top",
          //   horizontal: "left",
          // }}
          disablePortal
          // transition
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [20, 20],
              },
            },
          ]}
          // draggable
        >
          <ClickAwayListener onClickAway={handleClose}>
            <div
              className="popover_root"
              //  style={{backgroundColor: anchorElem?.data?.coverImage?.color}}
            >
              <div className="title">
                {anchorElem?.data?.title?.english ??
                  anchorElem?.data?.title?.romaji}
              </div>
              <div className="rating">
                <div className="rate">
                  <span>
                    <StarIcon /> &nbsp;
                    {anchorElem?.data?.averageScore / 10}
                  </span>
                </div>
                <div className="episodes">
                  <span>
                    <TableRowsIcon /> &nbsp;
                    {anchorElem?.data?.episodes ?? `NA`}
                  </span>
                </div>
                <div className="type">{anchorElem?.data?.format}</div>
              </div>
              <div className="description">
                {cleanHTML(anchorElem?.data?.description)}
              </div>
              <div className="genres">
                Genres: {anchorElem?.data?.genres?.slice(0, 5)?.join(", ")}
              </div>
              <div className="status">Status: {anchorElem?.data?.status}</div>
              <div className="btn">
                <Chip
                  icon={<PlayArrowIcon />}
                  label="Watch Now"
                  onClick={() => handleWatch(anchorElem?.data)}
                />
              </div>
            </div>
          </ClickAwayListener>
        </Popper>
        {openModal && (
          <CustomPlayer
            handleClose={handleCloseModal}
            openModal={true}
            sources={sources}
            pip={true}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
}

export default Slider;
