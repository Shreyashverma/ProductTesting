import { Stack } from '@mui/system';
import react from 'react';
import ExpandIcon from "@mui/icons-material/Expand";

/* STYLES */
import {
  CardBook,
  CardBookImg,
  CardBookContent,
  CardBookTitle,
  CardBookGridOne,
  CardBookAuthor,
} from './styled';
const resizeHandleStyle = {
  position: "absolute",
  right: "-29px",
  cursor: "col-resize",
  background: "white",
  color: "var(--fontColor)",
  borderRadius: "33px",
  border: "1px solid var(--borderColors)",
  padding: "2px",
  transform: "rotate(90deg)",
};
function BookDetails(props) {
  /* PROPS */
  const { book, open, resizableWidth, setResizableWidth } = props;

  /* FUNCTIONS */
  const handleResize = (e) => {
    console.log("e.pageX", e.pageX);
    console.log(e);
    setResizableWidth(`${e.pageX - 527}px`);
  };
  const calcAfterColor = (read, hightlights, idea, metadata) => {
    let val = 0;
    if (read > 0) {
      val += 1;
    }
    if (hightlights > 0) {
      val += 1;
    }
    if (idea > 0) {
      val += 1;
    }
    if (metadata > 0) {
      val += 1;
    }

    switch (val) {
      case 0:
        return 'afterColor-0';
      case 1:
        return 'afterColor-0';
      case 2:
        return 'afterColor-1';
      case 3:
        return 'afterColor-2';
      case 3:
        return 'afterColor-3';
      default:
        return 'afterColor-3';
    }
  };
  return (

    <CardBook >
      {!open && (
        <ExpandIcon
          style={resizeHandleStyle}
          onMouseDown={(e) => {
            e.preventDefault();
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", () => {
              document.removeEventListener(
                "mousemove",
                handleResize
              );
            });
          }}
          fontSize="medium"
        />
      )}
      <Stack direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2} sx={{ width: '85%' }}>
        <CardBookImg classname='Card-image-w50-h50' src={book.img_path} alt={book.title} />
        <Stack direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={0} sx={{ width: '90%' }}>
          <CardBookTitle>{book.title || ''}</CardBookTitle>
          <span>{book.author}</span>
        </Stack>
      </Stack>
    </CardBook >
  );
}

export default BookDetails;
