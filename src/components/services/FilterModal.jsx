function FilterModal(props) {
    const {setFilter} = props;
    function addFilter(type) {

    }
  return (
    <div className="bg-light filter_modal" style={{ width: "250px" }}>
      <div className="row">
        <div className="row justify-content-center">
          <div className="col-4 text-start">
            <label htmlFor="active" style={{fontSize: '12px', marginTop: '5px'}}>active</label>
          </div>
          <div className="col-2 text-end">
            <input type="checkbox" id="active" onChange={() => setFilter('active')}/>
          </div>
          <div className="col-4 text-start">
            <label htmlFor="in-active" style={{fontSize: '12px', marginTop: '5px'}}>in-active</label>
          </div>
          <div className="col-2 text-end">
            <input type="checkbox" id="in-active" onChange={() => setFilter('in-active')}/>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-3 text-start">
            <label htmlFor="load" style={{fontSize: '12px', marginTop: '5px'}}>loaded</label>
          </div>
          <div className="col-2 text-end">
            <input type="checkbox" id="load" onChange={() => setFilter('loaded')}/>
          </div>
          <div className="col-5 text-start">
            <label htmlFor="not-found" style={{fontSize: '12px', marginTop: '5px'}}>not-found</label>
          </div>
          <div className="col-2 text-end">
            <input type="checkbox" id="not-found" onChange={() => setFilter('not-found')}/>
          </div>
        </div>
        <hr />
        <div className="row">
        <div className="col-3 text-start">
            <label htmlFor="dead" style={{fontSize: '12px', marginTop: '5px'}}>dead</label>
          </div>
          <div className="col-1 text-end px-0">
            <input type="checkbox" id="dead" onChange={() => setFilter('dead')}/>
          </div>
          <div className="col-3 text-start">
            <label htmlFor="running" style={{fontSize: '12px', marginTop: '5px'}}>running</label>
          </div>
          <div className="col-1 text-end px-0">
            <input type="checkbox" id="running" onChange={() => setFilter('running')}/>
          </div>
          <div className="col-3 text-start">
            <label htmlFor="exited" style={{fontSize: '12px', marginTop: '5px'}}>exited</label>
          </div>
          <div className="col-1 text-end px-0">
            <input type="checkbox" id="exited" onChange={() => setFilter('exited')}/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterModal;
