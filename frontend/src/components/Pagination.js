import Pagination from "react-bootstrap/Pagination";
import { v4 as uuidv4 } from "uuid";

const PaginationComponent = ({ pagesNumber = 0, activePage = 1, onChange }) => {
  const arr = [...Array(pagesNumber).keys()];
  return (
    <div className=" flex justify-center  ">
      <Pagination>
        {arr?.map((item, index) => {
          return (
            <Pagination.Item
              disabled={index + 1 === activePage}
              onClick={() => {
                onChange(index + 1);
              }}
              key={uuidv4()}
              active={index + 1 === activePage}
              size="sm"
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
