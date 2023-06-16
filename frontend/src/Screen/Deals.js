import { useEffect, useState } from "react";
import {
  getDealsAction,
  addDealAction,
  changeStatusAction,
  claimDealAction,
} from "../store/actions/deals";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { InputGroup, Button } from "react-bootstrap";
import FormBoot from "react-bootstrap/Form";
import Modal from "../components/Modal";
import Form from "../components/DealForm";
import BlueButton from "../components/Button";
import Counter from "../components/Counter";
import Pagination from "../components/Pagination";
import { useOutletContext } from "react-router-dom";

const header = [
  { row: "name", id: uuidv4() },
  { row: "status", id: uuidv4() },
  { row: "description", id: uuidv4() },
  { row: "amount", id: uuidv4() },
  { row: "currency", id: uuidv4() },
];
const Deals = () => {
  const context = useOutletContext();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { deals } = useSelector((state) => state.deals);
  useEffect(() => {
    dispatch(getDealsAction(search, 1, 10));
  }, []);
  useEffect(() => {
    dispatch(getDealsAction(search, 1, 10));
  }, [search]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const deal = {
      name: e?.target?.formBasicName?.value,
      description: e?.target?.formBasicDescription?.value,
      amount: e?.target?.formBasicAmount?.value,
      currency: e?.target?.formBasicCurrency?.value,
    };
    dispatch(addDealAction(deal));
  };
  const onChangePage = (page) => {
    dispatch(getDealsAction(search, page, 10));
  };

  const onClaim = (dealId) => {
    dispatch(claimDealAction(dealId));
  };
  const onChangeStatus = (dealId, status) => {
    dispatch(changeStatusAction(dealId, status));
  };
  return (
    <>
      <Counter count={deals.count} label="Deals" />

      <div className="flex justify-evenly my-9 h-9">
        <InputGroup
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="mb-3 max-w-xs"
        >
          <InputGroup.Text id="search">Search</InputGroup.Text>
          <FormBoot.Control
            placeholder="Search By Name"
            aria-label="dealName"
            aria-describedby="search"
          />
        </InputGroup>
        <BlueButton onClick={handleShow}>Add Deal</BlueButton>

        <Modal show={show} header={"Add Deal"} handleClose={handleClose}>
          <Form
            handleClose={handleClose}
            onSubmit={onSubmit}
            submitText={"Submit"}
            closeText={"Close"}
          />
        </Modal>
      </div>
      <table className=" w-full flex-1">
        <thead className="  w-full">
          <tr className=" flex  flex-1">
            {header?.map((item) => {
              return (
                <th key={item?.id} className="flex-1 text-left">
                  {item?.row}
                </th>
              );
            })}
            <th className="flex-1"></th>;
          </tr>
        </thead>
        <tbody className="flex flex-col">
          {deals?.data?.map((deal) => {
            return (
              <tr key={deal?.id} className=" flex  flex-1">
                {header.map((header) => {
                  return (
                    <td key={header?.id} className="flex-1 text-left">
                      {deal?.[header?.row]}
                    </td>
                  );
                })}
                {context?.role !== "Admin" && (
                  <td className="flex-1">
                    <BlueButton
                      onClick={() => {
                        onClaim(deal?.id);
                      }}
                    >
                      claim
                    </BlueButton>
                  </td>
                )}
                {context?.role === "Admin" && (
                  <td className="flex-1">
                    <BlueButton
                      onClick={() => onChangeStatus(deal?.id, deal?.status)}
                    >
                      {deal?.status === "Expired" ? "Activate" : "Expire"}
                    </BlueButton>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        onChange={onChangePage}
        pagesNumber={deals?.pages}
        activePage={+deals.currentPage}
      />
    </>
  );
};

export default Deals;
