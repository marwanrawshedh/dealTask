import { useEffect, useState } from "react";
import {
  getUsersAction,
  addUserAction,
  checkUserAction,
  deleteUsersAction,
  changeStatusAction,
} from "../store/actions/users";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import BlueButton from "../components/Button";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { InputGroup, Button } from "react-bootstrap";
import FormBoot from "react-bootstrap/Form";
import { hashPassword } from "../helpers/encrypt";
import Counter from "../components/Counter";
import Pagination from "../components/Pagination";
const Users = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { users, checkedUsers } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = async (e) => {
    const user = {
      name: e?.target?.formBasicName?.value,
      gender: e?.target?.formBasicGender?.value ? "Male" : "Female",
      phone: e?.target?.formBasicPhoneNumber?.value,
      email: e?.target?.formBasicEmail?.value,
      dateOfBirth: e?.target?.formBasicBirth?.value,
      password: await hashPassword(e?.target?.formBasicPassword?.value),
    };
    dispatch(addUserAction(user));
  };
  const onCheck = (id, isChecked) => {
    dispatch(checkUserAction(id, isChecked));
  };
  const onDelete = () => {
    dispatch(deleteUsersAction(checkedUsers));
  };
  useEffect(() => {
    dispatch(getUsersAction(search, 1, 10));
  }, [search]);
  const header = [
    { row: "name", id: uuidv4() },
    { row: "status", id: uuidv4() },
    { row: "dateOfBirth", id: uuidv4() },
    { row: "phone", id: uuidv4() },
    { row: "gender", id: uuidv4() },
  ];
  const onChangeStatus = (userId, status) => {
    dispatch(changeStatusAction(userId, status));
  };
  return (
    <>
      <Counter count={users.count} label="Users" />
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
            aria-label="Username"
            aria-describedby="search"
          />
        </InputGroup>
        <BlueButton onClick={handleShow}>Add User</BlueButton>
        <BlueButton
          disabled={checkedUsers?.length ? false : true}
          onClick={onDelete}
        >
          Delete User{checkedUsers?.length > 1 ? "s" : ""}
        </BlueButton>
      </div>
      <Modal show={show} header={"Add User"} handleClose={handleClose}>
        <Form
          handleClose={handleClose}
          onSubmit={onSubmit}
          submitText={"Submit"}
          closeText={"Close"}
        />
      </Modal>
      <table className=" w-full flex-1">
        <thead className="  w-full">
          <tr className=" flex  flex-1">
            <td className="w-8"></td>
            {header?.map((item) => {
              return (
                <th key={item?.id} className="flex-1 text-left">
                  {item?.row}
                </th>
              );
            })}
            <th className="flex-1 "></th>
          </tr>
        </thead>
        <tbody className="flex flex-col">
          {users?.data?.map((user) => {
            return (
              <tr key={user?.id} className=" flex  flex-1">
                <td>
                  <FormBoot.Check
                    inline
                    name="group1"
                    type="checkbox"
                    onChange={(e) => {
                      onCheck(user?.id, e.target.checked);
                    }}
                  />
                </td>

                {header.map((header) => {
                  return (
                    <td key={header?.id} className="flex-1 text-left">
                      {user?.[header?.row]}
                    </td>
                  );
                })}
                <td className="flex-1">
                  <BlueButton
                    onClick={() => onChangeStatus(user?.id, user?.status)}
                  >
                    {user?.status === "Active" ? "Deactivate" : "Activate"}
                  </BlueButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagesNumber={users?.pages} activePage={+users.currentPage} />
    </>
  );
};

export default Users;
