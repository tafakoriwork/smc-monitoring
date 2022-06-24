import { useSelector } from "react-redux";
import { userEvents } from "../redux/usersSlice";

function Events() {
  const events = useSelector(userEvents);
  return (
    <>
      <div className="row bg-light my-0">
        <div className="col-3 border">Events tab1</div>
        <div className="col-3 border">Events tab2</div>
        <div className="col-3 border">Events tab3</div>
        <div className="col-3 border">Events tab4</div>
      </div>
      {events.map((msg, index) => (
        <div key={index} className={msg.type == 'error' ? "row bg-danger text-light my-0 px-3 border" :  "row bg-success text-light my-0 px-3 border" }>
          {msg.text}
        </div>
      )
      )}
    </>
  );
}

export default Events;
