import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { _Details } from "../../redux/poolStates";
import Loading from "../../tools/Loading";

function Details() {
  const details = useSelector(_Details);
  useEffect(() => {
  }, [details]);
  return (
    <>
      {details["pool_name"] ? (
        <table className="table table-stripped">
          <thead>
            <tr>
              <th className="text-start">parameter</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(details).map(([key, val], i) => {
              return (
                <tr key={i}>
                  <td className="text-start ps-3">{key}</td>
                  <td>{val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Details;
