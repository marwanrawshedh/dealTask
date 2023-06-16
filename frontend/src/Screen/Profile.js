import { useEffect } from "react";
import { getMyDealsAction } from "../store/actions/profile";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Counter from "../components/Counter";
const header = [
  { row: "name", id: uuidv4() },
  { row: "status", id: uuidv4() },
  { row: "description", id: uuidv4() },
  { row: "amount", id: uuidv4() },
  { row: "currency", id: uuidv4() },
];
const Profile = () => {
  const dispatch = useDispatch();
  const { myDeals } = useSelector((state) => state.profile);
  console.log(myDeals);
  useEffect(() => {
    dispatch(getMyDealsAction());
  }, []);

  return (
    <>
      <div className="flex justify-evenly my-9 h-9"></div>
      <Counter count={myDeals.count} label="My Deals" />
      <table className=" w-full">
        <thead className="  w-full">
          <tr className=" flex  flex-1">
            {header?.map((item) => {
              return (
                <th key={item?.id} className="flex-1 text-left">
                  {item?.row}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="flex flex-col">
          {myDeals?.data?.map((deal) => {
            return (
              <tr key={deal?.id} className=" flex  flex-1">
                {header.map((header) => {
                  return (
                    <td key={header?.id} className="flex-1 text-left">
                      {deal?.Deal?.[header?.row]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Profile;
